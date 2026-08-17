import { ReactNode, useMemo, useState } from "react";
import { OptionalProps, UncrontrolledProps } from "../Props";
import UncontrolledSearchableList from "./UncontrolledSearchableList";
import { FilterObject } from "../../../common/FormItems/Filter/Filter";
import { ActiveSort } from "../../../common/FormItems/Sort/Sort";
import useOnChange from "../../../../hooks/useOnChange";
import { createSortComparator, matchesFilters } from "../SearchableListFunctions";

export default function ControlledSearchableList<TItem, FilterKeys extends string>({ items, filterChecks, ...props }: UncrontrolledProps<TItem, FilterKeys> & OptionalProps<TItem, FilterKeys>) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterObject<FilterKeys, TItem, boolean | undefined>>({} as any);
  const [activeSorts, setActiveSorts] = useState<ActiveSort[]>([]);
  const sortFn = useMemo(
    () => createSortComparator(activeSorts, props.sortChecks, props.sort),
    [activeSorts, props.sortChecks, props.sort]
  );
  const results = useMemo(() => items.filter(item => {
    if (Object.keys(filters).length === 0 && !search) return true;
    if (search && !props.onSearch(search, item)) return false;

    return matchesFilters(item, filters, filterChecks);
  }), [items, search, filters, props]);
  const hasSearchOrFilters = useMemo(() => results.length !== items.length || !!search || Object.keys(filters).length > 0, [results, items, search, filters]);

  const render = 'children' in props ? props.children : props.renderItem;

  useOnChange({ search, filters }, ({ search, filters }) => props.onSearchOrFilterChange?.(search, filters));

  return <UncontrolledSearchableList onFilterChange={() => { }}
    {...props}
    sort={sortFn}
    activeSorts={activeSorts}
    setActiveSorts={setActiveSorts}
    search={search} setSearch={setSearch} filters={filters} setFilters={setFilters} filterChecks={filterChecks} hasSearchOrFilters={hasSearchOrFilters}
    children={results.map((result) => [render(result, items.indexOf(result), items), result] as [ReactNode, TItem])}
  />;
}