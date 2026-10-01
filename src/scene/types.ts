import type { Container } from 'pixi.js';
import type { RoomPalette, RoomSettings, SceneObjectId } from '../types/room';

export interface SceneContext {
  settings: RoomSettings;
  palette: RoomPalette;
  night: boolean;
  curtains: { readonly value: number };
}
export interface RoomNode {
  id: SceneObjectId;
  view: Container;
  revision: string;
  animated?: (time: number) => void;
  pulse: number;
  baseX: number;
  baseY: number;
}
export type ObjectFactory = (
  view: Container,
  context: SceneContext,
) => ((time: number) => void) | void;
