import { Container } from 'pixi.js';

export type CollisionPayload = {
  a: Container;
  b: Container;
};

export type CollisionCallback = (payload: CollisionPayload) => void;

export interface ICollidingDimension {
  onCollision(labelA: string, labelB: string, callback: CollisionCallback): void;
  offCollision(labelA: string, labelB: string, callback: CollisionCallback): void;
  isColliding(stage: Container): void;
}
