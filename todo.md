```ts
type BaseStore<TState extends Record<string, StateProxy>> = {
  persistenceKey: string; // Save to localStorage
  toJSON(): string | undefined;
}

type AccountStore = {
  accounts: {
    [accountId: string]: AccountData
  }
  selectedAccountId: string;
  get selectedAccount(): AccountData
  set selectedAccount(value: AccountData): void;
}

type AccountData = {
  id: string;
  worldRegion: WorldRegion;
  traveler: Traveler
  
  // Separate stores?
  priorityLists: PriorityLists;
  favorites: FavoritesCollection;
  settings: AccountSettings;
}

type CacheStore = {
  load<TKey extends CacheKeys>(key: TKey, defaultValue?: any): void;
  clear(): void;
  
  has<TKey extends CacheKeys>(key: TKey): boolean
  findObject<
    TKey extends CacheKeys
    TChildKey extends keyof Cache[TKey]
  >(
    key: TKey,
    callback: (obj: Cache[TKey][TChildKey]) => boolean
  ): Cache[TKey][TChildKey]
  
  set<TKey extends CacheKeys>(key: TKey, value: Cache[TKey]): void;
  get<TKey extends CacheKeys>(key: TKey, defaultValue: Cache[TKey]): Cache[TKey]
  getFromItem<
    TKey extends CacheKeys,
    TChildKey extends keyof Cache[TKey]
  >(
    key: TKey,
    childKey: TChildKey,
    defaultValue: DefaultValueString
  ): Cache[TKey][TChildKey]
  update<TKey extends CacheKeys>(key: TKey, value: Cache[TKey]): void;
  delete<TKey extends CacheKeys>(key: TKey): void;
}
```