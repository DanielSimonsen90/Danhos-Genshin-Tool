import { Select } from "@/components/common/FormItems";
import { ChangeableSettings } from "@/stores/SettingsStore/SettingsStoreTypes";
import SettingsOption from "../SettingsOption/SettingsOption";

type Props = {
  settings: ChangeableSettings;
  onSettingChange: <K extends keyof ChangeableSettings>(key: K, value: ChangeableSettings[K]) => void;
};

export default function GeneralSettings({ settings, onSettingChange }: Props) {
  return (
    <section className="settings-content">
      <SettingsOption
        setting="defaultLandingPage"
        value={settings.defaultLandingPage}
        setValue={v => onSettingChange('defaultLandingPage', v)}
      />
      <div className="settings-option">
        <div className="input-group setting-craftableMaterial">
          <aside>
            <label>Craftable material variant</label>
            <p className="description muted">Prefer craftable materials to be of variant "common" or "rarest"</p>
          </aside>
          <Select
            name="preferredTabs.craftableMaterial"
            options={['common', 'rarest'] as Array<ChangeableSettings['preferredTabs']['craftableMaterial']>}
            value={settings.preferredTabs.craftableMaterial}
            onChange={v => onSettingChange('preferredTabs', { ...settings.preferredTabs, craftableMaterial: v as ChangeableSettings['preferredTabs']['craftableMaterial'] })}
          />
        </div>
      </div>
    </section>
  );
}
