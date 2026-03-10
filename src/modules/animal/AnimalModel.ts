import { IAnimalModel } from './types';

export class AnimalModel implements IAnimalModel {
  private _isPickedUp: boolean = false;

  get isPickedUp() {
    return this._isPickedUp;
  }

  set isPickedUp(isPickedUp: boolean) {
    this._isPickedUp = isPickedUp;
  }
}
