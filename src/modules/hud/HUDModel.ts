export class HUDModel {
  private _score: number = 0;

  get score() {
    return this._score;
  }

  set score(amount: number) {
    this._score = amount;
  }
}
