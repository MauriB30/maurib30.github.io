import type { Container } from 'pixi.js';
import imageUrl from '../../assets/room-items/mouse-painted.webp';
import { addRasterItem, loadRasterItem } from '../geometry/raster-item';

const asset = await loadRasterItem(imageUrl);

export function drawDeskMouse(view: Container) {
  addRasterItem(view, asset, {
    x: 430.33814629377,
    y: 267.44340253123005,
    width: 16.516978052618924,
    height: 11.218451174999927,
  });
}
