import type { OpenSection, Portfolio } from '../../types/portfolio';
import { BackgroundList } from '../molecules/BackgroundList';

export function AboutSection({
  portfolio,
  onNavigate,
}: {
  portfolio: Portfolio;
  onNavigate: OpenSection;
}) {
  return (
    <div className='about-content'>
      <p>{portfolio.note}</p>
      {portfolio.languages.map((language) => (
        <p key={language}>{language}</p>
      ))}
      <button
        className='portfolio-text-link'
        type='button'
        onClick={() => onNavigate('projects')}
      >
        Conocer mi trabajo
      </button>
      <BackgroundList title='Formación' entries={portfolio.education} />
      <BackgroundList title='Experiencia laboral' entries={portfolio.experience} />
    </div>
  );
}
