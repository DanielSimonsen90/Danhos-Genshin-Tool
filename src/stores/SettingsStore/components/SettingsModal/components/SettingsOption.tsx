import { useState } from "react";

import { Settings } from "@/common/types/app-types";

import { CharacterImage } from "@/components/common/media/Images";
import { Select, Switch } from "@/components/common/FormItems";

import { WorldRegion, Traveler } from "@/stores/RegionStore/RegionStoreTypes";
import { DEFAULT_REGION_DATA, REGIONS } from "@/stores/RegionStore/RegionStoreConstants";

type Props<Setting extends keyof Settings> = {
  setting: Setting;
  hideLabel?: boolean;
  value: Settings[Setting];
  setValue?: (value: Settings[Setting]) => void;
};
export default function SettingsOption<Setting extends keyof Settings>(props: Props<Setting>) {
  const [value, _setValue] = useState(props.value);
  const setValue = (value: Settings[Setting]) => {
    _setValue(value);
    props.setValue?.(value);
  };

  return props.setting === 'updated' || props.setting === 'newUser' ? null : (
    <div className="input-group">
      {!props.hideLabel && <label>{titles[props.setting]}</label>}
      <InputType {...props} value={value} onChange={setValue} />
    </div>
  );
}


const titles: Record<keyof Settings, string> = {
  // App settings
  showAll: 'Show all search results',
  wrap: 'Wrap search results',
  preferredTabs: 'Preferred tabs',
  
  // Region settings
  traveler: 'Preferred Traveler image',
  region: 'Preferred region',

  // Internal App settings
  updated: 'Last updated',
  newUser: 'Internal "new user" flag',
};


type InputProps<Setting extends keyof Settings> = Props<Setting> & {
  onChange: (value: Settings[Setting]) => void;
}
function InputType<Setting extends keyof Settings>({ setting, value, onChange }: InputProps<Setting>) {
  switch (setting) {
    case 'showAll': return <Switch name={setting} enabled={value as Settings['showAll']} onChange={value => onChange(value as Settings[Setting])} />;
    case 'wrap': return <Switch name={setting} enabled={value as Settings['wrap']} onChange={value => onChange(value as Settings[Setting])} />;
    case 'region': return <Select name={setting} options={Object.values(REGIONS)} value={value as WorldRegion} onChange={value => onChange(value as Settings[Setting])} />;
    case 'traveler': return (() => {
      const [traveler, setTraveler] = useState(value as Traveler);  

      return (<>
        <CharacterImage character={traveler ?? DEFAULT_REGION_DATA['traveler']} />
        <Select name={setting}
          options={Array.of<Traveler>('lumine', 'aether')}
          value={value as Traveler}
          onChange={value => {
            setTraveler(value as Traveler);
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
        onChange={value => onChange(value as any)}
      />
      <Select
        name={`${setting}.${'searchOrHistory' as keyof Settings['preferredTabs']}`}
        options={['search', 'history'] as Array<Settings['preferredTabs']['searchOrHistory']>}
        value={(value as Settings['preferredTabs']).searchOrHistory}
        onChange={value => onChange(value as any)}
      />
      <Select
        name={`${setting}.${'craftableMaterial' as keyof Settings['preferredTabs']}`}
        options={['common', 'rarest'] as Array<Settings['preferredTabs']['craftableMaterial']>}
        value={(value as Settings['preferredTabs']).craftableMaterial}
        onChange={value => onChange(value as any)}
      />
    </>);
    default: {
      console.error(`Unknown setting: ${setting}`);
      return null;
    }
  }
}