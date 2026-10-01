import { useEffect, useRef, useState } from 'react';
import type { ObjectReviewSettings } from '../types/objectReview';
import type { ObjectReviewController } from '../scene/review/createObjectReviewScene';

export function useObjectReviewScene(settings: ObjectReviewSettings) {
  const hostRef = useRef<HTMLDivElement>(null);
  const controller = useRef<ObjectReviewController | null>(null);
  const latest = useRef(settings);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    latest.current = settings;
    controller.current?.setState(settings);
  }, [settings]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    import('../scene/review/createObjectReviewScene')
      .then(({ createObjectReviewScene }) => {
        if (cancelled) return;
        return createObjectReviewScene(host);
      })
      .then((scene) => {
        if (!scene) return;
        if (cancelled) {
          scene.destroy();
          return;
        }
        controller.current = scene;
        scene.setState(latest.current);
        setStatus('ready');
      })
      .catch((error) => {
        if (!cancelled) {
          console.error('No se pudo iniciar el visor', error);
          setStatus('error');
        }
      });
    return () => {
      cancelled = true;
      controller.current?.destroy();
      controller.current = null;
    };
  }, []);

  return {
    hostRef,
    status,
    exportPng: () => {
      const comparison =
        settings.comparison === 'none' ? '' : '-vs-' + settings.comparison;
      const state =
        (settings.night ? 'noche' : 'dia') +
        (settings.curtainsOpen ? '-abiertas' : '-cerradas');
      controller.current?.exportPng(
        'revision-' +
          settings.selected +
          comparison +
          '-' +
          state +
          '-' +
          settings.zoom +
          'x' +
          (settings.guides ? '-guias' : '') +
          '.png',
      );
    },
  };
}
