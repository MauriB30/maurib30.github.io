import { Container, Polygon } from 'pixi.js';
import trimUrl from '../../assets/room-items/window-trim-painted.webp';
import curtainUrl from '../../assets/room-items/curtain-painted.webp';
import {
  addRasterItem,
  finishRasterItem,
  loadRasterItem,
  wallRasterTransform,
} from '../geometry/raster-item';
import { roomNightTint } from '../materials';
import { drawWindowView } from './window-view';
import { art, iso, line, wallPanel } from '../geometry/pixel';
import type { ObjectFactory } from '../types';

export const windowLayout = {
  along: 40,
  width: 61,
  bottom: 68,
  height: 66,
  inset: 2,
} as const;

const [trimAsset, curtainAsset] = await Promise.all([
  loadRasterItem(trimUrl),
  loadRasterItem(curtainUrl),
]);

export const drawWindow: ObjectFactory = (view, { curtains, night }) => {
  const backing = art(view);
  backing.tint = night ? roomNightTint : 0xffffff;
  const { along, width, bottom, height, inset } = windowLayout;
  const top = bottom + height;
  wallPanel(backing, 'left', along, bottom, width, height, 0x536554, 0x354b3c, inset);

  // El paisaje y los copos siguen siendo animados detrás de los cuatro huecos.
  const animateExterior = drawWindowView(
    view,
    {
      along: along + 3,
      bottom: bottom + 3,
      width: width - 6,
      height: height - 6,
      inset: inset + 1,
    },
    night,
  );
  const interior = new Container({ label: 'window-frame-and-curtains' });
  interior.tint = night ? roomNightTint : 0xffffff;
  view.addChild(interior);
  const trim = addRasterItem(interior, trimAsset, { x: 0, y: 0, width: 64, height: 70 });
  const [frameX, frameY] = iso(inset + 1, along + width + 1, top + 1);
  trim.setFromMatrix(wallRasterTransform(trimAsset, { x: frameX, y: frameY }, 64, 70));

  const rod = art(interior);
  line(
    rod,
    [iso(8, along - 15, top + 8), iso(8, along + width + 14, top + 8)],
    0x39433a,
    4,
  );
  line(
    rod,
    [iso(8, along - 15, top + 9), iso(8, along + width + 14, top + 9)],
    0x999784,
    2,
  );

  const cloth = new Container({ label: 'curtain-panels' });
  interior.addChild(cloth);
  const clothBottom = bottom - 8;
  const clothTop = top + 5;
  const panels = [0, 1].map(() =>
    addRasterItem(cloth, curtainAsset, {
      x: 0,
      y: 0,
      width: 15,
      height: clothTop - clothBottom,
    }),
  );
  let lastOpenness = Number.NaN;
  function updateCurtains() {
    if (lastOpenness === curtains.value) return;
    lastOpenness = curtains.value;
    const panelWidth = 41 - 26 * curtains.value;
    const starts = [along - 11, along + width + 10 - panelWidth];
    for (const [index, start] of starts.entries()) {
      const [x, y] = iso(8, start + panelWidth, clothTop);
      panels[index]!.setFromMatrix(
        wallRasterTransform(curtainAsset, { x, y }, panelWidth, clothTop - clothBottom),
      );
    }
  }
  updateCurtains();
  finishRasterItem(view);
  const rasterArea = view.hitArea!;
  const glassArea = new Polygon(
    [
      iso(inset, along, bottom),
      iso(inset, along + width, bottom),
      iso(inset, along + width, top),
      iso(inset, along, top),
    ].flat(),
  );
  // El vidrio también responde al clic, aunque los huecos del marco sean transparentes.
  view.hitArea = {
    contains(x, y) {
      return rasterArea.contains(x, y) || glassArea.contains(x, y);
    },
  };
  return (time) => {
    updateCurtains();
    animateExterior(time, curtains.value);
  };
};
