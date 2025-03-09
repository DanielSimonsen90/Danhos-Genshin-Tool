import { ReactNode } from "react";

export interface Entry<T> {
  id: string;
  item: T;
}

export interface Tier<T> {
  id: string;
  title: string;
  invert: boolean;
  position: number;
  color: string;
  items: Entry<T>[];
}

type BaseTierlistProps<T> = {
  items: Array<T>;
  onUnsortedSearch: (search: string, item: T) => boolean;
}

export type RenderItem<T> = (item: T, index: number) => ReactNode;
type TierlistRenderProps<T> = {
  renderItem: RenderItem<T>
} | {
  children: RenderItem<T>
}

export type TierlistProps<T> = BaseTierlistProps<T> & TierlistRenderProps<T>;