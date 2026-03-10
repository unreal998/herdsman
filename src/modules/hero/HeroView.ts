import { AnimatedSprite, Assets, Container, Sprite, Text, Texture } from "pixi.js"
import EventBus from "../../core/eventBus/EventBus"
import { INPUT_EVENTS, ICoordinate } from "../../core/inputHandler/types";
import { CORE_EVENTS } from "../../core/eventBus/type";
import { HERO_EVENTS } from "./types";

export class HeroView {

  public readonly root = new Container()
  public hero!: AnimatedSprite | Sprite
  public readonly heroIndicators = new Text()
  public target: ICoordinate = { x: 0, y: 0 }
  private onClick: (position: ICoordinate) => void
  private onUpdate: (deltaTime: number) => void
  private onAdditionalResourcesLoaded: () => void
  private speed: number

  constructor(speed: number) {
    this.onClick = this._onClick.bind(this)
    this.onUpdate = this._onUpdate.bind(this)
    this.onAdditionalResourcesLoaded = this._onAdditionalResourcesLoaded.bind(this)
    this.speed = speed;

    this.init()
  }

  private init() {

    this.heroIndicators.text = '0'
    this.heroIndicators.x = 10
    this.heroIndicators.y = -15

    this.hero = new Sprite(Assets.get('hero'))
    this.hero.texture = Assets.get('hero')
    this.hero.scale.set(0.5)
    this.hero.anchor.set(0.5)
    this.hero.width = 70
    this.hero.height = 70

    this.root.zIndex = 2;
    this.root.label = 'hero';
    this.root.addChild(this.hero)
    this.root.addChild(this.heroIndicators)

    this.addListeners()

  }

  addListeners() {
    EventBus.on(INPUT_EVENTS.CLICK, this.onClick)
    EventBus.on(CORE_EVENTS.UPDATE, this.onUpdate)
    EventBus.on(CORE_EVENTS.ADDITIONAL_RESOURCES_LOADED, this.onAdditionalResourcesLoaded)
  }


  private _onClick({ x, y }: ICoordinate) {
    EventBus.emit(HERO_EVENTS.MOVE, { x, y })
    this.target = { x, y }
  }

  private moveTowardsTarget(deltaTime: number) {
    const dx = this.target.x - this.root.x
    const dy = this.target.y - this.root.y

    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
      return;
    }

    const move = Number((this.speed * deltaTime).toFixed(0))
    const angle = Math.atan2(dy, dx)

    if (Math.abs(dx) < 5) {
      this.root.x = this.target.x
    } else {
      if (dx > 0) {
        this.root.x += move
      } else {
        this.root.x -= move
      }
    }

    if (Math.abs(dy) < 5) {
      this.root.y = this.target.y
    } else {
      if (dy > 0) {
        this.root.y += move
      } else {
        this.root.y -= move
      }
    }
    this.root.rotation = angle - Math.PI / 2;
  }

  public animalCountUpdated(text: string) {
    this.heroIndicators.text = text
  }

  private _onUpdate(deltaTime: number) {
    this.moveTowardsTarget(deltaTime);
  }

  private _onAdditionalResourcesLoaded() {
    const textures: Texture[] = [Assets.get('hero_walk_1'), Assets.get('hero_walk_2')]
    this.hero = new AnimatedSprite(textures);
    (this.hero as AnimatedSprite).loop = true;
    (this.hero as AnimatedSprite).play();
  }
}