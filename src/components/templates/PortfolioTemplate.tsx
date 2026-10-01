import type { ReactNode } from 'react';

interface PortfolioTemplateProps {
  night: boolean;
  room: ReactNode;
  profile: ReactNode;
}

export function PortfolioTemplate({ night, room, profile }: PortfolioTemplateProps) {
  return (
    <div className='portfolio' data-theme={night ? 'day' : 'night'}>
      <a href='#profile-panel' className='skip-link'>
        Ir a mi presentación
      </a>
      <main className='portfolio-workspace'>
        <div className='workspace-room'>{room}</div>
        {profile}
      </main>
    </div>
  );
}
