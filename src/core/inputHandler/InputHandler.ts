import { BaseController } from '../baseModule/BaseController';
import EventBus from '../eventBus/EventBus';
import { INPUT_EVENTS } from './types';
import { Container, FederatedPointerEvent } from 'pixi.js';

export class InputHandler extends BaseController {
  private onClick!: (e: FederatedPointerEvent) => void;
  constructor(stage: Container) {
    super();
    this.onClick = this._onClick.bind(this);
    this.init(stage);
  }

  override init(stage: Container) {
    stage.eventMode = 'static';
    stage.on('pointerdown', this.onClick);
  }

  private _onClick = (e: FederatedPointerEvent) => {
    const pos = e.getLocalPosition(e.currentTarget as Container);

    EventBus.emit(INPUT_EVENTS.CLICK, { x: pos.x, y: pos.y });
  };
}
