import { useState, Dispatch, SetStateAction, useRef } from "react";
import { classNames, pascalCaseFromCamelCase } from "@/common/functions/strings";
import SelectMultiple from "../Select/SelectMultiple";
import FilterOption from "./FilterOption";
import { SelectRef } from "../Select/types";
import useClickOutside from "@/hooks/useClickOutside";
import useOnChange from "@/hooks/useOnChange";

export type FilterObject<FilterKeys extends string, TItem, TValue = FilterCallback<TItem>> = Record<FilterKeys, TValue | Record<string, TValue>>;
export type FilterCallback<TItem> = (item: TItem) => boolean;

type Props<FilterKeys extends string, TItem> = {
  placeholder?: string,
  filterChecks: FilterObject<FilterKeys, TItem>,

  filters: FilterObject<FilterKeys, TItem, boolean>,
  setFilters: Dispatch<SetStateAction<FilterObject<FilterKeys, TItem, boolean>>>,
  onChange: (filters: FilterObject<FilterKeys, TItem, boolean>) => void,
};

export default function Filter<FilterKeys extends string, TItem>(props: Props<FilterKeys, TItem>) {
  const { filterChecks, placeholder } = props;
  const { filters, setFilters, onChange } = props;

  const [showOptions, setShowOptions] = useState(false);

  const refs = useRef<Array<SelectRef>>(Object.keys(filterChecks).map(() => ({ current: null }) ));
  const ref = useClickOutside('div', () => {
    closeAllMultipleSelects();
    setShowOptions(false);
  });

  useOnChange(filters, onChange);

  function closeAllMultipleSelects(except?: number) {
    refs.current.forEach((ref, i) => i !== except && ref.current?.close());
  }

  return (
    <div className="filters">
      <select className="filters__header" onMouseDown={e => {
        e.preventDefault();
        e.stopPropagation();
        setShowOptions(show => !show);
      }}>
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
              displayValue={option => pascalCaseFromCamelCase(option)}
              onChange={selectedValues => setFilters({ ...filters, [filter]: Object.fromEntries(selectedValues.map(value => [value, true])) })}
            />
            : <FilterOption
              key={i}
              name={filter}
              i={i}
              option={filter}
              value={filters[filter] as boolean}
              onSelect={() => setFilters({ ...filters, [filter]: !filters[filter] })}
            />
        ))}

        <button className="brand--light secondary" onClick={() => {
          setFilters({} as FilterObject<FilterKeys, TItem, boolean>);
          closeAllMultipleSelects();
        }}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}