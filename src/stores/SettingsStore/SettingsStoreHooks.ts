import { SetStateAction, useContext } from "react";
import { AppSettings } from "./SettingsStoreTypes";
import { GlobalStoresContext } from "../GlobalStoresConstants";

export const useSettingsStore = () => useContext(GlobalStoresContext).SettingsStore;
export function useSetting<TKey extends keyof AppSettings>(key: TKey) {
  const store = useSettingsStore();
  return [store.getSetting(key), (value: AppSettings[TKey]) => store.updateSettings({ [key]: value })] as const;
}

type UseSettingsReturn<TKeys extends Array<keyof AppSettings>> = { 
  [K in TKeys[number]]: AppSettings[K];
};
export function useSettings<TKeys extends Array<keyof AppSettings>>(...keys: TKeys): UseSettingsReturn<TKeys> {
  const store = useSettingsStore();
  return keys.reduce((acc, key) => {
    acc[key] = store.getSetting(key);
    return acc;
  }, {} as any) as UseSettingsReturn<TKeys>;
}