import type { Container, Graphics } from 'pixi.js';
import imageUrl from '../../assets/room-items/pc-tower-painted.webp';
import { addRasterItem, loadRasterItem } from '../geometry/raster-item';
import { iso, line, poly } from '../geometry/pixel';
import type { Point } from '../geometry/pixel';

const asset = await loadRasterItem(imageUrl);

// Carcasa y vidrio reciben ambiente; ventiladores y RAM emiten en otra capa.
export function drawPcTower(body: Container, emission: Graphics) {
  addRasterItem(body, asset, { x: 453, y: 221, width: 38, height: 56 });
  const front = (u: number, v: number) => iso(180 + u, 52, 55 + v);
  const side = (u: number, v: number) => iso(192, 30 + u, 55 + v);
  const ring = (
    project: (u: number, v: number) => Point,
    u: number,
    v: number,
    color: number,
  ) => {
    const points = Array.from({ length: 13 }, (_, i) => {
      const angle = (i * Math.PI) / 6;
      return project(u + Math.cos(angle) * 3.5, v + Math.sin(angle) * 3.5);
    });
    line(emission, points, color);
  };
  ring(front, 6, 7, 0x5aa0af);
  ring(front, 6, 16, 0x79b7ad);
  ring(front, 6, 25, 0x739ebc);
  ring(side, 10, 23, 0x609fad);
  for (const u of [16, 18]) {
    poly(
      emission,
      [side(u, 18), side(u + 1, 18), side(u + 1, 28), side(u, 28)],
      0x81b8b5,
    );
  }
  line(emission, [front(3, 32), front(5, 32)], 0x86c4c3);
}
