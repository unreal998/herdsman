import { Container } from 'pixi.js';

export abstract class BaseController {

  protected abstract init(stage: Container): void;

  protected addListeners(): void {
    throw new Error('Method not implemented.');
  }
  protected removeListeners(): void {
    throw new Error('Method not implemented.');
  }
}
