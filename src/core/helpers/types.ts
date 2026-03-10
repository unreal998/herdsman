import { Container } from 'pixi.js';

export type CollisionPayload = {
  a: Container;
  b: Container;
};

export type CollisionCallback = (payload: CollisionPayload) => void;
