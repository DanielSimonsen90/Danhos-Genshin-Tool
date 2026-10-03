import { FilterObject } from "../../common/FormItems/Filter/Filter";
import { ActiveSort, SortObject } from "../../common/FormItems/Sort/Sort";

export function matchesFilters<TItem, FilterKeys extends string>(
  item: TItem,
  filters: FilterObject<FilterKeys, TItem, boolean | undefined>,
  filterChecks: FilterObject<FilterKeys, TItem> | undefined
) {
  if (!filterChecks) return true;

  for (const key in filters) {
    if (filters[key] === undefined || !(key in filterChecks)) continue;

    if (typeof filterChecks[key] === 'function') {
      const filterResult = (filterChecks[key] as any)(item);
      const filterValue = filters[key];

      if (filterValue === true && !filterResult) return false;
      else if (filterValue === false && filterResult) return false;
    } else if (typeof filters[key] === 'object' && filters[key] !== null) {
      const filterObject = filters[key] as Record<string, boolean | undefined>;
      for (const filterChild in filterObject) {
        if (filterObject[filterChild] === undefined) continue;

        const filterResult = (filterChecks[key] as any)[filterChild](item);
        const filterValue = filterObject[filterChild];

        if (filterValue === true && !filterResult) return false;
        else if (filterValue === false && filterResult) return false;
      }
    }
  }

  return true;
}

export function createSortComparator<TItem>(
  activeSorts: ActiveSort[],
  sortChecks: SortObject<TItem> | undefined,
  fallbackSort?: (a: TItem, b: TItem) => number
) {
  if (!activeSorts.length) return fallbackSort;

  return (a: TItem, b: TItem) => {
    for (const { key, direction } of activeSorts) {
      const baseComparator = sortChecks?.[key];
      if (!baseComparator) continue;

      const result = direction === 'asc' ? baseComparator(a, b) : baseComparator(b, a);
      if (result !== 0) return result;
    }
    return fallbackSort?.(a, b) ?? 0;
  };
}
