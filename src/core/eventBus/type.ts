export enum CORE_EVENTS {
  UPDATE = 'UPDATE',
  ADDITIONAL_RESOURCES_LOADED = 'ADDITIONAL_RESOURCES_LOADED',
}

export interface IEventBus {
  on(event: string, handler: (payload: unknown) => void): void;
  off(event: string, handler: (payload: unknown) => void): void;
  emit(event: string, payload?: unknown): void;
}