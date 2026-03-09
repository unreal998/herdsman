import { Application, Container } from "pixi.js"
import { HeroModel } from "./HeroModel"
import { HeroView } from "./HeroView"
import { HERO_EVENTS } from "./types"
import EventBus from "../../core/eventBus/EventBus"
import { ICoordinate } from "../../core/inputHandler/types"

export class HeroController {

    private model!: HeroModel
    private view!: HeroView

    private onMove!: (position: ICoordinate) => void
    private onPickUpAnimal!: (animal: Container) => void

    init(app: Application) {
        this.model = new HeroModel()
        this.view = new HeroView();
        this.onPickUpAnimal = this._onPickUpAnimal.bind(this);
        this.onMove = this._onMove.bind(this);

        this.initView(app);
        this.addListeners();
    }

    private addListeners() {
        EventBus.on(HERO_EVENTS.MOVE, this.onMove);
        EventBus.on(HERO_EVENTS.PICK_UP_ANIMAL, this.onPickUpAnimal);
    }

    private _onMove(position: ICoordinate) {
        this.model.target = position;
    }

    private _onPickUpAnimal(animal: Container) {
        if (this.model.animals.includes(animal.label) || this.model.animals.length >= 5) return;

        this.model.animals.push(animal.label);
    }

    private initView(app: Application) {
        app.stage.addChild(this.view.root);
    }
  }