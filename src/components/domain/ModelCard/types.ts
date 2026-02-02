import { Model, ModelKeys } from "@/common/models";
import { Rarity } from "@/common/types";
import { Tab } from "@/components/common/TabBar";

// Shared properties for all model cards
export interface BaseModelCardProps {
  wrapInLink?: boolean;
  linkOnName?: boolean;
  nameTag?: Extract<React.ElementType, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'b'>;
  showRarity?: boolean;
  className?: string;
}

export interface ModelCardProps<TModel extends Model = Model> extends BaseModelCardProps {
  // Required model-based configuration
  model: ModelKeys;
  item: TModel;

  // Required render props for core card structure
  renderImage: () => JSX.Element;
  renderHeaderContent?: () => JSX.Element;
  renderHeadingContent?: () => JSX.Element;
  renderContent: () => JSX.Element | null;
}

export type ModelRarityTabGroup<TModel> = Map<string, Omit<Tab, 'content'> & {
  items: Array<TModel>,
  color: string,
  rarity: Rarity
}>;