import { useState } from 'react';

interface NoteInfo {
  title: string;
  slug: string;
  category: string;
}

interface Props {
  notes: NoteInfo[];
  base?: string;
}

export default function SearchBar({ notes, base = '/' }: Props) {
  const [query, setQuery] = useState('');

  const filtered = query.length < 2
    ? []
    : notes.filter((n) =>
        n.title.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search notes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
      />

      {filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg z-50 max-h-72 overflow-y-auto shadow-xl">
          {filtered.map((note) => (
            <a
              key={note.slug}
              href={`${base}/${note.slug}`}
              className="block px-4 py-2.5 hover:bg-slate-700 transition-colors border-b border-slate-700/50 last:border-0 text-sm text-white"
            >
              {note.title}
              <span className="text-slate-500 text-xs ml-2">{note.category}</span>
            </a>
          ))}
        </div>
      )}

      {query.length >= 2 && filtered.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg p-3 z-50 text-center text-slate-500 text-sm">
          No results
        </div>
      )}
    </div>
  );
}
