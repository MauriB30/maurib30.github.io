import { art, box, iso, line, random, rect, shade, wallPanel } from '../geometry/pixel';
import type { ObjectFactory } from '../types';
import { roomLayout } from './room-layout';

export const drawWalls: ObjectFactory = (view, { palette: p }) => {
  const g = art(view);
  const { width, depth, wallHeight, wallThickness: thickness } = roomLayout;
  const finishHeight = wallHeight - 5;
  box(
    g,
    -thickness,
    -thickness,
    thickness,
    depth + thickness,
    0,
    wallHeight,
    p.wallEdge,
    shade(p.wallEdge, 0.85),
    p.wallShade,
    0x354c40,
  );
  box(
    g,
    0,
    -thickness,
    width,
    thickness,
    0,
    wallHeight,
    p.wallEdge,
    p.wall,
    p.wallEdge,
    0x354c40,
  );
  wallPanel(g, 'left', 0, 0, depth, finishHeight, p.wallShade, p.wallEdge, 0);
  wallPanel(g, 'right', 0, 0, width, finishHeight, p.wall, p.wallEdge, 0);

  // La pintura conserva el verde Salvia; la sombra se concentra en la esquina.
  for (let band = 0; band < 5; band++) {
    const shadow = art(view);
    shadow.alpha = 0.11 - band * 0.018;
    for (const side of ['left', 'right'] as const) {
      const length = side === 'left' ? depth : width;
      wallPanel(shadow, side, band * 5, 7, 5, finishHeight - 7, 0x273e30, undefined, 0);
      wallPanel(shadow, side, 25, 7 + band * 3, length - 25, 3, 0x304534, undefined, 0);
    }
  }
  const finish = art(view);
  const flecks = Math.round((width + depth) / 2);
  for (let i = 0; i < flecks; i++) {
    const along = random(i + 301);
    const z = 14 + random(i + 719) * (finishHeight - 20);
    const left = iso(0, 7 + along * (depth - 12), z);
    const right = iso(7 + along * (width - 12), 0, z);
    rect(finish, left[0], left[1], 1, 1, shade(p.wallShade, i % 3 ? 0.98 : 1.035));
    rect(finish, right[0], right[1], 1, 1, shade(p.wall, i % 3 ? 0.98 : 1.025));
  }
  wallPanel(finish, 'left', 0, 0, depth, 7, 0x566653, 0x3e5042, 1);
  wallPanel(finish, 'right', 0, 0, width, 7, 0x6b785f, 0x495b49, 1);
  line(finish, [iso(1, depth, 8), iso(1, 1, 8), iso(width, 1, 8)], 0xa8b498);
  line(
    finish,
    [iso(0, depth, finishHeight), iso(0, 0, finishHeight), iso(width, 0, finishHeight)],
    0xb2bea5,
  );
  line(finish, [iso(0, 0, 8), iso(0, 0, finishHeight)], 0x627861);

  wallPanel(finish, 'left', 111, 13, 6, 9, 0xc6cebf, 0x65755f);
  wallPanel(finish, 'left', 113, 16, 1, 3, 0x55664f);
  wallPanel(finish, 'left', 115, 16, 1, 3, 0x55664f);
};
