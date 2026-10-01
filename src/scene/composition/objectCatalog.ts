import type { SceneObjectId } from '../../types/room';
import { drawBoard, drawPhoto } from '../architecture/architecture';
import { drawFloor } from '../architecture/floor';
import { drawWalls } from '../architecture/walls';
import { drawWindow } from '../architecture/window';
import { drawRadiator } from '../room-items/radiator';
import { drawMouse, drawMousepad } from '../room-items/desk-accessories';
import { drawComputer } from '../room-items/electronics';
import { drawChair, drawDesk } from '../room-items/furniture';
import { drawBookcase } from '../room-items/bookcase';
import { drawWastebasket } from '../room-items/wastebasket';
import { drawReadingChair } from '../room-items/reading-chair';
import { drawFloorLamp } from '../room-items/floor-lamp';
import { drawWhiteboard } from '../room-items/whiteboard';
import { drawDoor } from '../room-items/door';
import type { ObjectFactory, SceneContext } from '../types';

interface ObjectDefinition {
  id: SceneObjectId;
  draw: ObjectFactory;
  revision?: (context: SceneContext) => string;
  interactive?: boolean;
  // False para objetos que separan superficies interiores y luz propia en su propio dibujo.
  ambientTint?: boolean;
  offset?: {
    x: number;
    y: number;
  };
}

const deskAreaOffset = {
  x: 28,
  y: -14,
};

const wallArtOffset = {
  x: 0,
  y: -22,
};

export const objectCatalog: ObjectDefinition[] = [
  {
    id: 'floor',
    draw: drawFloor,
    revision: ({ night }) => 'compact-lamp-lounge-floor-v8:' + night,
  },
  { id: 'walls', draw: drawWalls, interactive: false },
  {
    id: 'radiator',
    draw: drawRadiator,
    revision: () => 'white-radiator-depth-v2',
    interactive: false,
  },
  {
    id: 'window',
    draw: drawWindow,
    ambientTint: false,
    revision: ({ night }) => 'winter-window-v4:' + night,
  },
  { id: 'contact', draw: drawBoard, revision: () => 'contact-envelope-board-raster-v5' },
  {
    id: 'about',
    draw: drawPhoto,
    offset: wallArtOffset,
  },
  {
    id: 'technologies',
    draw: drawWhiteboard,
  },
  {
    id: 'lamp',
    draw: drawFloorLamp,
    ambientTint: false,
    revision: ({ night }) => 'compact-white-shade-lamp-v4:' + night,
  },
  {
    id: 'reading-chair',
    draw: drawReadingChair,
    revision: () => 'compact-reading-chair-raster-v5',
  },
  {
    id: 'bookcase',
    draw: drawBookcase,
    revision: () => 'left-wall-bookcase-v2',
  },
  {
    id: 'desk',
    draw: drawDesk,
    revision: ({ night }) => 'extended-oak-desk-v8:' + night,
    offset: deskAreaOffset,
  },
  {
    id: 'mousepad',
    draw: drawMousepad,
    revision: () => 'large-stitched-pad-v3',
    interactive: false,
    offset: deskAreaOffset,
  },
  {
    id: 'mouse',
    draw: drawMouse,
    revision: () => 'white-mouse-v3',
    interactive: false,
    offset: deskAreaOffset,
  },
  {
    id: 'projects',
    draw: drawComputer,
    revision: ({ night }) => 'emissive-pc-v4:' + night,
    ambientTint: false,
    // Ocho unidades a la izquierda, conservando la proyección isométrica.
    offset: { x: deskAreaOffset.x - 8, y: deskAreaOffset.y - 4 },
  },
  {
    id: 'wastebasket',
    draw: drawWastebasket,
    revision: () => 'wall-side-silver-wastebasket-v3',
  },
  {
    id: 'chair',
    draw: drawChair,
    revision: () => 'black',
    offset: deskAreaOffset,
  },
  {
    id: 'door',
    draw: drawDoor,
    revision: () => 'oak-panelled-door-v2',
    interactive: false,
  },
];
