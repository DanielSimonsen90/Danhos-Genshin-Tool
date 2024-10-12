import { useState, useCallback, useEffect, useRef } from "react";
import { MultipleProps } from "./types";
import { classNames } from "@/common/functions/strings";

export default function SelectMultiple<TValue extends string>({
  options,
  displayValue, internalValue, max, floatable,
  ...props
}: MultipleProps<TValue>) {
  const [selectedValues, setSelectedValues] = useState<TValue[]>(props.defaultValue ?? []);
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

      <ul className={classNames('select__options', floatable && 'floatable', showOptions && 'select__options--open')}>
        {options.map((option, i) => (
          <li key={option} onClick={() => toggleOption(option)}>
            <input
              name={`${props.name}[${i}]`}
              type="checkbox"
              value={internalValue?.(option) ?? option}
              checked={selectedValues.includes(option)}
              onChange={() => { }}
              onKeyDown={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
            />
            <label>
              {displayValue?.(option) ?? option}
            </label>
          </li>
        ))}
      </ul>

      {/* <select ref={internalRef} name={props.name} className="select__internal" multiple>
        {selectedValues.map((value, i) => (
          <option name={`${props.name}[${i}]`} key={value} value={internalValue?.(value) ?? value} />
        ))}
      </select> */}
    </div>
  );
}