import { useState, Dispatch, SetStateAction, useRef, EventHandler, useCallback, useEffect } from "react";

import { classNames, pascalCaseFromCamelCase } from "@/common/functions/strings";
import useClickOutside from "@/hooks/useClickOutside";
import useOnChange from "@/hooks/useOnChange";

import SelectMultiple from "../Select/SelectMultiple";
import FilterOption from "./FilterOption";
import { getCloseAllMultipleSelects, getDefaultValueForRefs, getOnClickedOutside } from "./FilterFunctions";
import { addTabNavigation } from "@/common/functions/accessibility";

export type FilterObject<FilterKeys extends string, TItem, TValue = FilterCallback<TItem>> = Record<FilterKeys, TValue | Record<string, TValue> | undefined>;
export type FilterCallback<TItem> = (item: TItem) => boolean;

type Props<FilterKeys extends string, TItem> = {
  placeholder?: string,
  filterChecks: FilterObject<FilterKeys, TItem>,

  filters: FilterObject<FilterKeys, TItem, boolean | undefined>,
  setFilters: Dispatch<SetStateAction<FilterObject<FilterKeys, TItem, boolean | undefined>>>,
  onChange: (filters: FilterObject<FilterKeys, TItem, boolean | undefined>) => void,
};

export default function Filter<FilterKeys extends string, TItem>(props: Props<FilterKeys, TItem>) {
  const { filterChecks, placeholder } = props;
  const { filters, setFilters, onChange } = props;

  const [showOptions, setShowOptions] = useState(false);

  const refs = useRef(getDefaultValueForRefs(filterChecks));
  const closeAllMultipleSelects = getCloseAllMultipleSelects(refs);
  const ref = useClickOutside('div', getOnClickedOutside(closeAllMultipleSelects, setShowOptions));
  const onToggleShowOptionsEvent = useCallback<EventHandler<any>>(e => {
    e.preventDefault();
    e.stopPropagation();
    setShowOptions(v => !v);
  }, []);

  useOnChange(filters, onChange);

  return (
    <div className="filters">
      <select className="filters__header" {...addTabNavigation(onToggleShowOptionsEvent, true)}>
        <option>{placeholder ?? 'Filter...'}</option>
      </select>

      <div ref={ref} className={classNames("select__options", 'floatable', showOptions && 'select__options--open', 'filter-options')}>
        {Object.keys(filterChecks).map((filter: keyof typeof filterChecks, i) => (
          typeof filterChecks[filter] === 'object'
            ? <SelectMultiple key={i} name={filter} floatable
              ref={refs.current[i]}
              onOpen={() => closeAllMultipleSelects(i)}

              placeholder={pascalCaseFromCamelCase(filter)}
              options={Object.keys(filterChecks[filter])}
              displayValue={pascalCaseFromCamelCase}

              value={Object.keys(filters[filter] ?? {})}
              setValue={selectedValues => setFilters(filters => ({
                ...filters,
                [filter]: Object.fromEntries((
                  typeof selectedValues === 'function' ?
                    selectedValues(Object.keys(filters[filter] ?? {}).filter(Boolean)) :
                    selectedValues
                ).map(value => [value, true]))
              }))}

            /> : <FilterOption key={i} i={i}
              name={filter} option={filter}
              value={filters[filter] as boolean | undefined}
              onSelect={(newValue) => {
                const newFilters = { ...filters };
                if (newValue === undefined) {
                  delete newFilters[filter];
                } else {
                  newFilters[filter] = newValue;
                }
                setFilters(newFilters);
              }}
            />
        ))}
        <button className="brand--light secondary" onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setFilters({} as FilterObject<FilterKeys, TItem, boolean | undefined>);
          closeAllMultipleSelects();
        }}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}