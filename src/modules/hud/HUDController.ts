import { Application } from "pixi.js"
import { HUDView } from "./HUDView"
import { HUDModel } from "./HUDModel"
import { HUD_EVENTS } from "./types"
import EventBus from "../../core/eventBus/EventBus"

export class HUDController {
    private model!: HUDModel
    private view!: HUDView

    private onScoreUpdated!: (score: number) => void

    constructor() {
        this.onScoreUpdated = this._onScoreUpdated.bind(this);
    }

    init(app: Application) {
        this.model = new HUDModel()
        this.view = new HUDView()
        this.addListeners();
        this.initView(app);
    }

    private initView(app: Application) {
        app.stage.addChild(this.view.root);
    }

    private addListeners() {
        EventBus.on(HUD_EVENTS.SCORE_UPDATED, this.onScoreUpdated);
    }

    private removeListeners() {
        EventBus.off(HUD_EVENTS.SCORE_UPDATED, this.onScoreUpdated);
    }

    private _onScoreUpdated(score: number) {
        this.model.score += score;
        this.view.updateScore(this.model.score);
    }

    private destroy() {
        this.removeListeners();
        this.view.root.destroy({
            children: true,
            texture: true,
        });
    }
}