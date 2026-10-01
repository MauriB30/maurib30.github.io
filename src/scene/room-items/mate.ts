import type { Container } from 'pixi.js';
import imageUrl from '../../assets/room-items/mate-painted.webp';
import { addRasterItem, loadRasterItem } from '../geometry/raster-item';

const asset = await loadRasterItem(imageUrl);

export function drawMate(view: Container, x: number, y: number) {
  addRasterItem(view, asset, {
    x: x + -6.646544360216808,
    y: y + -26.08239220029239,
    width: 13.646544360216808,
    height: 29.08239220029239,
  });
}
