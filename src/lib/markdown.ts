import { Marked } from 'marked';

function slugify(text: string): string {
  return text
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

function stripFrontmatter(content: string): string {
  if (content.startsWith('---')) {
    const end = content.indexOf('---', 3);
    if (end !== -1) {
      return content.slice(end + 3).trim();
    }
  }
  return content;
}

function cleanObsidian(content: string): string {
  // Convert Obsidian wiki links [[Page]] -> Page
  content = content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, target, alias) => alias || target);
  // Remove Obsidian callouts marker but keep content
  content = content.replace(/>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*/gi, '> ');
  // Remove dataview blocks
  content = content.replace(/```dataview[\s\S]*?```/g, '');
  // Remove inline tag lines (lines that are just tags)
  content = content.replace(/^`#[^`]+`\s*$/gm, '');
  // Remove standalone tag lines like "Tags: #foo #bar" or "#tag1 #tag2" at the start
  content = content.replace(/^Tags:\s*#.*$/gm, '');
  // Remove lines that are just hashtag sequences
  content = content.replace(/^#[a-zA-Z/][^\n]*$/gm, (match) => {
    // Keep actual markdown headings (## Heading)
    if (match.match(/^#{1,6}\s/)) return match;
    // Keep the line if it looks like a heading with emoji
    if (match.match(/^#\s/)) return match;
    return '';
  });
  return content;
}

export function renderMarkdown(raw: string): string {
  let content = stripFrontmatter(raw);
  content = cleanObsidian(content);

  const marked = new Marked();

  marked.use({
    renderer: {
      heading({ text, depth }) {
        const id = slugify(text.replace(/<[^>]*>/g, ''));
        return `<h${depth} id="${id}">${text}</h${depth}>`;
      },
    },
  });

  return marked.parse(content) as string;
}
