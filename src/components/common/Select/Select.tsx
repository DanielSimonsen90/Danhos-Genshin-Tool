import { useCallback, useMemo, useState } from "react";
import { Props } from "./types";
import { classNames } from "@/common/functions/strings";

export default function Select<TValue extends string>({ 
  options, 
  defaultValue, displayValue, internalValue,
  ...props 
}: Props<TValue>) {
  const [_value, _setValue] = useState(undefined);
  const value = useMemo(() => props.value ?? _value, [props.value, _value]);
  const setValue = useMemo(() => props.setValue ?? _setValue, [props.setValue, _setValue]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === '<placeholder>') return;
    setValue(event.target.value as TValue);
    props.onChange?.(event.target.value as TValue);
  }, [props.onChange]);

  return (
    <select {...props} className={classNames('select', props.floatable && 'floatable', props.className)} value={value} onChange={handleChange} defaultValue={defaultValue}>
      {!value && !defaultValue && <option className="muted" value='<placeholder>'>{props.placeholder}...</option>}
      {options.filter(Boolean).map((option) => (
        <option key={option} value={internalValue?.(option) ?? option}>
          {displayValue?.(option) ?? option}
        </option>
      ))}
    </select>
  );
}