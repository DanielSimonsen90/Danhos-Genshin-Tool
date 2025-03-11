import { classNames } from '@/common/functions/strings';
import { useSettings, useSettingsStore } from '@/stores/SettingsStore';
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
    onShowMore: showAll ? undefined : () => showAll.set(true),
  }; /*satisfies Partial<TabContentProps>;*/ // Webpack doesn't understand "satisfies"

  function handleTabChanged(tab: 'combined' | 'characters' | 'artifacts') {
    if (preferredTabs.get().results === tab) return;
    settingsStore.updateSettings(cur => ({ preferredTabs: { ...cur.preferredTabs, results: tab } }));
  }

  return (
    <div className={classNames(
      "search-result",
      showAll.get() && "search-result--show-not-save",
      wrap.get() && 'search-result--wrap'
    )}>
      <TabBar tabs={[
        ['combined', 'Combined'],
        ['artifacts', 'By Artifacts'],
        ['characters', 'By Character Recommendation'],
      ]} content={[
        ['combined', <TabContent results={props.combined} {...tabBarProps} />],
        ['artifacts', <TabContent results={props.byArtifact} {...tabBarProps} />],
        ['characters', <TabContent results={props.byCharacterRecommendation} {...tabBarProps} />],
      ]}
        defaultTab={preferredTabs.get().results}
        onTabChange={handleTabChanged}
      >
        <ShowAll { ...{ ...props }} />
        <Wrap />
      </TabBar>
    </div>
  );
};

export default SearchResultComponent;