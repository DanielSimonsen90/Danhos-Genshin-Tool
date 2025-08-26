import { ReactNode, useMemo, useState } from "react";
import { OptionalProps, UncrontrolledProps } from "../Props";
import UncontrolledSearchableList from "./UncontrolledSearchableList";
import { FilterObject } from "../../../common/FormItems/Filter/Filter";
import useOnChange from "../../../../hooks/useOnChange";

export default function ControlledSearchableList<TItem, FilterKeys extends string>({ items, filterChecks, ...props }: UncrontrolledProps<TItem, FilterKeys> & OptionalProps<TItem, FilterKeys>) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterObject<FilterKeys, TItem, boolean | undefined>>({} as any);
  const results = useMemo(() => items.filter(item => {
    if (Object.keys(filters).length === 0 && !search) return true;

    // console.log((typeof item === 'object' && 'name' in item) ? item.name : item, filters, filterChecks);
    if (search && !props.onSearch(search, item)) {
      // console.log('Search provided, but item is not matching:', item);
      return false;
    } else if (!filterChecks) {
      // console.log('No filter checks provided, item is matching:', item);
      return true;
    }

    for (const key in filters) {
      // console.log('Checking filter:', key, 'with value:', filters[key]);

      if (filters[key] === undefined || !(key in filterChecks)) {
        // console.log('Filter is not active:', key);
        continue;
      }

      if (typeof filterChecks[key] === 'function') {
        // console.log('Filter is a function, checking:', { key, item, result: (filterChecks[key] as any)(item) });  
        const filterResult = (filterChecks[key] as any)(item);
        const filterValue = filters[key];

        // Handle three-state logic: true, false, undefined
        if (filterValue === true && !filterResult) {
          // console.log('Item does not match filter function (expected true):', key, item);
          return false;
        } else if (filterValue === false && filterResult) {
          // console.log('Item does not match filter function (expected false):', key, item);
          return false;
        }      
      } else if (typeof filters[key] === 'object' && filters[key] !== null) {
        const filterObject = filters[key] as Record<string, boolean | undefined>;
        for (const filterChild in filterObject) {
          // console.log('Checking filter child:', { key, filterChild, item, result: (filterChecks[key] as any)[filterChild](item) });

          if (filterObject[filterChild] === undefined) {
            // console.log('Filter child is not active:', { key, filterChild });
            continue;
          }
          const filterResult = (filterChecks[key] as any)[filterChild](item);
          const filterValue = filterObject[filterChild];

          if (filterValue === true && !filterResult) {
            // console.log('Item does not match filter child (expected true):', { key, filterChild, item });
            return false;
          } else if (filterValue === false && filterResult) {
            // console.log('Item does not match filter child (expected false):', { key, filterChild, item });
            return false;
          }
        }
      }
    }
    return true;
  }), [items, search, filters, props]);
  const hasSearchOrFilters = useMemo(() => results.length !== items.length || !!search || Object.keys(filters).length > 0, [results, items, search, filters]);

  const render = 'children' in props ? props.children : props.renderItem;

  useOnChange({ search, filters }, ({ search, filters }) => props.onSearchOrFilterChange?.(search, filters));

  return <UncontrolledSearchableList onFilterChange={() => { }}
    {...props}
    search={search} setSearch={setSearch} filters={filters} setFilters={setFilters} filterChecks={filterChecks} hasSearchOrFilters={hasSearchOrFilters}
    children={results.map((result) => [render(result, items.indexOf(result), items), result] as [ReactNode, TItem])}
  />;
}