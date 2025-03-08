import { AppSettings } from "./SettingsStoreTypes";
import { useSettingsStore } from "./SettingsStore";

export function useSetting<TKey extends keyof AppSettings>(key: TKey) {
  const store = useSettingsStore();

  return {
    get: () => store.getSetting(key),
    set: (value: AppSettings[TKey]) => store.updateSettings({ [key]: value }),
  };
}

type UseSettingsReturn<TKeys extends Array<keyof AppSettings>> = { 
  [K in TKeys[number]]: {
    get(): AppSettings[K];
    set(value: AppSettings[K]): void;
  }
};
export function useSettings<TKeys extends Array<keyof AppSettings>>(...keys: TKeys): UseSettingsReturn<TKeys> {
  const store = useSettingsStore();
  return keys.reduce((acc, key) => {
    acc[key] = {
      get: () => store.getSetting(key),
      set: (value: AppSettings[typeof key]) => store.updateSettings({ [key]: value }),
    }
    return acc;
  }, {} as any) as UseSettingsReturn<TKeys>;
}