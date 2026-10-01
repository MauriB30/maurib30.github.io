import { useObjectReviewScene } from '../../hooks/useObjectReviewScene';
import type { ObjectReviewSettings } from '../../types/objectReview';

export function ObjectReviewCanvas({ settings }: { settings: ObjectReviewSettings }) {
  const { hostRef, status, exportPng } = useObjectReviewScene(settings);
  return (
    <section className='object-review-card' aria-labelledby='isolated-title'>
      <div className='object-review-card-heading'>
        <h2 id='isolated-title'>Objeto aislado</h2>
        <button type='button' onClick={exportPng} disabled={status !== 'ready'}>
          Guardar PNG
        </button>
      </div>
      <p>
        Izquierda: objeto elegido. Derecha: comparación. Ambos usan la misma escala; los
        apoyos se alinean.
      </p>
      <div
        className='object-review-scroll'
        tabIndex={0}
        role='region'
        aria-label='Vista ampliada de los objetos; desplazable si no entra en pantalla'
      >
        <div
          ref={hostRef}
          className='object-review-canvas'
          role='img'
          aria-label='Dibujo de los objetos seleccionados en pixel art'
        />
      </div>
      {status !== 'ready' && (
        <p role='status'>
          {status === 'loading'
            ? 'Cargando objetos…'
            : 'No se pudo cargar el visor. Revisá la consola del navegador.'}
        </p>
      )}
      <p className='object-review-legend'>
        Guías: límite del dibujo, punto de apoyo y ejes X / Y / Z. En piezas de pared se
        usa el borde inferior. La grilla marca cada 16 píxeles originales. Las animaciones
        quedan quietas.
      </p>
    </section>
  );
}
