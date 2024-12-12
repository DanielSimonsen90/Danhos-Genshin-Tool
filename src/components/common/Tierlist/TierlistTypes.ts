import { ReactNode } from "react";

export interface Entry<T> {
  id: string;
  item: T;
}

export interface Tier<T> {
  id: string;
  title: string;
  invert: boolean;

  color: string;
  items: Entry<T>[];
}

type BaseTierlistProps<T> = {
  items: Array<T>;
}

type TierlistRenderProps<T> = {
  renderItem: (item: T) => ReactNode;
} | {
  children: (item: T) => ReactNode;
}

export type TierlistProps<T> = BaseTierlistProps<T> & TierlistRenderProps<T>;