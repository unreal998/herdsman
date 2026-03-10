import { sound } from '@pixi/sound';
import EventBus from '../eventBus/EventBus';
import { CORE_EVENTS } from '../eventBus/type';

export class SoundManager {
  private isAdditionalResourcesReady: boolean = false;

  private onAdditionalResourcesLoaded!: (isAdditionalResourcesReady: boolean) => void;
  constructor() {
    this.onAdditionalResourcesLoaded = this._onAdditionalResourcesLoaded.bind(this);
    this.init();
  }

  init() {
    this.addListener();
  }

  addListener() {
    EventBus.on(CORE_EVENTS.ADDITIONAL_RESOURCES_LOADED, this.onAdditionalResourcesLoaded);
  }

  private _onAdditionalResourcesLoaded(): void {
    this.isAdditionalResourcesReady = true;
    this._playBackgroundSound();
  }

  private _playBackgroundSound(): void {
    sound.play('bg', { volume: 0.7, loop: true, end: 8.2 });
  }

  public playSound(soundName: string, start?: number): void {
    if (!this.isAdditionalResourcesReady) return;
    sound.play(soundName, { volume: 1, start: start ?? 0 });
  }
}

export const SoundManagerInstance = new SoundManager();
