import { Select } from "@/components/common/FormItems";
import { useConfirm } from "@/providers/ConfirmProvider";
import { useCacheStore } from "@/stores";
import { ChangeableSettings } from "@/stores/SettingsStore/SettingsStoreTypes";
import SettingsOption from "../SettingsOption/SettingsOption";

type Props = {
  settings: ChangeableSettings;
  onSettingChange: <K extends keyof ChangeableSettings>(key: K, value: ChangeableSettings[K]) => void;
};

export default function ArtifactHelperSettings({ settings, onSettingChange }: Props) {
  const confirm = useConfirm();
  const clearHistory = useCacheStore(store => store.clearCache);

  const handleClearHistory = async () => {
    if (await confirm({
      title: 'Clear search history', 
      message: "You're about to clear the search cache. This cannot be undone.", 
      destructive: true 
    })) {
      clearHistory();
    }
  };

  return (
    <section className="settings-content">
      <SettingsOption
        setting="showAll"
        value={settings.showAll}
        setValue={v => onSettingChange('showAll', v)}
      />
      <SettingsOption
        setting="wrap"
        value={settings.wrap}
        setValue={v => onSettingChange('wrap', v)}
      />
      <div className="settings-option">
        <div className="input-group setting-searchOrHistory">
          <aside>
            <label>Default tab</label>
            <p className="description muted">Prefer default tab to be search or history when viewing the Artifact Helper</p>
          </aside>
          <Select
            name="preferredTabs.searchOrHistory"
            options={['search', 'history'] as Array<ChangeableSettings['preferredTabs']['searchOrHistory']>}
            value={settings.preferredTabs.searchOrHistory}
            onChange={v => onSettingChange('preferredTabs', { ...settings.preferredTabs, searchOrHistory: v as ChangeableSettings['preferredTabs']['searchOrHistory'] })}
          />
        </div>
      </div>
      <div className="settings-option">
        <div className="input-group setting-results">
          <aside>
            <label>Default results tab</label>
            <p className="description muted">Prefer selected results tab when using the Artifact Helper</p>
          </aside>
          <Select
            name="preferredTabs.results"
            options={['combined', 'stats', 'set'] as Array<ChangeableSettings['preferredTabs']['results']>}
            value={settings.preferredTabs.results}
            onChange={v => onSettingChange('preferredTabs', { ...settings.preferredTabs, results: v as ChangeableSettings['preferredTabs']['results'] })}
          />
        </div>
      </div>
      <SettingsOption
        setting="cacheEvictionDays"
        value={settings.cacheEvictionDays}
        setValue={v => onSettingChange('cacheEvictionDays', v)}
      />
      <div className="settings-option">
        <div className="input-group setting-clearCache">
          <aside>
            <label>Search history</label>
            <p className="description muted">Permanently delete all saved search history.</p>
          </aside>
          <button type="button" className="danger secondary" onClick={handleClearHistory}>
            Clear history
          </button>
        </div>
      </div>
    </section>
  );
}
