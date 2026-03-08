import type { ICoordinate } from "../../core/inputHandler/types"

export class HeroModel {

  private _position: ICoordinate = { x: 150, y: 320 }
  private _target: ICoordinate = { x: 150, y: 320 }
  private _speed: number = 0.1

  get speed() {
    return this._speed
  }

  set target(target: ICoordinate) {
    this._target = target
  }

  get target() {
    return this._target
  }

  set position(position: ICoordinate) {
    this._position = position
  }

  get position() {
    return this._position
  }

}