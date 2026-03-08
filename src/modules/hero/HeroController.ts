import { Application } from "pixi.js"
import { HeroModel } from "./HeroModel"
import { HeroView } from "./HeroView"

export class HeroController {

    private model!: HeroModel
    private view!: HeroView

  
    init(app: Application) {
        this.model = new HeroModel()
        this.view = new HeroView();

        this.initView(app);
    }
    private initView(app: Application) {
        app.stage.addChild(this.view.root);
    }
  }