import { useState, useEffect, useCallback } from 'react';

import TabBar from '@/components/common/TabBar';
import { DOMAIN_NAME } from '@/common/constants/domain';
import { DebugLog } from "@/common/functions/dev";

import Modal, { ModalConsumerProps } from "@/components/common/Modal";
import { useUpdateManager } from "@/hooks/useUpdateManager";

import { useSettingsStore } from "@/stores/SettingsStore";
import { ChangeableSettings } from "@/stores/SettingsStore/SettingsStoreTypes";
import { DEFAULT_SETTINGS } from "@/stores/SettingsStore/SettingsStoreConstants";
import { useAccountStore } from '@/stores/AccountStore';
import { AccountContextType, AccountData } from '@/stores/AccountStore/AccountStoreTypes';
import { DEFAULT_ACCOUNT_DATA } from '@/stores/AccountStore/AccountStoreConstants';
import { generateAccountId } from '@/stores/AccountStore/AccountStoreFunctions';

import { AccountSettings, AccountSettingsProps, FavoritesOverview, PendingChangesModal, SettingsContent } from './components';

const debugLog = DebugLog(DebugLog.DEBUGS.settingsModal);

const toChangeable = (settings: ChangeableSettings): ChangeableSettings => ({
  showAll: settings.showAll,
  wrap: settings.wrap,
  preferredTabs: { ...settings.preferredTabs },
});

export default function SettingsModal(props: ModalConsumerProps) {
  const SettingsStore = useSettingsStore();
  const accounts = useAccountStore(state => state.accounts);
  const selectedAccountName = useAccountStore(state => state.selectedAccountName);
  const replaceAccounts = useAccountStore(state => state.replaceAccounts);
  const {
    appVersion,
    isCheckingForUpdates,
    checkForUpdates,
    isElectronApp
  } = useUpdateManager();

  const [pendingSettings, setPendingSettings] = useState<ChangeableSettings>(() => toChangeable(SettingsStore.changeableSettings));
  const [pendingAccounts, setPendingAccounts] = useState<AccountContextType>(() => ({ ...accounts }));
  const [pendingSelectedAccountName, setPendingSelectedAccountName] = useState(selectedAccountName);
  const [showPendingChangesModal, setShowPendingChangesModal] = useState(false);

  const openSnapshot = JSON.stringify({ pendingSettings, pendingAccounts, pendingSelectedAccountName });
  const [snapshot, setSnapshot] = useState(openSnapshot);
  const isDirty = openSnapshot !== snapshot;

  useEffect(() => {
    if (props.open) {
      const cs = toChangeable(SettingsStore.changeableSettings);
      const accs = { ...accounts };
      const selName = selectedAccountName;
      setPendingSettings(cs);
      setPendingAccounts(accs);
      setPendingSelectedAccountName(selName);
      setSnapshot(JSON.stringify({ pendingSettings: cs, pendingAccounts: accs, pendingSelectedAccountName: selName }));
      setShowPendingChangesModal(false);
    }
  }, [props.open]);

  const handleCloseAttempt = useCallback(() => {
    if (isDirty) {
      setShowPendingChangesModal(true);
    } else {
      props.onClose();
    }
  }, [isDirty, props.onClose]);

  const handleSave = useCallback(() => {
    debugLog('Saving settings', pendingSettings);
    SettingsStore.updateAndSaveSettings(pendingSettings);
    replaceAccounts(pendingAccounts, pendingSelectedAccountName);
    setShowPendingChangesModal(false);
    props.onClose();
  }, [pendingSettings, pendingAccounts, pendingSelectedAccountName]);

  const handleDiscard = useCallback(() => {
    setShowPendingChangesModal(false);
    props.onClose();
  }, [props.onClose]);

  const handleReset = useCallback(() => {
    if (confirm('Are you sure you want to reset settings?')) {
      const { updated, newUser, ...defaults } = DEFAULT_SETTINGS;
      setPendingSettings(defaults);
    }
  }, []);

  const handleSettingChange = useCallback(<K extends keyof ChangeableSettings>(key: K, value: ChangeableSettings[K]) => {
    setPendingSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleAccountSelect = useCallback((name: string) => {
    setPendingSelectedAccountName(name);
  }, []);

  const handleAccountAdd = useCallback((name: string, data: AccountData) => {
    setPendingAccounts(prev => ({ ...prev, [name]: data }));
    setPendingSelectedAccountName(name);
  }, []);

  const handleAccountDelete = useCallback((name: string) => {
    setPendingAccounts(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
    const remaining = Object.keys(pendingAccounts).filter(n => n !== name);
    setPendingSelectedAccountName(remaining[0] ?? '');
  }, [pendingAccounts]);

  const handleAccountRename = useCallback((oldName: string, newName: string) => {
    setPendingAccounts(prev => {
      const next: AccountContextType = {};
      for (const [key, val] of Object.entries(prev)) {
        next[key === oldName ? newName : key] = val;
      }
      return next;
    });
    if (pendingSelectedAccountName === oldName) {
      setPendingSelectedAccountName(newName);
    }
  }, [pendingSelectedAccountName]);

  const handleAccountDataChange = useCallback((name: string, update: Partial<AccountData>) => {
    setPendingAccounts(prev => ({
      ...prev,
      [name]: { ...(prev[name] ?? { ...DEFAULT_ACCOUNT_DATA, id: generateAccountId() }), ...update } as AccountData,
    }));
  }, []);

  const accountSettingsProps: AccountSettingsProps = {
    pendingAccounts,
    pendingSelectedAccountName,
    onAccountSelect: handleAccountSelect,
    onAccountAdd: handleAccountAdd,
    onAccountDelete: handleAccountDelete,
    onAccountRename: handleAccountRename,
    onAccountDataChange: handleAccountDataChange,
  };

  return props.open ? (
    <>
      <Modal {...props} className="settings-modal" interceptClose={handleCloseAttempt}>
        <h1>{DOMAIN_NAME} Settings</h1>
        <TabBar direction='vertical' tabs={[
          ['General', {
            title: 'General',
            content: <SettingsContent settings={pendingSettings} onSettingChange={handleSettingChange} />
          }],
          ['Account', {
            title: 'Account',
            content: <AccountSettings {...accountSettingsProps} />
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
                    disabled={isCheckingForUpdates}
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
          {SettingsStore.hasCustomSettings && (
            <button type="button" className="danger secondary" onClick={handleReset}>Reset settings</button>
          )}
          <button type="button" className="brand primary" onClick={handleSave}>Save settings</button>
        </div>
      </Modal>
      <PendingChangesModal
        open={showPendingChangesModal}
        onSave={handleSave}
        onDiscard={handleDiscard}
        onCancel={() => setShowPendingChangesModal(false)}
      />
    </>
  ) : null;
}
