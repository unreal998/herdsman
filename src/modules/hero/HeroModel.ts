export class HeroModel {
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
