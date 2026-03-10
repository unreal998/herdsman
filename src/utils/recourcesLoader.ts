import { Assets } from 'pixi.js';
import EventBus from '../core/eventBus/EventBus';
import { CORE_EVENTS } from '../core/eventBus/type';

export async function loadResources() {
  const loadingScreen = document.getElementById('loading-screen');
  const loadingScreenText = document.getElementById('loading-screen-text');
  await Assets.load(
    [
      { alias: 'grass', src: '/assets/grass.jpg' },
      { alias: 'hero', src: '/assets/hero/hero_idle.png' },
      { alias: 'cow1', src: '/assets/cow1.png' },
      { alias: 'cow2', src: '/assets/cow2.png' },
      { alias: 'ambar', src: '/assets/ambar.png' },
    ],
    progress => {
      loadingScreenText!.textContent = `${progress * 100}%`;
    }
  );
  loadingScreen!.remove();
}

export async function loadAdditionalResources() {
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
