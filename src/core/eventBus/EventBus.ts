import { IEventBus } from './type';

export class EventBus implements IEventBus {
  private listeners: Map<string, Set<(payload: unknown) => void>> = new Map();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(event: string, handler: (payload: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)!.add(handler);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  off(event: string, handler: (payload: any) => void) {
    this.listeners.get(event)?.delete(handler);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(event: string, payload?: any) {
    this.listeners.get(event)?.forEach(handler => handler(payload));
  }
}

export default new EventBus();
