import { workspaceLayout } from '../composition/workspaceLayout';
import imageUrl from '../../assets/room-items/desk-painted.webp';
import { addRasterItem, finishRasterItem, loadRasterItem } from '../geometry/raster-item';
import { art, iso, plane } from '../geometry/pixel';
import type { ObjectFactory } from '../types';
import { drawKeyboard } from './keyboard';
import { drawMate } from './mate';
import { drawThermos } from './thermos';

const asset = await loadRasterItem(imageUrl);

export const drawDesk: ObjectFactory = (view, { night }) => {
  const item = workspaceLayout.desk;
  const backY = item.y + 28; // Compensación del offset compartido de composición.
  const [leftX] = iso(item.x, backY + item.depth);
  const [, topY] = iso(item.x, backY, item.top);
  addRasterItem(view, asset, {
    x: leftX - 1,
    y: topY - 1,
    width: item.width + item.depth + 2,
    height: Math.round(item.top + (item.width + item.depth) / 2 - 1.5),
  });
  if (night) {
    const reflection = art(view);
    reflection.alpha = 0.1;
    plane(reflection, 119, 46, 46, 21, 52, 0x789fa7);
  }
  const accessories = art(view);
  // Sombras de apoyo antes de dibujar los objetos.
  plane(accessories, 126, 61, 43, 16, 52, 0x493323);
  plane(accessories, 132, 36, 26, 21, 52, 0x503a29);
  plane(accessories, 171, 29, 17, 24, 52, 0x443023);
  plane(accessories, 112, 54, 10, 11, 52, 0x4b3526);

  drawKeyboard(accessories);
  drawThermos(accessories, ...iso(116, 58, 54));
  drawMate(accessories, ...iso(111, 70, 55));
  finishRasterItem(view);
};
