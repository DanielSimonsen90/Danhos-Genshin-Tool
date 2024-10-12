import { useMemo, useState } from "react";
import { OptionalProps, UncrontrolledProps } from "../Props";
import UncontrolledSearchableList from "./UncontrolledSearchableList";

export default function ControlledSearchableList<TItem, FilterKeys extends string>({ items, ...props }: UncrontrolledProps<TItem, FilterKeys> & OptionalProps<TItem, FilterKeys>) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<FilterKeys, boolean>>({} as any);
  const results = useMemo(() => items.filter(item => 
    props.onSearch(search, item) 
      && filters ? Object.keys(filters).every((filter: keyof typeof filters) => props.filterChecks[filter](item)) : true
  ), [items, search, filters, props]);
  const render = 'children' in props ? props.children : props.renderItem;

  return <UncontrolledSearchableList
    search={search} setSearch={setSearch} filters={filters} setFilters={setFilters}
    {...props} 
    children={results.map(result => [render(result), result])} 
  />
}