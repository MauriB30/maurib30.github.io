import { useMemo } from 'react';
import { defaultRoomSettings } from '../../data/roomSettings';
import { usePixiRoom } from '../../hooks/usePixiRoom';
import { sceneViewport } from '../../scene/composition/sceneViewport';
import type { ReviewObjectInfo, ObjectReviewSettings } from '../../types/objectReview';
import type { SceneState } from '../../scene/createRoomScene';

const ignore = () => {};
export function RoomContextPreview({
  settings,
  item,
}: {
  settings: ObjectReviewSettings;
  item: ReviewObjectInfo;
}) {
  const state = useMemo<SceneState>(
    () => ({
      settings: {
        ...defaultRoomSettings,
        curtainsOpen: settings.curtainsOpen,
        animations: false,
      },
      night: settings.night,
      paused: true,
    }),
    [settings.curtainsOpen, settings.night],
  );
  const { hostRef, status } = usePixiRoom(state, ignore, ignore, item.roomId);
  return (
    <section className='object-review-card' aria-labelledby='context-title'>
      <h2 id='context-title'>Dentro de la habitación</h2>
      <p>
        Revisá el apoyo, el espacio disponible y lo que se tapa. Acá se incluyen las luces
        y sombras de la escena completa.
      </p>
      <div
        ref={hostRef}
        className='object-review-room'
        style={{ aspectRatio: sceneViewport.width + ' / ' + sceneViewport.height }}
        role='img'
        aria-label='Habitación actual con los ajustes de revisión'
      />
      {status !== 'ready' && (
        <p role='status'>
          {status === 'loading'
            ? 'Cargando habitación…'
            : 'No se pudo cargar la habitación.'}
        </p>
      )}
      <p className='object-review-legend'>
        Ubicación del objeto:{' '}
        {item.roomId === 'projects'
          ? 'computadora'
          : item.roomId === 'desk'
            ? 'accesorios sobre el escritorio'
            : item.name}
        . Esta vista conserva las posiciones originales.
      </p>
    </section>
  );
}
