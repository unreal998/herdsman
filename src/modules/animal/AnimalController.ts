import { Application, Container } from "pixi.js"
import { AnimalModel } from "./AnimalModel"
import { AnimalView } from "./AnimalView"
import EventBus from "../../core/eventBus/EventBus"
import { HERO_EVENTS } from "../hero/types"
import { ICoordinate } from "../../core/inputHandler/types"
import { HUD_EVENTS } from "../hud/types"
import { ENGINE_EVENTS } from "../engine/types"
import { offCollision, onCollision } from "../../core/helpers/collidingDimension"

export class AnimalController {
    private model!: AnimalModel
    private view!: AnimalView

    private onParkAnimal!: ({ a, b }: { a: Container, b: Container }) => void
    private onPickUpAnimal!: ({ a, b }: { a: Container, b: Container }) => void
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
        EventBus.on(ENGINE_EVENTS.REMOVE_ANIMAL, this.onParkAnimal);
        EventBus.on(HERO_EVENTS.PICK_UP_ANIMAL, this.onPickUpAnimal);
        onCollision(this.view.root.label, 'hero', this.onPickUpAnimal);
    }

    private removeListeners() {
        EventBus.off(ENGINE_EVENTS.REMOVE_ANIMAL, this.onParkAnimal);
        EventBus.off(HERO_EVENTS.PICK_UP_ANIMAL, this.onPickUpAnimal);
        EventBus.off(HERO_EVENTS.MOVE, this.onFollowHero);
        offCollision(this.view.root.label, 'hero', this.onPickUpAnimal);
        offCollision(this.view.root.label, 'yard', this.onParkAnimal);
    }

    private _onParkAnimal({ a, b }: { a: Container, b: Container }) {
        if (a.label === this.view.root.label || b.label === this.view.root.label) {
            offCollision(this.view.root.label, 'yard', this.onParkAnimal);
            this.removeListeners();
            this.view.destroy();
            EventBus.emit(HUD_EVENTS.SCORE_UPDATED, 1);
        }
    }

    private _onFollowHero( target: ICoordinate) {
        this.view.target = target;
    }

    private _onPickUpAnimal({ a, b }: { a: Container, b: Container }) {
        if (a.label === this.view.root.label || b.label === this.view.root.label) {
            this.model.isPickedUp = true;
            this.view.isPickedUp = this.model.isPickedUp;
            EventBus.on(HERO_EVENTS.MOVE, this.onFollowHero);
            onCollision(this.view.root.label, 'yard', this.onParkAnimal);
            offCollision(this.view.root.label, 'hero', this.onPickUpAnimal);
        }
    }

    private destroy(app: Application) {
        this.view.destroy()
        app.stage.removeChild(this.view.root)
        this.removeListeners();
    }
}