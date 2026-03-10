export class EngineModel {
    private _animalsCount: number = 0;
    private _animalsLimit: number = 12;

    get animalsCount() {
        return this._animalsCount;
    }

    set animalsCount(animalsCount: number) {
        this._animalsCount = animalsCount;
    }

    get animalsLimit() {
        return this._animalsLimit;
    }

}