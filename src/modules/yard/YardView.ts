import { Container, Graphics } from "pixi.js";
import { IColorsConfig } from "../../config/types";

export class YardView {
  readonly root = new Container();
  readonly field = new Graphics();


  private readonly yard = new Graphics();

  constructor(colorsConfig: IColorsConfig) {
    this.drawYard(colorsConfig);
    this.drawField(colorsConfig);
    this.root.addChild(this.yard);
    this.root.label = 'yard';
  }

  private drawYard(colorsConfig: IColorsConfig): void {
    this.yard.clear();
    this.yard.roundRect(window.innerWidth -400, window.innerHeight -380, 200, 180, 12);
    this.yard.fill(colorsConfig.yard);
    this.yard.stroke({
      color: colorsConfig.border,
      width: 2,
      alpha: 0.3,
    });
    this.yard.zIndex = 1;
  }

  private drawField(colorsConfig: IColorsConfig): void {
    this.field.clear();
    this.field.roundRect(0, 0, window.innerWidth, window.innerHeight, 0);
    this.field.fill(colorsConfig.field);
    this.field.stroke({
      color: colorsConfig.border,
      width: 2,
      alpha: 0.3,
    });
  }
}