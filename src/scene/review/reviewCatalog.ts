import { Container } from 'pixi.js';
import { objectCatalog } from '../composition/objectCatalog';
import { workspaceLayout } from '../composition/workspaceLayout';
import { art, iso } from '../geometry/pixel';
import type { Point } from '../geometry/pixel';
import { roomNightTint } from '../materials';
import { drawKeyboard } from '../room-items/keyboard';
import { drawMate } from '../room-items/mate';
import { drawMonitor } from '../room-items/monitor';
import { drawPcTower } from '../room-items/pc-tower';
import { drawThermos } from '../room-items/thermos';
import type { ObjectFactory } from '../types';
import type { ReviewObjectId } from '../../types/objectReview';

const separateDrawings: Partial<Record<ReviewObjectId, ObjectFactory>> = {
  keyboard: (view) => drawKeyboard(view),
  mate: (view) => drawMate(view, ...iso(111, 70, 55)),
  thermos: (view) => drawThermos(view, ...iso(116, 58, 54)),
  monitor: drawMonitor,
  'pc-tower': (view, { night }) => {
    const body = new Container();
    view.addChild(body);
    body.tint = night ? roomNightTint : 0xffffff;
    drawPcTower(body, art(view));
  },
};

// Puntos del dibujo original: apoyo físico, o borde inferior en piezas de pared.
// No incluyen offsets de composición: el visor centra el dibujo sin mover la habitación.
const anchors: Partial<Record<ReviewObjectId, () => Point>> = {
  'reading-chair': () => {
    const item = workspaceLayout.readingChair;
    return iso(item.x + item.width / 2, item.y + item.depth / 2);
  },
  lamp: () => iso(workspaceLayout.floorLamp.x, workspaceLayout.floorLamp.y),
  bookcase: () => {
    const item = workspaceLayout.bookcase;
    return iso(item.x + item.width / 2, item.y + item.depth / 2);
  },
  desk: () => {
    const item = workspaceLayout.desk;
    return iso(item.x + item.width / 2, 54);
  },
  chair: () => iso(161, 106),
  mouse: () => iso(177, 66, 54),
  mousepad: () => iso(177, 66, 52),
  keyboard: () => iso(147, 68, 53),
  mate: () => iso(111, 70, 55),
  thermos: () => iso(116, 58, 54),
  monitor: () => iso(150, 44, 53),
  'pc-tower': () => iso(186, 41, 53),
  projects: () => iso(160, 44, 53),
  wastebasket: () => iso(workspaceLayout.wastebasket.x, workspaceLayout.wastebasket.y),
};

export function getReviewDrawing(id: ReviewObjectId) {
  const definition = objectCatalog.find((item) => item.id === id);
  const draw = separateDrawings[id] ?? definition?.draw;
  if (!draw) throw new Error('No hay dibujo para ' + id);
  return {
    draw,
    anchor: anchors[id]?.(),
    receivesAmbient:
      definition?.ambientTint !== false && id !== 'monitor' && id !== 'pc-tower',
  };
}
