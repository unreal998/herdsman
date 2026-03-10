import { Config } from '../../config/index';
import { IColorsConfig } from '../../config/types';

export class YardModel {
  private colorsConfig_ = Config.colorsConfig;

  constructor() {
    this.colorsConfig_ = Config.colorsConfig;
  }

  get colorsConfig(): IColorsConfig {
    return this.colorsConfig_;
  }
}
