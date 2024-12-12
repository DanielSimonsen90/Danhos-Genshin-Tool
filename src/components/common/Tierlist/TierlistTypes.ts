import { ReactNode } from "react";

interface Item {
  id: string;
  content: ReactNode;
}

export interface Tier {
  id: string;
  title: string;
  invert: boolean;

  color: string;
  items: Item[];
}

type BaseTierlistProps<T> = {
  rows: number;
  items: Array<T>;
  data: Array<Tier>;
}

type TierlistRenderProps<T> = {
  renderItem: (item: T) => ReactNode;
} | {
  children: (item: T) => ReactNode;
}

export type TierlistProps<T> = BaseTierlistProps<T> & TierlistRenderProps<T>;