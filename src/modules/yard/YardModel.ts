import { Config } from "../../config/index";
import { IColorsConfig, IYardConfig } from "../../config/types";

export class YardModel {
  private colorsConfig_ = Config.colorsConfig;
  private yardConfig_ = Config.yardConfig;

  constructor() {
    this.colorsConfig_ = Config.colorsConfig;
    this.yardConfig_ = Config.yardConfig;
  }

  get colorsConfig(): IColorsConfig {
    return this.colorsConfig_;
  }

  get yardConfig(): IYardConfig {
    return this.yardConfig_;
  }
}