import { SetStateAction } from "react";
import { create } from "zustand";

import { DebugLog } from "@/common/functions/dev";
import * as ObjectUtils from "@/common/functions/object";

import StorageService from "@/services/StorageService";
import MemoizeService from "@/services/MemoizeService";

import { DEFAULT_SETTINGS, LOCAL_STORAGE_KEY } from './SettingsStoreConstants';
import { AppSettings, ChangeableSettings, SettingsStore } from './SettingsStoreTypes';

const storageService = StorageService<AppSettings>(LOCAL_STORAGE_KEY);
const memoizeService = new MemoizeService();
const debugLog = DebugLog(DebugLog.DEBUGS.settingsStore);

export const useSettingsStore = create<SettingsStore>(((setState, getState) => {
  const initialSettings = (() => {
    const initial = storageService.get() ?? DEFAULT_SETTINGS;
    const validSettingsKeys = Object.keys(DEFAULT_SETTINGS);
    
    return Object.keys(initial).reduce((acc, key) => {
      if (validSettingsKeys.includes(key) || key === 'updated') {
        (acc as any)[key] = (initial as any)[key];
      }
      return acc;
    }, {} as AppSettings);
  })();

  return {
    initialSettings,
    settings: Object.assign({}, initialSettings),

    hideNotice: false,
    setHideNotice: (shouldHide: boolean) => setState({ hideNotice: shouldHide }),

    get hasCustomSettings() {
      return memoizeService.memoize(() => (
        JSON.stringify(getState().settings) !== JSON.stringify(DEFAULT_SETTINGS)
      ), [getState().settings]);
    },
    get hasUnsavedChanges() {
      return memoizeService.memoize(() => {
        const settingsClone = { ...getState().settings };
        const initialSettingsClone = { ...initialSettings };

        // Delete unimportant properties
        delete settingsClone.updated;
        delete settingsClone.newUser;

        delete initialSettingsClone.updated;
        delete initialSettingsClone.newUser;

        const result = JSON.stringify(settingsClone) !== JSON.stringify(initialSettingsClone);
        if (result) debugLog('SettingsStore has unsaved changes', {
          current: settingsClone,
          initial: initialSettingsClone
        });
        return result;
      }, [getState().settings, initialSettings]);
    },
    get changeableSettings(): ChangeableSettings {
      return ObjectUtils.exclude(getState().settings, 'newUser', 'updated');
    },

    getSetting<Key extends keyof AppSettings>(key: Key): AppSettings[Key] | undefined {
      return getState().settings[key];
    }, updateSettings(update: SetStateAction<Partial<AppSettings>>, override?: boolean) {
      const resolvedUpdate = typeof update === 'function' ? update(getState().settings) : update;

      // Filter out character filter properties that shouldn't be in settings
      const validSettingsKeys = Object.keys(DEFAULT_SETTINGS).concat(['updated']);
      const filteredUpdate = Object.keys(resolvedUpdate).reduce((acc, key) => {
        if (validSettingsKeys.includes(key)) {
          (acc as any)[key] = (resolvedUpdate as any)[key];
        }
        return acc;
      }, {} as Partial<AppSettings>);

      debugLog('Settings update', resolvedUpdate);
      debugLog('Filtered settings update', filteredUpdate);

      setState({
        settings: {
          ...(override ? {} as AppSettings : getState().settings),
          ...filteredUpdate,
          updated: Date.now()
        }
      });
    }, saveSettings(update?: SetStateAction<Partial<AppSettings>>) {
      const resolvedUpdate = update
        ? (typeof update === 'function'
          ? update(getState().settings)
          : update
        ) : getState().settings;

      // Filter out character filter properties that shouldn't be in settings
      const validSettingsKeys = Object.keys(DEFAULT_SETTINGS).concat(['updated']);
      const filteredSettings = Object.keys({ ...getState().settings, ...resolvedUpdate }).reduce((acc, key) => {
        if (validSettingsKeys.includes(key)) {
          const source = (resolvedUpdate as any)[key] !== undefined ? resolvedUpdate : getState().settings;
          (acc as any)[key] = (source as any)[key];
        }
        return acc;
      }, {} as AppSettings);

      storageService.set(filteredSettings);
      debugLog('Settings saved', filteredSettings);

      const newInitialSettings = { ...filteredSettings };
      delete newInitialSettings.updated;
      setState({ initialSettings: newInitialSettings });
    },
    updateAndSaveSettings(update: SetStateAction<Partial<AppSettings>>, override?: boolean) {
      const resolvedUpdate = typeof update === 'function' ? update(getState().settings) : update;
      this.updateSettings(resolvedUpdate, override);
      this.saveSettings(resolvedUpdate);
    },
    resetSettings() {
      this.updateAndSaveSettings(DEFAULT_SETTINGS);
    },
  };
}));