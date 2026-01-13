import { useState, useEffect } from "react";

import { Settings } from "@/common/types/app-types";

import { CharacterImage } from "@/components/common/media/Images";
import { Select, Switch } from "@/components/common/FormItems";

import { WorldRegion, Traveler } from "@/stores/AccountStore/AccountStoreTypes";
import { DEFAULT_ACCOUNT_DATA, WORLD_REGIONS } from "@/stores/AccountStore/AccountStoreConstants";
import { classNames } from "@/common/functions/strings";
import { descriptions, titles } from "./constants";
import { useAccountStore } from "@/stores/AccountStore";

type Props<Setting extends keyof Settings> = {
  setting: Setting;
  hideLabel?: boolean;
  value: Settings[Setting];
  setValue?: (value: Settings[Setting]) => void;
} & (Setting extends 'selectedAccount' 
  ? { accountNames: Array<string>; } 
    : { accountNames?: undefined; });

export default function SettingsOption<Setting extends keyof Settings>(props: Props<Setting>) {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onChange = (value: Settings[Setting]) => {
    setValue(value);
    props.setValue?.(value);
  };

  return props.setting === 'updated' || props.setting === 'newUser' ? null : (
    <div className="settings-option">
      <div className={classNames("input-group", `setting-${props.setting}`)}>
        <aside>
          {!props.hideLabel && <label>{titles[props.setting]}</label>}
          {!props.hideLabel && descriptions[props.setting] && (
            <p className="description muted">{descriptions[props.setting]}</p>
          )}
        </aside>
        <InputType {...props as any} value={value} onChange={onChange} />
      </div>
    </div>
  );
}


type InputProps<Setting extends keyof Settings> = Props<Setting> & {
  onChange: (value: Settings[Setting]) => void;
};
function InputType<Setting extends keyof Settings>({ setting, value, onChange, ...props }: InputProps<Setting>) {
  switch (setting) {
    case 'showAll': return <Switch name={setting} enabled={value as Settings['showAll']} onChange={value => onChange(value as Settings[Setting])} />;
    case 'wrap': return <Switch name={setting} enabled={value as Settings['wrap']} onChange={value => onChange(value as Settings[Setting])} />;

    case 'worldRegion': return <Select name={setting} options={Object.values(WORLD_REGIONS)} value={value as WorldRegion} onChange={value => onChange(value as Settings[Setting])} />;
    case 'traveler': return (() => {
      const [traveler, setTraveler] = useState(value as Traveler);

      return (
        <div className="traveler-select">
          <CharacterImage character={traveler ?? DEFAULT_ACCOUNT_DATA['traveler']} />
          <Select name={setting}
            options={Array.of<Traveler>('lumine', 'aether')}
            displayValue={value => value.charAt(0).toUpperCase() + value.slice(1)}
            value={value as Traveler}
            onChange={value => {
              setTraveler(value as Traveler);
              onChange(value as Settings[Setting]);
            }}
          />
        </div>
      );
    })();

    case 'accountCrud': return (() => {
      const accountName = useAccountStore(state => state.selectedAccountName);
      
      return (
        <div className="input-group button-panel">
          <button className='secondary danger'>Delete {accountName}</button>
          <button className='secondary success'>Add new account</button>
        </div>
      );
    })();
    case 'selectedAccountName': return (
      <>
        <input type="text"
          name={setting}
          value={value as string}
          onChange={e => onChange(e.target.value as Settings[Setting])}
        />
      </>
    );
    case 'selectedAccount': return (
      <Select
        name="selectedAccountName"
        options={props.accountNames ?? []}
        value={value as Settings['selectedAccount']}
        onChange={value => onChange(value as Settings[Setting])}
      />
    )

    case 'preferredTabs': return (
      <div className="preferred-tabs-setting">
        <div className="input-group">
          <label htmlFor={`${setting}.${'results' as keyof Settings['preferredTabs']}`}>
            Prefer selected tab, when using the Artifact Helper
          </label>
          <Select
            name={`${setting}.${'results' as keyof Settings['preferredTabs']}`}
            options={['combined', 'artifacts', 'characters'] as Array<Settings['preferredTabs']['results']>}
            value={(value as Settings['preferredTabs']).results}
            onChange={value => onChange(value as any)}
          />
        </div>
        <div className="input-group">
          <label htmlFor={`${setting}.${'searchOrHistory' as keyof Settings['preferredTabs']}`}>
            Prefer default tab to be search or history, when viewing the Artifact Helper
          </label>
          <Select
            name={`${setting}.${'searchOrHistory' as keyof Settings['preferredTabs']}`}
            options={['search', 'history'] as Array<Settings['preferredTabs']['searchOrHistory']>}
            value={(value as Settings['preferredTabs']).searchOrHistory}
            onChange={value => onChange(value as any)}
          />
        </div>
        <div className="input-group">
          <label htmlFor={`${setting}.${'craftableMaterial' as keyof Settings['preferredTabs']}`}>
            Prefer craftable materials to be of variant "common" or "rarest"
          </label>
          <Select
            name={`${setting}.${'craftableMaterial' as keyof Settings['preferredTabs']}`}
            options={['common', 'rarest'] as Array<Settings['preferredTabs']['craftableMaterial']>}
            value={(value as Settings['preferredTabs']).craftableMaterial}
            onChange={value => onChange(value as any)}
          />
        </div>
      </div>
    );
    default: {
      console.error(`Unknown setting: ${setting}`);
      return null;
    }
  }
}