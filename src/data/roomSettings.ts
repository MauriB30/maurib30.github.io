import type { RoomPalette, RoomSettings } from '../types/room';

export const roomPalette: RoomPalette = {
  wall: 0x9aac94,
  wallShade: 0x798f80,
  wallEdge: 0x4d655c,
};

export const defaultRoomSettings: RoomSettings = {
  curtainsOpen: true,
  animations: true,
};

export const roomStorageKey = 'portfolio-room-v1';

export function readRoomSettings(): RoomSettings {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(roomStorageKey) ?? 'null');
    if (!raw || typeof raw !== 'object') return { ...defaultRoomSettings };
    const value = raw as Record<string, unknown>;
    return {
      curtainsOpen: typeof value.curtainsOpen === 'boolean' ? value.curtainsOpen : true,
      animations: typeof value.animations === 'boolean' ? value.animations : true,
    };
  } catch {
    return { ...defaultRoomSettings };
  }
}
