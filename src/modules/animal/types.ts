import { IBaseView } from '../../core/baseModule/types';
import { ICoordinate } from '../../core/inputHandler/types';

export type AnimalState = 'IDLE' | 'FOLLOW' | 'DELIVERED';

export interface IAnimalView extends IBaseView {
  isPickedUp: boolean;
  target: ICoordinate;
  destroy: () => void;
}

export interface IAnimalModel {
  isPickedUp: boolean;
}
