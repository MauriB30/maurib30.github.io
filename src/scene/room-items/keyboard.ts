import type { Container } from 'pixi.js';
import imageUrl from '../../assets/room-items/keyboard-painted.webp';
import { addRasterItem, loadRasterItem } from '../geometry/raster-item';

const asset = await loadRasterItem(imageUrl);

export function drawKeyboard(view: Container) {
  addRasterItem(view, asset, {
    x: 381.86966359838084,
    y: 245.8696635983808,
    width: 51.26067280323832,
    height: 28.081392917914314,
  });
}
