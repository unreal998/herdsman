import { Container, Rectangle } from "pixi.js"
import EventBus from "../eventBus/EventBus"
import { HERO_EVENTS } from "../../modules/hero/types"
import { ANIMAL_EVENTS } from "../../modules/animals/types"

export function isColliding(stage: Container) {
    stage.children.forEach((itemA) => {
      if (itemA.label === 'hero' || itemA.label === 'animal') {
        const aBounds = itemA.getBounds()
        stage.children.forEach((itemB) => {
          if (itemB.label !== itemA.label && (itemB.label === 'hero' || itemB.label === 'animal' || itemB.label === 'yard')) {
            const bBounds = itemB.getBounds()
            const aBoundRect = new Rectangle(
              aBounds.x,
              aBounds.y,
              aBounds.width,
              aBounds.height
            )
        
            const bBoundRect = new Rectangle(
              bBounds.x,
              bBounds.y,
              bBounds.width,
              bBounds.height
            )

            if (aBoundRect.intersects(bBoundRect) ) {
                if (itemA.label === 'hero' && itemB.label === "animal") {
                  EventBus.emit(HERO_EVENTS.PICK_UP_ANIMAL, itemB)
                }
                if (itemA.label === 'animal' && itemB.label === "yard") {
                  EventBus.emit(ANIMAL_EVENTS.PARK_ANIMAL, itemA)
                }
            }
    
          } else {
            return false;
          }
        })
      }
    })
  }