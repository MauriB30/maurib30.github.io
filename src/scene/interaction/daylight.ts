import type { Container } from 'pixi.js';
import { windowLayout } from '../architecture/window';
import { art, iso, poly } from '../geometry/pixel';
import type { SceneContext } from '../types';

// Proyección de cada cristal al suelo. Los muebles se dibujan después y la ocluyen.
export function drawDaylight(view: Container, { curtains, night }: SceneContext) {
  const light = art(view);
  light.eventMode = 'none';
  light.alpha = 0.32;
  const { along, width, bottom, height } = windowLayout;
  const color = 0xf2d7a0;
  const floorPoint = (a: number, z: number) => iso(z * 0.8, a + z * 0.2, 1);
  let previous = -1;

  return () => {
    const opening = Math.round(curtains.value * 30) / 30;
    if (opening === previous) return;
    previous = opening;
    light.clear();
    light.visible = !night && opening > 0;
    if (night || !opening) return;

    const panelWidth = 41 - 26 * opening;
    const start = along - 11 + panelWidth;
    const end = along + width + 10 - panelWidth;
    const panes = [
      [along + 4, along + 29],
      [along + 32, along + width - 4],
    ];
    const rows = [
      [bottom + 4, bottom + 29],
      [bottom + 32, bottom + height - 4],
    ];

    for (const [left, right] of panes) {
      const a = Math.max(left!, start),
        b = Math.min(right!, end);
      if (b <= a) continue;
      for (const [low, high] of rows) {
        poly(
          light,
          [
            floorPoint(a, low!),
            floorPoint(b, low!),
            floorPoint(b, high!),
            floorPoint(a, high!),
          ],
          color,
        );
        // Pocos píxeles en el borde rompen la dureza del recorte, sin difuminar la escena.
        for (let z = low! + 2; z < high! - 2; z += 4) {
          const p = floorPoint(b, z);
          light.rect(p[0], p[1], 1, 1).fill({ color, alpha: 0.4 });
        }
      }
    }
  };
}
