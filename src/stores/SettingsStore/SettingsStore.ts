import { SetStateAction } from 'react';

import ObjectUtils from '@/common/functions/object';
import { DebugLog } from '@/common/functions/dev';

import MemoizeService from '@/services/MemoizeService';

import StoreBuilder from '../StoreBuilder';

import { DEFAULT_SETTINGS, LOCAL_STORAGE_KEY } from './SettingsStoreConstants';
import { AppSettings } from './SettingsStoreTypes';

const debugLog = DebugLog(DebugLog.DEBUGS.settingsStore);
const memoService = new MemoizeService();

const SettingsStore = new StoreBuilder()
  .addState({
    settings: DEFAULT_SETTINGS,
    initialSettings: DEFAULT_SETTINGS,
    hideNotice: false,
  })
  .addApi(({ get, set }) => {
    const setHideNotice = (hide: boolean) => set({ hideNotice: hide });
    const computedHasCustomSettings = () => {
      return memoService.memoize(() => (
        ObjectUtils.isDifferent(get().settings, DEFAULT_SETTINGS)
      ), [get().settings]);
    };
    const computedHasUnsavedChanges = () => {
      const { settings, initialSettings } = get();

      return memoService.memoize(() => {
        const getClone = (settings: AppSettings) => {
          const clone = { ...settings };
          delete clone.updated;
          delete clone.newUser;
          return clone;
        };
        const settingsClone = getClone(settings);
        const initialSettingsClone = getClone(initialSettings);

        const hasUnsavedChanges = ObjectUtils.isDifferent(
          settingsClone,
          initialSettingsClone
        );

        if (hasUnsavedChanges) debugLog('SettingsStore has unsaved changes', {
          current: settingsClone,
          initial: initialSettingsClone
        });

        return hasUnsavedChanges;
      }, [settings, initialSettings]);
    };
    const computedChangeableSettings = () => {
      const { settings } = get();
      return ObjectUtils.exclude(settings, 'newUser', 'updated');
    };

    return {
      setHideNotice,
      get hasCustomSettings() {
        return computedHasCustomSettings();
      },
      get hasUnsavedChanges() {
        return computedHasUnsavedChanges();
      },
      get changeableSettings() {
        return computedChangeableSettings();
      }
    };
  })
  .addApi(({ get, set }) => {
    function getSetting<TKey extends keyof AppSettings>(key: TKey) {
      return get().settings[key];
    }

    function updateSettings(update: SetStateAction<Partial<AppSettings>>, override?: boolean): void;
    function updateSettings(update: SetStateAction<AppSettings>, override: true): void;
    function updateSettings(update: SetStateAction<Partial<AppSettings>> | SetStateAction<AppSettings>, override?: boolean) {
      const resolvedUpdate = ObjectUtils.resolveFunctionable(update, [get().settings]);

      // Filter out character fiter properties that shouldn't be in settings
      const validSettingsKeys = ObjectUtils.keysOf(DEFAULT_SETTINGS).concat(['updated']);
      const filteredUpdate = ObjectUtils.keysOf(resolvedUpdate).reduce((acc, key) => {
        if (validSettingsKeys.includes(key)) {
          acc[key] = resolvedUpdate[key] as any;
        }

        return acc;
      }, {} as Partial<AppSettings>);

      debugLog('Settingsd update', resolvedUpdate);
      debugLog('Filtered settings update', filteredUpdate);

      set({
        settings: {
          ...(override ? {} as AppSettings : get().settings),
          ...filteredUpdate,
          updated: Date.now()
        }
      });
    }

    function saveSettings(update?: SetStateAction<Partial<AppSettings>>) {
      const resolvedUpdate = (
        update
          ? ObjectUtils.resolveFunctionable(update, [get().settings])
          : get().settings
      );

      const validSettingsKeys = Object.keys(DEFAULT_SETTINGS).filter(key => (
        key !== 'updated'
        && key !== 'newUser'
      ));
      const filteredSettings = Object.keys({ ...get().settings, resolvedUpdate }).reduce((acc, key) => {
        if (validSettingsKeys.includes(key)) {
          const source = (
            (resolvedUpdate as any)[key] !== undefined
              ? resolvedUpdate
              : get().settings
          );
          (acc as any)[key] = source;
        }

        return acc;
      }, {} as AppSettings);

      debugLog('Settings saved', filteredSettings);

      const newInitialSettings = { ...filteredSettings };
      set({
        initialSettings: newInitialSettings,
        settings: newInitialSettings
      });
    }

    function updateAndSaveSettings(update: SetStateAction<Partial<AppSettings>>): void;
    function updateAndSaveSettings(update: SetStateAction<AppSettings>, override: true): void;
    function updateAndSaveSettings(update: SetStateAction<Partial<AppSettings>> | SetStateAction<AppSettings>, override?: boolean) {
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
  })
  .addPersistence({
    key: LOCAL_STORAGE_KEY,
    version: 1,
    stringify: ({ settings }) => JSON.stringify({
      settings: (() => {
        if ('updated' in settings) {
          console.trace(`[SettingsStore]: Unwanted properties detected in settings during save.`);
          return ObjectUtils.exclude(settings, 'updated', 'newUser');
        }

        console.trace(`[SettingsStore]: Unwanted properties not detected in settings during save.`);
        return settings;
      })()
    }),
  })
  .buildStore();

export default SettingsStore;
export const useSettingsStore = SettingsStore.useStore;