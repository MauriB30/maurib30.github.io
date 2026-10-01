export type SceneObjectId =
  | 'walls'
  | 'floor'
  | 'door'
  | 'window'
  | 'radiator'
  | 'contact'
  | 'about'
  | 'bookcase'
  | 'reading-chair'
  | 'lamp'
  | 'wastebasket'
  | 'desk'
  | 'projects'
  | 'technologies'
  | 'chair'
  | 'mousepad'
  | 'mouse';

export interface RoomObjectHover {
  id: SceneObjectId;
  x: number;
  y: number;
}

export interface RoomSettings {
  curtainsOpen: boolean;
  animations: boolean;
}

export interface RoomPalette {
  wall: number;
  wallShade: number;
  wallEdge: number;
}
