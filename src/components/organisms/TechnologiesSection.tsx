import type { TechnologyGroup } from '../../types/portfolio';
import { TechnologyBadge } from '../molecules/TechnologyBadge';

export function TechnologiesSection({ groups }: { groups: TechnologyGroup[] }) {
  return (
    <div className='technology-groups'>
      {groups.map((group) => (
        <div className='technology-group' key={group.title}>
          <h3>{group.title}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={item}>
                <TechnologyBadge name={item} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
