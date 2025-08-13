import { useCallback, useEffect, useState, Dispatch, SetStateAction } from 'react';

interface UseTabStateProps<TTabKey extends string> {
  defaultTab?: TTabKey;
  tab?: TTabKey;
  setTab?: Dispatch<SetStateAction<TTabKey>>;
  tabs: Array<readonly [TTabKey, any]>;
  beforeTabChange?: (tab: TTabKey) => void;
  onTabChange?: (tab: TTabKey) => void;
  markTabAsRendered: (tab: TTabKey) => void;
}

export function useTabState<TTabKey extends string>({
  defaultTab,
  tab,
  setTab,
  tabs,
  beforeTabChange,
  onTabChange,
  markTabAsRendered
}: UseTabStateProps<TTabKey>) {
  const [activeTab, _setActiveTab] = useState<TTabKey>(defaultTab ?? tabs.find(([_, value]) => value)?.[0]);
  const setActiveTab = useCallback((newTab: TTabKey) => {
    if (!newTab) return;

    // Mark this tab as rendered for lazy loading
    markTabAsRendered(newTab);

    if (beforeTabChange) beforeTabChange(newTab);

    // Handle both controlled and uncontrolled setTab
    if (setTab) setTab(newTab);
    else _setActiveTab(newTab);
  }, [beforeTabChange, setTab, _setActiveTab, markTabAsRendered]);

  // Handle tab change events
  useEffect(function onTabChanged() {
    if (onTabChange) onTabChange(tab ?? activeTab);
  }, [activeTab, tab, onTabChange]);

  // Handle when available tabs change
  useEffect(function onTabsOptionsChanged() {
    // If active tab key is not in tabs or the value is falsy, set it to the first tab
    if (!tabs.find(([key]) => key === (tab ?? activeTab))?.[1]) {
      const newTab = defaultTab ?? tabs[0]?.[0] as TTabKey;
      if (newTab && newTab !== (tab ?? activeTab)) {
        setActiveTab(newTab);
      }
    }
  }, [tabs, tab, activeTab, defaultTab, setActiveTab]);

  // Handle controlled tab changes
  useEffect(function onControlledTabChanged() {
    if (tab) setActiveTab(tab);
  }, [tab, setActiveTab]);

  return {
    activeTab: tab ?? activeTab,
    setActiveTab
  };
}
