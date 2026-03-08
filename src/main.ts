import { Application } from "pixi.js";
import { YardController } from "./modules/yard/YardController";
import { HeroController } from "./modules/hero/HeroController";
import { InputHandler } from "./core/inputHandler/InputHandler";
import { CORE_EVENTS } from "./core/type";
import EventBus from "./core/EventBus";

export class App {
  private static instance: App | null = null;

  private app!: Application;

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

    const heroController = new HeroController();
    heroController.init(this.app);

    this.app.ticker.add(this.onUpdate)

  }

  private onUpdate({deltaTime}: {deltaTime: number}) {
    EventBus.emit(CORE_EVENTS.UPDATE, deltaTime)
  }
}

App.getInstance().init();