import { ICoordinate } from "../../core/inputHandler/types"

export class AnimalModel {
    private _position: ICoordinate = { x: 0, y: 0 }
    private _isPickedUp: boolean = false

    get position() {
        return this._position
    }

    set position(position: ICoordinate) {
        this._position = position
    }

    get isPickedUp() {
        return this._isPickedUp
    }

    set isPickedUp(isPickedUp: boolean) {
        this._isPickedUp = isPickedUp
    }

}