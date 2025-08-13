import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Tab } from '../TabBarTypes';

interface UseTabLazyLoadingProps<TTabKey extends string> {
  lazyLoad: boolean;
  cacheContent: boolean;
  preloadTabs: TTabKey[];
  tabs: Array<readonly [TTabKey, Tab]>;
  defaultTab?: TTabKey;
}

export function useTabLazyLoading<TTabKey extends string>({
  lazyLoad,
  cacheContent,
  preloadTabs,
  tabs,
  defaultTab
}: UseTabLazyLoadingProps<TTabKey>) {

  // Track which tabs have been rendered
  const [renderedTabs, setRenderedTabs] = useState<Set<TTabKey>>(() => {
    const initialSet = new Set<TTabKey>();

    // Always render the initial active tab
    const initialTab = defaultTab ?? tabs.find(([_, value]) => value)?.[0];
    if (initialTab) initialSet.add(initialTab);

    // Pre-load specified tabs
    preloadTabs.forEach(tab => initialSet.add(tab));

    return initialSet;
  });

  // Cache for rendered content
  const [cachedContent, setCachedContent] = useState<Map<TTabKey, ReactNode>>(new Map());

  // Function to render tab content with lazy loading and caching
  const renderTabContent = useCallback((tab: TTabKey, tabData: Tab) => {
    // If lazy loading is disabled, render immediately
    if (!lazyLoad) return typeof tabData.content === 'function' ? tabData.content() : tabData.content;
    if (!renderedTabs.has(tab)) return null; // Don't render anything for unvisited tabs

    // Check cache first if caching is enabled
    if (cacheContent && cachedContent.has(tab)) return cachedContent.get(tab);

    // Render the content
    const content = typeof tabData.content === 'function' ? tabData.content() : tabData.content;

    // Cache the rendered content if caching is enabled
    if (cacheContent) setCachedContent(prev => new Map(prev).set(tab, content));

    return content;
  }, [lazyLoad, cacheContent, renderedTabs, cachedContent]);

  // Mark a tab as rendered
  const markTabAsRendered = useCallback((tab: TTabKey) => {
    if (lazyLoad) setRenderedTabs(prev => new Set(prev).add(tab));
  }, [lazyLoad]);

  // Effect to handle preload tabs changes
  useEffect(() => {
    if (lazyLoad && preloadTabs.length > 0) setRenderedTabs(prev => {
      const newSet = new Set(prev);
      preloadTabs.forEach(tab => newSet.add(tab));
      return newSet;
    });
  }, [preloadTabs, lazyLoad]);

  // Cache management functions
  const clearCache = useCallback((tabsToKeep?: TTabKey[]) => {
    if (!cacheContent) return;
    if (tabsToKeep) setCachedContent(prev => {
        const newCache = new Map();
        tabsToKeep.forEach(tab => {
          if (prev.has(tab)) {
            newCache.set(tab, prev.get(tab));
          }
        });
        return newCache;
      });
    else setCachedContent(new Map());
  }, [cacheContent]);

  const preloadTab = useCallback((tab: TTabKey) => {
    if (lazyLoad) setRenderedTabs(prev => new Set(prev).add(tab));
  }, [lazyLoad]);

  const getCachedTabs = useCallback((): TTabKey[] => Array.from(cachedContent.keys()), [cachedContent]);
  const getRenderedTabs = useCallback((): TTabKey[] => Array.from(renderedTabs), [renderedTabs]);

  return {
    renderTabContent,
    markTabAsRendered,
    clearCache,
    preloadTab,
    getCachedTabs,
    getRenderedTabs
  };
}
