import type { KeyboardEvent } from 'react';
import type { PanelSectionId } from '../../types/portfolio';

const sections: { id: PanelSectionId; label: string }[] = [
  { id: 'about', label: 'Sobre mí' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'technologies', label: 'Tecnologías' },
  { id: 'contact', label: 'Contacto' },
];

interface ProfileNavigationProps {
  active: PanelSectionId;
  onSelect: (section: PanelSectionId) => void;
}

export function ProfileNavigation({ active, onSelect }: ProfileNavigationProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % sections.length;
    else if (event.key === 'ArrowLeft')
      next = (index + sections.length - 1) % sections.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = sections.length - 1;
    else return;

    event.preventDefault();
    const section = sections[next].id;
    onSelect(section);
    document.getElementById('profile-tab-' + section)?.focus();
  }

  return (
    <div
      className='profile-navigation'
      role='tablist'
      aria-label='Secciones del portafolio'
    >
      {sections.map(({ id, label }, index) => (
        <button
          key={id}
          type='button'
          role='tab'
          id={'profile-tab-' + id}
          aria-selected={active === id}
          aria-controls={'profile-section-' + id}
          tabIndex={active === id ? 0 : -1}
          onClick={() => onSelect(id)}
          onKeyDown={(event) => handleKeyDown(event, index)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
