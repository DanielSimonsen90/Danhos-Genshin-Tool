import { classNames } from "@/common/functions/strings";
import { ControlledProps, OptionalProps } from "../Props";
import Filter from "../../Filter";
import { useRef } from "react";
import useKeybind from "@/hooks/useKeybind";

export default function UncontrolledSearchableList<TItem, FilterKeys extends string>(props: ControlledProps<TItem, FilterKeys> & OptionalProps<TItem, FilterKeys>) {
  const { search, setSearch, defaultSearch, placeholder } = props;
  const { children, onShowMore } = props;
  const { className, ulClassName, liClassName } = props;
  const { filterChecks, filters, setFilters, filterPlaceholder, onFilterChange } = props;
  const filterProps = { filterChecks, filters, setFilters, filterPlaceholder, onChange: onFilterChange };

  const inputRef = useRef<HTMLInputElement>(null);
  
  useKeybind('f', { ctrlKey: true }, () => {
    if (inputRef.current) inputRef.current.focus();
  });

  return (
    <div className={classNames("searchable-list", className)}>
      <div className="input-group">
        <input type="search" ref={inputRef}
          placeholder={placeholder ?? "Search..."}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="searchable-list__search"
          defaultValue={defaultSearch}
        />
        {filterChecks && <Filter {...filterProps} />}
      </div>
      {children.length > 0 && (
        <ul className={classNames("searchable-list__list", "hoverable", ulClassName)}>
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