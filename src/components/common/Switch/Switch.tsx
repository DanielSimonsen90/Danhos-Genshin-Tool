import { classNames } from "@/common/functions/strings";
import useOnChange from "@/hooks/useOnChange";
import { useState } from "react";

type Props = {
  enabled?: boolean;
  onChange?: (enabled: boolean) => void;
} & Omit<React.HTMLProps<HTMLInputElement>, 'onChange'>;

export default function Switch({ enabled, onChange, disabled, ...props }: Props) {
  const [checked, setChecked] = useState(enabled ?? props.defaultChecked);

  useOnChange(checked, onChange);

  return (
    <div className={classNames("switch", disabled && "switch--disabled", checked && "switch--enabled")}>
      <div className="switch__thumb"></div>
      <input {...props} disabled={disabled} type="checkbox" onChange={e => setChecked(e.target.checked)} 
        value={checked ? 'on' : 'off'} 
        checked={checked}
      />
    </div>
  );
}