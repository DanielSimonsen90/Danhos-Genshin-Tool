import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { addTabNavigation } from "@/common/functions/accessibility";
import { classNames } from "@/common/functions/strings";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Chevron } from "../icons";

import { Props, Tab } from "./TabBarTypes";
import { createTabItem } from "./TabBarFunctions";
import useOnChange from "@/hooks/useOnChange";

export default function TabBar<TTabKey extends string>(props: Props<TTabKey>) {
  const { collapseArea = 'content', direction = 'horizontal' } = props;
  const { placeChildrenBeforeTabs, hideCollapseChevron, resizable = false } = props;
  const { minSize = 150, maxSize = 500, initialSize = 250 } = props;

  // Resize functionality
  const storage = useLocalStorage<number>();
  const sizeStorage = props.id ? storage(`tabbar-size-${props.id}`) : null;
  
  const [tabsSize, setTabsSize] = useState(() => {
    if (resizable && direction === 'vertical') {
      return sizeStorage?.get(initialSize) ?? initialSize;
    }
    return initialSize;
  });

  const [isDragging, setIsDragging] = useState(false);
  const handleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newSize = e.clientX - rect.left;
    
    // Clamp the size within min/max bounds
    const clampedSize = Math.max(minSize, Math.min(maxSize, newSize));
    
    setTabsSize(clampedSize);
  }, [isDragging, minSize, maxSize]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (sizeStorage) {
      sizeStorage.set(tabsSize);
    }
  }, [sizeStorage, tabsSize]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const dynamicStyles = useMemo(() => {
    if (resizable && direction === 'vertical') {
      return {
        '--tabs-size': `${tabsSize}px`
      } as React.CSSProperties;
    }
    return {};
  }, [resizable, direction, tabsSize]);

  const tabs = useMemo(() => {
    const rawTabs = typeof props.tabs === 'function' ? props.tabs(createTabItem) : props.tabs;
    return rawTabs.filter((tab): tab is readonly [TTabKey, Tab] => Boolean(tab));
  }, [props.tabs]);
  const internalTabs = useMemo(() => {
    const set = tabs
      .filter(([_, value]) => value !== undefined && value.content !== undefined)
      .reduce((acc, [key, { title }]) => acc.set(key, title), new Map<TTabKey, ReactNode>());
    return [...set.entries()];
  }, [tabs, props.id]);

  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, _setActiveTab] = useState<TTabKey>(
    props.defaultTab
    ?? tabs.find(([_, value]) => value)?.[0]
  );

  const children = useMemo(() => {
    const resovleChild = (child: JSX.Element | ((collapsed: boolean) => JSX.Element)) => (
      typeof child === 'function' ? child(collapsed) : child
    );
    return Array.isArray(props.children) ? props.children.map(resovleChild) : resovleChild(props.children);
  }, [props.children, collapsed]);

  const getKeyName = useCallback((key: any) => props.id ? `#${props.id}-${key}` : key, [props.id]);
  const TabContent = useMemo(() => (<>
    {tabs.map(([tab, { content }], key) => (
      <div data-tab={tab} key={getKeyName(`content-${tab}-${key}`)} data-key={getKeyName(`content-${tab}-${key}`)}
        className={classNames(
          "tab-bar__content-page",
          tab === (props.tab ?? activeTab) && 'tab-bar__content-page--active'
        )}>
        {typeof content === 'function' ? content() : content}
      </div>
    ))}
  </>), [tabs, activeTab, props.tab]);
  const setActiveTab = useCallback((tab: TTabKey) => {
    if (!tab) return;
    if (props.beforeTabChange) props.beforeTabChange(tab);
    (props.setTab ?? _setActiveTab)(tab);
  }, [props.beforeTabChange, props.setTab, _setActiveTab]);

  useEffect(function onTabChanged() {
    if (props.onTabChange) props.onTabChange(props.tab ?? activeTab);
  }, [activeTab, props.tab, props.onTabChange]);

  useEffect(function onTabsOptionsChanged() {
    // if active tab key is not in tabs or the value is falsy, set it to the first tab
    if (!tabs.find(([key]) => key === (props.tab ?? activeTab))?.[1]) {
      const newTab = props.defaultTab ?? tabs[0]?.[0] as TTabKey;
      if (newTab && newTab !== (props.tab ?? activeTab)) {
        setActiveTab(newTab);
      }
    }
  }, [tabs, props.tab, activeTab, props.defaultTab, setActiveTab]);

  // useOnChange(props.tab, tab => tab && setActiveTab(tab));
  useEffect(function onControlledTabChanged() {
    if (props.tab) setActiveTab(props.tab);
  }, [props.tab]);
  return tabs.filter(([_, v]) => v)[0] ? (
    <div 
      ref={containerRef}
      className={classNames(
        "tab-bar", 
        `tab-bar--${direction}`, 
        resizable && 'tab-bar--resizable',
        props.className
      )}
      style={dynamicStyles}
    >
      <header className={classNames('tab-bar__tabs', collapsed && collapseArea === 'tabs' && 'tab-bar__tabs--collapsed')}>
        {placeChildrenBeforeTabs && children}
        {internalTabs.map(([tab, title]) => title &&
          <div role="button" key={getKeyName(tab)} title={tab}
            className={classNames("tab-bar__tab", activeTab === tab && 'tab-bar__tab--active')}
            onClick={() => setActiveTab(tab)}
          >
            {title}
          </div>)}
        {!placeChildrenBeforeTabs && children}
        {!hideCollapseChevron && (
          <div className="collapse-chevron" title={collapsed ? 'Expand' : 'Collapse'}>
            <Chevron role="button" tabIndex={0} point={
              direction === 'horizontal'
                ? collapsed ? 'down' : 'up'
                : collapsed ? 'left' : 'right'
            } {...addTabNavigation(() => setCollapsed(v => !v), true)} />
          </div>
        )}
      </header>
      
      {/* Resize handle for vertical resizable TabBars */}
      {resizable && direction === 'vertical' && (
        <div 
          ref={handleRef}
          className={classNames(
            'tab-bar__resize-handle',
            isDragging && 'tab-bar__resize-handle--dragging'
          )}
          onMouseDown={handleMouseDown}
        />
      )}
      
      <section className={classNames('tab-bar__content', collapsed && collapseArea === 'content' && 'tab-bar__content--collapsed')}>
        {TabContent}
      </section>
    </div>
  ) : props.noTabs;
}