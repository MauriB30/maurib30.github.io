import { Container } from 'pixi.js';
import { finishRasterItem } from '../geometry/raster-item';
import { art } from '../geometry/pixel';
import { roomNightTint } from '../materials';
import type { ObjectFactory } from '../types';
import { drawMonitor } from './monitor';
import { drawPcTower } from './pc-tower';

export const drawComputer: ObjectFactory = (view, context) => {
  const animateMonitor = drawMonitor(view, context);
  const tower = new Container();
  view.addChild(tower);
  tower.tint = context.night ? roomNightTint : 0xffffff;
  const leds = art(view);
  drawPcTower(tower, leds);
  finishRasterItem(view);
  return animateMonitor;
};
