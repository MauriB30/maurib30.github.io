import type { PanelSectionId, Portfolio } from '../../types/portfolio';
import { ProfileNavigation } from '../molecules/ProfileNavigation';
import { AboutSection } from './AboutSection';
import { ContactSection } from './ContactSection';
import { ProjectsSection } from './ProjectsSection';
import { TechnologiesSection } from './TechnologiesSection';

interface ProfilePanelProps {
  portfolio: Portfolio;
  activeSection: PanelSectionId;
  onSelect: (section: PanelSectionId) => void;
}

export function ProfilePanel({ portfolio, activeSection, onSelect }: ProfilePanelProps) {
  const sections = [
    {
      id: 'about',
      title: 'Sobre mí',
      content: (
        <>
          <p className='profile-description'>{portfolio.intro}</p>
          <AboutSection portfolio={portfolio} onNavigate={onSelect} />
        </>
      ),
    },
    {
      id: 'projects',
      title: 'Proyectos',
      content: <ProjectsSection projects={portfolio.projects} />,
    },
    {
      id: 'technologies',
      title: 'Tecnologías',
      content: <TechnologiesSection groups={portfolio.technologies} />,
    },
    {
      id: 'contact',
      title: 'Hablemos.',
      content: <ContactSection portfolio={portfolio} />,
    },
  ];

  return (
    <section
      className='profile-panel'
      id='profile-panel'
      aria-labelledby='profile-name'
      tabIndex={-1}
    >
      <header className='profile-heading'>
        <p className='profile-greeting'>Hola, soy</p>
        <h1 id='profile-name'>{portfolio.name}.</h1>
        <p className='profile-role'>{portfolio.role}</p>
      </header>
      <ProfileNavigation active={activeSection} onSelect={onSelect} />
      {sections.map(({ id, title, content }) => (
        <div
          key={id}
          className='profile-content'
          id={'profile-section-' + id}
          role='tabpanel'
          aria-labelledby={'profile-tab-' + id}
          hidden={activeSection !== id}
          tabIndex={0}
        >
          {activeSection === id && (
            <>
              <h2>{title}</h2>
              {content}
            </>
          )}
        </div>
      ))}
    </section>
  );
}
