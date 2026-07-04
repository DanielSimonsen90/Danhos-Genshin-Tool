import { SetStateAction } from "react";

import ObjectUtils from "@/common/functions/object";
import { DebugLog } from "@/common/functions/dev";
import StoreBuilder from "@/stores/_baseStore/StoreBuilder";

import { DEFAULT_SETTINGS } from "../SettingsStoreConstants";
import { AppSettings } from "../SettingsStoreTypes";
import stateSlice from "./state.slice";

const debugLog = DebugLog(DebugLog.DEBUGS.settingsStore);

const validSettingsKeys = ObjectUtils.keysOf(DEFAULT_SETTINGS);
const persistedSettingsKeys = validSettingsKeys.filter(key => (
  key !== "updated" 
  && key !== "newUser"
));

function filterValidSettings(settings: Partial<AppSettings>): Partial<AppSettings> {
  return ObjectUtils.keysOf(settings).reduce((acc, key) => {
    if (validSettingsKeys.includes(key)) {
      // @ts-expect-error - We are filtering the keys, so this assertion is safe
      acc[key] = settings[key];
    }

    return acc;
  }, {} as Partial<AppSettings>);
}

function toPersistedSettings(settings: Partial<AppSettings>): AppSettings {
  return persistedSettingsKeys.reduce((acc, key) => {
    // @ts-expect-error - We are filtering the keys, so this assertion is safe
    acc[key] = settings[key];
    return acc;
  }, { updated: undefined } as AppSettings);
}

export default new StoreBuilder()
  .addSlice(stateSlice)
  .addApi(({ get, set }) => {
    function getSetting<TKey extends keyof AppSettings>(key: TKey) {
      return get().settings[key];
    }

    function updateSettings(update: SetStateAction<Partial<AppSettings>>, override?: boolean): void;
    function updateSettings(update: SetStateAction<AppSettings>, override: true): void;
    function updateSettings(
      update: SetStateAction<Partial<AppSettings>> | SetStateAction<AppSettings>,
      override?: boolean,
    ) {
      const resolvedUpdate = ObjectUtils.resolveFunctionable(update, [get().settings]);
      const filteredUpdate = filterValidSettings(resolvedUpdate);

      debugLog("Settings update", resolvedUpdate);
      debugLog("Filtered settings update", filteredUpdate);

      set({
        settings: {
          ...(override ? {} as AppSettings : get().settings),
          ...filteredUpdate,
          updated: Date.now(),
        },
      });
    }

    function saveSettings(update?: SetStateAction<Partial<AppSettings>>) {
      const currentSettings = get().settings;
      const resolvedUpdate = (
        update
          ? ObjectUtils.resolveFunctionable(update, [currentSettings])
          : currentSettings
      );

      const nextSettings = {
        ...currentSettings,
        ...resolvedUpdate,
      };
      const filteredSettings = toPersistedSettings(nextSettings);

      debugLog("Settings saved", filteredSettings);

      const newInitialSettings = { ...filteredSettings };
      set({
        initialSettings: newInitialSettings,
        settings: newInitialSettings,
      });
    }

    function updateAndSaveSettings(update: SetStateAction<Partial<AppSettings>>): void;
    function updateAndSaveSettings(update: SetStateAction<AppSettings>, override: true): void;
    function updateAndSaveSettings(
      update: SetStateAction<Partial<AppSettings>> | SetStateAction<AppSettings>,
      override?: boolean,
    ) {
      const resolvedUpdate = ObjectUtils.resolveFunctionable(update, [get().settings]);

      updateSettings(resolvedUpdate, override);
      saveSettings(resolvedUpdate);
    }

    function resetSettings() {
      updateAndSaveSettings(DEFAULT_SETTINGS);
    }

    return {
      getSetting,
      updateSettings,
      saveSettings,
      updateAndSaveSettings,
      resetSettings,
    };
  });