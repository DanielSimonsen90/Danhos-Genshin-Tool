import StoreBuilder, { type InferStoreType } from '../_baseStore/StoreBuilder';
import ObjectUtils from '@/common/functions/object';
import { LOCAL_STORAGE_KEY } from './SettingsStoreConstants';
import slices from './slices';

const SettingsStore = new StoreBuilder()
  .addSlice(slices)
  .addPersistence({
    key: LOCAL_STORAGE_KEY,
    stringify: ({ settings }) => JSON.stringify({
      settings: ObjectUtils.exclude(settings, 'updated', 'newUser'),
    }),
  })
  .buildStore();

export default SettingsStore;
export type SettingsStoreType = InferStoreType<typeof SettingsStore>;
export const useSettingsStore = SettingsStore.useStore;