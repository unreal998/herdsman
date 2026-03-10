import { IBaseView } from '../../core/baseModule/types';

export enum HUD_EVENTS {
  SCORE_UPDATED = 'SCORE_UPDATED',
}

export interface IHUDView extends IBaseView {
  updateScore: (score: number) => void;
}

export interface IHUDModel {
  score: number;
}
