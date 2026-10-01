import imageUrl from '../../assets/room-items/bookcase-painted.webp';
import { addRasterItem, finishRasterItem, loadRasterItem } from '../geometry/raster-item';
import { iso } from '../geometry/pixel';
import { workspaceLayout } from '../composition/workspaceLayout';
import type { ObjectFactory } from '../types';

const asset = await loadRasterItem(imageUrl);

export const drawBookcase: ObjectFactory = (view) => {
  const item = workspaceLayout.bookcase;
  const [centerX, groundY] = iso(item.x + item.width / 2, item.y + item.depth / 2);
  const width = item.width + item.depth + 6;
  const height = item.height + (item.width + item.depth) / 2 + 3;
  const footY = groundY + (item.width + item.depth) / 4 - 1.5;
  addRasterItem(view, asset, {
    x: centerX - width / 2,
    y: footY - height,
    width,
    height,
  });
  finishRasterItem(view);
};
