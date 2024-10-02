import { useCallback, useMemo, useState } from "react";
import { Props } from "./types";

export default function Select<TValue extends string>({ 
  options, 
  defaultValue, displayValue, internalValue,
  ...props 
}: Props<TValue>) {
  const [_value, _setValue] = useState(defaultValue);
  const className = `select ${props.className ?? ''}`;

  const value = useMemo(() => props.value ?? _value, [props.value, _value]);
  const setValue = useMemo(() => props.setValue ?? _setValue, [props.setValue, _setValue]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value as TValue);
    props.onChange?.(event.target.value as TValue);
  }, [props.onChange]);

  return (
    <select {...props} className={className} value={value} onChange={handleChange}>
      {!defaultValue && <option className="muted" value='' disabled>{props.placeholder}...</option>}
      {options.map((option) => (
        <option key={option} value={internalValue?.(option) ?? option}>
          {displayValue?.(option) ?? option}
        </option>
      ))}
    </select>
  );
}