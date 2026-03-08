import { Container, Graphics } from "pixi.js"
import { ICoordinate } from "./types"
import EventBus from "../../core/EventBus"
import { Direction, INPUT_EVENTS } from "../../core/inputHandler/types";

export class HeroView {

  public readonly root = new Container()
  public readonly hero = new Graphics()
  private onDirectionChange: (direction: Direction) => void
  private onClick: (position: ICoordinate) => void

  constructor() {
    this.onDirectionChange = this._onDirectionChange.bind(this)
    this.onClick = this._onClick.bind(this)

    this.init()
  }

  private init() {

    this.hero.circle(0, 0, 14)
    this.hero.fill(0xff3b30)

    this.root.addChild(this.hero)

    this.addListeners()

  }

  addListeners() {
    EventBus.on(INPUT_EVENTS.DIRECTION, this.onDirectionChange)
    EventBus.on(INPUT_EVENTS.CLICK, this.onClick)
  }

  private _onDirectionChange(direction: Direction) {
    console.log(direction)
    switch (direction) {
      case "UP":
        this.hero.y -= 10
        break
      case "DOWN":
        this.hero.y += 10
        break
      case "LEFT":
        this.hero.x -= 10
        break
      case "RIGHT":
        this.hero.x += 10
        break
      default:
        break;
    }
  }

  private _onClick({ x, y }: ICoordinate) {
    this.hero.x = x
    this.hero.y = y
  }
}