import { ArrowUpRight, Code2 } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { Icon } from '../atoms/Icon';
import { TechnologyBadge } from './TechnologyBadge';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={'project-card' + (project.image ? '' : ' project-card-text')}>
      {project.image && (
        <div className='project-image'>
          <img
            src={project.image}
            alt={project.imageAlt ?? project.name}
            width={810}
            height={694}
            loading='lazy'
          />
        </div>
      )}
      <div className='project-copy'>
        <div className='project-meta'>
          <span>{project.category}</span>
          {project.status && <span className='project-status'>{project.status}</span>}
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        {project.technologies && (
          <ul className='technology-tags' aria-label='Tecnologías del proyecto'>
            {project.technologies.map((technology) => (
              <li key={technology}>
                <TechnologyBadge name={technology} iconOnly />
              </li>
            ))}
          </ul>
        )}
        {project.highlights && (
          <ul className='project-highlights' aria-label='Detalles del desarrollo'>
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}
        <div className='project-links'>
          {project.url && (
            <a
              href={project.url}
              target={project.url.startsWith('#') ? undefined : '_blank'}
              rel={project.url.startsWith('#') ? undefined : 'noreferrer'}
            >
              {project.url.startsWith('#') ? 'Explorar la habitación' : 'Ver proyecto'}
              <Icon icon={ArrowUpRight} size={17} />
            </a>
          )}
          {project.sourceUrl && (
            <a href={project.sourceUrl} target='_blank' rel='noreferrer'>
              <Icon icon={Code2} size={17} />
              Código
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
