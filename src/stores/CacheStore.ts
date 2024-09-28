import { ExpectedFormData } from "@/common/types/store-data";

type DefaultValue = {} | [];
type DefaultValueString = '[]' | '{}';
type Cache = {
  searchHistory: Record<string, ExpectedFormData>;
} & {
  [key: string]: DefaultValue;
};

type CacheKeys = keyof Cache;
type CacheItem = Cache[CacheKeys];

export const CacheStore = new class CacheStore {
  public cache = new Proxy({} as Cache, {
    get: (target, key: string) => {
      return target[key] ?? this.get(key as CacheKeys, '{}');
    },
    set: (target, key: string, value: CacheItem) => {
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
  public set(key: CacheKeys, value: CacheItem): void {
    this.cache[key] = value;
  }
  public update<TKey extends CacheKeys>(key: TKey, value: Cache[TKey], defaultValue: DefaultValueString): void {
    this.cache[key] = Array.isArray(this.get(key, defaultValue))
      ? [...this.cache[key] as Array<CacheItem>, ...value as Array<CacheItem>]
      : { ...this.cache[key], ...value };
  }
  public delete(key: CacheKeys): void {
    delete this.cache[key];
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

  public clear(): void {
    for (const key in this.cache) this.delete(key as CacheKeys);
  }

  public save(key: CacheKeys): void {
    localStorage.setItem(key.toString(), JSON.stringify(this.cache[key]));
  }
  public load(key: CacheKeys, defaultValue: DefaultValueString): void {
    this.cache[key] = JSON.parse(localStorage.getItem(key.toString()) || defaultValue);
  }
};
export default CacheStore;