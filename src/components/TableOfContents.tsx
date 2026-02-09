import { useState, useEffect } from 'react';

interface TocEntry {
  id: string;
  text: string;
  level: number;
}

interface Props {
  headings: TocEntry[];
}

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav>
      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
        On this page
      </div>
      <ul className="space-y-1 border-l border-slate-800 pl-3">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block py-0.5 text-[13px] leading-snug transition-colors ${
                level === 3 ? 'pl-3' : ''
              } ${
                activeId === id
                  ? 'text-blue-400'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
