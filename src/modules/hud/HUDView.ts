import { Container, Text } from "pixi.js";

export class HUDView {
    public readonly root = new Container()
    public score = new Text()

    constructor() {
        this.init();
    }

    private init() {
        this.root.zIndex = 1000;
        this.score.text = "0";
        this.score.style.fontSize = 60;
        this.score.style.fontWeight = "bold";
        this.score.style.fontFamily = "Arial";
        this.score.style.fill = 0xffffff;
        this.score.style.align = "center";
        this.score.position = { x: window.innerWidth / 2, y: 10 };
        this.root.addChild(this.score);
    }

    updateScore(score: number) {
        this.score.text = score.toString();
    }
}