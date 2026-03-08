export interface IColorsConfig {
    field: number
    yard: number
    border: number
}

export interface IYardConfig {
    x: number
    y: number
    width: number
    height: number
    radius: number
}

export interface IGameConfig {
    colorsConfig: IColorsConfig
    yardConfig: IYardConfig
  
    hero: {
      radius: number
      speed: number
    }
  
    animal: {
      radius: number
      maxGroup: number
      pickupDistance: number
    }
  }