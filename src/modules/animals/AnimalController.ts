import { Application } from "pixi.js"
import { AnimalModel } from "./AnimalModel"
import { AnimalView } from "./AnimalView"


export class AnimalController {
    private model!: AnimalModel
    private view!: AnimalView

    init(app: Application) {
        this.model = new AnimalModel()
        this.view = new AnimalView()

        this.initView(app);
    }

    private initView(app: Application) {
        app.stage.addChild(this.view.root);
    }
}