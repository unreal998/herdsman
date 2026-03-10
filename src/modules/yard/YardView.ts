import { Assets, Container, Sprite, TilingSprite } from 'pixi.js';

export class YardView {
  readonly root!: Container;
  field!: TilingSprite;

  private yard!: Sprite;

  constructor() {
    this.root = new Container();
    this.drawYard();
    this.drawField();
    this.root.addChild(this.yard);
    this.root.label = 'yard';
  }

  private drawYard(): void {
    this.yard = new Sprite();
    this.yard.texture = Assets.get('ambar');
    this.yard.x = window.innerWidth - 400;
    this.yard.y = window.innerHeight - 380;
    this.yard.anchor.set(0.5);
    this.yard.width = 300;
    this.yard.height = 300;
    this.yard.rotation = Math.PI / 2;
  }

  private drawField(): void {
    const grassTexture = Assets.get('grass');
    this.field = new TilingSprite({ texture: grassTexture, width: window.innerWidth, height: window.innerHeight });
    this.root.addChild(this.field);
  }
}
