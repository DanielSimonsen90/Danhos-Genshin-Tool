import { pascalCaseFromCamelCase } from "@/common/functions/strings";
import { CharacterImage } from "@/components/common/Images";
import Select from "@/components/common/Select";
import { Settings } from "@/stores/SettingsStore/SettingsStoreTypes";
import { useState } from "react";

type Props<Setting extends keyof Settings> = {
  setting: Setting;
  value: Settings[Setting];
};
export default function SettingsOption<Setting extends keyof Settings>(props: Props<Setting>) {
  return props.setting === 'updated' ? null : (
    <div className="input-group">
      <label>{titles[props.setting]}</label>
      <InputType {...props} />
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

function InputType<Setting extends keyof Settings>({ setting, value }: Props<Setting>) {
  switch (setting) {
    case 'showAll': return <input
      type="checkbox"
      name={setting}
      defaultChecked={value as boolean}
    />;
    case 'wrap': return <input
      type="checkbox"
      name={setting}
      defaultChecked={value as boolean}
    />;
    case 'traveler': return (() => {
      const [traveler, setTraveler] = useState(value as Settings['traveler']);

      return (<>
        <CharacterImage character={traveler} />
        <Select
          name={setting}
          options={Array.of<Settings['traveler']>('lumine', 'aether')}
          defaultValue={value as Settings['traveler']}
          onChange={value => setTraveler(value as Settings['traveler'])}
        />
      </>)
    })();
    case 'preferredTabs': return (<>
      <Select
        name={`${setting}.${'results' as keyof Settings['preferredTabs']}`}
        options={['combined', 'artifacts', 'characters'] as Array<Settings['preferredTabs']['results']>}
        defaultValue={(value as Settings['preferredTabs']).results}
      />
      <Select
        name={`${setting}.${'searchOrHistory' as keyof Settings['preferredTabs']}`}
        options={['search', 'history'] as Array<Settings['preferredTabs']['searchOrHistory']>}
        defaultValue={(value as Settings['preferredTabs']).searchOrHistory}
      />
    </>);
    case 'updated': return null;
    default: return <input 
      type="text" 
      name={setting} 
      value={value as string} 
    />;
  }
}