import type { ReactNode } from 'react';

export function ObjectReviewTemplate({
  controls,
  preview,
  context,
  guide,
}: {
  controls: ReactNode;
  preview: ReactNode;
  context: ReactNode;
  guide: ReactNode;
}) {
  return (
    <main className='object-review'>
      <header className='object-review-header'>
        <div>
          <p className='object-review-eyebrow'>Taller local · pixel art</p>
          <h1>Visor de objetos</h1>
          <p>
            Elegí una pieza, compará sus proporciones y revisala dentro de la habitación.
          </p>
        </div>
        <a href='/'>Volver al portafolio</a>
      </header>
      {controls}
      <div className='object-review-layout'>
        <div className='object-review-previews'>
          {preview}
          {context}
        </div>
        <aside
          className='object-review-guide'
          aria-label='Guía visual y criterios de revisión'
        >
          {guide}
        </aside>
      </div>
    </main>
  );
}
