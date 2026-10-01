import { Assets, Matrix, Point, Rectangle, Sprite, Texture } from 'pixi.js';
import contactBoardUrl from '../../assets/room-items/contact-board.webp';
import { art, iso, line } from '../geometry/pixel';
import type { Point as PixelPoint } from '../geometry/pixel';
import type { ObjectFactory } from '../types';

const sourceTexture = await Assets.load<Texture>(contactBoardUrl);
sourceTexture.source.scaleMode = 'nearest';

// Recortar márgenes de la textura sin modificar el PNG original.
const canvas = document.createElement('canvas');
canvas.width = sourceTexture.source.pixelWidth;
canvas.height = sourceTexture.source.pixelHeight;
const context = canvas.getContext('2d', { willReadFrequently: true });
if (!context) throw new Error('No se pudo preparar el corcho de contacto.');
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
if (right < left || bottom < top) throw new Error('El corcho de contacto está vacío.');
const frame = new Rectangle(left, top, right - left + 1, bottom - top + 1);
const texture = new Texture({ source: sourceTexture.source, frame });

export const drawContactBoard: ObjectFactory = (view) => {
  const width = 40;
  const height = 36;
  const [centerX, centerY] = iso(2, 147, 92);
  // El arte tiene una pendiente aproximada 1:3. Proyectarlo en esta pared 1:2
  // conserva las aristas verticales y el tamaño físico del panel, incluido su canto.
  const sourceSlope = 1 / 3;
  const scaleX = (width + 2) / frame.width;
  const scaleY = height / (frame.height - frame.width * sourceSlope);
  const shear = scaleY * sourceSlope - scaleX / 2;
  const transform = new Matrix(scaleX, shear, 0, scaleY, centerX, centerY);
  const sprite = new Sprite({ texture, roundPixels: true, eventMode: 'none' });
  sprite.anchor.set(0.5);
  sprite.setFromMatrix(transform);
  view.addChild(sprite);
  view.interactiveChildren = false;

  // Limpieza a escala nativa: conservar los pliegues finos al reducir el arte.
  const paperPoint = (sx: number, sy: number): PixelPoint => {
    const mapped = transform.apply({
      x: sx - frame.x - frame.width / 2,
      y: sy - frame.y - frame.height / 2,
    });
    return [Math.round(mapped.x), Math.round(mapped.y)];
  };
  const folds = art(view);
  folds.eventMode = 'none';
  line(
    folds,
    [paperPoint(326, 582), paperPoint(557, 745), paperPoint(807, 435)],
    0x9b907a,
  );
  line(folds, [paperPoint(329, 927), paperPoint(481, 751)], 0xb8ac93);
  line(folds, [paperPoint(668, 688), paperPoint(802, 771)], 0xb8ac93);

  // El área de contacto sigue los píxeles visibles incluso con la proyección local.
  const point = new Point();
  view.hitArea = {
    contains(px, py) {
      transform.applyInverse({ x: px, y: py }, point);
      const sx = Math.floor(point.x + frame.width / 2);
      const sy = Math.floor(point.y + frame.height / 2);
      if (sx < 0 || sy < 0 || sx >= frame.width || sy >= frame.height) return false;
      const offset = ((sy + frame.y) * canvas.width + sx + frame.x) * 4 + 3;
      return pixels[offset]! > alphaThreshold;
    },
  };
};
