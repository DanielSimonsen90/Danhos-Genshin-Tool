import { useState, useCallback, useEffect, useImperativeHandle, forwardRef, useRef, EventHandler, useMemo } from "react";
import { MultipleProps, SelectRef } from "./types";
import { classNames } from "@/common/functions/strings";
import useOnChange from "@/hooks/useOnChange";
import { useClickOutsideRef } from "@/hooks/useClickOutside";
import { addTabNavigation } from "@/common/functions/accessibility";

export default forwardRef(function SelectMultiple<TValue extends string>({
  options,
  displayValue, internalValue, max, floatable,
  ...props
}: MultipleProps<TValue>, ref: SelectRef) {
  const [_selectedValues, _setSelectedValues] = useState<TValue[]>(props.defaultValue ?? []);
  const [timeSelectedValues, setTimeSelectedValues] = useState<Record<number, TValue>>({});
  const [showOptions, setShowOptions] = useState(false);
  
  const selectedValues = useMemo(() => props.value ?? _selectedValues, [props.value, _selectedValues]);
  const setSelectedValues = useCallback(props.setValue ?? _setSelectedValues, []);

  const internalRef = useRef<HTMLDivElement | null>(null);
  const combinedRef = (instance: HTMLDivElement) => {
    if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = instance;
    internalRef.current = instance;
    return internalRef;
  };

  const onToggleShowOptionsEvent = useCallback<EventHandler<any>>(e => {
    e.preventDefault();
    e.stopPropagation();
    setShowOptions(v => !v);
  }, []);
  const toggleOption = useCallback((value: TValue) => {
    setSelectedValues(values => values.includes(value)
      ? values.filter(v => v !== value)
      : [...values, value]
    );
    setTimeSelectedValues(values => ({ ...values, [Date.now()]: value }));
  }, []);

  useClickOutsideRef(internalRef, () => setShowOptions(false));

  useOnChange(showOptions, () => {
    if (showOptions) props.onOpen?.();
  })

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
  }, [selectedValues]);

  useImperativeHandle(ref, () => ({
    ...internalRef.current,
    open: () => setShowOptions(true),
    close: () => setShowOptions(false),
  }), [selectedValues, showOptions]);

  return (
    <div ref={combinedRef} className="select select--multiple" aria-required={props.required}>
      <select className="select__header" {...addTabNavigation(onToggleShowOptionsEvent, true)}>
        <option value="">{'placeholder' in props ? props.placeholder : ''}</option>
      </select>

      <ul className={classNames('select__options', floatable && 'floatable', showOptions && 'select__options--open')}
        onClick={e => {
          if (floatable) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        {options.map((option, i) => (
          <li key={option} onClick={() => toggleOption(option)}>
            <input
              name={`${props.name}[${i}]`}
              type="checkbox"
              value={internalValue?.(option) ?? option}
              checked={selectedValues.includes(option)}
              onChange={() => { }}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === 'NumpadEnter' || e.key === ' ') {
                  toggleOption(option);  
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
            />
            <label>
              {displayValue?.(option) ?? option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
});