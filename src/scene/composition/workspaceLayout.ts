// Posiciones compartidas por muebles, sombras y luz del rincón de trabajo.
export const workspaceLayout = {
  bookcase: { x: 4, y: 212, width: 25, depth: 61, height: 112 },
  desk: { x: 58, y: -1, width: 134, depth: 55, top: 52 },
  // La boca queda a una unidad del zócalo; el cuerpo no invade el escritorio.
  wastebasket: { x: 203, y: 10, radius: 9, height: 27 },
  readingChair: { x: 3, y: 145, width: 52, depth: 52 },
  // La pantalla, más ancha que el pie, determina la distancia mínima a las paredes.
  floorLamp: {
    x: 12,
    y: 12,
    baseRadius: 7,
    shadeRadius: 11,
    shadeTopRadius: 5,
    shadeBottom: 73,
    shadeHeight: 19,
  },
} as const;
