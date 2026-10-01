import { useEffect, useRef, useState } from 'react';
import type { RoomSceneController, SceneState } from '../scene/createRoomScene';
import type { RoomObjectHover, SceneObjectId } from '../types/room';

export function usePixiRoom(
  state: SceneState,
  onActivate: (id: SceneObjectId) => void,
  onHover: (hover: RoomObjectHover | null) => void,
  highlight: SceneObjectId | null,
) {
  const hostRef = useRef<HTMLDivElement>(null);
  const controller = useRef<RoomSceneController | null>(null);
  const latest = useRef({ state, onActivate, onHover, highlight });
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  useEffect(() => {
    latest.current = { state, onActivate, onHover, highlight };
    controller.current?.setState(state);
    controller.current?.highlight(highlight);
  }, [state, onActivate, onHover, highlight]);
  useEffect(() => {
    let cancelled = false;
    const host = hostRef.current;
    if (!host) return;
    import('../scene/createRoomScene')
      .then(({ createRoomScene }) => {
        if (cancelled) return;
        return createRoomScene(host, {
          onActivate: (id) => {
            controller.current?.pulse(id);
            latest.current.onActivate(id);
          },
          onHover: (id) => latest.current.onHover(id),
        });
      })
      .then((scene) => {
        if (!scene) return;
        if (cancelled) {
          scene.destroy();
          return;
        }
        controller.current = scene;
        scene.setState(latest.current.state);
        scene.highlight(latest.current.highlight);
        setStatus('ready');
      })
      .catch((error) => {
        if (!cancelled) {
          console.error('No se pudo iniciar la habitación', error);
          setStatus('error');
        }
      });
    return () => {
      cancelled = true;
      controller.current?.destroy();
      controller.current = null;
    };
  }, []);
  return { hostRef, status };
}
