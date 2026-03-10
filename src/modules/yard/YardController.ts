import { Container } from 'pixi.js';
import { YardView } from './YardView';
import { BaseController } from '../../core/baseModule/BaseController';

export class YardController extends BaseController {
  private view!: YardView;

  constructor(stage: Container) {
    super();
    this.init(stage);
  }

  init(stage: Container) {
    this.view = new YardView();
    stage.addChild(this.view.field);
    stage.addChild(this.view.root);
  }
}
