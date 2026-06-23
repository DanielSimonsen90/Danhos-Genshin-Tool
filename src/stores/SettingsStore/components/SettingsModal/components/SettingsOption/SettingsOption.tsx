import { useState, useEffect } from "react";

import { Settings } from "@/common/types/app-types";
import { ROUTES } from "@/common/constants/routes";

import { CharacterImage } from "@/components/common/media/Images";
import { Select, Switch } from "@/components/common/FormItems";

import { WorldRegion, Traveler } from "@/stores/AccountStore/AccountStoreTypes";
import { DEFAULT_ACCOUNT_DATA, WORLD_REGIONS } from "@/stores/AccountStore/AccountStoreConstants";
import { classNames, pascalCaseFromKebabCase } from "@/common/functions/strings";
import { IS_DEVELOPMENT_ENVIRONMENT } from "@/common/constants/dev";
import { descriptions, titles } from "./constants";
import { useAccountStore } from "@/stores/AccountStore";

type Props<Setting extends keyof Settings> = {
  setting: Setting;
  hideLabel?: boolean;
  value: Settings[Setting];
  setValue?: (value: Settings[Setting]) => void;
} & (
    Setting extends 'selectedAccount'
    ? { accountNames: Array<string> | undefined; }
    : { accountNames?: undefined; }
  ) & (
    Setting extends 'accountCrud'
    ? {
      onAdd(): void;
      onDelete(): void;
    }
    : {
      onAdd?: undefined;
      onDelete?: undefined;
    }
  );

export default function SettingsOption<Setting extends keyof Settings>(props: Props<Setting>) {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onChange = (value: Settings[Setting]) => {
    setValue(value);
    props.setValue?.(value);
  };

  return (
    <div className="settings-option">
      <div className={classNames("input-group", `setting-${props.setting}`)}>
        {!props.hideLabel ? (
          <aside>
            {<label>{titles[props.setting]}</label>}
            {descriptions[props.setting] && (
              <p className="description muted">{descriptions[props.setting]}</p>
            )}
          </aside>
        ) : null}
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

    case 'defaultLandingPage': {
      const routeOptions = [
        { value: '', label: 'Home' },
        ...Object.entries(ROUTES)
          .filter(([key, val]) => (
            typeof val === 'string' 
            && !val.includes(':')
            && key !== ('building_artifact_helper_search' as keyof typeof ROUTES)
            && (IS_DEVELOPMENT_ENVIRONMENT || key !== 'development'))
          )
          .map(([key, val]) => ({
            value: val as string,
            label: pascalCaseFromKebabCase(ROUTES.endRoute(key as keyof typeof ROUTES)),
          })),
      ];
      return (
        <Select
          name={setting}
          options={routeOptions.map(o => o.value)}
          displayValue={v => routeOptions.find(o => o.value === v)?.label ?? v}
          value={value as string}
          onChange={v => onChange(v as Settings[Setting])}
        />
      );
    }
    case 'cacheEvictionDays': return (
      <Select
        name={setting}
        options={['7', '14', '30', '60', '90', '0']}
        displayValue={v => v === '0' ? 'Never' : `${v} days`}
        value={String(value as number)}
        onChange={v => onChange(Number(v) as Settings[Setting])}
      />
    );

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
        <div className="input-group button-panel" onClick={e => e.stopPropagation()}>
          <button type="button" className='secondary danger' onClick={props.onDelete}>Delete {accountName}</button>
          <button type="button" className='secondary success' onClick={props.onAdd}>Add new account</button>
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
        name={setting}
        options={props.accountNames ?? []}
        value={value as Settings['selectedAccount']}
        onChange={value => onChange(value as Settings[Setting])}
      />
    );

    case 'preferredTabs': {
      const tabs = value as Settings['preferredTabs'];
      const mergeTab = (patch: Partial<Settings['preferredTabs']>) =>
        onChange({ ...tabs, ...patch } as Settings[Setting]);

      return (
        <div className="preferred-tabs-setting">
          <div className="input-group">
            <label htmlFor={`${setting}.results`}>
              Prefer selected tab, when using the Artifact Helper
            </label>
            <Select
              name={`${setting}.results`}
              options={['combined', 'stats', 'set'] as Array<Settings['preferredTabs']['results']>}
              value={tabs.results}
              onChange={v => mergeTab({ results: v as Settings['preferredTabs']['results'] })}
            />
          </div>
          <div className="input-group">
            <label htmlFor={`${setting}.searchOrHistory`}>
              Prefer default tab to be search or history, when viewing the Artifact Helper
            </label>
            <Select
              name={`${setting}.searchOrHistory`}
              options={['search', 'history'] as Array<Settings['preferredTabs']['searchOrHistory']>}
              value={tabs.searchOrHistory}
              onChange={v => mergeTab({ searchOrHistory: v as Settings['preferredTabs']['searchOrHistory'] })}
            />
          </div>
          <div className="input-group">
            <label htmlFor={`${setting}.craftableMaterial`}>
              Prefer craftable materials to be of variant "common" or "rarest"
            </label>
            <Select
              name={`${setting}.craftableMaterial`}
              options={['common', 'rarest'] as Array<Settings['preferredTabs']['craftableMaterial']>}
              value={tabs.craftableMaterial}
              onChange={v => mergeTab({ craftableMaterial: v as Settings['preferredTabs']['craftableMaterial'] })}
            />
          </div>
        </div>
      );
    }
    default: {
      console.error(`Unknown setting: ${setting}`);
      return null;
    }
  }
}