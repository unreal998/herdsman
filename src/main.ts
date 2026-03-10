import { Application } from 'pixi.js';
import { YardController } from './modules/yard/YardController';
import { HeroController } from './modules/hero/HeroController';
import { InputHandler } from './core/inputHandler/InputHandler';
import { CORE_EVENTS } from './core/eventBus/type';
import EventBus from './core/eventBus/EventBus';
import { AnimalController } from './modules/animal/AnimalController';
import { HUDController } from './modules/hud/HUDController';
import CollidingDimension from './core/helpers/collidingDimension';
import { EngineController } from './modules/engine/EngineController';
import { ENGINE_EVENTS } from './modules/engine/types';
import { sound } from '@pixi/sound';
import { loadAdditionalResources, loadResources } from './utils/recourcesLoader';

export class App {
  private static instance: App | null = null;

  private app!: Application;
  private onUpdate!: ({ deltaTime }: { deltaTime: number }) => void;
  private onAddAnimal!: () => void;

  constructor() {
    this.onUpdate = this._onUpdate.bind(this);
    this.onAddAnimal = this._onAddAnimal.bind(this);
  }

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }

  private createInitialScreen(): void {
    const initialDiv = document.createElement('div');
    initialDiv.id = 'initial-screen';
    initialDiv.style.position = 'absolute';
    initialDiv.style.top = '0';
    initialDiv.style.left = '0';
    initialDiv.style.width = '100vw';
    initialDiv.style.height = '100vh';
    initialDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    initialDiv.style.display = 'flex';
    initialDiv.style.justifyContent = 'center';
    initialDiv.style.alignItems = 'center';
    initialDiv.innerHTML = `
      <div class="initial-screen-content">
        <h1>Click to start</h1>
      </div>
    `;
    document.body.appendChild(initialDiv);

    window.addEventListener(
      'pointerdown',
      () => {
        sound.context.audioContext.resume();
        document.getElementById('initial-screen')?.remove();
      },
      { once: true }
    );
  }

  public async init(): Promise<void> {
    this.app = new Application();

    await this.app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
    });

    await loadResources();

    this.createInitialScreen();

    document.body.appendChild(this.app.canvas);

    new InputHandler(this.app.stage);
    new YardController(this.app.stage);
    new HUDController(this.app.stage);
    new HeroController(this.app.stage);
    new EngineController();

    this.addListeners();
    loadAdditionalResources();
    globalThis.__PIXI_APP__ = this.app;
  }

  private addListeners() {
    this.app.ticker.add(this.onUpdate);
    EventBus.on(ENGINE_EVENTS.ADD_ANIMAL, this.onAddAnimal);
  }

  private _onUpdate({ deltaTime }: { deltaTime: number }) {
    EventBus.emit(CORE_EVENTS.UPDATE, deltaTime);
    CollidingDimension.isColliding(this.app.stage);
  }

  private _onAddAnimal() {
    new AnimalController(this.app.stage);
  }
}

App.getInstance().init();
