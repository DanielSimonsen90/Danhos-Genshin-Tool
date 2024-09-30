type Callback<Args extends any[] = any[]> = (...args: Args) => void;

type BaseEventsMap = {
  [key: string]: any[];
}

export class BaseStore<Events extends BaseEventsMap> {
  protected __events = new Map<keyof Events, Array<Callback<Events[keyof Events]>>>();
  protected __get<EventName extends keyof Events>(event: EventName) {
    return this.__events.get(event) ?? [];
  }

  constructor(name: string) {
    this.name = name.endsWith('Store') ? name : `${name}Store`;
  }

  public readonly name: string;

  public on<EventName extends keyof Events, Args extends Events[EventName]>(event: EventName, callback: Callback<Args>) {
    this.__events.set(event, [...this.__get(event), callback]);
  }
  public off<EventName extends keyof Events, Args extends Events[EventName]>(event: EventName, callback: Callback<Args>) {
    this.__events.set(event, this.__get(event).filter(cb => cb !== callback));
  }

  public emit<EventName extends keyof Events, Args extends Events[EventName]>(event: EventName, ...args: Args) {
    this.__get(event).forEach(cb => cb(...args));
  }
}