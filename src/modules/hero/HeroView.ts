import { AnimatedSprite, Assets, Text, Texture } from 'pixi.js';
import EventBus from '../../core/eventBus/EventBus';
import { INPUT_EVENTS, ICoordinate } from '../../core/inputHandler/types';
import { CORE_EVENTS } from '../../core/eventBus/type';
import { HERO_EVENTS, IHeroView } from './types';
import { BaseView } from '../../core/baseModule/BaseView';
import { moveToTargetUtil } from '../../utils/moveToTargetUtil';

export class HeroView extends BaseView implements IHeroView {
  public hero!: AnimatedSprite;
  public heroIndicators!: Text;
  private onClick: (position: ICoordinate) => void;
  private speed: number;
  public animationsReady: boolean = false;
  public target: ICoordinate = { x: 0, y: 0 };
  private walkTextures: Texture[] = [];
  private idleTextures: Texture[] = [];

  constructor(speed: number) {
    super();
    this.onClick = this._onClick.bind(this);
    this.onUpdate = this._onUpdate.bind(this);
    this.speed = speed;

    this.init();
  }

  protected override init() {
    super.init();
    this.heroIndicators = new Text();
    this.heroIndicators.text = '0';
    this.heroIndicators.style.fill = '#000000';
    this.heroIndicators.style.fontSize = 36;
    this.heroIndicators.anchor.set(0.5, 0.5);
    this.heroIndicators.x = 0;
    this.heroIndicators.y = -10;

    this.idleTextures = [Assets.get('hero')];
    this.hero = new AnimatedSprite(this.idleTextures);
    this.hero.anchor.set(0.5);
    this.hero.width = 70;
    this.hero.height = 70;

    this.root.zIndex = 2;
    this.root.label = 'hero';
    this.root.addChild(this.hero);
    this.root.addChild(this.heroIndicators);

    this.addListeners();
  }

  protected override addListeners() {
    EventBus.on(INPUT_EVENTS.CLICK, this.onClick);
    EventBus.on(CORE_EVENTS.UPDATE, this.onUpdate);
  }

  private _onClick({ x, y }: ICoordinate) {
    EventBus.emit(HERO_EVENTS.MOVE, { x, y });
    this.target = { x, y };
    this.walk();
  }

  private moveTowardsTarget(deltaTime: number) {
    const dx = this.target.x - this.root.x;
    const dy = this.target.y - this.root.y;

    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
      this.idle();
      return;
    }
    moveToTargetUtil(deltaTime, dx, dy, this.speed, this.root, this.target);
  }

  public animalCountUpdated(text: string) {
    this.heroIndicators.text = text;
  }

  private _onUpdate(deltaTime: number) {
    this.moveTowardsTarget(deltaTime);
  }

  private walk() {
    if (!this.animationsReady) return;
    if (this.walkTextures.length === 0) {
      this.walkTextures = [Assets.get('hero_walk_1'), Assets.get('hero_walk_2')];
    }
    this.hero.textures = this.walkTextures;
    this.hero.animationSpeed = 0.1;
    this.hero.loop = true;
    this.hero.play();
  }

  private idle() {
    this.hero.textures = this.idleTextures;
  }
}
