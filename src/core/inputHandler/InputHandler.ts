import EventBus from "../eventBus/EventBus"
import { INPUT_EVENTS } from "./types"
import { Container, FederatedPointerEvent } from "pixi.js"

export class InputHandler {
  init(stage: Container) {
    stage.eventMode = "static"
    stage.on("pointerdown", this.onClick)

  }

  private onClick = (e: FederatedPointerEvent) => {

    const pos = e.getLocalPosition(e.currentTarget as Container)

    EventBus.emit(INPUT_EVENTS.CLICK, { x: pos.x, y: pos.y })

  }

}