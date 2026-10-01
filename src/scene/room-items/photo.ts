import imageUrl from '../../assets/room-items/about-painted.webp';
import { addRasterItem, finishRasterItem, loadRasterItem } from '../geometry/raster-item';
import type { ObjectFactory } from '../types';

const asset = await loadRasterItem(imageUrl);

export const drawPhoto: ObjectFactory = (view) => {
  addRasterItem(view, asset, {
    x: 482.06221610561965,
    y: 186.06221610561965,
    width: 24.87556778876069,
    height: 37.87556778876069,
  });
  finishRasterItem(view);
};
