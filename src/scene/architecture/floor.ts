import { art, box, iso, line, plane, random, rect, shade } from '../geometry/pixel';
import { drawDaylight } from '../interaction/daylight';
import type { ObjectFactory } from '../types';
import { drawFloorShadows } from './floor-shadows';
import { roomLayout } from './room-layout';

export const drawFloor: ObjectFactory = (view, context) => {
  const g = art(view);
  const carpet = 0x304e43;
  const { width, depth, floorThickness, wallThickness } = roomLayout;

  // La base sigue la huella de las paredes sin ampliar la alfombra.
  box(
    g,
    -wallThickness,
    -wallThickness,
    wallThickness,
    depth + wallThickness,
    -floorThickness,
    floorThickness,
    0x26382f,
    0x263d35,
    0x1e302b,
    0x26382f,
  );
  box(
    g,
    0,
    -wallThickness,
    width,
    wallThickness,
    -floorThickness,
    floorThickness,
    0x26382f,
    0x263d35,
    0x1e302b,
    0x26382f,
  );
  box(
    g,
    0,
    0,
    width,
    depth,
    -floorThickness,
    floorThickness,
    carpet,
    0x263d35,
    0x1e302b,
    0x26382f,
  );

  // La densidad de fibra se conserva al ampliar la superficie de alfombra.
  const fibers = Math.round((width * depth) / 25);
  for (let i = 0; i < fibers; i++) {
    const x = 2 + random(i * 3 + 11) * (width - 5);
    const y = 2 + random(i * 3 + 12) * (depth - 5);
    const [px, py] = iso(x, y, 0);
    const color = shade(carpet, i % 4 === 0 ? 1.09 : 0.94);
    rect(g, px, py, i % 5 === 0 ? 2 : 1, 1, color);
  }
  line(g, [iso(0, depth, 0), iso(width, depth, 0), iso(width, 0, 0)], 0x466052);
  line(
    g,
    [
      iso(0, depth, 2 - floorThickness),
      iso(width, depth, 2 - floorThickness),
      iso(width, 0, 2 - floorThickness),
    ],
    0x24382f,
  );

  const updateDaylight = drawDaylight(view, context);
  updateDaylight();
  drawFloorShadows(view);

  // Oclusión fina donde el zócalo apoya sobre la alfombra.
  const contact = art(view);
  contact.alpha = 0.22;
  plane(contact, 1, 1, 2, depth - 1, 0, 0x14271f);
  plane(contact, 3, 1, width - 3, 2, 0, 0x14271f);
  return updateDaylight;
};
