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
      const persisted = parsed?.settings;
      
      const settings: AppSettings = {
        ...DEFAULT_SETTINGS,
        ...(persisted && typeof persisted === 'object' ? persisted : {}),
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