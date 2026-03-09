export class EngineModel {
    private _animalsCount: number = 0;

    get animalsCount() {
        return this._animalsCount;
    }

    set animalsCount(animalsCount: number) {
        this._animalsCount = animalsCount;
    }

}