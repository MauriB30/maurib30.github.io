import type { ProfileEntry } from '../../types/portfolio';

interface BackgroundListProps {
  title: string;
  entries: ProfileEntry[];
}

export function BackgroundList({ title, entries }: BackgroundListProps) {
  return (
    <section className='profile-background' aria-label={title}>
      <h3>{title}</h3>
      <ul>
        {entries.map((entry) => (
          <li key={entry.title + entry.organization}>
            <h4>{entry.title}</h4>
            <p className='background-organization'>{entry.organization}</p>
            {entry.period && <p className='background-period'>{entry.period}</p>}
            {entry.description && <p>{entry.description}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
