import { useEffect, useState } from 'react';
import { classNames } from '@/common/functions/strings';
import { useSettings, useSettingsStore } from '@/stores/SettingsStore';
import { SearchResult } from '@/services/SearchService';
import TabBar from '@/components/common/TabBar';
import TabContent from './components/TabContent';
import Switch from '@/components/common/Switch';

type Props = {
  result: SearchResult;
};

export const SearchResultComponent = ({ result: {
  id, set,
  ...props
} }: Props) => {
  const settingsStore = useSettingsStore();
  const { wrap, preferredTabs, showAll } = useSettings('preferredTabs', 'showAll', 'wrap');
  const [resultsCount, setResultsCount] = useState(0);

  const tabBarProps = {
    set,
    showAll,
    onShowMore: showAll ? undefined : () => settingsStore.updateSettings({ showAll: true }),
  }; /*satisfies Partial<TabContentProps>;*/ // Webpack doesn't understand "satisfies"

  const ShowAll = () => (
    <div className="search-result__show-all-container">
      <Switch enabled={showAll} onChange={showAll => settingsStore.updateSettings({ showAll })} disabled={resultsCount < 1} />
      <label>Show all ({resultsCount}/{(
        preferredTabs.results === 'combined' ? props.combined
        : preferredTabs.results === 'characters' ? props.byCharacterRecommendation
        : props.byArtifact
      ).length})</label>
    </div>
  );
  const Wrap = () => (
    <div className="search-result__wrap-container">
      <Switch enabled={wrap} onChange={wrap => settingsStore.updateSettings({ wrap })} />
      <label>Wrap</label>
    </div>
  );

  useEffect(() => {
    const results = (
      preferredTabs.results === 'combined' ? props.combined
      : preferredTabs.results === 'characters' ? props.byCharacterRecommendation
      : props.byArtifact
    );
    const showAllResults = results.length;
    const showShouldSave = results.filter(({ shouldSave }) => shouldSave).length;
    const showShouldNotSave = showAllResults - showShouldSave;
    setResultsCount(showShouldNotSave === 0 ? 0 : showAll ? showAllResults : showShouldSave);
  }, [preferredTabs.results, showAll]);

  function handleTabChanged(tab: 'combined' | 'characters' | 'artifacts') {
    if (preferredTabs.results === tab) return;
    settingsStore.updateSettings(cur => ({ preferredTabs: { ...cur.preferredTabs, results: tab } }))
  }

  return (
    <div className={classNames(
      "search-result",
      showAll && "search-result--show-not-save",
      wrap && 'search-result--wrap'
    )}>
      <TabBar tabs={[
        ['combined', 'Combined'],
        ['artifacts', 'By Artifacts'],
        ['characters', 'By Character Recommendation'],
      ]}
        defaultTab={preferredTabs.results}
        onTabChange={tab => handleTabChanged(tab)}
        combined={<TabContent results={props.combined} {...tabBarProps} />}
        characters={<TabContent results={props.byCharacterRecommendation} {...tabBarProps} />}
        artifacts={<TabContent results={props.byArtifact} {...tabBarProps} />}
      >
        <ShowAll />
        <Wrap />
      </TabBar>
    </div>
  );
};

export default SearchResultComponent;