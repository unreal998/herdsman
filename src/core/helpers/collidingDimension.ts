import { Container, Rectangle } from 'pixi.js';
import { CollisionCallback, ICollidingDimension } from './types';

class CollidingDimension implements ICollidingDimension {
  private collisionSubscriptions: Map<string, CollisionCallback[]> = new Map();

  onCollision(labelA: string, labelB: string, callback: CollisionCallback) {
    const key = `${labelA}:${labelB}`;

    if (!this.collisionSubscriptions.has(key)) {
      this.collisionSubscriptions.set(key, []);
    }

    this.collisionSubscriptions.get(key)!.push(callback);
  }

  offCollision(labelA: string, labelB: string, callback: CollisionCallback) {
    const key = `${labelA}:${labelB}`;
    const reverseKey = `${labelB}:${labelA}`;

    this.collisionSubscriptions.get(key)?.filter(cb => cb !== callback);
    this.collisionSubscriptions.get(reverseKey)?.filter(cb => cb !== callback);
  }

  private emitCollision(a: Container, b: Container) {
    const key = `${a.label}:${b.label}`;
    const reverseKey = `${b.label}:${a.label}`;

    this.collisionSubscriptions.get(key)?.forEach(cb => cb({ a, b }));
    this.collisionSubscriptions.get(reverseKey)?.forEach(cb => cb({ a, b }));
  }

  isColliding(stage: Container) {
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
          this.emitCollision(itemA, itemB);
        }
      }
    }
  }
}

export default new CollidingDimension();
