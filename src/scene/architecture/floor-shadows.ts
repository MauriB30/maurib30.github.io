import type { Container } from 'pixi.js';
import { roomLayout } from './room-layout';
import { workspaceLayout } from '../composition/workspaceLayout';
import { art, iso, plane, poly } from '../geometry/pixel';

// Huellas en el piso: incluyen el desplazamiento del escritorio hacia la pared.
const supports = [
  { ...workspaceLayout.bookcase, reach: 18 },
  { ...workspaceLayout.readingChair, reach: 9 },
  {
    x: workspaceLayout.desk.x + 1,
    y: 2,
    width: workspaceLayout.desk.width - 4,
    depth: 48,
    reach: 8,
  },
];

export function drawFloorShadows(view: Container) {
  const cast = art(view);
  cast.alpha = 0.18;
  for (const { x, y, width, depth, reach } of supports) {
    const right = Math.min(roomLayout.width - 2, x + width + reach);
    const bottom = Math.min(roomLayout.depth - 2, y + depth + reach * 0.35);
    poly(
      cast,
      [
        iso(x, y + depth, 1),
        iso(x + width, y, 1),
        iso(right, y + reach * 0.35, 1),
        iso(right, bottom, 1),
        iso(x + reach, bottom, 1),
      ],
      0x10291f,
    );
  }

  const contact = art(view);
  contact.alpha = 0.26;
  for (const { x, y, width, depth } of supports)
    plane(contact, x - 1, Math.max(1, y - 1), width + 3, depth + 3, 1, 0x14271e);

  const ellipse = (x: number, y: number, rx: number, ry: number) =>
    Array.from({ length: 16 }, (_, i) => {
      const angle = (i * Math.PI) / 8;
      return iso(x + Math.cos(angle) * rx, y + Math.sin(angle) * ry, 1);
    });
  // Las bases redondas y la silla del escritorio no dejan rectángulos en el piso.
  const lamp = workspaceLayout.floorLamp;
  poly(
    contact,
    ellipse(lamp.x, lamp.y, lamp.baseRadius + 1, lamp.baseRadius + 1),
    0x10271e,
  );
  const bin = workspaceLayout.wastebasket;
  poly(contact, ellipse(bin.x, bin.y, bin.radius, bin.radius), 0x10271e);
  poly(contact, ellipse(161, 78, 22, 17), 0x10271e);
}
