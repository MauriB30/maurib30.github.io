import imageUrl from '../../assets/room-items/monitor-painted.webp';
import { addRasterItem, finishRasterItem, loadRasterItem } from '../geometry/raster-item';
import { art, wallPanel } from '../geometry/pixel';
import type { ObjectFactory } from '../types';
import { roomNightTint } from '../materials';

const asset = await loadRasterItem(imageUrl);

export const drawMonitor: ObjectFactory = (view, { night }) => {
  const body = addRasterItem(view, asset, {
    x: 406.8819660112501,
    y: 177.8819660112501,
    width: 64.23606797749983,
    height: 83.05581788313023,
  });
  body.tint = night ? roomNightTint : 0xffffff;
  const screen = art(view);
  wallPanel(screen, 'right', 125, 76, 50, 26, 0x304967, undefined, 43);
  wallPanel(screen, 'right', 125, 99, 50, 3, 0x3b5574, undefined, 43);
  wallPanel(screen, 'right', 125, 76, 12, 23, 0x293f5b, undefined, 43);
  // Ventana de trabajo con bloques de texto; detalles legibles a esta escala.
  for (const [x, color] of [
    [128, 0xdec59e],
    [131, 0x87b4b7],
    [134, 0x9faacf],
  ])
    wallPanel(screen, 'right', x!, 100, 1, 1, color!, undefined, 44);
  for (let row = 0; row < 5; row++) {
    wallPanel(screen, 'right', 128, 94 - row * 3, 2, 1, 0x7294ae, undefined, 44);
    wallPanel(
      screen,
      'right',
      132,
      94 - row * 3,
      row % 2 ? 3 : 2,
      1,
      0x9eb8c8,
      undefined,
      44,
    );
  }
  for (const [x, z, width, color] of [
    [141, 96, 16, 0xa7c4ce],
    [144, 93, 22, 0x809ebc],
    [144, 90, 12, 0xd5ba89],
    [147, 87, 23, 0xbbced6],
    [141, 84, 18, 0x83a5bf],
    [144, 81, 25, 0xc3d3d6],
  ])
    wallPanel(screen, 'right', x!, z!, width!, 1, color!, undefined, 44);
  wallPanel(screen, 'right', 126, 76, 48, 1, 0x536f8b, undefined, 44);

  const cursor = art(view);
  wallPanel(cursor, 'right', 171, 81, 1, 2, 0xdce5de, undefined, 44);
  finishRasterItem(view);
  return (time) => {
    cursor.visible = Math.floor(time * 1.5) % 2 === 0;
  };
};
