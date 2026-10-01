import imageUrl from '../../assets/room-items/wastebasket-painted.webp';
import { addRasterItem, finishRasterItem, loadRasterItem } from '../geometry/raster-item';
import { iso } from '../geometry/pixel';
import { workspaceLayout } from '../composition/workspaceLayout';
import type { ObjectFactory } from '../types';

const asset = await loadRasterItem(imageUrl);

export const drawWastebasket: ObjectFactory = (view) => {
  const item = workspaceLayout.wastebasket;
  const [centerX, groundY] = iso(item.x, item.y);
  const width = item.radius * 3;
  const height = item.height + Math.round(item.radius * Math.SQRT2);
  const footY = groundY + Math.round((item.radius - 1.5) / Math.SQRT2);
  addRasterItem(view, asset, {
    x: centerX - width / 2,
    y: footY - height,
    width,
    height,
  });
  finishRasterItem(view);
};
