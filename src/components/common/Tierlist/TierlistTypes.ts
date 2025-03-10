import { LocalStorageReturn } from "@/hooks/useLocalStorage";
import { ReactNode } from "react";

export interface Entry<TItem> {
  id: string;
  item: TItem;
}

export interface Tier<TItem> {
  id: string;
  title: string;
  invert: boolean;
  position: number;
  color: string;
  entries: Entry<TItem>[];
}

type BaseTierlistProps<TItem, TStorageData> = {
  items: Array<TItem>;
  onUnsortedSearch: (search: string, item: TItem) => boolean;
  
  defaultTiers?: Array<Tier<TItem>>;
  onTierChange?: (tiers: Array<Tier<TItem>>) => void;
  onEntryChange?: (tier: Tier<TItem>, entries: Array<Entry<TItem>>) => void;
} & ({
  storageKey?: string;
} | {
  storage?: LocalStorageReturn<TStorageData>
}) & ({
  onStorageLoaded: (data: TStorageData) => Array<Tier<TItem>>;
  onStorageSave: (data: Array<Tier<TItem>>) => TStorageData;
} | {})

export type RenderItem<TItem> = (item: TItem, index: number) => ReactNode;
type TierlistRenderProps<T> = {
  renderItem: RenderItem<T>;
} | {
  children: RenderItem<T>;
};

export type TierlistProps<TItem, TStorageData> = BaseTierlistProps<TItem, TStorageData> & TierlistRenderProps<TItem>;