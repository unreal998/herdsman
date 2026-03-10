import { Application, Assets } from 'pixi.js';
import { YardController } from './modules/yard/YardController';
import { HeroController } from './modules/hero/HeroController';
import { InputHandler } from './core/inputHandler/InputHandler';
import { CORE_EVENTS } from './core/eventBus/type';
import EventBus from './core/eventBus/EventBus';
import { AnimalController } from './modules/animal/AnimalController';
import { HUDController } from './modules/hud/HUDController';
import { isColliding } from './core/helpers/collidingDimension';
import { EngineController } from './modules/engine/EngineController';
import { ENGINE_EVENTS } from './modules/engine/types';
import { sound } from '@pixi/sound';

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

  private async loadResources() {
    await Assets.load(
      [
        { alias: 'grass', src: '/assets/grass.jpg' },
        { alias: 'hero', src: '/assets/hero/hero_idle.png' },
        { alias: 'cow1', src: '/assets/cow1.png' },
        { alias: 'cow2', src: '/assets/cow2.png' },
        { alias: 'ambar', src: '/assets/ambar.png' },
      ],
      progress => {
        console.log(progress); // 0 → 1
      }
    );
  }

  private async loadAdditionalResources() {
    Assets.load([
      { alias: 'bg', src: '/assets/sounds/bg.mp3' },
      { alias: 'pickupSound', src: '/assets/sounds/cowPick.mp3' },
      { alias: 'cowPark', src: '/assets/sounds/cowPark.mp3' },
      { alias: 'hero_walk_1', src: '/assets/hero/hero_walk_1.png' },
      { alias: 'hero_walk_2', src: '/assets/hero/hero_walk_2.png' },
    ]).then(() => {
      EventBus.emit(CORE_EVENTS.ADDITIONAL_RESOURCES_LOADED);
    });
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

    this.createInitialScreen();

    document.body.appendChild(this.app.canvas);

    await this.loadResources();

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

    (globalThis as any).__PIXI_APP__ = this.app;
    this.loadAdditionalResources();
  }

  private addListeners() {
    this.app.ticker.add(this.onUpdate);
    EventBus.on(ENGINE_EVENTS.ADD_ANIMAL, this.onAddAnimal);
  }

  private _onUpdate({ deltaTime }: { deltaTime: number }) {
    EventBus.emit(CORE_EVENTS.UPDATE, deltaTime);
    isColliding(this.app.stage);
  }

  private _onAddAnimal() {
    const animalController = new AnimalController();
    animalController.init(this.app);
  }
}

App.getInstance().init();
