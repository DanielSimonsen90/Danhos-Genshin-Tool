import { Dispatch, SetStateAction, useMemo, useState } from "react";

type Props<
  Settings extends Record<string, any>, 
  Setting extends keyof Settings,
  Value extends Settings[Setting] = Settings[Setting]
> = {
  setting: Setting;
  value: Value;
  label: string;
  children: (value: Value, set: Dispatch<SetStateAction<Value>>) => React.ReactNode;
};

export default function ExternalSettingsOption<
  Settings extends Record<string, any>,
  Setting extends keyof Settings
>(props: Props<Settings, Setting>) {
  const [value, setValue] = useState(props.value);
  const children = useMemo(() => props.children(value, setValue), [value, setValue]);

  return (
    <div className="input-group">
      <label>{props.label}</label>
      {children}
    </div>
  );

}
