import { Application } from "pixi.js";
import { YardController } from "./modules/yard/YardController";
import { HeroController } from "./modules/hero/HeroController";
import { InputHandler } from "./core/inputHandler/InputHandler";
import { CORE_EVENTS } from "./core/eventBus/type";
import EventBus from "./core/eventBus/EventBus";
import { AnimalController } from "./modules/animal/AnimalController";
import { HUDController } from "./modules/hud/HUDController";
import { isColliding } from "./core/helpers/collidingDimension";
import { EngineController } from "./modules/engine/EngineController";
import { ENGINE_EVENTS } from "./modules/engine/types";

export class App {
  private static instance: App | null = null;

  private app!: Application;
  private onUpdate!: ({ deltaTime } : {deltaTime: number}) => void
  private onAddAnimal!: () => void

  constructor () {
    this.onUpdate = this._onUpdate.bind(this)
    this.onAddAnimal = this._onAddAnimal.bind(this)
  }

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }

  public async init(): Promise<void> {
    this.app = new Application();

    await this.app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
    });

    document.body.appendChild(this.app.canvas);

    const inputHandler = new InputHandler();
    inputHandler.init(this.app.stage);

    const yardController = new YardController();
    yardController.init(this.app);

    const hudController = new HUDController();
    hudController.init(this.app);

    const heroController = new HeroController();
    heroController.init(this.app);

    new EngineController();

    this.addListeners();

    globalThis.__PIXI_APP__ = this.app;
  }

  private addListeners() {
    this.app.ticker.add(this.onUpdate)
    EventBus.on(ENGINE_EVENTS.ADD_ANIMAL, this.onAddAnimal);
  }

  private _onUpdate({deltaTime}: {deltaTime: number}) {
    EventBus.emit(CORE_EVENTS.UPDATE, deltaTime)
    isColliding(this.app.stage)
  }

  private _onAddAnimal() {
    const animalController = new AnimalController();
    animalController.init(this.app);
  }

}

App.getInstance().init();