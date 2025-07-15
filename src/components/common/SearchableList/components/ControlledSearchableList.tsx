import { ReactNode, useEffect, useMemo, useState } from "react";
import { OptionalProps, UncrontrolledProps } from "../Props";
import UncontrolledSearchableList from "./UncontrolledSearchableList";
import { FilterObject } from "../../Filter/Filter";
import useOnChange from "../../../../hooks/useOnChange";

export default function ControlledSearchableList<TItem, FilterKeys extends string>({ items, filterChecks, ...props }: UncrontrolledProps<TItem, FilterKeys> & OptionalProps<TItem, FilterKeys>) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterObject<FilterKeys, TItem, boolean>>({} as any);
  const results = useMemo(() => items.filter(item => {
    if (search && !props.onSearch(search, item)) return false;

    for (const key in filters) {
      if (!filters[key]) continue;
      if (typeof filterChecks[key] === 'function') {
        if (!(filterChecks[key] as any)(item)) return false;
      } else {
        for (const filterChild in filters[key]) {
          if (!filters[key][filterChild]) continue;
          if (!(filterChecks[key] as any)[filterChild](item)) return false;
        }
      }
    }
    return true;
  }), [items, search, filters, props]);
  const render = 'children' in props ? props.children : props.renderItem;
  
  useOnChange({ search, filters }, ({ search, filters }) => props.onSearchOrFilterChange?.(search, filters));

  return <UncontrolledSearchableList onFilterChange={() => { }}
    {...props}
    search={search} setSearch={setSearch} filters={filters} setFilters={setFilters} filterChecks={filterChecks}
    children={results.map((result) => [render(result, items.indexOf(result), items), result] as [ReactNode, TItem])}
  />;
}