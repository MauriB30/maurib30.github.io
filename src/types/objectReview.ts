import type { SceneObjectId } from './room';

export type ReviewObjectId =
  | Exclude<SceneObjectId, 'floor' | 'walls'>
  | 'keyboard'
  | 'mate'
  | 'thermos'
  | 'monitor'
  | 'pc-tower';

export interface ObjectReviewSettings {
  selected: ReviewObjectId;
  comparison: ReviewObjectId | 'none';
  zoom: 1 | 2 | 4;
  night: boolean;
  curtainsOpen: boolean;
  guides: boolean;
}

export interface ReviewObjectInfo {
  id: ReviewObjectId;
  name: string;
  roomId: SceneObjectId;
  source: string;
  checks: string[];
}
