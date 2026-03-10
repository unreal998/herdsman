import { Container } from 'pixi.js';
import { AnimalModel } from './AnimalModel';
import { AnimalView } from './AnimalView';
import EventBus from '../../core/eventBus/EventBus';
import { HERO_EVENTS } from '../hero/types';
import { ICoordinate } from '../../core/inputHandler/types';
import { HUD_EVENTS } from '../hud/types';
import { ENGINE_EVENTS } from '../engine/types';
import CollidingDimension from '../../core/helpers/collidingDimension';
import { BaseController } from '../../core/baseModule/BaseController';

export class AnimalController extends BaseController {
  private model!: AnimalModel;
  private view!: AnimalView;

  private onParkAnimal!: ({ a, b }: { a: Container; b: Container }) => void;
  private onPickUpAnimal!: (animal: string) => void;
  private onFollowHero!: (target: ICoordinate) => void;
  private onPickUpAnimalRequest!: ({ a, b }: { a: Container; b: Container }) => void;

  constructor(stage: Container) {
    super();
    this.onParkAnimal = this._onParkAnimal.bind(this);
    this.onPickUpAnimal = this._onPickUpAnimal.bind(this);
    this.onFollowHero = this._onFollowHero.bind(this);
    this.onPickUpAnimalRequest = this._onPickUpAnimalRequest.bind(this);
    this.init(stage);
  }

  init(stage: Container) {
    this.model = new AnimalModel();
    this.view = new AnimalView();

    stage.addChild(this.view.root);

    this.addListeners();
  }

  protected override addListeners() {
    EventBus.on(HERO_EVENTS.PICK_UP_ANIMAL_APPROVED, this.onPickUpAnimal);
    CollidingDimension.onCollision(this.view.root.label, 'hero', this.onPickUpAnimalRequest);
  }

  protected override removeListeners() {
    EventBus.off(HERO_EVENTS.PICK_UP_ANIMAL_APPROVED, this.onPickUpAnimal);
    EventBus.off(HERO_EVENTS.MOVE, this.onFollowHero);
    CollidingDimension.offCollision(this.view.root.label, 'hero', this.onPickUpAnimalRequest);
    CollidingDimension.offCollision(this.view.root.label, 'yard', this.onParkAnimal);
  }

  private _onParkAnimal({ a, b }: { a: Container; b: Container }) {
    if (this.model.isPickedUp && (a.label === this.view.root.label || b.label === this.view.root.label)) {
      this.model.isPickedUp = false;
      EventBus.emit(ENGINE_EVENTS.REMOVE_ANIMAL, this.view.root.label);
      this.removeListeners();
      this.view.destroy();
      EventBus.emit(HUD_EVENTS.SCORE_UPDATED, 1);
    }
  }

  private _onFollowHero(target: ICoordinate) {
    this.view.target = target;
  }

  private _onPickUpAnimalRequest({ a, b }: { a: Container; b: Container }) {
    if ((a.label === this.view.root.label || b.label === this.view.root.label) && !this.model.isPickedUp) {
      EventBus.emit(HERO_EVENTS.PICK_UP_ANIMAL_REQUEST, this.view.root.label);
    }
  }

  private _onPickUpAnimal(animal: string) {
    if (animal !== this.view.root.label) return;
    this.model.isPickedUp = true;
    this.view.isPickedUp = this.model.isPickedUp;
    EventBus.on(HERO_EVENTS.MOVE, this.onFollowHero);
    CollidingDimension.onCollision(this.view.root.label, 'yard', this.onParkAnimal);
    CollidingDimension.offCollision(this.view.root.label, 'hero', this.onPickUpAnimalRequest);
  }
}
