import { classNames, pascalCaseFromCamelCase } from "@/common/functions/strings";
import { ControlledProps, OptionalProps } from "../Props";
import SelectMultiple from "../../Select/SelectMultiple";

export default function UncontrolledSearchableList<TItem, FilterKeys extends string>(props: ControlledProps<TItem, FilterKeys> & OptionalProps<TItem, FilterKeys>) {
  const { search, setSearch, defaultSearch, placeholder, filterChecks, setFilters } = props;
  const { children, onShowMore } = props;
  const { className, ulClassName, liClassName } = props;
  
  return (
    <div className={classNames("searchable-list", className)}>
      <div className="input-group">
        <input type="search"
          placeholder={placeholder ?? "Search..."}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="searchable-list__search"
          defaultValue={defaultSearch}
        />
        {filterChecks && (
          <SelectMultiple name="filters"
            options={Object.keys(filterChecks)}
            placeholder="Filter..."
            onChange={keys => setFilters(Object.fromEntries(keys.map(key => [key, true])) as any)}
            displayValue={key => pascalCaseFromCamelCase(key)}
            internalValue={key => key}
          />
        )}
      </div>
      {children.length > 0 && (
        <ul className={classNames("searchable-list__list", ulClassName)}>
          {children.map(([child, item], key) => (
            <li key={key} className={classNames(
              "searchable-list__list-item",
              typeof liClassName === 'function' ? liClassName(item) : liClassName
            )}>
              {child}
            </li>
          ))}
        </ul>
      )}
      <p className="searchable-list__list-item searchable-list__list-item--end">
        <span>
          There are no more results to show.
        </span>
        {onShowMore && (
          <button onClick={onShowMore} className="button link">
            Show more
          </button>
        )}
      </p>
    </div>
  );
}