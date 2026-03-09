import { Application } from "pixi.js"
import { AnimalModel } from "./AnimalModel"
import { AnimalView } from "./AnimalView"
import { ANIMAL_EVENTS } from "./types"
import EventBus from "../../core/eventBus/EventBus"
import { HERO_EVENTS } from "../hero/types"
import { ICoordinate } from "../../core/inputHandler/types"
import { HUD_EVENTS } from "../hud/types"

export class AnimalController {
    private model!: AnimalModel
    private view!: AnimalView

    private onParkAnimal!: (animal: string) => void
    private onPickUpAnimal!: () => void
    private onFollowHero!: ( target: ICoordinate) => void

    constructor() {
        this.onParkAnimal = this._onParkAnimal.bind(this);
        this.onPickUpAnimal = this._onPickUpAnimal.bind(this);
        this.onFollowHero = this._onFollowHero.bind(this);
    }

    init(app: Application) {
        this.model = new AnimalModel()
        this.view = new AnimalView()

        this.initView(app);

        this.addListeners();
    }

    private initView(app: Application) {
        app.stage.addChild(this.view.root);
    }

    private addListeners() {
        EventBus.on(ANIMAL_EVENTS.PARK_ANIMAL, this.onParkAnimal);
        EventBus.on(HERO_EVENTS.PICK_UP_ANIMAL, this.onPickUpAnimal);
    }

    private removeListeners() {
        EventBus.off(ANIMAL_EVENTS.PARK_ANIMAL, this.onParkAnimal);
        EventBus.off(HERO_EVENTS.PICK_UP_ANIMAL, this.onPickUpAnimal);
        EventBus.off(HERO_EVENTS.MOVE, this.onFollowHero);
    }

    private _onParkAnimal() {
        this.view.destroy();
        this.removeListeners();
        EventBus.emit(HUD_EVENTS.SCORE_UPDATED, 1);
    }

    private _onFollowHero( target: ICoordinate) {
        this.view.target = target;
    }

    private _onPickUpAnimal() {
        this.model.isPickedUp = true;
        this.view.isPickedUp = true;
        EventBus.on(HERO_EVENTS.MOVE, this.onFollowHero);
    }

    private destroy(app: Application) {
        this.view.destroy()
        app.stage.removeChild(this.view.root)
        this.removeListeners();
    }
}