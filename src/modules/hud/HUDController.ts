import { Application } from "pixi.js"
import { HUDView } from "./HUDView"
import { HUDModel } from "./HUDModel"

export class HUDController {
    private model!: HUDModel
    private view!: HUDView

    init(app: Application) {
        this.model = new HUDModel()
        this.view = new HUDView()

        this.initView(app);
    }

    private initView(app: Application) {
        app.stage.addChild(this.view.root);
    }
}