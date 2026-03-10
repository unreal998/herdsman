import { Assets, Sprite } from 'pixi.js';
import EventBus from '../../core/eventBus/EventBus';
import { CORE_EVENTS } from '../../core/eventBus/type';
import { ICoordinate } from '../../core/inputHandler/types';
import { clamp } from '../../utils/clamp';
import { BaseView } from '../../core/baseModule/BaseView';
import { IAnimalView } from './types';

export class AnimalView extends BaseView implements IAnimalView {
  private RANGE_MULTIPLIER = 300;
  private animal!: Sprite;

  private speed: number = 2;
  public isPickedUp: boolean = false;
  private patrolPath: ICoordinate[] = [];

  private currentPatrolPoint: number = 0;
  public target: ICoordinate = { x: 0, y: 0 };

  constructor() {
    super();
    this.onUpdate = this._onUpdate.bind(this);
    this.animal = new Sprite();
    this.animal.position = { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight };
    this.init();
  }

  protected override init() {
    super.init();
    this.root.label = 'animal' + this.root.uid;

    this.animal.texture = Assets.get(Math.random() > 0.5 ? 'cow1' : 'cow2');
    this.animal.anchor.set(0.5);
    this.animal.width = 50;
    this.animal.height = 146;

    this.root.addChild(this.animal);

    this.generatePatrolPath();

    this.addListeners();
  }

  private generatePatrolPath() {
    for (let i = 0; i < 10; i++) {
      const x = clamp(this.animal.position.x + Math.random() * this.RANGE_MULTIPLIER, 0, window.innerWidth);

      const y = clamp(this.animal.position.y + Math.random() * this.RANGE_MULTIPLIER, 0, window.innerHeight);
      this.patrolPath.push({ x, y });
    }
  }

  protected override addListeners() {
    EventBus.on(CORE_EVENTS.UPDATE, this.onUpdate);
  }

  protected override removeListeners() {
    EventBus.off(CORE_EVENTS.UPDATE, this.onUpdate);
  }

  private _onUpdate(deltaTime: number) {
    if (!this.isPickedUp) {
      this.moveTowardsNextPatrolPoint(deltaTime);
    } else {
      this.moveTowardsTarget(deltaTime, this.target);
    }
  }

  private moveTowardsNextPatrolPoint(deltaTime: number) {
    const nextPoint = this.patrolPath[this.currentPatrolPoint];
    const dx = nextPoint.x - this.animal.position.x;
    const dy = nextPoint.y - this.animal.position.y;

    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
      this.currentPatrolPoint++;
      if (this.currentPatrolPoint >= this.patrolPath.length) {
        this.currentPatrolPoint = 0;
      }
      return;
    }

    this.moveTowardsTarget(deltaTime, nextPoint);
  }

  private moveTowardsTarget(deltaTime: number, nextPoint: ICoordinate) {
    const dx = nextPoint.x - this.animal.position.x;
    const dy = nextPoint.y - this.animal.position.y;

    const move = Number((this.speed * deltaTime).toFixed(0));

    const angle = Math.atan2(dy, dx);

    if (Math.abs(dx) < 5) {
      this.animal.x = nextPoint.x;
    } else {
      if (dx > 0) {
        this.animal.x += move;
      } else {
        this.animal.x -= move;
      }
    }

    if (Math.abs(dy) < 5) {
      this.animal.y = nextPoint.y;
    } else {
      if (dy > 0) {
        this.animal.y += move;
      } else {
        this.animal.y -= move;
      }
    }

    this.animal.rotation = angle - Math.PI / 2;
  }
}
