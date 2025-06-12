import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { addTabNavigation } from "@/common/functions/accessibility";
import { classNames } from "@/common/functions/strings";
import { Chevron } from "../icons";

import { Props } from "./TabBarTypes";
import { createTabItem } from "./TabBarFunctions";

export default function TabBar<TTabKey extends string>(props: Props<TTabKey>) {
  const { collapseArea = 'content', direction = 'horizontal' } = props;
  const { placeChildrenBeforeTabs, hideCollapseChevron } = props;

  const tabs = useMemo(() => typeof props.tabs === 'function' ? props.tabs(createTabItem) : props.tabs, [props.tabs]);
  const internalTabs = useMemo(() => {
    const set = tabs
      .filter(([_, value]) => value !== undefined)
      .reduce((acc, [key, { title }]) => acc.set(key, title), new Map<TTabKey, ReactNode>());
    return [...set.entries()];
  }, [tabs, props.id]);

  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, _setActiveTab] = useState<TTabKey>(
    props.defaultTab
    ?? tabs.filter(([_, value]) => value)[0]?.[0]
  );

  const children = useMemo(() => {
    const resovleChild = (child: JSX.Element | ((collapsed: boolean) => JSX.Element)) => (
      typeof child === 'function' ? child(collapsed) : child
    );
    return Array.isArray(props.children) ? props.children.map(resovleChild) : resovleChild(props.children);
  }, [props.children, collapsed]);

  const getKeyName = useCallback((key: any) => props.id ? `#${props.id}-${key}` : key, [props.id]);
  const TabContent = useMemo(function TabContent() {
    return (<>{tabs.map(([tab, { content }], key) => (
      <div data-tab={tab} key={getKeyName(`content-${key}`)}
        className={classNames(
          "tab-bar__content-page",
          tab === (props.tab ?? activeTab) && 'tab-bar__content-page--active'
        )}>
        {typeof content === 'function' ? content() : content}
      </div>
    ))}</>);
  }, [tabs, activeTab, props.tab]);
  const setActiveTab = useCallback((tab: TTabKey) => {
    if (!tab) return;
    if (props.beforeTabChange) props.beforeTabChange(tab);
    (props.setTab ?? _setActiveTab)(tab);
  }, [props.beforeTabChange, props.setTab]);

  useEffect(function onTabChanged() {
    if (props.onTabChange) props.onTabChange(props.tab ?? activeTab);
  }, [activeTab, props.tab, props.onTabChange]);

  useEffect(function onTabsOptionsChanged() {
    // if active tab key is not in tabs or the value is falsy, set it to the first tab
    if (!tabs.find(([key]) => key === (props.tab ?? activeTab))?.[1]) {
      setActiveTab(props.defaultTab ?? tabs[0]?.[0] as TTabKey);
    }
  }, [tabs]);

  useEffect(function onControlledTabChanged() {
    if (props.tab) setActiveTab(props.tab);
  }, [props.tab]);

  return tabs.filter(([_, v]) => v)[0] ? (
    <div className={classNames("tab-bar", `tab-bar--${direction}`, props.className)}>
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
      <section className={classNames('tab-bar__content', collapsed && collapseArea === 'content' && 'tab-bar__content--collapsed')}>
        {TabContent}
      </section>
    </div>
  ) : props.noTabs;
}