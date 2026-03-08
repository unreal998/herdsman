import { Container, Graphics } from "pixi.js"

export class AnimalView {

  public readonly root = new Container()
  public readonly animal = new Graphics()

  constructor() {
    this.animal.position = { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }
    this.draw()
  }

  private draw() {

    this.animal
      .circle(0, 0, 10)
      .fill(0xffffff)

    this.root.addChild(this.animal)

  }

}