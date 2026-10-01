import { finishRasterItem } from '../geometry/raster-item';
import type { ObjectFactory } from '../types';
import { drawDeskMouse } from './mouse';
import { drawPad } from './mousepad';

export const drawMousepad: ObjectFactory = (view) => {
  drawPad(view);
  finishRasterItem(view);
};

export const drawMouse: ObjectFactory = (view) => {
  drawDeskMouse(view);
  finishRasterItem(view);
};
