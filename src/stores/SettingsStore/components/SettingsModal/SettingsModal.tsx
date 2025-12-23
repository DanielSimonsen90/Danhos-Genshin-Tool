import { DOMAIN_NAME } from '@/common/constants/domain';
import { DebugLog } from "@/common/functions/dev";
import { Settings } from '@/common/types/app-types';

import Modal, { ModalConsumerProps } from "@/components/common/Modal";
import { useActionState } from "@/hooks/useActionState";
import { useUpdateManager } from "@/hooks/useUpdateManager";

import { useSettingsStore } from "@/stores/SettingsStore";
import { useAccountStore } from '@/stores/AccountStore';

import SettingsOption from "./components/SettingsOption";
import Collapsible from '@/components/common/Collapsible';
import FavoritesOverview from './components/FavoritesOverview';
import { useMemo } from 'react';

const debugLog = DebugLog(DebugLog.DEBUGS.settingsModal);

export default function SettingsModal(props: ModalConsumerProps) {
  const SettingsStore = useSettingsStore();
  const accounts = useAccountStore(state => state.accounts);
  const accountData = useAccountStore(state => state.accountData);
  const setAccountData = useAccountStore(state => state.setAccountData);
  const {
    appVersion,
    isCheckingForUpdates,
    checkForUpdates,
    isElectronApp
  } = useUpdateManager();

  const accountNames = useMemo(() => Object.keys(accounts), [accounts]);
  const [submitting, onSubmit] = useActionState<Settings>(data => {
    delete data._form;
    debugLog('Settings update received', data);
    SettingsStore.updateAndSaveSettings(data);
    setAccountData({
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

  const regionSettings = { region: accountData.worldRegion, traveler: accountData.traveler };

  return props.open ? (
    <Modal {...props} className="settings-modal">
      <h1>{DOMAIN_NAME} Settings</h1>
      <p>Here are list of settings, you can change to better your experience.</p>
      <form onSubmit={onSubmit}>
        {Object.entries(Object.assign({}, SettingsStore.changeableSettings, regionSettings)).map(([key, value]) => (
          <SettingsOption key={key} 
            setting={key as keyof Settings} 
            value={value as Settings[keyof Settings]} 
            accountNames={accountNames}
          />
        ))}
        
        <Collapsible title="Manage Favorites">
          <FavoritesOverview />
        </Collapsible>

        {isElectronApp && (
          <Collapsible title="Application Updates">
            <p><strong>Current Version:</strong> {appVersion}</p>
            <p className='muted'>Updates are automatically checked when the application starts.</p>
            <div className="button-panel">
              <button
                type="button"
                className="brand secondary"
                onClick={checkForUpdates}
                disabled={isCheckingForUpdates || submitting}
              >
                {isCheckingForUpdates ? 'Checking...' : 'Check for Updates'}
              </button>
            </div>
          </Collapsible>
        )}

        <div className="button-panel">
          {SettingsStore.hasCustomSettings && <button type="reset" className="danger secondary" disabled={submitting} onClick={onReset}>Reset settings</button>}
          <button type="submit" className="brand primary" disabled={submitting}>Save settings</button>
        </div>
      </form>
    </Modal>
  ) : null;
}