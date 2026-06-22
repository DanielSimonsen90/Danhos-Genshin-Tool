import { ChangeableSettings } from '@/stores/SettingsStore/SettingsStoreTypes';
import { Settings } from '@/common/types/app-types';
import SettingsOption from '../SettingsOption/SettingsOption';

type Props = {
  settings: ChangeableSettings;
  onSettingChange: <K extends keyof ChangeableSettings>(key: K, value: ChangeableSettings[K]) => void;
};

export default function SettingsContent({ settings, onSettingChange }: Props) {
  return (
    <section className="settings-content">
      {(Object.entries(settings) as Array<[keyof ChangeableSettings, any]>).map(([key, value]) => (
        <SettingsOption
          key={key}
          setting={key as keyof Settings}
          value={value}
          setValue={v => onSettingChange(key, v as ChangeableSettings[typeof key])}
        />
      ))}
    </section>
  );
}
