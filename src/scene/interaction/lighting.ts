import type { Renderer } from 'pixi.js';
import { Container, Graphics, Matrix, Rectangle, Sprite } from 'pixi.js';
import type { SceneContext } from '../types';
import { windowLayout } from '../architecture/window';
import { iso, wallPanel } from '../geometry/pixel';
import { roomLayout } from '../architecture/room-layout';
import { workspaceLayout } from '../composition/workspaceLayout';

// One small radial texture supplies all light sources. No full-scene blur/filter.
export function createRoomLighting(renderer: Renderer) {
  const drawing = new Graphics();
  for (let radius = 32; radius > 0; radius--)
    drawing
      .circle(0, 0, radius)
      .fill({ color: 0xffffff, alpha: 0.08 * (1 - radius / 40) });
  const texture = renderer.generateTexture({
    target: drawing,
    frame: new Rectangle(-32, -32, 64, 64),
    resolution: 1,
    antialias: false,
    textureSourceOptions: { scaleMode: 'nearest' },
  });
  drawing.destroy({ context: true });
  const view = new Container({ eventMode: 'none', interactiveChildren: false });
  function light(x: number, y: number, width: number, height: number, color: number) {
    const sprite = new Sprite({
      texture,
      tint: color,
      blendMode: 'screen',
      eventMode: 'none',
    });
    sprite.anchor.set(0.5);
    sprite.position.set(x, y);
    sprite.width = width;
    sprite.height = height;
    view.addChild(sprite);
    return sprite;
  }
  const windowCenter = iso(
    windowLayout.inset + 3,
    windowLayout.along + windowLayout.width / 2,
    windowLayout.bottom + windowLayout.height / 2,
  );
  const windowLight = light(...windowCenter, 96, windowLayout.height + 36, 0xbeddef);
  const lamp = workspaceLayout.floorLamp;
  const shadeCenter = lamp.shadeBottom + lamp.shadeHeight / 2;
  // Cada halo sigue el plano de su pared y queda dentro del recinto.
  const lampWalls = (['left', 'right'] as const).map((side) => {
    const [x, y] =
      side === 'left' ? iso(0, lamp.y, shadeCenter) : iso(lamp.x, 0, shadeCenter);
    const wall = light(x, y, 104, 108, 0xffd49a);
    const scaleX = 104 / 64;
    wall.setFromMatrix(
      new Matrix(scaleX, (side === 'left' ? -0.5 : 0.5) * scaleX, 0, 108 / 64, x, y),
    );
    const mask = new Graphics({ eventMode: 'none' });
    wallPanel(
      mask,
      side,
      0,
      7,
      side === 'left' ? roomLayout.depth : roomLayout.width,
      roomLayout.wallHeight - 12,
      0xffffff,
      undefined,
      0,
    );
    view.addChild(mask);
    wall.mask = mask;
    return wall;
  });
  const lampPool = light(...iso(lamp.x + 6, lamp.y + 6, 1), 44, 24, 0xffd9a6);
  const bulb = light(...iso(lamp.x, lamp.y, shadeCenter), 26, 26, 0xffe9bd);
  const monitor = light(...iso(142, 29, 64.5), 84, 74, 0x9edce6);
  let night = false;
  let curtains: SceneContext['curtains'] | undefined;

  function animate(time: number) {
    const openness = curtains?.value ?? 1;
    windowLight.visible = openness > 0;
    windowLight.alpha = (night ? 0.06 : 0.13) * openness;
    const pulse = 0.96 + Math.sin(time * 4.5) * 0.04;
    monitor.alpha = (night ? 0.34 : 0.11) * pulse;
  }
  return {
    view,
    update(context: SceneContext, time: number) {
      night = context.night;
      curtains = context.curtains;
      for (const wall of lampWalls) {
        wall.visible = night;
        wall.alpha = 0.42;
      }
      lampPool.visible = bulb.visible = night;
      lampPool.alpha = 0.18;
      bulb.alpha = 0.2;
      animate(time);
    },
    animate,
    destroy() {
      view.destroy({ children: true });
      texture.destroy(true);
    },
  };
}
