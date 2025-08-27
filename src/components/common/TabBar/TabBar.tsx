import { ReactNode, useMemo, forwardRef, useImperativeHandle } from "react";
import { addTabNavigation } from "@/common/functions/accessibility";
import { classNames } from "@/common/functions/strings";
import { Chevron } from "../media/icons";

import { Props, TabBarRef } from "./TabBarTypes";
import { 
  useTabResize, 
  useTabLazyLoading, 
  useTabState, 
  useTabData, 
  useTabCollapse, 
  useTabContent 
} from "./hooks";

const TabBar = forwardRef(<TTabKey extends string>(props: Props<TTabKey>, ref: React.Ref<TabBarRef<TTabKey>>) => {
  const { collapseArea = 'content', direction = 'horizontal' } = props;
  const { placeChildrenBeforeTabs, hideCollapseChevron, resizable = false } = props;
  const { minSize = 150, maxSize = 500, initialSize = 250 } = props;
  const { lazyLoad = true, cacheContent = true, preloadTabs = [] } = props;

  // Use custom hooks for different concerns
  const { tabs, internalTabs } = useTabData({
    tabs: props.tabs,
    id: props.id
  });

  const resizeProps = useTabResize({
    id: props.id,
    resizable, direction,
    minSize, maxSize, initialSize,
  });

  const lazyLoadingProps = useTabLazyLoading({
    lazyLoad, cacheContent, preloadTabs,
    tabs, defaultTab: props.defaultTab
  });

  const tabStateProps = useTabState({
    defaultTab: props.defaultTab, 
    tab: props.tab, setTab: props.setTab,
    tabs,
    beforeTabChange: props.beforeTabChange,
    onTabChange: props.onTabChange,
    markTabAsRendered: lazyLoadingProps.markTabAsRendered
  });

  const collapseProps = useTabCollapse({
    children: props.children,
    hideCollapseChevron,
    direction
  });

  const { getKeyName } = useTabContent({ id: props.id });

  // Generate tab content JSX
  const TabContent = useMemo(() => (<>
    {tabs.map(([tab, tabData], key) => {
      const content = lazyLoadingProps.renderTabContent(tab, tabData);
      const isActive = tab === tabStateProps.activeTab;

      // Only render the div if we have content or if it's the active tab
      if (!content && !isActive) {
        return null;
      }

      return (
        <div data-tab={tab} key={getKeyName(`content-${tab}-${key}`)} data-key={getKeyName(`content-${tab}-${key}`)}
          className={classNames(
            "tab-bar__content-page",
            isActive && 'tab-bar__content-page--active'
          )}>
          {content}
        </div>
      );
    })}
  </>), [tabs, tabStateProps.activeTab, lazyLoadingProps.renderTabContent, getKeyName]);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    clearCache: lazyLoadingProps.clearCache,
    preloadTab: lazyLoadingProps.preloadTab,
    getCachedTabs: lazyLoadingProps.getCachedTabs,
    getRenderedTabs: lazyLoadingProps.getRenderedTabs,
  }), [lazyLoadingProps]);
  
  return tabs.filter(([_, v]) => v)[0] ? (
    <div
      ref={resizeProps.containerRef}
      className={classNames(
        "tab-bar",
        `tab-bar--${direction}`,
        resizable && 'tab-bar--resizable',
        props.className
      )}
      style={resizeProps.dynamicStyles}
    >
    <header className={classNames('tab-bar__tabs', collapseProps.collapsed && collapseArea === 'tabs' && 'tab-bar__tabs--collapsed')}>
        {placeChildrenBeforeTabs && collapseProps.children}
        {internalTabs.map(([tab, title]) => title &&
          <div role="button" key={getKeyName(tab)} title={tab}
            className={classNames(
              "tab-bar__tab", 
              tabStateProps.activeTab === tab && 'tab-bar__tab--active',
              tabs.find(([tabKey]) => tabKey === tab)?.[1]?.className
            )}
            onClick={() => tabStateProps.setActiveTab(tab)}
          >
            {title}
          </div>)}
        {!placeChildrenBeforeTabs && collapseProps.children}
        {collapseProps.showCollapseChevron && (
          <div className="collapse-chevron" title={collapseProps.collapsed ? 'Expand' : 'Collapse'}>
            <Chevron role="button" tabIndex={0} point={collapseProps.chevronPoint}
              {...addTabNavigation(collapseProps.toggleCollapsed, true)} />
          </div>
        )}
      </header>

      {/* Resize handle for vertical resizable TabBars */}
      {resizable && direction === 'vertical' && (
        <div
          ref={resizeProps.handleRef}
          className={classNames(
            'tab-bar__resize-handle',
            resizeProps.isDragging && 'tab-bar__resize-handle--dragging'
          )}
          onMouseDown={resizeProps.handleMouseDown}
        />
      )}

      <section className={classNames('tab-bar__content', collapseProps.collapsed && collapseArea === 'content' && 'tab-bar__content--collapsed')}>
        {TabContent}
      </section>
    </div>
  ) : props.noTabs ?? <></>;
});

TabBar.displayName = 'TabBar';

export default TabBar;