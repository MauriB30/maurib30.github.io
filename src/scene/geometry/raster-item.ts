import { Assets, Container, Matrix, Point, Rectangle, Sprite, Texture } from 'pixi.js';

interface RasterAsset {
  texture: Texture;
  width: number;
  height: number;
  alpha: Uint8Array;
}
interface Placement {
  x: number;
  y: number;
  width: number;
  height: number;
}
const sprites = new WeakMap<Sprite, RasterAsset>();
const alphaThreshold = 16;

// Cargar una sola vez; las importaciones asíncronas esperan antes de crear la escena.
export async function loadRasterItem(url: string): Promise<RasterAsset> {
  const source = await Assets.load<Texture>(url);
  source.source.scaleMode = 'nearest';
  const canvas = document.createElement('canvas');
  canvas.width = source.source.pixelWidth;
  canvas.height = source.source.pixelHeight;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('No se pudo preparar un objeto de la habitación.');
  context.drawImage(source.source.resource as CanvasImageSource, 0, 0);
  const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
  let left = canvas.width,
    top = canvas.height,
    right = -1,
    bottom = -1;
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      if (data[(y * canvas.width + x) * 4 + 3]! <= alphaThreshold) continue;
      left = Math.min(left, x);
      top = Math.min(top, y);
      right = Math.max(right, x);
      bottom = Math.max(bottom, y);
    }
  }
  if (right < left) throw new Error('Un sprite de la habitación está vacío.');
  const frame = new Rectangle(left, top, right - left + 1, bottom - top + 1);
  const alpha = new Uint8Array(frame.width * frame.height);
  for (let y = 0; y < frame.height; y++) {
    for (let x = 0; x < frame.width; x++) {
      alpha[y * frame.width + x] = data[((top + y) * canvas.width + left + x) * 4 + 3]!;
    }
  }
  return {
    texture: new Texture({ source: source.source, frame }),
    width: frame.width,
    height: frame.height,
    alpha,
  };
}

// El tamaño corresponde al dibujo nativo de la escena, nunca al tamaño del PNG.
export function addRasterItem(view: Container, asset: RasterAsset, box: Placement) {
  const sprite = new Sprite({
    texture: asset.texture,
    roundPixels: true,
    eventMode: 'none',
  });
  sprite.position.set(box.x, box.y);
  sprite.scale.set(box.width / asset.width, box.height / asset.height);
  view.addChild(sprite);
  sprites.set(sprite, asset);
  return sprite;
}

// Las partes transparentes y los huecos entre piezas no bloquean otros objetos.
export function finishRasterItem(view: Container) {
  const parts: { sprite: Sprite; asset: RasterAsset }[] = [];
  function collect(container: Container) {
    for (const child of container.children) {
      if (child instanceof Sprite) {
        const asset = sprites.get(child);
        if (asset) parts.push({ sprite: child, asset });
      }
      collect(child);
    }
  }
  collect(view);
  const worldPoint = new Point();
  const localPoint = new Point();
  view.interactiveChildren = false;
  view.hitArea = {
    contains(x, y) {
      view.toGlobal({ x, y }, worldPoint);
      for (const { sprite, asset } of parts) {
        if (!sprite.visible) continue;
        sprite.toLocal(worldPoint, undefined, localPoint);
        const sx = Math.floor(localPoint.x + sprite.anchor.x * asset.width);
        const sy = Math.floor(localPoint.y + sprite.anchor.y * asset.height);
        if (sx < 0 || sy < 0 || sx >= asset.width || sy >= asset.height) continue;
        if (asset.alpha[sy * asset.width + sx]! > alphaThreshold) return true;
      }
      return false;
    },
  };
}

// Ajustar un plano vertical a la pendiente de la pared sin inclinar sus verticales.
export function wallRasterTransform(
  asset: RasterAsset,
  corner: { x: number; y: number },
  width: number,
  height: number,
  slope = -0.5,
) {
  function topAt(fraction: number) {
    const x = Math.floor((asset.width - 1) * fraction);
    for (let y = 0; y < asset.height; y++) {
      if (asset.alpha[y * asset.width + x]! > alphaThreshold) return y;
    }
    return 0;
  }
  const sourceSlope = (topAt(0.75) - topAt(0.25)) / (asset.width * 0.5);
  const sx = width / asset.width;
  const sy = height / (asset.height - Math.abs(sourceSlope) * asset.width);
  const shear = slope * sx - sourceSlope * sy;
  const sourceTopLeft = sourceSlope < 0 ? -sourceSlope * asset.width : 0;
  return new Matrix(sx, shear, 0, sy, corner.x, corner.y - sourceTopLeft * sy);
}
