import { TechnologyIcon } from '../atoms/TechnologyIcon';

interface TechnologyBadgeProps {
  name: string;
  iconOnly?: boolean;
}

export function TechnologyBadge({ name, iconOnly = false }: TechnologyBadgeProps) {
  return (
    <span
      className={'technology-badge' + (iconOnly ? ' technology-badge-icon-only' : '')}
      tabIndex={iconOnly ? 0 : undefined}
      role={iconOnly ? 'img' : undefined}
      aria-label={iconOnly ? name : undefined}
    >
      <TechnologyIcon name={name} />
      {iconOnly ? (
        <span className='technology-tooltip' aria-hidden='true'>
          {name}
        </span>
      ) : (
        <span>{name}</span>
      )}
    </span>
  );
}
