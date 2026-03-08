export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export enum INPUT_EVENTS {
  DIRECTION = 'INPUT_DIRECTION',
  CLICK = 'INPUT_CLICK',
};

export interface ICoordinate {
  x: number
  y: number
}