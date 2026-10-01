import imageUrl from '../../assets/room-items/technologies-painted.webp';
import { addRasterItem, finishRasterItem, loadRasterItem } from '../geometry/raster-item';
import { art, iso, line, wallPanel } from '../geometry/pixel';
import type { Point } from '../geometry/pixel';
import type { ObjectFactory } from '../types';

// Todos los trazos se dibujan sobre el mismo plano vertical de la pizarra.
const board = { along: 24, bottom: 84, width: 76, height: 46, inset: 3 };

const glyphs = {
  J: ['001', '001', '001', '101', '111'],
  S: ['111', '100', '111', '001', '111'],
  T: ['111', '010', '010', '010', '010'],
};

const asset = await loadRasterItem(imageUrl);

export const drawWhiteboard: ObjectFactory = (view) => {
  addRasterItem(view, asset, {
    x: 343.8819660112501,
    y: 89.04894348370485,
    width: 84.11803398874991,
    height: 88.95105651629515,
  });
  const g = art(view);
  const { along, bottom, inset } = board;
  const point = (u: number, v: number): Point => iso(along + u, inset + 1, bottom + v);
  const panel = (u: number, v: number, w: number, h: number, color: number) =>
    wallPanel(g, 'right', along + u, bottom + v, w, h, color, undefined, inset + 1);

  // Átomo de React: tres órbitas proyectadas, dibujadas con marcador azul.
  for (const angle of [0, Math.PI / 3, -Math.PI / 3]) {
    const orbit = Array.from({ length: 25 }, (_, index) => {
      const t = (index / 24) * Math.PI * 2;
      const u = 9 * Math.cos(t);
      const v = 3 * Math.sin(t);
      return point(
        16 + u * Math.cos(angle) - v * Math.sin(angle),
        28 + u * Math.sin(angle) + v * Math.cos(angle),
      );
    });
    line(g, orbit, 0x337d95);
  }
  panel(15, 27, 2, 2, 0x337d95);

  // JS y TS conservan su color y letras sencillas, legibles en pocos píxeles.
  function technologyTile(u: number, color: number, first: 'J' | 'T', ink: number) {
    panel(u, 21, 14, 14, color);
    for (const [index, letter] of [first, 'S' as const].entries()) {
      for (const [row, pixels] of glyphs[letter].entries()) {
        for (const [column, pixel] of [...pixels].entries()) {
          if (pixel === '1') panel(u + 4 + index * 4 + column, 23 + 4 - row, 1, 1, ink);
        }
      }
    }
  }
  technologyTile(33, 0xe2c44f, 'J', 0x393e33);
  technologyTile(54, 0x3879a1, 'T', 0xf4f7ef);

  // Un pequeño esquema une las herramientas, como un apunte de trabajo.
  line(g, [point(16, 16), point(16, 11), point(61, 11), point(61, 16)], 0x8c9c94);
  line(g, [point(40, 16), point(40, 11)], 0x8c9c94);
  panel(11, 16, 10, 1, 0x5e7a70);
  panel(36, 16, 8, 1, 0x5e7a70);
  panel(57, 16, 8, 1, 0x5e7a70);

  // Marcadores sobre la bandeja del sprite.
  line(
    g,
    [iso(along + 52, inset + 2, bottom + 1), iso(along + 60, inset + 2, bottom + 1)],
    0x3b7c95,
    2,
  );
  line(
    g,
    [iso(along + 63, inset + 2, bottom + 1), iso(along + 69, inset + 2, bottom + 1)],
    0x454d49,
    2,
  );
  finishRasterItem(view);
};
