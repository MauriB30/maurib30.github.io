import { useState } from 'react';
import baseline from '../assets/room-review/baseline-night.png';
import { ObjectReviewControls } from '../components/molecules/ObjectReviewControls';
import { ObjectReviewCanvas } from '../components/organisms/ObjectReviewCanvas';
import { RoomContextPreview } from '../components/organisms/RoomContextPreview';
import { ObjectReviewTemplate } from '../components/templates/ObjectReviewTemplate';
import { reviewObjects, reviewChecklist, roomReviewGuide } from '../data/objectReview';
import type { ObjectReviewSettings } from '../types/objectReview';
import '../styles/object-review.css';

export default function ObjectReviewPage() {
  const [settings, setSettings] = useState<ObjectReviewSettings>({
    selected: 'reading-chair',
    comparison: 'lamp',
    zoom: 2,
    night: false,
    curtainsOpen: true,
    guides: true,
  });
  const item = reviewObjects.find((entry) => entry.id === settings.selected)!;
  function update(patch: Partial<ObjectReviewSettings>) {
    setSettings((previous) => ({ ...previous, ...patch }));
  }
  return (
    <ObjectReviewTemplate
      controls={<ObjectReviewControls settings={settings} onChange={update} />}
      preview={<ObjectReviewCanvas settings={settings} />}
      context={<RoomContextPreview settings={settings} item={item} />}
      guide={
        <>
          <section className='object-review-card'>
            <h2>{item.name}</h2>
            <p className='object-review-source'>src/scene/{item.source}</p>
            <ul>
              {item.checks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
          </section>
          <section className='object-review-card'>
            <h2>Guía de materiales</h2>
            <ul className='object-review-swatches'>
              {roomReviewGuide.map((material) => (
                <li key={material.name}>
                  <span
                    className='object-review-swatch'
                    style={{ background: material.color }}
                    aria-hidden='true'
                  />
                  <div>
                    <strong>{material.name}</strong>
                    <p>{material.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section className='object-review-card'>
            <h2>Antes de terminar</h2>
            <ul>
              {reviewChecklist.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
            <p>
              Estos son criterios para inspeccionar; el visor no aprueba automáticamente
              el dibujo. Para animaciones, revisá también la interacción en el portafolio.
            </p>
          </section>
          <section className='object-review-card'>
            <h2>Referencia de partida</h2>
            <img
              src={baseline}
              width={584}
              height={500}
              alt='Habitación al comenzar el visor: paredes salvia, roble oscuro y sillón gris carbón.'
            />
            <p>
              Captura del 30/09/2026, de noche. Sirve para comparar cambios; no significa
              que todos los objetos estén terminados o aprobados.
            </p>
          </section>
        </>
      }
    />
  );
}
