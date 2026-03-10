import { Container } from 'pixi.js';
import { HUDView } from './HUDView';
import { HUDModel } from './HUDModel';
import { HUD_EVENTS } from './types';
import EventBus from '../../core/eventBus/EventBus';
import { BaseController } from '../../core/baseModule/BaseController';

export class HUDController extends BaseController {
  private model!: HUDModel;
  private view!: HUDView;

  private onScoreUpdated!: (score: number) => void;

  constructor(stage: Container) {
    super();
    this.onScoreUpdated = this._onScoreUpdated.bind(this);
    this.init(stage);
  }

  override init(stage: Container) {
    this.model = new HUDModel();
    this.view = new HUDView();
    this.addListeners();
    stage.addChild(this.view.root);
  }

  protected override addListeners() {
    EventBus.on(HUD_EVENTS.SCORE_UPDATED, this.onScoreUpdated);
  }

  private _onScoreUpdated(score: number) {
    this.model.score += score;
    this.view.updateScore(this.model.score);
  }
}
