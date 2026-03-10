import { Container, Rectangle } from 'pixi.js';
import { CollisionCallback } from './types';

const collisionSubscriptions = new Map<string, CollisionCallback[]>();

export function onCollision(labelA: string, labelB: string, callback: CollisionCallback) {
  const key = `${labelA}:${labelB}`;

  if (!collisionSubscriptions.has(key)) {
    collisionSubscriptions.set(key, []);
  }

  collisionSubscriptions.get(key)!.push(callback);
}

export function offCollision(labelA: string, labelB: string, callback: CollisionCallback) {
  const key = `${labelA}:${labelB}`;
  const reverseKey = `${labelB}:${labelA}`;

  collisionSubscriptions.get(key)?.filter(cb => cb !== callback);
  collisionSubscriptions.get(reverseKey)?.filter(cb => cb !== callback);
}

function emitCollision(a: Container, b: Container) {
  const key = `${a.label}:${b.label}`;
  const reverseKey = `${b.label}:${a.label}`;

  collisionSubscriptions.get(key)?.forEach(cb => cb({ a, b }));
  collisionSubscriptions.get(reverseKey)?.forEach(cb => cb({ a, b }));
}

export function isColliding(stage: Container) {
  const children = stage.children;

  for (let i = 0; i < children.length; i++) {
    const itemA = children[i];

    for (let j = i + 1; j < children.length; j++) {
      const itemB = children[j];

      const aBounds = itemA.getBounds();
      const bBounds = itemB.getBounds();

      const rectA = new Rectangle(aBounds.x, aBounds.y, aBounds.width, aBounds.height);

      const rectB = new Rectangle(bBounds.x, bBounds.y, bBounds.width, bBounds.height);

      if (rectA.intersects(rectB)) {
        emitCollision(itemA, itemB);
      }
    }
  }
}
