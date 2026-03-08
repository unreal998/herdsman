import { ICoordinate } from "../../core/inputHandler/types"

export class AnimalModel {
    private _position: ICoordinate = { x: 0, y: 0 }

    get position() {
        return this._position
    }

    set position(position: ICoordinate) {
        this._position = position
    }

}