import { useState, useCallback, useEffect, useRef } from "react";
import { MultipleProps } from "./types";

export default function SelectMultiple<TValue extends string>({
  options,
  displayValue, internalValue, max,
  ...props
}: MultipleProps<TValue>) {
  const [selectedValues, setSelectedValues] = useState<TValue[]>([]);
  const [timeSelectedValues, setTimeSelectedValues] = useState<Record<number, TValue>>({});
  const [showOptions, setShowOptions] = useState(false);
  const internalRef = useRef<HTMLSelectElement>(null);

  const toggleOption = useCallback((value: TValue) => {
    setSelectedValues(values => values.includes(value)
      ? values.filter(v => v !== value)
      : [...values, value]
    );
    setTimeSelectedValues(values => ({ ...values, [Date.now()]: value }));
  }, []);

  useEffect(() => {
    if (max && selectedValues.length > max) {
      const [oldestTime] = Object.keys(timeSelectedValues).sort();
      setSelectedValues(values => values.filter(v => v !== timeSelectedValues[Number(oldestTime)]));
      setTimeSelectedValues(values => {
        const { [Number(oldestTime)]: _, ...newValues } = values;
        return newValues;
      });
    }
    props.onChange?.(selectedValues);
    if (internalRef.current) internalRef.current.value = selectedValues.join(',');
  }, [selectedValues]);

  return (
    <div className="select select--multiple" aria-required={props.required}>
      <select className="select__header" onMouseDown={e => {
        e.preventDefault();
        e.stopPropagation();
        setShowOptions(show => !show);
      }}>
        <option value="">{'placeholder' in props ? props.placeholder : ''}</option>
      </select>

      {showOptions && (
        <ul className="select__options floatable">
          {options.map((option, i) => (
            <li key={option} onClick={() => toggleOption(option)}>
              <input
                name={`${props.name}[${i}]`}
                type="checkbox"
                value={internalValue?.(option) ?? option}
                checked={selectedValues.includes(option)}
                onChange={() => {}}
              />
              <label>
                {displayValue?.(option) ?? option}
              </label>
            </li>
          ))}
        </ul>
      )}

      {/* <select ref={internalRef} name={props.name} className="select__internal" multiple>
        {selectedValues.map((value, i) => (
          <option name={`${props.name}[${i}]`} key={value} value={internalValue?.(value) ?? value} />
        ))}
      </select> */}
    </div>
  );
}