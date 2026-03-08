export interface IColorsConfig {
    field: number
    yard: number
    border: number
}

export interface IGameSettings {
    animalsAmount: number
    pickupDistance: number
    maxGroup: number
}
export interface IGameConfig {
    colorsConfig: IColorsConfig
    gameSettings: IGameSettings
  }