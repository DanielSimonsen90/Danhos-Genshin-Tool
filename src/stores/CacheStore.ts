import { SearchFormData } from "@/common/types/store-data";
import { SearchResult } from '@/services/SearchService';
import { BaseStore } from "./BaseStore";

type DefaultValueString = '[]' | '{}';
type Cache = {
  searchHistory: Record<string, SearchFormData>;
  searchResults: Record<string, SearchResult>;
  currentSearch: SearchResult;
};

type CacheKeys = keyof Cache;
type CacheItem = Cache[CacheKeys];

type CacheEventsMap = {
  set: [key: CacheKeys, value: CacheItem];
  update: [value: CacheItem, key: CacheKeys];
  delete: [key: CacheKeys];
  clear: [];
};

export const CacheStore = new class CacheStore extends BaseStore<CacheEventsMap> {
  constructor() { super('CacheStore'); }

  public cache = new Proxy({} as Cache, {
    get: (target: Cache, key: CacheKeys) => {
      return target[key] ?? this.get(key as CacheKeys, '{}');
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
    this.cache[key] = value;
    this.emit('set', key, value);
  }
  public update<TKey extends CacheKeys>(key: TKey, value: Cache[TKey], defaultValue: DefaultValueString): void {
    this.cache[key] = { ...this.cache[key], ...value };
    this.emit('update', value, key);
  }
  public delete(key: CacheKeys): void {
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
    if (Array.isArray(item)) return item.find(callback);

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
    this.cache[key] = JSON.parse(localStorage.getItem(key.toString()) || defaultValue);
  }
};
export default CacheStore;