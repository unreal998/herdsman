import { IEngineModel } from './types';

export class EngineModel implements IEngineModel {
  private _animalsCount: number = 0;
  private _animalsLimit: number = 12;
  private _animalsSpawnInterval: number = 3000;

  get animalsCount() {
    return this._animalsCount;
  }

  set animalsCount(animalsCount: number) {
    this._animalsCount = animalsCount;
  }

  get animalsLimit() {
    return this._animalsLimit;
  }

  get animalsSpawnInterval() {
    return this._animalsSpawnInterval;
  }
}
