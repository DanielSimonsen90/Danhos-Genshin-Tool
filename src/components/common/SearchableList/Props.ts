import { Dispatch, SetStateAction, ReactNode } from "react";

export type OptionalProps<TItem> = {
  defaultSearch?: string,
  placeholder?: string,

  onShowMore?: () => void,

  className?: string,
  ulClassName?: string
  liClassName?: string | ((item: TItem) => string),
}

export type ControlledProps<TItem> = {
  search: string,
  setSearch: Dispatch<SetStateAction<string>>,
  children: [ReactNode, TItem][],
};

type RenderItemOrChildren<TItem> = {
  renderItem: (item: TItem) => ReactNode,
} | {
  children: (item: TItem) => ReactNode,
};
export type UncrontrolledProps<TItem> = {
  items: TItem[],
  onSearch: (search: string, itemMatch: TItem) => boolean,
} & RenderItemOrChildren<TItem>;

export type Props<TItem> = OptionalProps<TItem> & (ControlledProps<TItem> | UncrontrolledProps<TItem>);