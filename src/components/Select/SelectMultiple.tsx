import { useState, useCallback, useEffect, useRef } from "react";
import { MultipleProps } from "./types";

export default function SelectMultiple<TValue extends string>({ 
  options, 
  displayValue, internalValue, 
  ...props 
}: MultipleProps<TValue>) {
  const [selectedValues, setSelectedValues] = useState<TValue[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const internalRef = useRef<HTMLSelectElement>(null);

  const toggleOption = useCallback((value: TValue) => {
    setSelectedValues(values => values.includes(value)
      ? values.filter(v => v !== value)
      : [...values, value]
    );
    props.onChange?.(selectedValues);
    if (internalRef.current) internalRef.current.value = selectedValues.join(',');
  }, [selectedValues]);

  return (
    <div className="select select--multiple" aria-required={props.required}>
      <button type="button" onClick={() => setShowOptions(show => !show)}>
        {'placeholder' in props ? props.placeholder : ''}
      </button>

      {showOptions && (
        <div className="select__options">
          {options.map((option, i) => (
            <label key={option}>
              <input
                name={`${props.name}[${i}]`}
                type="checkbox"
                value={internalValue?.(option) ?? option}
                checked={selectedValues.includes(option)}
                onChange={() => toggleOption(option)}
              />
              {displayValue?.(option) ?? option}
            </label>
          ))}
        </div>
      )}

      {/* <select ref={internalRef} name={props.name} className="select__internal" multiple>
        {selectedValues.map((value, i) => (
          <option name={`${props.name}[${i}]`} key={value} value={internalValue?.(value) ?? value} />
        ))}
      </select> */}
    </div>
  );
}