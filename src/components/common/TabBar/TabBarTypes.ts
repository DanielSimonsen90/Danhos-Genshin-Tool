import { ReactNode, Dispatch, SetStateAction } from "react";
import { Arrayable, Functionable } from "@/common/types";
import type { createTabItem } from './TabBarFunctions'

export type Direction = 'horizontal' | 'vertical';
export type CollapseArea = 'tabs' | 'content';
export type Tab = {
  title: ReactNode | JSX.Element,
  content: Functionable<JSX.Element>,
}

export type TabCreator = typeof createTabItem;
export type TabsFunction<TTabKey extends string = string> = (creator: TabCreator) => Array<readonly [TTabKey, Tab] | false | null | undefined>;

export type Props<
  TTabKey extends string,
  TTabs extends Array<(readonly [TTabKey, Tab])> = Array<(readonly [TTabKey, Tab])>,
> = {
  defaultTab?: TTabKey,
  tabs: TTabs | TabsFunction<TTabKey>,
  noTabs?: JSX.Element,

  tab?: TTabKey,
  setTab?: Dispatch<SetStateAction<TTabKey>>,

  id?: string,
  className?: string,

  /** @default false */
  placeChildrenBeforeTabs?: boolean,
  /** @default false */
  hideCollapseChevron?: boolean,  
  /** @default horizontal */
  direction?: Direction;
  /** @default content */
  collapseArea?: CollapseArea,
  
  /** Enable resizing for vertical direction */
  resizable?: boolean;
  /** Minimum size for resizable area in pixels */
  minSize?: number;
  /** Maximum size for resizable area in pixels */
  maxSize?: number;
  /** Initial size for resizable area in pixels */
  initialSize?: number;

  beforeTabChange?: (tab: TTabKey) => void,
  onTabChange?: (tab: TTabKey) => void,
} & {
  children?: Arrayable<JSX.Element | ((collapsed: boolean) => JSX.Element)>,
};