import { Dispatch, SetStateAction, ReactNode } from "react";
import { List } from "@/common/models/List";
import { FilterObject } from "../../common/FormItems/Filter/Filter";

export type FilterProps<TItem, FilterKeys extends string> = {
  filterChecks?: FilterObject<FilterKeys, TItem>,
}

export type OptionalProps<TItem, FilterKeys extends string> = FilterProps<TItem, FilterKeys> & {
  defaultSearch?: string,
  placeholder?: string,
  filterPlaceholder?: string,

  onShowMore?: () => void,

  className?: string,
  ulClassName?: string
  liClassName?: string | ((item: TItem) => string | undefined),
}

export type ControlledProps<TItem, FilterKeys extends string> = {
  hasSearchOrFilters: boolean,
  
  search: string,
  setSearch: Dispatch<SetStateAction<string>>,

  filters: FilterObject<FilterKeys, TItem, boolean | undefined>,
  setFilters: Dispatch<SetStateAction<FilterObject<FilterKeys, TItem, boolean | undefined>>>,
  onFilterChange: (filters: FilterObject<FilterKeys, TItem, boolean | undefined>) => void,
  sort?: (a: TItem, b: TItem) => number,
  children: [ReactNode, TItem][],
};

export type RenderItemOrChildren<TItem> = {
  renderItem: (item: TItem, index: number, items: Array<TItem>) => ReactNode,
} | {
  children: (item: TItem, index: number, items: Array<TItem>) => ReactNode,
};
export type UncrontrolledProps<TItem, FilterKeys extends string> = RenderItemOrChildren<TItem> & {
  items: Array<TItem> | List<TItem>,  
  onSearch: (search: string, itemMatch: TItem) => boolean,
  onSearchOrFilterChange?: (search: string, filters: FilterObject<FilterKeys, TItem, boolean | undefined>) => void,
};

export type Props<TItem, FilterKeys extends string = string> = 
  & OptionalProps<TItem, FilterKeys> 
  & (ControlledProps<TItem, FilterKeys> | UncrontrolledProps<TItem, FilterKeys>);