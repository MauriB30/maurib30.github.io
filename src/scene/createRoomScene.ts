import { Application, Container, Graphics } from 'pixi.js';
import { roomPalette } from '../data/roomSettings';
import type { RoomObjectHover, RoomSettings, SceneObjectId } from '../types/room';
import { objectCatalog } from './composition/objectCatalog';
import { sceneViewport } from './composition/sceneViewport';
import { createCurtainMotion } from './interaction/curtainMotion';
import { createRoomLighting } from './interaction/lighting';
import { roomNightTint } from './materials';
import type { RoomNode, SceneContext } from './types';

export interface SceneState {
  settings: RoomSettings;
  night: boolean;
  paused: boolean;
}

interface SceneEvents {
  onActivate: (id: SceneObjectId) => void;
  onHover: (hover: RoomObjectHover | null) => void;
}

export async function createRoomScene(host: HTMLElement, events: SceneEvents) {
  const app = new Application();

  await app.init({
    width: sceneViewport.width,
    height: sceneViewport.height,
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
  app.ticker.maxFPS = 30;

  const root = new Container();
  const lights = createRoomLighting(app.renderer);

  const marker = new Graphics({ eventMode: 'none' })
    .poly([0, -4, 4, 0, 0, 4, -4, 0])
    .fill(0xffe6ad)
    .stroke({ color: 0x65506d, width: 1 });

  marker.visible = false;
  app.stage.addChild(root, lights.view, marker);

  const nodes = new Map<SceneObjectId, RoomNode>();
  const curtains = createCurtainMotion();

  let state: SceneState | undefined;
  let highlighted: SceneObjectId | null = null;
  let time = 0;
  let destroyed = false;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  function mark() {
    const node = highlighted ? nodes.get(highlighted) : undefined;

    marker.visible =
      !!node && !['projects', 'about', 'contact', 'technologies'].includes(node.id);

    if (!node) return;

    const bounds = node.view.getBounds();

    marker.position.set(
      Math.round(bounds.x + bounds.width / 2),
      Math.max(16, Math.round(bounds.y) - 9),
    );
  }

  function render() {
    if (destroyed) return;

    mark();
    app.render();
  }

  function canAnimate() {
    return (
      state?.settings.animations && !state.paused && !reduced.matches && !document.hidden
    );
  }

  function syncPlayback() {
    if (destroyed) return;

    if (reduced.matches) {
      curtains.finish();
    }

    for (const node of nodes.values()) node.animated?.(time);
    lights.animate(time);

    if (canAnimate()) {
      app.start();
    } else {
      app.stop();
      render();
    }
  }

  function setState(next: SceneState) {
    if (destroyed) return;

    const curtainChanged = state?.settings.curtainsOpen !== next.settings.curtainsOpen;

    curtains.setTarget(
      next.settings.curtainsOpen,
      !state || (curtainChanged && (!next.settings.animations || reduced.matches)),
    );

    state = next;

    const context: SceneContext = {
      settings: next.settings,
      night: next.night,
      curtains,
      palette: roomPalette,
    };

    for (const [index, definition] of objectCatalog.entries()) {
      const { id, draw } = definition;
      const revision = definition.revision?.(context) ?? 'static';
      const previous = nodes.get(id);

      const tint =
        next.night && definition.ambientTint !== false ? roomNightTint : 0xffffff;

      if (previous?.revision === revision) {
        previous.view.tint = tint;
        continue;
      }

      const view = new Container();
      const animated = draw(view, context);
      const bounds = view.getLocalBounds();
      const baseX = Math.round(bounds.x + bounds.width / 2);
      const baseY = Math.round(bounds.y + bounds.height);

      const offset = definition.offset ?? { x: 0, y: 0 };
      const positionedX = baseX + offset.x;
      const positionedY = baseY + offset.y;

      view.label = id;
      view.tint = tint;
      view.pivot.set(baseX, baseY);
      view.position.set(positionedX, positionedY);
      view.eventMode = definition.interactive === false ? 'none' : 'static';
      view.cursor = definition.interactive === false ? 'default' : 'pointer';

      view.on('pointertap', (event) => {
        event.stopPropagation();
        events.onActivate(id);
      });

      view.on('pointerover', () => {
        highlight(id);
        const bounds = view.getBounds();
        events.onHover({
          id,
          x: Math.round(bounds.x + bounds.width / 2),
          y: Math.max(20, Math.round(bounds.y) - 14),
        });
      });

      view.on('pointerout', () => {
        highlight(null);
        events.onHover(null);
      });

      previous?.view.destroy({ children: true, context: true });

      root.addChildAt(view, index);

      nodes.set(id, {
        id,
        view,
        revision,
        animated: animated || undefined,
        pulse: 0,
        baseX: positionedX,
        baseY: positionedY,
      });

      animated?.(time);
    }

    lights.update(context, time);
    syncPlayback();
    render();
  }

  function highlight(id: SceneObjectId | null) {
    if (highlighted === id) return;

    highlighted = id;
    render();
  }

  function pulse(id: SceneObjectId) {
    const node = nodes.get(id);

    if (node && canAnimate()) {
      node.pulse = 1;
    }

    render();
  }

  app.ticker.add((ticker) => {
    const delta = Math.min(ticker.deltaMS / 1000, 0.05);

    time += delta;
    curtains.advance(delta);

    for (const node of nodes.values()) {
      node.animated?.(time);
      node.pulse = Math.max(0, node.pulse - delta * 0.7);

      const bounce = Math.sin((1 - node.pulse) * Math.PI * 5) * node.pulse;

      node.view.y = node.baseY;

      if (node.id === 'chair') {
        node.view.rotation = bounce * 0.17;
      } else {
        node.view.rotation = 0;
      }

      node.view.scale.set(1);
    }

    lights.animate(time);
    mark();
  });

  document.addEventListener('visibilitychange', syncPlayback);
  reduced.addEventListener('change', syncPlayback);

  return {
    setState,
    highlight,
    pulse,

    destroy() {
      if (destroyed) return;

      destroyed = true;

      document.removeEventListener('visibilitychange', syncPlayback);
      reduced.removeEventListener('change', syncPlayback);

      app.stop();
      lights.destroy();

      app.stage
        .removeChildren()
        .forEach((child) => child.destroy({ children: true, context: true }));

      nodes.clear();
      app.destroy(true);
    },
  };
}

export type RoomSceneController = Awaited<ReturnType<typeof createRoomScene>>;
