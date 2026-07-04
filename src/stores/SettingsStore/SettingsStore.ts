import StoreBuilder, { type InferStoreType } from '../_baseStore/StoreBuilder';
import ObjectUtils from '@/common/functions/object';
import { DEFAULT_SETTINGS, LOCAL_STORAGE_KEY } from './SettingsStoreConstants';
import slices from './slices';
import { AppSettings } from './SettingsStoreTypes';

const SettingsStore = new StoreBuilder()
  .setStoreName('SettingsStore')
  .addSlice(slices)
  .addPersistence({
    key: LOCAL_STORAGE_KEY,
    stringify: ({ settings }) => JSON.stringify({
      settings: ObjectUtils.exclude(settings, 'updated', 'newUser'),
    }),
    parse: (raw) => {
      const parsed = JSON.parse(raw);
      // Handle nested format { settings: {...} } and flat format { showAll, wrap, ... }
      const persisted = parsed?.settings && typeof parsed.settings === 'object'
        ? parsed.settings
        : (typeof parsed?.showAll === 'boolean' || typeof parsed?.wrap === 'boolean' ? parsed : null);
      
      const settings: AppSettings = {
        ...DEFAULT_SETTINGS,
        ...(persisted && typeof persisted === 'object' ? persisted : {}),
        newUser: !persisted
      };

      return { 
        settings,
        initialSettings: { ...settings },
        newUser: !persisted,
        hideNotice: true
      };
    },
  })
  .buildStore();

export default SettingsStore;
export type SettingsStoreType = InferStoreType<typeof SettingsStore>;
export const useSettingsStore = SettingsStore.useStore;