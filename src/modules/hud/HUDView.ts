import { Text } from 'pixi.js';
import { BaseView } from '../../core/baseModule/BaseView';

export class HUDView extends BaseView {
  public score!: Text;

  constructor() {
    super();
    this.init();
  }

  protected override init() {
    super.init();
    this.root.zIndex = 1000;
    this.score = new Text();
    this.score.text = '0';
    this.score.style.fontSize = 60;
    this.score.style.fontWeight = 'bold';
    this.score.style.fontFamily = 'Arial';
    this.score.style.fill = 0xffffff;
    this.score.style.align = 'center';
    this.score.position = { x: window.innerWidth / 2, y: 10 };
    this.root.addChild(this.score);
  }

  updateScore(score: number) {
    this.score.text = score.toString();
  }
}
