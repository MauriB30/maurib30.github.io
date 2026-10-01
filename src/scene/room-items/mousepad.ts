import type { Container } from 'pixi.js';
import imageUrl from '../../assets/room-items/mousepad-painted.webp';
import { addRasterItem, loadRasterItem } from '../geometry/raster-item';

const asset = await loadRasterItem(imageUrl);

export function drawPad(view: Container) {
  addRasterItem(view, asset, {
    x: 418.4078167101761,
    y: 264.4078167101761,
    width: 42.18436657964776,
    height: 21.59218328982388,
  });
}
