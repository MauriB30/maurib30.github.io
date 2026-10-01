import { Application, Container, Graphics, Rectangle, Sprite } from 'pixi.js';
import type { Texture } from 'pixi.js';
import { roomPalette, defaultRoomSettings } from '../../data/roomSettings';
import type { ObjectReviewSettings, ReviewObjectId } from '../../types/objectReview';
import { roomNightTint } from '../materials';
import { getReviewDrawing } from './reviewCatalog';

interface ReviewAsset {
  texture: Texture;
  frame: Rectangle;
  anchor: [number, number];
}

export async function createObjectReviewScene(host: HTMLElement) {
  const app = new Application();
  await app.init({
    width: 360,
    height: 280,
    resolution: 1,
    backgroundAlpha: 0,
    antialias: false,
    autoStart: false,
    preference: 'webgl',
    powerPreference: 'low-power',
  });
  app.canvas.setAttribute('aria-hidden', 'true');
  app.canvas.style.imageRendering = 'pixelated';
  host.appendChild(app.canvas);
  const cache = new Map<string, ReviewAsset>();
  let destroyed = false;

  function asset(id: ReviewObjectId, settings: ObjectReviewSettings) {
    const key = id + ':' + settings.night + ':' + settings.curtainsOpen;
    const previous = cache.get(key);
    if (previous) return previous;
    const definition = getReviewDrawing(id);
    const drawing = new Container();
    try {
      const animate = definition.draw(drawing, {
        settings: {
          ...defaultRoomSettings,
          animations: false,
          curtainsOpen: settings.curtainsOpen,
        },
        palette: roomPalette,
        night: settings.night,
        curtains: { value: settings.curtainsOpen ? 1 : 0 },
      });
      animate?.(0);
      drawing.tint =
        settings.night && definition.receivesAmbient ? roomNightTint : 0xffffff;
      const bounds = drawing.getLocalBounds();
      const frame = new Rectangle(
        Math.floor(bounds.x) - 1,
        Math.floor(bounds.y) - 1,
        Math.ceil(bounds.maxX) - Math.floor(bounds.x) + 2,
        Math.ceil(bounds.maxY) - Math.floor(bounds.y) + 2,
      );
      const texture = app.renderer.generateTexture({
        target: drawing,
        frame,
        resolution: 1,
        antialias: false,
        textureSourceOptions: { scaleMode: 'nearest' },
      });
      const result: ReviewAsset = {
        texture,
        frame,
        anchor: definition.anchor ?? [
          Math.round(frame.x + frame.width / 2),
          Math.round(frame.y + frame.height),
        ],
      };
      cache.set(key, result);
      return result;
    } finally {
      drawing.destroy({ children: true, context: true });
    }
  }

  function setState(settings: ObjectReviewSettings) {
    if (destroyed) return;
    const assets = [asset(settings.selected, settings)];
    if (settings.comparison !== 'none') assets.push(asset(settings.comparison, settings));
    const zoom = settings.zoom;
    const margin = 32;
    const gap = 64;
    const above = Math.max(...assets.map((item) => item.anchor[1] - item.frame.y));
    const below = Math.max(
      0,
      ...assets.map((item) => item.frame.bottom - item.anchor[1]),
    );
    const contentWidth =
      assets.reduce((total, item) => total + item.frame.width * zoom, 0) +
      gap * (assets.length - 1);
    const width = Math.max(360, contentWidth + margin * 2);
    const height = Math.max(260, (above + below) * zoom + margin * 2);
    const baseline = Math.round((height - (above + below) * zoom) / 2 + above * zoom);
    app.stage
      .removeChildren()
      .forEach((child) => child.destroy({ children: true, context: true }));
    app.renderer.resize(width, height);

    if (settings.guides) {
      const grid = new Graphics();
      const step = 16 * zoom;
      for (let x = 0; x < width; x += step)
        grid.moveTo(x + 0.5, 0).lineTo(x + 0.5, height);
      for (let y = 0; y < height; y += step)
        grid.moveTo(0, y + 0.5).lineTo(width, y + 0.5);
      grid.stroke({ color: 0x758078, alpha: 0.16, width: 1 });
      grid
        .moveTo(0, baseline + 0.5)
        .lineTo(width, baseline + 0.5)
        .stroke({ color: 0xadb7a9, alpha: 0.45, width: 1 });
      app.stage.addChild(grid);
    }

    let left = Math.round((width - contentWidth) / 2);
    for (const item of assets) {
      const top = Math.round(baseline - (item.anchor[1] - item.frame.y) * zoom);
      const sprite = new Sprite({
        texture: item.texture,
        roundPixels: true,
        eventMode: 'none',
      });
      sprite.position.set(left, top);
      sprite.scale.set(zoom);
      app.stage.addChild(sprite);
      if (settings.guides) {
        const guides = new Graphics();
        guides
          .rect(left + 0.5, top + 0.5, item.frame.width * zoom, item.frame.height * zoom)
          .stroke({ color: 0xd4ae70, alpha: 0.65, width: 1 });
        const anchorX = Math.round(left + (item.anchor[0] - item.frame.x) * zoom);
        // Ejes de la proyección 2:1, sin alterar el dibujo.
        guides
          .moveTo(anchorX, baseline)
          .lineTo(anchorX + 12 * zoom, baseline + 6 * zoom)
          .stroke({ color: 0xe4a39a, width: 1 });
        guides
          .moveTo(anchorX, baseline)
          .lineTo(anchorX - 12 * zoom, baseline + 6 * zoom)
          .stroke({ color: 0x98c6ac, width: 1 });
        guides
          .moveTo(anchorX, baseline)
          .lineTo(anchorX, baseline - 14 * zoom)
          .stroke({ color: 0x9cbbdf, width: 1 });
        guides.rect(anchorX - 2, baseline - 2, 4, 4).fill(0xf1e0b4);
        app.stage.addChild(guides);
      }
      left += item.frame.width * zoom + gap;
    }
    app.render();
  }

  return {
    setState,
    exportPng(filename = 'revision-objeto.png') {
      if (destroyed) return;
      app.render();
      const link = document.createElement('a');
      link.href = app.canvas.toDataURL('image/png');
      link.download = filename;
      link.click();
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      app.stage
        .removeChildren()
        .forEach((child) => child.destroy({ children: true, context: true }));
      for (const item of cache.values()) item.texture.destroy(true);
      cache.clear();
      app.destroy(true);
    },
  };
}

export type ObjectReviewController = Awaited<ReturnType<typeof createObjectReviewScene>>;
