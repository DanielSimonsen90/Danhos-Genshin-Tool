import { classNames } from '@/common/functions/strings';
import { AppSettings, useSettings, useSettingsStore } from '@/stores/SettingsStore';
import { SearchResult } from '@/services/SearchService';
import TabBar from '@/components/common/TabBar';
import { TabContent, Wrap, ShowAll } from './components';

type Props = {
  result: SearchResult;
};

export const SearchResultComponent = ({ result: {
  id, set,
  ...props
} }: Props) => {
  const settingsStore = useSettingsStore();
  const { wrap, preferredTabs, showAll } = useSettings('preferredTabs', 'showAll', 'wrap');

  const tabBarProps = {
    set,
    showAll: showAll.get(),
    onShowMore: showAll.get() ? undefined : () => showAll.set(true),
  }; /*satisfies Partial<TabContentProps>;*/ // Webpack doesn't understand "satisfies"

  function handleTabChanged(tab: 'combined' | 'characters' | 'artifacts') {
    if (preferredTabs.get().results === tab) return;
    settingsStore.updateSettings(cur => ({ preferredTabs: { ...(cur.preferredTabs ?? {} as AppSettings['preferredTabs']), results: tab } }));
  }

  return (
    <div className={classNames(
      "search-result",
      showAll.get() && "search-result--show-not-save",
      wrap.get() && 'search-result--wrap'
    )}>
      <TabBar tabs={[
        ['combined', {
          title: 'Combined',
          content: <TabContent results={props.combined} {...tabBarProps} />
        }],
        ['artifacts', {
          title: 'By Artifacts',
          content: <TabContent results={props.byArtifact} {...tabBarProps} />
        }],
        ['characters', {
          title: 'By Character Recommendation',
          content: <TabContent results={props.byCharacterRecommendation} {...tabBarProps} />
        }],
      ]}
        defaultTab={preferredTabs.get().results}
        onTabChange={tab => handleTabChanged(tab as 'combined' | 'characters' | 'artifacts')}
      >
        <ShowAll {...{ ...props }} />
        <Wrap />
      </TabBar>
    </div>
  );
};

export default SearchResultComponent;