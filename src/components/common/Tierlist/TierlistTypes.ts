import { ReactNode } from "react";
import { LocalStorageReturn } from "@/hooks/useLocalStorage";
import { CreateMenuItem } from "@/providers/ContextMenuProvider/ContextMenuConstants";
import { MenuItem } from "@/providers/ContextMenuProvider/ContextMenuTypes";
import { Autocomplete } from "@/common/types";

export interface Entry<TItem> {
  id: string;
  item: TItem;
}

export interface Tier<TItem> {
  id: Autocomplete<'unsorted'>;
  title: string;
  invert: boolean;
  position: number;
  color: string;
  entries: Entry<TItem>[];
}

type BaseTierlistProps<TItem, TStorageData> = {
  model: string;
  items: Array<TItem>;
  onSearch: (search: string, item: TItem) => boolean;
  
  defaultTiers?: Array<Tier<TItem>>;
  onTierChange?: (tiers: Array<Tier<TItem>>) => void;
  onEntryChange?: (tier: Tier<TItem>, entries: Array<Entry<TItem>>) => void;
  renderCustomEntryContextMenuItems?: (entry: Entry<TItem>, tier: Tier<TItem>, item: typeof CreateMenuItem) => Array<MenuItem>
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