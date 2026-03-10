import { Application } from "pixi.js"
import { HeroModel } from "./HeroModel"
import { HeroView } from "./HeroView"
import { HERO_EVENTS } from "./types"
import EventBus from "../../core/eventBus/EventBus"
import { ENGINE_EVENTS } from "../engine/types"
import { SoundManagerInstance } from "../../core/soundManager/SoundManager"
import { CORE_EVENTS } from "../../core/eventBus/type"

export class HeroController {

    private model!: HeroModel
    private view!: HeroView

    private onRemoveAnimal!: (animal: string) => void
    private onPickUpAnimal!: (animal: string) => void
    private onAdditionalResourcesLoaded!: () => void

    init(app: Application) {
        this.model = new HeroModel()
        this.view = new HeroView(this.model.speed);
        this.onPickUpAnimal = this._onPickUpAnimal.bind(this);
        this.onRemoveAnimal = this._onRemoveAnimal.bind(this);
        this.onAdditionalResourcesLoaded = this._onAdditionalResourcesLoaded.bind(this);

        app.stage.addChild(this.view.root);
        this.addListeners();
    }

    private addListeners() {
        EventBus.on(HERO_EVENTS.PICK_UP_ANIMAL_REQUEST, this.onPickUpAnimal);
        EventBus.on(ENGINE_EVENTS.REMOVE_ANIMAL, this.onRemoveAnimal);
        EventBus.on(CORE_EVENTS.ADDITIONAL_RESOURCES_LOADED, this.onAdditionalResourcesLoaded)
    }

    private _onPickUpAnimal(animal: string) {
        if (this.model.animals.length >= this.model.animalsLimit) return;

        this.model.animals.push(animal);
        EventBus.emit(HERO_EVENTS.PICK_UP_ANIMAL_APPROVED, animal);
        this.view.animalCountUpdated(this.model.animals.length >= this.model.animalsLimit ? 'MAX' : this.model.animals.length.toString());
        SoundManagerInstance.playSound('pickupSound');
    }

    private _onRemoveAnimal(animal: string) {
        this.model.animals = this.model.animals.filter(a => a !== animal);
        this.view.animalCountUpdated(this.model.animals.length.toString());
        SoundManagerInstance.playSound('cowPark', 2);
    }

    private _onAdditionalResourcesLoaded() {
        this.view.animationsReady = true;
    }
  }