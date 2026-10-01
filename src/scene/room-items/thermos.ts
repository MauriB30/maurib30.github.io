import type { Container } from 'pixi.js';
import imageUrl from '../../assets/room-items/thermos-painted.webp';
import { addRasterItem, loadRasterItem } from '../geometry/raster-item';

const asset = await loadRasterItem(imageUrl);

export function drawThermos(view: Container, x: number, y: number) {
  addRasterItem(view, asset, {
    x: x + -7.059640991377307,
    y: y + -39.58778525229246,
    width: 18.7833828446673,
    height: 43.58778525229246,
  });
}
