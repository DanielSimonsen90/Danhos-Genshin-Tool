import { DOMAIN_NAME } from '@/common/constants/domain';
import { DebugLog } from "@/common/functions/dev";
import { Settings } from '@/common/types/app-types';

import Modal, { ModalConsumerProps } from "@/components/common/Modal";
import { useActionState } from "@/hooks/useActionState";

import { useSettingsStore } from "@/stores/SettingsStore";
import { useFavoriteStoreProvider } from '@/stores/FavoriteStore';
import { useRegionStore } from '@/stores/RegionStore';

import SettingsOption from "./components/SettingsOption";
import Collapsible from '@/components/common/Collapsible';
import FavoritesOverview from './components/FavoritesOverview';

const debugLog = DebugLog(DebugLog.DEBUGS.settingsModal);

export default function SettingsModal(props: ModalConsumerProps) {
  const SettingsStore = useSettingsStore();
  const FavoriteStore = useFavoriteStoreProvider();
  const RegionStore = useRegionStore();
  const [submitting, onSubmit] = useActionState<Settings>(data => {
    delete data._form;
    debugLog('Settings update received', data);
    SettingsStore.updateAndSaveSettings(data);
    RegionStore.setRegionData({
      ...data,
      selected: true,
    });
    props.onClose();
  });

  const onReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (confirm('Are you sure you want to reset settings?')) {
      SettingsStore.resetSettings();
      props.onClose();
    }
  };

  return props.open ? (
    <Modal {...props} className="settings-modal">
      <h1>{DOMAIN_NAME} Settings</h1>
      <p>Here are list of settings, you can change to better your experience.</p>
      <form onSubmit={onSubmit}>
        {Object.entries(Object.assign({}, SettingsStore.changeableSettings, RegionStore.regionSettings)).map(([key, value]) => (
          <SettingsOption key={key} setting={key as keyof Settings} value={value as Settings[keyof Settings]} />
        ))}

        <Collapsible title="Manage Favorites">
          <FavoritesOverview />
        </Collapsible>

        <div className="button-panel">
          {SettingsStore.hasCustomSettings && <button type="reset" className="danger secondary" disabled={submitting} onClick={onReset}>Reset settings</button>}
          <button type="submit" className="brand primary" disabled={submitting}>Save settings</button>
        </div>
      </form>
    </Modal>
  ) : null;
}