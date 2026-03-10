import { Container } from 'pixi.js';
import { ICoordinate } from '../core/inputHandler/types';

export function moveToTargetUtil(deltaTime: number, dx: number, dy: number, speed: number, root: Container, target: ICoordinate) {
  const move = Number((speed * deltaTime).toFixed(0));
  const angle = Math.atan2(dy, dx);

  if (Math.abs(dx) < 5) {
    root.x = target.x;
  } else {
    if (dx > 0) {
      root.x += move;
    } else {
      root.x -= move;
    }
  }

  if (Math.abs(dy) < 5) {
    root.y = target.y;
  } else {
    if (dy > 0) {
      root.y += move;
    } else {
      root.y -= move;
    }
  }
  root.rotation = angle - Math.PI / 2;
}
