import { IBaseView } from '../../core/baseModule/types';

export enum HERO_EVENTS {
  MOVE = 'MOVE',
  PICK_UP_ANIMAL_REQUEST = 'PICK_UP_ANIMAL_REQUEST',
  PICK_UP_ANIMAL_APPROVED = 'PICK_UP_ANIMAL_APPROVED',
}

export interface IHeroView extends IBaseView {
  animalCountUpdated: (text: string) => void;
  animationsReady: boolean;
}

export interface IHeroModel {
  animals: string[];
  readonly animalsLimit: number;
  readonly speed: number;
}
