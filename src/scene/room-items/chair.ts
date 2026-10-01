import imageUrl from '../../assets/room-items/chair-painted.webp';
import { addRasterItem, finishRasterItem, loadRasterItem } from '../geometry/raster-item';
import type { ObjectFactory } from '../types';

const asset = await loadRasterItem(imageUrl);

export const drawChair: ObjectFactory = (view) => {
  addRasterItem(view, asset, {
    x: 347.3185431651816,
    y: 261.3185431651816,
    width: 71.87904988008347,
    height: 92.63251335111352,
  });
  finishRasterItem(view);
};
