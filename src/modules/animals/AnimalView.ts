import { Container, Graphics } from "pixi.js"
import EventBus from "../../core/eventBus/EventBus"
import { CORE_EVENTS } from "../../core/eventBus/type"
import { ICoordinate } from "../../core/inputHandler/types"

export class AnimalView {

  private RANGE_MULTIPLIER = 300;
  public readonly root = new Container()
  public readonly animal = new Graphics()
  private onUpdate!: (deltaTime: number) => void

  private speed: number = 2
  public isPickedUp: boolean = false
  private patrolPath: ICoordinate[] = []

  private currentPatrolPoint: number = 0
  public target: ICoordinate = { x: 0, y: 0 }

  constructor() {
    this.animal.position = { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }
    this.init()
  }

  private init() {
    this.onUpdate = this._onUpdate.bind(this)

    this.root.label = 'animal'
    this.animal
      .circle(0, 0, 10)
      .fill(0xffffff)

    this.root.addChild(this.animal)

    this.generatePatrolPath()

    this.addListeners()

  }

  private generatePatrolPath() {
    for (let i = 0; i < 10; i++) {
      this.patrolPath.push({
        x: (Math.random() * this.RANGE_MULTIPLIER) + this.animal.position.x,
        y: (Math.random() * this.RANGE_MULTIPLIER) + this.animal.position.y,
      })
    }
  }

  private addListeners() {
    EventBus.on(CORE_EVENTS.UPDATE, this.onUpdate)
  }

  private removeListeners() {
    EventBus.off(CORE_EVENTS.UPDATE, this.onUpdate)
  }

  private _onUpdate(deltaTime: number) {
    if (!this.isPickedUp) {
      this.moveTowardsNextPatrolPoint(deltaTime)
    } 
    else {
      this.moveTowardsTarget(deltaTime, this.target)
    }
  }

  private moveTowardsNextPatrolPoint(deltaTime: number) {
    const nextPoint = this.patrolPath[this.currentPatrolPoint]
    const dx = nextPoint.x - this.animal.position.x
    const dy = nextPoint.y - this.animal.position.y

    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
      this.currentPatrolPoint++
      if (this.currentPatrolPoint >= this.patrolPath.length) {
        this.currentPatrolPoint = 0
      }
      return;
    }

    this.moveTowardsTarget(deltaTime, nextPoint)
  }

  private moveTowardsTarget(deltaTime: number, nextPoint: ICoordinate) {
    const dx = nextPoint.x - this.animal.position.x
    const dy = nextPoint.y - this.animal.position.y
  
    const move = Number((this.speed * deltaTime).toFixed(0))

    if (Math.abs(dx) < 5) {
      this.animal.x = nextPoint.x
    } else {
      if (dx > 0) {
        this.animal.x += move
      } else {
        this.animal.x -= move
      }
    }

    if (Math.abs(dy) < 5) {
      this.animal.y = nextPoint.y
    } else {
      if (dy > 0) {
        this.animal.y += move
      } else {
        this.animal.y -= move
      }
    }

  }

  destroy() {
    this.removeListeners();
    this.root.destroy({
      children: true,
      texture: true,
    })
  }

}