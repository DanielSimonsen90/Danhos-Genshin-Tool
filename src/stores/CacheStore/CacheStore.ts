import { DebugLog } from "@/common/functions/dev";
import { BaseStore } from "../BaseStore";
import { CacheEventsMap, CacheKeys, DefaultValueString, Cache } from "./CacheStoreTypes";

const debugLog = DebugLog(DebugLog.DEBUGS.cacheStore);

export class CacheStore extends BaseStore<CacheEventsMap> {
  private static _instance: CacheStore;
  public static get instance() {
    return this._instance ??= new CacheStore();
  }
  constructor() { super('CacheStore'); }

  public cache = new Proxy({} as Cache, {
    get: (target: Cache, key: CacheKeys) => {
      return target[key] ?? this.load(key as CacheKeys, '{}');
    },
    set: <TKey extends CacheKeys>(target: Cache, key: TKey, value: Cache[TKey]) => {
      for (const key in value) if (key.startsWith('_')) delete value[key as keyof typeof value];

      target[key] = value;
      this.save(key);
      return true;
    }
  });

  public get<TKey extends CacheKeys>(key: TKey, defaultValue: DefaultValueString): Cache[TKey] | undefined {
    if (!this.has(key)) this.load(key, defaultValue);
    return this.cache[key];
  }
  public set<TKey extends CacheKeys>(key: TKey, value: Cache[TKey]): void {
    debugLog(`Set cache item ${key}`, {
      value, prev: this.cache[key]
    })
    this.cache[key] = value;
    this.emit('set', key, value);
  }
  public update<TKey extends CacheKeys>(key: TKey, value: Cache[TKey], defaultValue: DefaultValueString): void {
    this.cache[key] ?? this.load(key, defaultValue);
    if (typeof this.cache[key] === 'object' && typeof value === 'object') this.cache[key] = { 
      ...this.cache[key] as Exclude<Cache[TKey], string>,
      ...value as Exclude<Cache[TKey], string> 
    };
    else if (typeof this.cache[key] === 'string' && typeof value === 'string') this.cache[key] = value;
    else debugLog(`Update for ${key} did not emit due to type mismatch.`, { key, value, prev: this.cache[key] })
    this.emit('update', value, key);
  }
  public delete(key: CacheKeys): void {
    debugLog(`Cache key "${key}" deleted`, {
      prev: this.cache[key]
    });
    delete this.cache[key];
    this.emit('delete', key);
  }

  public getFromItem<TKey extends CacheKeys, TChildKey extends keyof Cache[TKey]>(
    key: TKey,
    childKey: TChildKey,
    defaultValue: DefaultValueString
  ): Cache[TKey][TChildKey] | undefined {
    return this.get(key, defaultValue)?.[childKey];
  }

  public has(key: CacheKeys): boolean {
    return key in this.cache;
  }
  public findObject<
    TKey extends CacheKeys,
    TChildKey extends keyof Cache[TKey]
  >(key: TKey, callback: (obj: Cache[TKey][TChildKey]) => boolean): Cache[TKey][TChildKey] | undefined {
    const item = this.cache[key];
    if (typeof item !== 'object' && !Array.isArray(item)) return undefined;
    // if (Array.isArray(item)) return item.find(callback);

    return Object.values(item).find(callback) as Cache[TKey][TChildKey];
  }

  public clear(): void {
    for (const key in this.cache) this.delete(key as CacheKeys);
    localStorage.clear();
    this.emit('clear');
  }

  public save(key: CacheKeys): void {
    localStorage.setItem(key.toString(), JSON.stringify(this.cache[key]));
  }
  public load(key: CacheKeys, defaultValue: DefaultValueString): void {
    return this.cache[key] = JSON.parse(localStorage.getItem(key.toString()) || defaultValue);
  }
};
export default CacheStore;