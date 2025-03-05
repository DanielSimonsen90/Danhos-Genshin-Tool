import { DOMAIN_NAME } from '@/common/constants/domain';
import { DebugLog } from "@/common/functions/dev";

import { Settings } from '@/common/types/app-types';
import Modal, { ModalConsumerProps } from "@/components/common/Modal";
import { useActionState } from "@/hooks/useActionState";

import { useSettingsStore } from "@/stores/SettingsStore";
import useFavoriteStoreProvider from '@/stores/FavoriteStore';
import { useRegionStore } from '@/stores/RegionStore';

import SettingsOption from "./SettingsOption";

const debugLog = DebugLog(DebugLog.DEBUGS.settingsModal);

export default function SettingsModal(props: ModalConsumerProps) {
  const { settings, resetSettings, updateAndSaveSettings, hasCustomSettings } = useSettingsStore();
  const [favoriteStore] = useFavoriteStoreProvider();
  const { regionData, setRegionData } = useRegionStore();
  const [submitting, onSubmit] = useActionState<Settings>(data => {
    delete data._form;
    debugLog('Settings update recieved', data);
    updateAndSaveSettings(data);
    setRegionData({
      ...data,
      selected: true,
    });
    props.onClose();
  });

  const onReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (confirm('Are you sure you want to reset settings?')) {
      resetSettings();
      props.onClose();
    }
  };

  return props.open ? (
    <Modal {...props} className="settings-modal">
      <h1>{DOMAIN_NAME} Settings</h1>
      <p>Here are list of settings, you can change to better your experience.</p>
      <form onSubmit={onSubmit}>
        {Object.entries(Object.assign({}, settings, regionData)).map(([key, value]) => (
          <SettingsOption key={key} setting={key as keyof typeof settings} value={value as typeof settings[keyof typeof settings]} />
        ))}

        <div className="button-panel">
          {hasCustomSettings && <button type="reset" className="danger secondary" disabled={submitting} onClick={onReset}>Reset settings</button>}
          <button type="submit" className="brand primary" disabled={submitting}>Save settings</button>
        </div>
      </form>
    </Modal>
  ) : null;
}