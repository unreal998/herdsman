import { Container } from 'pixi.js';
import { IBaseView } from './types';

export abstract class BaseView implements IBaseView {
  public root!: Container;

  protected init(): void {
    this.root = new Container();
  }

  protected addListeners(): void {
    throw new Error('Method not implemented.');
  }
  protected removeListeners(): void {
    throw new Error('Method not implemented.');
  }
  protected onUpdate!: (deltaTime: number) => void;

  public destroy(): void {
    this.removeListeners();
    this.root.destroy({ children: true });
  }
}
