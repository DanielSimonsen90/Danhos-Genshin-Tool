import { useMemo, useState } from "react";
import { OptionalProps, UncrontrolledProps } from "../Props";
import UncontrolledSearchableList from "./UncontrolledSearchableList";
import { FilterObject } from "./Filter";

export default function ControlledSearchableList<TItem, FilterKeys extends string>({ items, filterChecks, ...props }: UncrontrolledProps<TItem, FilterKeys> & OptionalProps<TItem, FilterKeys>) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterObject<FilterKeys, TItem, boolean>>({} as any);
  const results = useMemo(() => items.filter(item =>
    props.onSearch(search, item) && filterChecks
      ? Object.keys(filters).every((filter: keyof typeof filters) => (
        typeof filterChecks[filter] === 'function'
          ? (filterChecks[filter] as any)(item)
          : Object.keys(filters[filter]).every((filterChild: (keyof typeof filters)[any]) => (filterChecks[filter] as any)[filterChild](item))
      )) : true
  ), [items, search, filters, props]);
  const render = 'children' in props ? props.children : props.renderItem;

  return <UncontrolledSearchableList onFilterChange={() => {}}
    search={search} setSearch={setSearch} filters={filters} setFilters={setFilters} filterChecks={filterChecks}
    {...props}
    children={results.map(result => [render(result), result])}
  />;
}