import SettingsOption from "../SettingsOption/SettingsOption";
import { Settings } from '@/common/types/app-types';

type Props = {
  settings: Record<string, any>;
  accountNames?: Array<string>;
}
export default function SettingsContent({ settings, accountNames }: Props) {
  return (
    <section className="settings-content">
      {Object.entries(settings).map(([key, value]) => (
        <SettingsOption key={key}
          setting={key as keyof Settings}
          value={value as Settings[keyof Settings]}
          accountNames={accountNames}
        />
      ))}
    </section>
  );
}