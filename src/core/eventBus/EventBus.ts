export class EventBus {
  private listeners: {
    [key: string]: Set<(payload: unknown) => void>;
  } = {};

  on(event: string, handler: (payload: any) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set();
    }

    this.listeners[event]!.add(handler);
  }

  off(event: string, handler: (payload: any) => void) {
    this.listeners[event]?.delete(handler);
  }

  emit(event: string, payload?: any) {
    this.listeners[event]?.forEach(handler => handler(payload));
  }
}

export default new EventBus();
