import EventBus from "../eventBus/EventBus"
import { INPUT_EVENTS, Direction } from "./types"
import { Container, FederatedPointerEvent } from "pixi.js"

export class InputHandler {

  private keys: Record<string, boolean> = {}

  init(stage: Container) {

    window.addEventListener("keydown", this.onKeyDown)
    window.addEventListener("keyup", this.onKeyUp)

    stage.eventMode = "static"
    stage.on("pointerdown", this.onClick)

  }

  private onKeyDown = (e: KeyboardEvent) => {

    this.keys[e.code] = true
    let direction: Direction | undefined;
    if (this.keys["ArrowUp"]) direction = "UP";
    if (this.keys["ArrowDown"]) direction = "DOWN";
    if (this.keys["ArrowLeft"]) direction = "LEFT";
    if (this.keys["ArrowRight"]) direction = "RIGHT";

    if (direction) {
      EventBus.emit(INPUT_EVENTS.DIRECTION, direction)
    }

  }

  private onKeyUp = (e: KeyboardEvent) => {

    this.keys[e.code] = false

  }

  private onClick = (e: FederatedPointerEvent) => {

    const pos = e.getLocalPosition(e.currentTarget as Container)

    EventBus.emit(INPUT_EVENTS.CLICK, { x: pos.x, y: pos.y })

  }

}