import { useCallback, useState } from "react";
import { Props } from "./types";

export default function Select<TValue extends string>({ 
  options, 
  defaultValue, displayValue, internalValue,
  ...props 
}: Props<TValue>) {
  const [value, setValue] = useState(defaultValue);
  const className = `select ${props.className ?? ''}`;

  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value as TValue);
    props.onChange?.(event.target.value as TValue);
  }, [props.onChange]);

  return (
    <select {...props} className={className} value={value} onChange={handleChange}>
      {!defaultValue && <option className="muted" value=''>{props.placeholder}...</option>}
      {options.map((option) => (
        <option key={option} value={internalValue?.(option) ?? option}>
          {displayValue?.(option) ?? option}
        </option>
      ))}
    </select>
  );
}