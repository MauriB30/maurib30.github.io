import { Rectangle, Sprite, Texture } from 'pixi.js';
import imageUrl from '../../assets/room-items/lamp-painted.webp';
import { addRasterItem, finishRasterItem, loadRasterItem } from '../geometry/raster-item';
import { iso } from '../geometry/pixel';
import { workspaceLayout } from '../composition/workspaceLayout';
import { roomNightTint } from '../materials';
import type { ObjectFactory } from '../types';

const asset = await loadRasterItem(imageUrl);
// La pantalla ocupa el 31,5 % superior del dibujo; el recorte termina antes del poste.
const shadeTexture = new Texture({
  source: asset.texture.source,
  frame: new Rectangle(
    asset.texture.frame.x,
    asset.texture.frame.y,
    asset.width,
    Math.floor(asset.height * 0.315),
  ),
});

export const drawFloorLamp: ObjectFactory = (view, { night }) => {
  const item = workspaceLayout.floorLamp;
  const [centerX, groundY] = iso(item.x, item.y);
  const width = item.shadeRadius * 3;
  const height = item.shadeBottom + item.shadeHeight + 10;
  const footY = groundY + Math.round(item.baseRadius / Math.SQRT2);
  const body = addRasterItem(view, asset, {
    x: centerX - width / 2,
    y: footY - height,
    width,
    height,
  });
  body.tint = night ? roomNightTint : 0xffffff;

  if (night) {
    const shade = new Sprite({
      texture: shadeTexture,
      tint: 0xffe9b3,
      eventMode: 'none',
      roundPixels: true,
    });
    shade.position.copyFrom(body.position);
    shade.scale.copyFrom(body.scale);
    view.addChild(shade);
  }
  finishRasterItem(view);
};
