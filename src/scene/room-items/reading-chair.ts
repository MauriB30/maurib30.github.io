import { Assets, Rectangle, Sprite, Texture } from 'pixi.js';
import compactChairUrl from '../../assets/room-items/reading-chair-compact.webp';
import { iso } from '../geometry/pixel';
import { workspaceLayout } from '../composition/workspaceLayout';
import type { ObjectFactory } from '../types';

// La importación asíncrona de la escena espera el arte antes de crear su renderer.
const sourceTexture = await Assets.load<Texture>(compactChairUrl);
sourceTexture.source.scaleMode = 'nearest';

// La imagen conserva sus píxeles. El marco descarta solo márgenes vacíos.
const canvas = document.createElement('canvas');
canvas.width = sourceTexture.source.pixelWidth;
canvas.height = sourceTexture.source.pixelHeight;
const context = canvas.getContext('2d', { willReadFrequently: true });
if (!context) throw new Error('No se pudo preparar el sprite del sillón.');
context.drawImage(sourceTexture.source.resource as CanvasImageSource, 0, 0);
const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
const alphaThreshold = 16;
let left = canvas.width;
let top = canvas.height;
let right = -1;
let bottom = -1;
for (let y = 0; y < canvas.height; y++) {
  for (let x = 0; x < canvas.width; x++) {
    if (pixels[(y * canvas.width + x) * 4 + 3]! <= alphaThreshold) continue;
    left = Math.min(left, x);
    right = Math.max(right, x);
    top = Math.min(top, y);
    bottom = Math.max(bottom, y);
  }
}
if (right < left || bottom < top) throw new Error('El sprite del sillón está vacío.');
const frame = new Rectangle(left, top, right - left + 1, bottom - top + 1);
const texture = new Texture({ source: sourceTexture.source, frame });

export const drawReadingChair: ObjectFactory = (view) => {
  const { x, y, width, depth } = workspaceLayout.readingChair;
  const [groundX, groundY] = iso(x + width / 2, y + depth / 2);
  const nativeWidth = width + depth - 6;
  const scale = nativeWidth / frame.width;
  // Frente de las patas dentro de la huella 52 × 52, igual al apoyo anterior.
  const footY = groundY + (width + depth) / 4 - 6;
  const sprite = new Sprite({ texture, roundPixels: true, eventMode: 'none' });
  sprite.anchor.set(0.5, 1);
  sprite.scale.set(scale);
  sprite.position.set(groundX, footY);
  view.addChild(sprite);
  view.interactiveChildren = false;

  // El clic sigue la silueta; los huecos y márgenes transparentes no tapan el cuarto.
  const minX = groundX - nativeWidth / 2;
  const minY = footY - frame.height * scale;
  view.hitArea = {
    contains(px, py) {
      const sx = Math.floor((px - minX) / scale);
      const sy = Math.floor((py - minY) / scale);
      if (sx < 0 || sy < 0 || sx >= frame.width || sy >= frame.height) return false;
      const offset = ((sy + frame.y) * canvas.width + sx + frame.x) * 4 + 3;
      return pixels[offset]! > alphaThreshold;
    },
  };
};
