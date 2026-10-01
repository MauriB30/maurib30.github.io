import { roomLayout } from '../architecture/room-layout';

// Mantener el mismo tamaño de píxel al encuadrar un recinto rectangular.
const margin = 28;
const wallRim = roomLayout.wallThickness * 2;
const originY = 206;

export const sceneViewport = {
  width: roomLayout.width + roomLayout.depth + (wallRim + margin) * 2,
  height:
    originY + (roomLayout.width + roomLayout.depth) / 2 + roomLayout.floorThickness + 26,
  originX: roomLayout.depth + wallRim + margin,
  originY,
} as const;
