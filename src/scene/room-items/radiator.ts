import imageUrl from '../../assets/room-items/radiator-painted.webp';
import { addRasterItem, finishRasterItem, loadRasterItem } from '../geometry/raster-item';
import type { ObjectFactory } from '../types';

const asset = await loadRasterItem(imageUrl);

export const drawRadiator: ObjectFactory = (view) => {
  addRasterItem(view, asset, {
    x: 229,
    y: 177.81164022090465,
    width: 71.19658215109706,
    height: 72.23281605620238,
  });
  finishRasterItem(view);
};
