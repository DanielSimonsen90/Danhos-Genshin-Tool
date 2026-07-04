import { Dispatch, SetStateAction, useRef } from "react";
import { createPortal } from "react-dom";

import { classNames, pascalCaseFromCamelCase } from "@/common/functions/strings";
import useClickOutside from "@/hooks/useClickOutside";
import useOnChange from "@/hooks/useOnChange";
import { useFloatingDropdown } from "@/hooks/useFloatingDropdown";

import SelectMultiple from "../Select/SelectMultiple";
import FilterOption from "./FilterOption";
import { getCloseAllMultipleSelects, getDefaultValueForRefs, getOnClickedOutside } from "./FilterFunctions";
import { addTabNavigation } from "@/common/functions/accessibility";
import FilterIcon from "@/components/common/media/icons/FilterIcon";

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

  const { showOptions, setShowOptions, headerRef, dropdownStyle, onToggle } = useFloatingDropdown();

  const refs = useRef(getDefaultValueForRefs(filterChecks));
  const closeAllMultipleSelects = getCloseAllMultipleSelects(refs);
  const ref = useClickOutside('div', getOnClickedOutside(closeAllMultipleSelects, setShowOptions));

  useOnChange(filters, onChange);

  return (
    <div className="filters">
      <button ref={headerRef} type="button" className="filters__header" {...addTabNavigation(onToggle, true)}>
        <FilterIcon />
        {placeholder ?? 'Filter'}
      </button>

      {showOptions && createPortal(
        <div ref={ref} className={classNames("select__options", "select__options--open", "filter-options")} style={dropdownStyle}>
          {Object.keys(filterChecks).map((filter, i) => {
            const typedFilter = filter as keyof typeof filterChecks;

            if (typeof filterChecks[typedFilter] === 'object' && filterChecks[typedFilter]) return (
              <SelectMultiple key={i} name={filter} floatable
                ref={refs.current[i]}
                onOpen={() => closeAllMultipleSelects(i)}

                placeholder={pascalCaseFromCamelCase(filter)}
                options={Object.keys(filterChecks[typedFilter] ?? {})}
                displayValue={pascalCaseFromCamelCase}

                value={Object.keys(filters[typedFilter] ?? {})}
                setValue={selectedValues => setFilters(filters => ({
                  ...filters,
                  [filter]: Object.fromEntries((
                    typeof selectedValues === 'function' ?
                      selectedValues(Object.keys(filters[typedFilter] ?? {}).filter(Boolean)) :
                      selectedValues
                  ).map(value => [value, true]))
                }))}
              />
            );

            return (
              <FilterOption key={i} i={i}
                name={filter} option={filter}
                value={filters[typedFilter] as boolean | undefined}
                onSelect={(newValue) => {
                  const newFilters = { ...filters };
                  if (newValue === undefined) delete newFilters[typedFilter];
                  else newFilters[typedFilter] = newValue;
                  
                  setFilters(newFilters);
                }}
              />
            );
          })}
          <button className="brand--light secondary" onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setFilters({} as FilterObject<FilterKeys, TItem, boolean | undefined>);
            closeAllMultipleSelects();
          }}>
            Clear Filters
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}
