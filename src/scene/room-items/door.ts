import imageUrl from '../../assets/room-items/door-painted.webp';
import { addRasterItem, finishRasterItem, loadRasterItem } from '../geometry/raster-item';
import type { ObjectFactory } from '../types';

const asset = await loadRasterItem(imageUrl);

export const drawDoor: ObjectFactory = (view) => {
  addRasterItem(view, asset, {
    x: 184.81164022090465,
    y: 312.77946389882914,
    width: 61.3767195581907,
    height: 140.171592617466,
  });
  finishRasterItem(view);
};
