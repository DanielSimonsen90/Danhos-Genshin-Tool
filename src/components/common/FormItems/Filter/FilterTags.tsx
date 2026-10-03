import { Dispatch, SetStateAction } from "react";

import { pascalCaseFromCamelCase } from "@/common/functions/strings";

import { FilterObject } from "./Filter";

type Props<FilterKeys extends string, TItem> = {
  filters: FilterObject<FilterKeys, TItem, boolean | undefined>,
  setFilters: Dispatch<SetStateAction<FilterObject<FilterKeys, TItem, boolean | undefined>>>,
};

export default function FilterTags<FilterKeys extends string, TItem>({ filters, setFilters }: Props<FilterKeys, TItem>) {
  const isGroup = (value: unknown): value is Record<string, boolean | undefined> => typeof value === 'object' && value !== null;
  const hasActiveFilters = Object.values(filters).some(value => (
    isGroup(value)
      ? Object.values(value).some(v => v !== undefined)
      : value !== undefined
  ));

  if (!hasActiveFilters) return null;

  return (
    <ul className="filter-tags">
      {Object.entries(filters).map(([filterOrGroup, value], index) => (
        isGroup(value)
          ? Object.entries(value).filter(([, groupValue]) => groupValue !== undefined).map(([filter, filterValue]) => (
            <li key={filter} className={`filter-tag ${filterValue === false ? 'filter-tag--false' : ''}`} onClick={() => setFilters(filters => {
              const { [filter]: _, ...rest } = filters[filterOrGroup as FilterKeys] as Record<string, boolean | undefined>;
              return { ...filters, [filterOrGroup]: rest };
            })}>
              {filterValue === false ? '×' : ''} {pascalCaseFromCamelCase(filter)}
            </li>
          ))
          : value !== undefined && (
            <li key={`${filterOrGroup}-${index}`} className={`filter-tag ${value === false ? 'filter-tag--false' : ''}`}
              onClick={() => setFilters(filters => ({ ...filters, [filterOrGroup]: undefined }))}
            >
              {value === false ? '×' : value === true ? '✓' : '/'} {pascalCaseFromCamelCase(filterOrGroup)}
            </li>
          )
      ))}
    </ul>
  );
}
