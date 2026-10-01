import type { Project } from '../../types/portfolio';
import { ProjectCard } from '../molecules/ProjectCard';

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <div className='projects-list'>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      {projects.length === 0 && (
        <p className='section-description'>
          Próximamente voy a compartir mis proyectos acá.
        </p>
      )}
    </div>
  );
}
