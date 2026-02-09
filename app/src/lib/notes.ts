import fs from 'node:fs';
import path from 'node:path';

export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

export interface Note {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  category: string;
  headings: TocEntry[];
}

const NOTES_DIR = path.resolve(process.cwd(), '..');

function slugify(text: string): string {
  return text
    .replace(/\.md$/, '')
    .toLowerCase()
    .replace(/[áà]/g, 'a')
    .replace(/[éè]/g, 'e')
    .replace(/[íì]/g, 'i')
    .replace(/[óò]/g, 'o')
    .replace(/[úù]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractTags(content: string): string[] {
  const tags: string[] = [];

  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const yamlTags = frontmatterMatch[1].match(/tags:\s*\n((?:\s+-\s+.*\n?)+)/);
    if (yamlTags) {
      const tagLines = yamlTags[1].match(/-\s+(.*)/g);
      if (tagLines) {
        tagLines.forEach((t) => tags.push(t.replace(/^-\s+/, '').trim()));
      }
    }
  }

  const inlineTags = content.match(/#[a-zA-Z][a-zA-Z0-9/_-]*/g);
  if (inlineTags) {
    inlineTags.forEach((t) => tags.push(t.replace(/^#/, '')));
  }

  return [...new Set(tags)];
}

function extractExcerpt(content: string): string {
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    // Skip frontmatter, headings, tags, blank lines, separators, tables, code fences
    if (!trimmed) continue;
    if (trimmed === '---') continue;
    if (trimmed.startsWith('#')) continue;
    if (trimmed.startsWith('`#')) continue;
    if (trimmed.startsWith('Tags:')) continue;
    if (trimmed.startsWith('|')) continue;
    if (trimmed.startsWith('```')) continue;
    if (trimmed.startsWith('>')) continue;

    // Clean markdown formatting for plain excerpt
    const clean = trimmed
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/_([^_]+)_/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[\[([^\]]+)\]\]/g, '$1')
      .replace(/^[-*]\s+/, '');

    if (clean.length > 10) {
      return clean.length > 120 ? clean.slice(0, 120) + '...' : clean;
    }
  }
  return '';
}

function extractHeadings(content: string): TocEntry[] {
  const headings: TocEntry[] = [];
  const lines = content.split('\n');
  let inFrontmatter = false;

  for (const line of lines) {
    if (line.trim() === '---') {
      inFrontmatter = !inFrontmatter;
      continue;
    }
    if (inFrontmatter) continue;

    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const raw = match[2].replace(/\*\*/g, '').replace(/`[^`]*`/g, '').trim();
      const id = slugify(raw);
      headings.push({ id, text: raw, level });
    }
  }

  return headings;
}

function readNotesFromDir(dir: string, subdir = ''): Note[] {
  const notes: Note[] = [];
  const entries = fs.readdirSync(path.join(dir, subdir), { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === 'app' || entry.name === 'node_modules' || entry.name.startsWith('.')) continue;

    const relativePath = subdir ? path.join(subdir, entry.name) : entry.name;

    if (entry.isDirectory()) {
      notes.push(...readNotesFromDir(dir, relativePath));
    } else if (entry.name.endsWith('.md') && entry.name !== 'spanish_app.md') {
      const filePath = path.join(dir, relativePath);
      const content = fs.readFileSync(filePath, 'utf-8');
      const title = entry.name.replace(/\.md$/, '');
      const slug = slugify(relativePath);
      const tags = extractTags(content);

      notes.push({
        title,
        slug,
        content,
        excerpt: extractExcerpt(content),
        tags,
        category: '',
        headings: extractHeadings(content),
      });
    }
  }

  return notes;
}

let cachedNotes: Note[] | null = null;

export function getAllNotes(): Note[] {
  if (cachedNotes) return cachedNotes;
  cachedNotes = readNotesFromDir(NOTES_DIR);
  return cachedNotes;
}

export function getNoteBySlug(slug: string): Note | undefined {
  return getAllNotes().find((n) => n.slug === slug);
}
