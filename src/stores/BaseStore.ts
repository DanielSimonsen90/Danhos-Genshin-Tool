type Callback<Args extends any[] = any[]> = (...args: Args) => void;
export type BaseEventsMap = {
  any: [eventName: string, ...args: any[]];
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
    if (!this.__events.has(event)) this.__events.set(event, []);
    if (this.__get(event).includes(callback)) return;
    
    this.__events.set(event, [...this.__get(event), callback]);
  }
  public off<EventName extends keyof Events, Args extends Events[EventName]>(event: EventName, callback: Callback<Args>) {
    if (!this.__events.has(event)) return;
    this.__events.set(event, this.__get(event).filter(cb => cb !== callback));
  }

  public emit<EventName extends keyof Events, Args extends Events[EventName]>(event: EventName, ...args: Args) {
    // @ts-ignore
    this.__get('any').forEach(cb => cb(event, ...args))
    this.__get(event).forEach(cb => cb(...args));
  }
}