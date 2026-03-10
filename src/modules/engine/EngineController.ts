import EventBus from "../../core/eventBus/EventBus";
import { EngineModel } from "./EngineModel";
import { ENGINE_EVENTS } from "./types";

export class EngineController {
    private model!: EngineModel

    private onRemoveAnimal!: () => void

    constructor() {
        this.onRemoveAnimal = this._onRemoveAnimal.bind(this);

        this.init();
    }

    init() {
        this.model = new EngineModel();

        this.runRandomInterval();
        this.aggregateAnimals();
        this.addListeners();
    }

    addListeners() {
        EventBus.on(ENGINE_EVENTS.REMOVE_ANIMAL, this.onRemoveAnimal);
    }

    removeListeners() {
        EventBus.off(ENGINE_EVENTS.REMOVE_ANIMAL, this.onRemoveAnimal);
    }

    private _onRemoveAnimal() {
        this.model.animalsCount--;
    }

    runRandomInterval() {
        const interval = setTimeout(() => {
            this.aggregateAnimals();
            clearTimeout(interval);
            this.runRandomInterval();
        }, Math.random() * this.model.animalsSpawnInterval);
    };

    aggregateAnimals() {
        const animals = this.model.animalsCount;

        if (animals >= this.model.animalsLimit) return;

        EventBus.emit(ENGINE_EVENTS.ADD_ANIMAL);
        this.model.animalsCount++;

    }
}