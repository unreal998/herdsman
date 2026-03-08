import { Application } from "pixi.js"
import { HeroModel } from "./HeroModel"
import { HeroView } from "./HeroView"
import { HERO_EVENTS } from "./types"
import EventBus from "../../core/eventBus/EventBus"
import { ICoordinate } from "../../core/inputHandler/types"

export class HeroController {

    private model!: HeroModel
    private view!: HeroView

    private onMove!: (position: ICoordinate) => void

    init(app: Application) {
        this.model = new HeroModel()
        this.view = new HeroView();
        this.onMove = this._onMove.bind(this);

        this.initView(app);
        this.addListeners();
    }

    private addListeners() {
        EventBus.on(HERO_EVENTS.MOVE, this.onMove);
    }

    private _onMove(position: ICoordinate) {
        this.model.target = position;
    }

    private initView(app: Application) {
        app.stage.addChild(this.view.root);
    }
  }