export enum ENGINE_EVENTS {
  ADD_ANIMAL = 'ADD_ANIMAL',
  REMOVE_ANIMAL = 'REMOVE_ANIMAL',
}

export interface IEngineModel {
  animalsCount: number;
  animalsLimit: number;
  animalsSpawnInterval: number;
}
