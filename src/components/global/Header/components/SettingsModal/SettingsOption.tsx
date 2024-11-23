import { useState } from "react";
import { CharacterImage } from "@/components/common/Images";
import Select from "@/components/common/Select";
import Switch from "@/components/common/Switch";
import { Settings } from "@/stores/SettingsStore/SettingsStoreTypes";

type Props<Setting extends keyof Settings> = {
  setting: Setting;
  value: Settings[Setting];
};
export default function SettingsOption<Setting extends keyof Settings>(props: Props<Setting>) {
  const [value, setValue] = useState(props.value);
  
  return props.setting === 'updated' ? null : (
    <div className="input-group">
      <label>{titles[props.setting]}</label>
      <InputType {...props} value={value} onChange={setValue} />
    </div>
  );
}


const titles: Record<keyof Settings, string> = {
  showAll: 'Show all search results',
  wrap: 'Wrap search results',
  traveler: 'Preferred Traveler image',
  preferredTabs: 'Preferred tabs',
  updated: 'Last updated',
};


type InputProps<Setting extends keyof Settings> = Props<Setting> & {
  onChange: (value: Settings[Setting]) => void;
}
function InputType<Setting extends keyof Settings>({ setting, value, onChange }: InputProps<Setting>) {
  switch (setting) {
    case 'showAll': return <Switch name={setting} enabled={value as Settings['showAll']} onChange={value => onChange(value as Settings[Setting])} />;
    case 'wrap': return <Switch name={setting} enabled={value as Settings['wrap']} onChange={value => onChange(value as Settings[Setting])} />;
    case 'traveler': return (() => {
      const [traveler, setTraveler] = useState(value as Settings['traveler']);  

      return (<>
        <CharacterImage character={traveler} />
        <Select name={setting}
          options={Array.of<Settings['traveler']>('lumine', 'aether')}
          value={value as Settings['traveler']}
          onChange={value => {
            setTraveler(value as Settings['traveler']);
            onChange(value as Settings[Setting]);
          }}
        />
      </>)
    })();
    case 'preferredTabs': return (<>
      <Select
        name={`${setting}.${'results' as keyof Settings['preferredTabs']}`}
        options={['combined', 'artifacts', 'characters'] as Array<Settings['preferredTabs']['results']>}
        value={(value as Settings['preferredTabs']).results}
        onChange={value => onChange(value as Settings[Setting])}
      />
      <Select
        name={`${setting}.${'searchOrHistory' as keyof Settings['preferredTabs']}`}
        options={['search', 'history'] as Array<Settings['preferredTabs']['searchOrHistory']>}
        value={(value as Settings['preferredTabs']).searchOrHistory}
        onChange={value => onChange(value as Settings[Setting])}
      />
    </>);
    case 'updated': return null;
    default: {
      console.error(`Unknown setting: ${setting}`);
      return null;
    }
  }
}