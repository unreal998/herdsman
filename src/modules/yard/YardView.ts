import { Container, Graphics } from "pixi.js";
import { IColorsConfig, IYardConfig } from "../../config/types";

export class YardView {
  readonly root = new Container();
  readonly field = new Graphics();

  private readonly yard = new Graphics();

  constructor(colorsConfig: IColorsConfig, yardConfig: IYardConfig) {
    this.drawYard(yardConfig, colorsConfig);
    this.drawField(colorsConfig);
    this.field.addChild(this.yard);

    this.root.addChild(this.field);
  }

  private drawYard(yardConfig: IYardConfig, colorsConfig: IColorsConfig): void {
    this.yard.clear();
    this.yard.roundRect(yardConfig.x, yardConfig.y, yardConfig.width, yardConfig.height, yardConfig.radius);
    this.yard.fill(colorsConfig.yard);
    this.yard.stroke({
      color: colorsConfig.border,
      width: 2,
      alpha: 0.3,
    });
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