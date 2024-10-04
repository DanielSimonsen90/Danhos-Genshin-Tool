import { useEffect, useState } from 'react';
import { classNames } from '@/common/functions/strings';
import { useSettings, useSettingsStore } from '@/stores/SettingsStore';
import { SearchResult } from '@/services/SearchService';
import TabBar from '@/components/TabBar';
import TabContent from './components/TabContent';

type Props = {
  result: SearchResult;
};

export const SearchResultComponent = ({ result: {
  form, id, set,
  ...props
} }: Props) => {
  const settingsStore = useSettingsStore();
  const { wrap, preferredTabs, showAll } = useSettings('preferredTabs', 'showAll', 'wrap');
  const [resultsCount, setResultsCount] = useState(0);

  const tabBarProps = {
    set,
    showAll,
    onShowMore: showAll ? undefined : () => settingsStore.update({ showAll: true }),
  }; /*satisfies Partial<TabContentProps>;*/ // Webpack doesn't understand "satisfies"

  // TODO: Replace with Checkbox component
  const ShowAll = () => (
    <div className="search-result__show-all-container">
      <input type="checkbox" checked={showAll} onChange={() => settingsStore.update(cur => ({ showAll: !cur.showAll }))} disabled={resultsCount < 1} />
      <label>Show all ({resultsCount})</label>
    </div>
  );
  const Wrap = () => (
    <div className="search-result__wrap-container">
      <input type="checkbox" checked={wrap} onChange={() => settingsStore.update(cur => ({ wrap: !cur.wrap }))} />
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
    settingsStore.update(cur => ({ preferredTabs: { ...cur.preferredTabs, results: tab } }))
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
        tab={preferredTabs.results}
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