import { useMemo } from 'react';
import { ReactNode } from 'react';
import { Tab } from '../TabBarTypes';
import { createTabItem } from '../TabBarFunctions';

interface UseTabDataProps<TTabKey extends string> {
  tabs: Array<readonly [TTabKey, Tab]> | ((creator: typeof createTabItem) => Array<readonly [TTabKey, Tab] | false | null | undefined>);
  id?: string;
}

export function useTabData<TTabKey extends string>({
  tabs: tabsProp,
  id
}: UseTabDataProps<TTabKey>) {
  
  // Parse and filter tabs
  const tabs = useMemo(() => {
    const rawTabs = typeof tabsProp === 'function' ? tabsProp(createTabItem) : tabsProp;
    return rawTabs.filter((tab): tab is readonly [TTabKey, Tab] => Boolean(tab));
  }, [tabsProp]);

  // Create internal tabs map for rendering
  const internalTabs = useMemo(() => {
    const set = tabs
      .filter(([_, value]) => value !== undefined && value.content !== undefined)
      .reduce((acc, [key, { title }]) => acc.set(key, title), new Map<TTabKey, ReactNode>());
    return [...set.entries()];
  }, [tabs, id]);

  return {
    tabs,
    internalTabs
  };
}
