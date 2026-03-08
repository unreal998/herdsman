import { Container, Graphics } from "pixi.js"
import EventBus from "../../core/eventBus/EventBus"
import { Direction, INPUT_EVENTS, ICoordinate } from "../../core/inputHandler/types";
import { CORE_EVENTS } from "../../core/eventBus/type";
import { HERO_EVENTS } from "./types";

export class HeroView {

  public readonly root = new Container()
  public readonly hero = new Graphics()
  public target: ICoordinate = { x: 0, y: 0 }
  public speed: number = 2
  private onDirectionChange: (direction: Direction) => void
  private onClick: (position: ICoordinate) => void
  private onUpdate: (deltaTime: number) => void

  constructor() {
    this.onDirectionChange = this._onDirectionChange.bind(this)
    this.onClick = this._onClick.bind(this)
    this.onUpdate = this._onUpdate.bind(this)

    this.init()
  }

  private init() {

    this.hero.circle(0, 0, 14)
    this.hero.fill(0xff3b30)

    this.root.zIndex = 2;
    this.root.addChild(this.hero)

    this.addListeners()

  }

  addListeners() {
    EventBus.on(INPUT_EVENTS.DIRECTION, this.onDirectionChange)
    EventBus.on(INPUT_EVENTS.CLICK, this.onClick)
    EventBus.on(CORE_EVENTS.UPDATE, this.onUpdate)
  }

  private _onDirectionChange(direction: Direction) {
    switch (direction) {
      case "UP":
        this.target.y -= this.speed * 2
        break
      case "DOWN":
        this.target.y += this.speed * 2
        break
      case "LEFT":
        this.target.x -= this.speed * 2
        break
      case "RIGHT":
        this.target.x += this.speed * 2
        break
      default:
        break;
    }
  }

  private _onClick({ x, y }: ICoordinate) {
    EventBus.emit(HERO_EVENTS.MOVE, { x, y })
    this.target = { x, y }
  }

  private _onUpdate(deltaTime: number) {

    const dx = this.target.x - this.hero.x
    const dy = this.target.y - this.hero.y

    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
      return;
    }


    const move = Number((this.speed * deltaTime).toFixed(0))

    if (Math.abs(dx) < 5) {
      this.hero.x = this.target.x
    } else {
      if (dx > 0) {
        this.hero.x += move
      } else {
        this.hero.x -= move
      }
    }

    if (Math.abs(dy) < 5) {
      this.hero.y = this.target.y
    } else {
      if (dy > 0) {
        this.hero.y += move
      } else {
        this.hero.y -= move
      }
    }
  }
}