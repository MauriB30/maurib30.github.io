import { Container, Graphics } from 'pixi.js';
import { sceneViewport } from '../composition/sceneViewport';

export type Point = [number, number];
export const INK = 0x403349;
export const iso = (x: number, y: number, z = 0): Point => [
  Math.round(sceneViewport.originX + x - y),
  Math.round(sceneViewport.originY + (x + y) / 2 - z),
];

export function poly(g: Graphics, points: Point[], color: number, outline?: number) {
  g.poly(points.flat()).fill(color);
  if (outline !== undefined) g.stroke({ color: outline, width: 1 });
}
export function line(g: Graphics, points: Point[], color: number, width = 1) {
  g.moveTo(...points[0]!);
  for (const p of points.slice(1)) g.lineTo(...p);
  g.stroke({ color, width });
}
export function rect(
  g: Graphics,
  x: number,
  y: number,
  w: number,
  h: number,
  color: number,
) {
  g.rect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)).fill(color);
}
export function plane(
  g: Graphics,
  x: number,
  y: number,
  w: number,
  d: number,
  z: number,
  color: number,
  outline?: number,
  project: typeof iso = iso,
) {
  poly(
    g,
    [
      project(x, y, z),
      project(x + w, y, z),
      project(x + w, y + d, z),
      project(x, y + d, z),
    ],
    color,
    outline,
  );
}
export function box(
  g: Graphics,
  x: number,
  y: number,
  w: number,
  d: number,
  z: number,
  h: number,
  top: number,
  left: number,
  right: number,
  outline = INK,
  project: typeof iso = iso,
) {
  poly(
    g,
    [
      project(x, y + d, z),
      project(x + w, y + d, z),
      project(x + w, y + d, z + h),
      project(x, y + d, z + h),
    ],
    left,
    outline,
  );
  poly(
    g,
    [
      project(x + w, y, z),
      project(x + w, y + d, z),
      project(x + w, y + d, z + h),
      project(x + w, y, z + h),
    ],
    right,
    outline,
  );
  plane(g, x, y, w, d, z + h, top, outline, project);
}
export function wallPanel(
  g: Graphics,
  side: 'left' | 'right',
  along: number,
  z: number,
  w: number,
  h: number,
  color: number,
  outline?: number,
  inset = 1,
  project: typeof iso = iso,
) {
  const p = (a: number, b: number) =>
    side === 'left' ? project(inset, a, b) : project(a, inset, b);
  poly(
    g,
    [p(along, z), p(along + w, z), p(along + w, z + h), p(along, z + h)],
    color,
    outline,
  );
}
export function art(parent: Container) {
  const g = new Graphics();
  parent.addChild(g);
  return g;
}
export function shade(color: number, factor: number) {
  const r = Math.min(255, Math.round(((color >> 16) & 255) * factor));
  const g = Math.min(255, Math.round(((color >> 8) & 255) * factor));
  const b = Math.min(255, Math.round((color & 255) * factor));
  return (r << 16) | (g << 8) | b;
}
export function random(index: number) {
  return (((Math.sin(index * 127.1 + 311.7) * 43758.5453) % 1) + 1) % 1;
}
