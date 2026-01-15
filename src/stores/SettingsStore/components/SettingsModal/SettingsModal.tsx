import { useMemo } from 'react';

import TabBar from '@/components/common/TabBar';
import { DOMAIN_NAME } from '@/common/constants/domain';
import { DebugLog } from "@/common/functions/dev";
import { Settings } from '@/common/types/app-types';

import Modal, { ModalConsumerProps } from "@/components/common/Modal";
import { useActionState } from "@/hooks/useActionState";
import { useUpdateManager } from "@/hooks/useUpdateManager";

import { useSettingsStore } from "@/stores/SettingsStore";
import { useAccountStore } from '@/stores/AccountStore';

import { AccountSettings, FavoritesOverview, SettingsContent } from './components';

const debugLog = DebugLog(DebugLog.DEBUGS.settingsModal);

export default function SettingsModal(props: ModalConsumerProps) {
  const SettingsStore = useSettingsStore();
  const accounts = useAccountStore(state => state.accounts);
  const selectedAccountName = useAccountStore(state => state.selectedAccountName);
  const accountData = useAccountStore(state => state.accountData);
  const setAccountData = useAccountStore(state => state.setAccountData);
  const setAccountName = useAccountStore(state => state.setAccountName);
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
      traveler: data.traveler,
      worldRegion: data.worldRegion,
      selected: true,
    });

    if (data.selectedAccountName && data.selectedAccountName !== selectedAccountName) {
      setAccountName(data.selectedAccountName);
    }

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
      <form onSubmit={onSubmit}>
        <TabBar direction='vertical' tabs={[
          ['General', {
            title: 'General',
            content: <SettingsContent settings={SettingsStore.changeableSettings} />
          }],
          ['Account', {
            title: 'Account',
            content: <AccountSettings />
          }],
          ['Favorites', {
            title: 'Favorites',
            content: <FavoritesOverview />
          }],
          ['Updates', {
            title: 'Updates',
            content: isElectronApp ? (
              <>
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
              </>
            ) : (
              <p>Application updates are only available in the desktop application.</p>
            )
          }],
        ]} />

        <div className="button-panel">
          {SettingsStore.hasCustomSettings && <button type="reset" className="danger secondary" disabled={submitting} onClick={onReset}>Reset settings</button>}
          <button type="submit" className="brand primary" disabled={submitting}>Save settings</button>
        </div>
      </form>
    </Modal>
  ) : null;
}