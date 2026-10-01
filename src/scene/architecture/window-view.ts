import { Container, type Graphics } from 'pixi.js';
import { art, iso, poly, random, rect } from '../geometry/pixel';
import type { Point } from '../geometry/pixel';
import { createSnowfall } from '../interaction/snowfall';

interface WindowOpening {
  along: number;
  bottom: number;
  width: number;
  height: number;
  inset: number;
}

export function drawWindowView(
  parent: Container,
  opening: WindowOpening,
  night: boolean,
) {
  const { along, bottom, width, height, inset } = opening;
  const project = (u: number, v: number) => iso(inset, along + u, bottom + v);
  const exterior = new Container({ label: 'window-exterior', eventMode: 'none' });
  parent.addChild(exterior);

  // El recorte incluye paisaje y partículas; marco y cortinas se dibujan después.
  const clip = art(parent);
  poly(
    clip,
    [project(0, 0), project(width, 0), project(width, height), project(0, height)],
    0xffffff,
  );
  exterior.mask = clip;
  const sky = art(exterior);
  const patch = (points: Point[], color: number) =>
    poly(
      sky,
      points.map(([u, v]) => project(u, v)),
      color,
    );
  const colors = night
    ? [0x30475e, 0x253b53, 0x1c2e47, 0x16243a]
    : [0xd6e5e5, 0xc3d8dd, 0xadc9d4, 0x94b5c8];
  for (let band = 0; band < colors.length; band++) {
    const low = (band * height) / colors.length;
    const high = ((band + 1) * height) / colors.length;
    patch(
      [
        [0, low],
        [width, low],
        [width, high],
        [0, high],
      ],
      colors[band]!,
    );
  }

  const stars: { drawing: Graphics; phase: number }[] = [];
  if (night) {
    // Luna creciente de siete píxeles, con un contorno escalonado.
    const moon = art(exterior);
    const [mx, my] = project(13, height - 12);
    const rows = ['  ##  ', ' ##   ', '###   ', '###   ', '####  ', ' #### ', '  ### '];
    rows.forEach((row, y) =>
      [...row].forEach((pixel, x) => {
        if (pixel === '#') rect(moon, mx + x - 3, my + y - 3, 1, 1, 0xe5f2eb);
      }),
    );
    for (let i = 0; i < 11; i++) {
      const u = 3 + random(i + 51) * (width - 6);
      const v = 31 + random(i + 73) * (height - 34);
      if (Math.abs(u - 13) < 7 && Math.abs(v - (height - 12)) < 7) continue;
      const star = art(exterior);
      star.position.set(...project(u, v));
      rect(star, 0, 0, 1, 1, 0xcbdfee);
      if (i === 2) {
        rect(star, -1, 0, 3, 1, 0xa7c4dc);
        rect(star, 0, -1, 1, 3, 0xa7c4dc);
        rect(star, 0, 0, 1, 1, 0xe8f3f5);
      }
      stars.push({ drawing: star, phase: i * 1.7 });
    }
  }

  // Lomas lejanas y nieve en primer plano, con la misma distribución de día y noche.
  const landscape = art(exterior);
  const terrain = (points: Point[], color: number) =>
    poly(
      landscape,
      points.map(([u, v]) => project(u, v)),
      color,
    );
  terrain(
    [
      [0, 18],
      [7, 22],
      [16, 19],
      [26, 24],
      [36, 20],
      [46, 24],
      [width, 21],
      [width, 0],
      [0, 0],
    ],
    night ? 0x30495e : 0xb0c9d0,
  );
  terrain(
    [
      [0, 10],
      [10, 13],
      [22, 10],
      [33, 14],
      [43, 12],
      [width, 16],
      [width, 0],
      [0, 0],
    ],
    night ? 0x547280 : 0xe2eeeb,
  );
  for (const [u, base, h] of [
    [6, 10, 16],
    [47, 13, 13],
  ]) {
    terrain(
      [
        [u!, base! + h!],
        [u! - 3, base! + 7],
        [u! - 1, base! + 7],
        [u! - 5, base! + 2],
        [u! + 5, base! + 2],
        [u! + 1, base! + 7],
        [u! + 3, base! + 7],
      ],
      night ? 0x243e4d : 0x708f98,
    );
    terrain(
      [
        [u!, base! + h!],
        [u! - 2, base! + 9],
        [u! + 2, base! + 9],
      ],
      night ? 0x7b99a5 : 0xeaf3ef,
    );
  }
  // Una casita distante da escala al paisaje; sus ventanas cálidas aparecen de noche.
  terrain(
    [
      [27, 6],
      [40, 6],
      [40, 15],
      [27, 15],
    ],
    night ? 0x263b49 : 0x8aa0a7,
  );
  terrain(
    [
      [25, 15],
      [33, 22],
      [42, 15],
    ],
    night ? 0x8ea8b4 : 0xf0f7f2,
  );
  for (const u of [29, 35]) {
    terrain(
      [
        [u, 9],
        [u + 2, 9],
        [u + 2, 12],
        [u, 12],
      ],
      night ? 0xe2ba7c : 0x566f80,
    );
  }

  const snowfall = new Container({ label: 'window-snowfall', eventMode: 'none' });
  exterior.addChild(snowfall);
  const animateSnow = createSnowfall(snowfall, { width, height, project, night });
  animateSnow(0);
  return (time: number, openness: number) => {
    exterior.visible = openness > 0;
    if (!exterior.visible) return;
    animateSnow(time);
    for (const star of stars) {
      star.drawing.alpha = 0.7 + Math.sin(time * 0.7 + star.phase) * 0.15;
    }
  };
}
