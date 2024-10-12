import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { classNames, pascalCaseFromCamelCase } from "@/common/functions/strings";
import SelectMultiple from "../../Select/SelectMultiple";

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

  useEffect(() => {
    onChange(filters);
  }, [filters]);

  return (
    <div className="filters">
      <select className="filters__header" onMouseDown={e => {
        e.preventDefault();
        e.stopPropagation();
        setShowOptions(show => !show);
      }}>
        <option>{placeholder ?? 'Filter...'}</option>
      </select>

      <div className={classNames("select__options", 'floatable', showOptions && 'select__options--open')}>
        {Object.keys(filterChecks).map((filter: keyof typeof filterChecks, i) => (
          typeof filterChecks[filter] === 'object'
            ? <SelectMultiple name={filter} floatable key={i}
              placeholder={pascalCaseFromCamelCase(filter)}
              options={Object.keys(filterChecks[filter])}
              displayValue={option => pascalCaseFromCamelCase(option)}
              internalValue={option => option}
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

        <button className="brand--light secondary" onClick={() => setFilters({} as FilterObject<FilterKeys, TItem, boolean>)}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}

type FilterOptionProps = {
  name: string,
  i: number,
  option: string,
  value: boolean,

  onSelect: (option: string) => void,
};

function FilterOption({
  name, i, option, value,
  onSelect,
}: FilterOptionProps) {
  return (
    <li onClick={() => onSelect(option)} className="select__option">
      <input
        name={`${name}[${i}]`}
        type="checkbox"
        value={option}
        checked={value}
        onChange={() => { }}
      />
      <label>
        {pascalCaseFromCamelCase(option)}
      </label>
    </li>
  );
}