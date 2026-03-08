export class HUDModel {
    private _score: number = 0

    get animalsAmount() {
        return this._score
    }

    set animalsAmount(amount: number) {
        this._score = amount
    }
}