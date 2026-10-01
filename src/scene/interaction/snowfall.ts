import type { Container } from 'pixi.js';
import { art, random, rect } from '../geometry/pixel';
import type { Point } from '../geometry/pixel';

interface SnowfallOptions {
  width: number;
  height: number;
  project: (u: number, v: number) => Point;
  night: boolean;
}

// Usa el reloj de la escena: pausa, pestaña oculta y movimiento reducido lo detienen.
export function createSnowfall(parent: Container, options: SnowfallOptions) {
  const { width, height, project, night } = options;
  const flakes = Array.from({ length: night ? 17 : 27 }, (_, index) => {
    const near = index % 3 === 0;
    const drawing = art(parent);
    const size = near && index % 2 === 0 ? 2 : 1;
    rect(drawing, 0, 0, size, size, night ? 0xd4e6ef : 0xf6fcff);
    drawing.alpha = near ? 0.95 : night ? 0.45 : 0.65;
    return {
      drawing,
      u: random(index + 151) * (width + 4) - 2,
      phase: random(index + 257) * (height + 4),
      drift: random(index + 359) * Math.PI * 2,
      speed: (near ? 6 : 3) + random(index + 467) * 2,
    };
  });

  return (time: number) => {
    for (const flake of flakes) {
      const v = height + 2 - ((flake.phase + time * flake.speed) % (height + 4));
      const u = flake.u + Math.sin(time * 0.45 + flake.drift) * 1.4;
      flake.drawing.position.set(...project(u, v));
    }
  };
}
