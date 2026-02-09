import { getAllNotes, type Note } from './notes';

export interface Category {
  name: string;
  slug: string;
  description: string;
  notes: Note[];
}

const CATEGORY_DEFS: { name: string; description: string; titleKeywords: string[]; tagKeywords: string[] }[] = [
  {
    name: 'Culture',
    description: 'Jokes, stories, and cultural context',
    titleKeywords: ['bromas', 'chistes', 'advice'],
    tagKeywords: ['humor'],
  },
  {
    name: 'Grammar',
    description: 'Subjunctive, imperatives, tenses, and sentence structure',
    titleKeywords: ['subjunctive', 'subjuntivo', 'imperativo', 'imperativos', 'publicidad', 'conditional', 'clauses', 'para vs', 'para que', 'cuando +', 'temporal clauses', 'antes', 'stem-changing'],
    tagKeywords: ['grammar'],
  },
  {
    name: 'Vocabulary',
    description: 'Words, verbs with prepositions, and topic-based lists',
    titleKeywords: ['vocabulario', 'ciudades', 'tecnología', 'tecnologia', 'anécdotas', 'anecdotas', 'preposición', 'preposicion', 'verbos'],
    tagKeywords: [],
  },
  {
    name: 'Phrases & Expression',
    description: 'Useful phrases, opinions, feelings, and communication',
    titleKeywords: ['phrases', 'expresar', 'opiniones', 'permisos', 'favores', 'sentimientos', 'teléfono', 'telefono', 'mensajes', 'transmitir', 'felicito', 'consejos', 'frases'],
    tagKeywords: ['phrases'],
  },
];

function matchCategory(note: Note): string {
  const titleLower = note.title.toLowerCase();
  const tagsLower = note.tags.map((t) => t.toLowerCase());

  for (const cat of CATEGORY_DEFS) {
    for (const kw of cat.titleKeywords) {
      if (titleLower.includes(kw.toLowerCase())) {
        return cat.name;
      }
    }
    for (const kw of cat.tagKeywords) {
      if (tagsLower.some((t) => t.includes(kw.toLowerCase()))) {
        return cat.name;
      }
    }
  }

  return 'Other';
}

let cachedCategories: Category[] | null = null;

export function getCategories(): Category[] {
  if (cachedCategories) return cachedCategories;

  const notes = getAllNotes();
  for (const note of notes) {
    note.category = matchCategory(note);
  }

  const categoryMap = new Map<string, Note[]>();
  for (const note of notes) {
    const existing = categoryMap.get(note.category) || [];
    existing.push(note);
    categoryMap.set(note.category, existing);
  }

  cachedCategories = CATEGORY_DEFS.map((def) => ({
    name: def.name,
    slug: def.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: def.description,
    notes: categoryMap.get(def.name) || [],
  }));

  const otherNotes = categoryMap.get('Other');
  if (otherNotes && otherNotes.length > 0) {
    cachedCategories.push({
      name: 'Other',
      slug: 'other',
      description: 'Uncategorized notes',
      notes: otherNotes,
    });
  }

  cachedCategories = cachedCategories.filter((c) => c.notes.length > 0);
  return cachedCategories;
}
