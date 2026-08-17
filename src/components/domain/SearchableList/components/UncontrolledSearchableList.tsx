import { useRef } from "react";
import { classNames, pascalCaseFromCamelCase } from "@/common/functions/strings";
import useKeybind from "@/hooks/useKeybind";
import { ControlledProps, OptionalProps } from "../Props";
import { Filter, FilterTags } from "../../../common/FormItems";
import Sort from "../../../common/FormItems/Sort/Sort";

export default function UncontrolledSearchableList<TItem, FilterKeys extends string>(props: ControlledProps<TItem, FilterKeys> & OptionalProps<TItem, FilterKeys>) {
  const { search, setSearch, defaultSearch, placeholder } = props;
  const { children, onShowMore } = props;
  const { className, ulClassName, liClassName } = props;
  const { filterChecks, filters, setFilters, filterPlaceholder, onFilterChange } = props;
  const { sortChecks, activeSorts, setActiveSorts, sortPlaceholder } = props;
  const filterProps = { filterChecks, filters, setFilters, filterPlaceholder, onChange: onFilterChange };

  const inputRef = useRef<HTMLInputElement>(null);
  const sortedChildren = props.sort ? [...children].sort(([_, a], [__, b]) => props.sort?.(a, b) ?? 0) : children;

  // Stable per-item identity, so filtering/sorting doesn't shift positional keys and cause
  // React to reuse a list item's component instance (and its hover/popover state) for a different item.
  const itemKeysRef = useRef(new WeakMap<object, number>());
  const nextItemKeyRef = useRef(0);
  const getItemKey = (item: TItem, fallback: number) => {
    if (item === null || typeof item !== 'object') return String(item);
    const objectItem = item as unknown as object;
    const keys = itemKeysRef.current;
    if (!keys.has(objectItem)) keys.set(objectItem, nextItemKeyRef.current++);
    return keys.get(objectItem) ?? fallback;
  };

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
        {filterChecks && <Filter {...filterProps} filterChecks={filterChecks} />}
        {sortChecks && setActiveSorts && <Sort sortChecks={sortChecks} activeSorts={activeSorts ?? []} setActiveSorts={setActiveSorts} placeholder={sortPlaceholder} />}
      </div>
      <FilterTags filters={filters} setFilters={setFilters} />
      {activeSorts && activeSorts.length > 0 && setActiveSorts && (
        <ul className="filter-tags sort-tags">
          {activeSorts.map(({ key, direction }, index) => (
            <li key={key} className="filter-tag sort-tag"
              onClick={() => setActiveSorts(prev => prev.filter(s => s.key !== key))}
            >
              {pascalCaseFromCamelCase(key)}
              <span className="sort-tag__direction">{direction === 'asc' ? '▲' : '▼'}</span>
            </li>
          ))}
        </ul>
      )}
      {children.length > 0 && (
        <ul className={classNames("searchable-list__list", "hoverable", ulClassName)}>
          {sortedChildren.map(([child, item], index) => (
            !child ? null : <li key={getItemKey(item, index)} className={classNames(
              "searchable-list__list-item",
              typeof liClassName === 'function' ? liClassName(item) : liClassName
            )}>
              {child}
            </li>
          ))}
        </ul>
      )}
      {props.hasSearchOrFilters && (
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
      )}
    </div>
  );
}