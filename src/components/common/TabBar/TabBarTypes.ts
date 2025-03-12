import { ReactNode, Dispatch, SetStateAction } from "react";
import { Arrayable, Functionable } from "@/common/types";
import type { createTabItem } from './TabBarFunctions'

export type Direction = 'horizontal' | 'vertical';
export type CollapseArea = 'tabs' | 'content';
export type Tab = {
  title: ReactNode | JSX.Element,
  content: Functionable<JSX.Element>,
}

export type Props<
  TTabKey extends string,
  TTabs extends Array<(readonly [TTabKey, Tab])> = Array<(readonly [TTabKey, Tab])>,
> = {
  defaultTab?: TTabKey,
  tabs: TTabs | ((creator: typeof createTabItem) => TTabs),
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

  beforeTabChange?: (tab: TTabKey) => void,
  onTabChange?: (tab: TTabKey) => void,
} & {
  children?: Arrayable<JSX.Element | ((collapsed: boolean) => JSX.Element)>,
};