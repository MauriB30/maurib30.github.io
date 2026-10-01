import { useEffect, useRef, useState } from 'react';
import { navigationItems } from '../../data/room';
import { usePixiRoom } from '../../hooks/usePixiRoom';
import { useRoomSettings } from '../../hooks/useRoomSettings';
import { sceneViewport } from '../../scene/composition/sceneViewport';
import type { OpenSection } from '../../types/portfolio';
import type { RoomObjectHover, SceneObjectId } from '../../types/room';
import { RoomSpeechBubble } from '../atoms/RoomSpeechBubble';

interface RoomSceneProps {
  night: boolean;
  onOpen: OpenSection;
  onToggleLight: () => void;
}
export function RoomScene({ night, onOpen, onToggleLight }: RoomSceneProps) {
  const room = useRoomSettings();
  const [hover, setHover] = useState<RoomObjectHover | null>(null);
  const hovered = hover?.id ?? null;
  const destination = navigationItems.find((item) => item.id === hovered);
  const [visible, setVisible] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { rootMargin: '80px' },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);
  function activate(id: SceneObjectId) {
    if (
      id === 'projects' ||
      id === 'about' ||
      id === 'contact' ||
      id === 'technologies'
    ) {
      onOpen(id);
      return;
    }
    if (id === 'lamp') onToggleLight();
    room.interact(id);
  }
  const pixi = usePixiRoom(
    { settings: room.settings, night, paused: !visible },
    activate,
    setHover,
    hovered,
  );
  return (
    <figure className='room-experience' id='habitacion'>
      <div
        className='room-stage'
        style={{ aspectRatio: `${sceneViewport.width} / ${sceneViewport.height}` }}
        ref={stageRef}
        role='group'
        aria-label='Habitación interactiva'
      >
        <div ref={pixi.hostRef} className='pixi-room' />
        {pixi.status === 'ready' && hover && destination && (
          <RoomSpeechBubble
            label={destination.title}
            x={(hover.x / sceneViewport.width) * 100}
            y={(hover.y / sceneViewport.height) * 100}
          />
        )}
        {pixi.status !== 'ready' && (
          <div className='scene-fallback'>
            <p role='status'>
              {pixi.status === 'loading'
                ? 'Cargando la habitación…'
                : 'Podés recorrer el portafolio con los enlaces de navegación.'}
            </p>
          </div>
        )}
        <div className='room-keyboard-actions' aria-label='Acciones de la habitación'>
          <button type='button' onClick={() => activate('projects')}>
            Ver proyectos
          </button>
          <button type='button' onClick={() => activate('technologies')}>
            Ver tecnologías
          </button>
          <button type='button' onClick={() => activate('lamp')}>
            Cambiar iluminación
          </button>
          <button type='button' onClick={() => activate('window')}>
            Abrir o cerrar cortinas
          </button>
        </div>
      </div>
      <span className='sr-only' role='status'>
        {room.notice}
      </span>
    </figure>
  );
}
