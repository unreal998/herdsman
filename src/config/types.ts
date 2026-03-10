export interface IColorsConfig {
  field: number;
  yard: number;
  border: number;
}

export interface IGameSettings {
  animalsAmount: number;
  maxGroup: number;
}
export interface IGameConfig {
  colorsConfig: IColorsConfig;
  gameSettings: IGameSettings;
}
