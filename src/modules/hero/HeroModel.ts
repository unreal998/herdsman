import { IHeroModel } from './types';

export class HeroModel implements IHeroModel {
  private _animalsLimit: number = 5;
  private _speed: number = 2;
  private _animals: string[] = [];

  get speed() {
    return this._speed;
  }

  get animals() {
    return this._animals;
  }

  set animals(animals: string[]) {
    this._animals = animals;
  }

  get animalsLimit() {
    return this._animalsLimit;
  }
}
