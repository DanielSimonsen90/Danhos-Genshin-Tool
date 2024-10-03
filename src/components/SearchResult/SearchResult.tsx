import { useEffect, useState } from 'react';
import { classNames } from '@/common/functions/strings';
import { useSettingEffect, useSettings } from '@/stores/SettingsStore';
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
  const settings = useSettings('preferredTabs', 'showAll', 'wrap');
  const [resultsCount, setResultsCount] = useState(0);
  const [showNotSave, setShowNotSave] = useState(settings.showAll);
  const [tab, setCurrentTab] = useState(settings.preferredTabs.results);
  const [wrap, setWrap] = useState(settings.wrap);

  const tabBarProps = {
    set,
    showNotSave,
    onShowMore: showNotSave ? undefined : () => setShowNotSave(true)
  }; /*satisfies Partial<TabContentProps>;*/ // Webpack doesn't understand "satisfies"

  // TODO: Replace with Checkbox component
  const ShowAll = () => (
    <div className="search-result__show-all-container">
      <input type="checkbox" checked={showNotSave} onChange={() => setShowNotSave(!showNotSave)} disabled={resultsCount < 1} />
      <label>Show all ({resultsCount})</label>
    </div>
  );
  const Wrap = () => (
    <div className="search-result__wrap-container">
      <input type="checkbox" checked={wrap} onChange={() => setWrap(!wrap)} />
      <label>Wrap</label>
    </div>
  );

  useEffect(() => {
    const results = (
      tab === 'combined' ? props.combined
      : tab === 'characters' ? props.byCharacterRecommendation
      : props.byArtifact
    );
    const showAll = results.length;
    const showShouldSave = results.filter(({ shouldSave }) => shouldSave).length;
    const showShouldNotSave = showAll - showShouldSave;
    setResultsCount(showShouldNotSave === 0 ? 0 : showNotSave ? showAll : showShouldSave);
  }, [tab, showNotSave]);

  useSettingEffect('preferredTabs', preferredTabs => ({ ...preferredTabs, results: tab }), [tab]);
  useSettingEffect('showAll', showNotSave, [showNotSave]);
  useSettingEffect('wrap', wrap, [wrap]);

  return (
    <div className={classNames(
      "search-result",
      showNotSave && "search-result--show-not-save",
      wrap && 'search-result--wrap'
    )}>
      <TabBar tabs={[
        ['combined', 'Combined'],
        ['artifacts', 'By Artifacts'],
        ['characters', 'By Character Recommendation'],
      ]}
        defaultTab={tab}
        combined={<TabContent results={props.combined} {...tabBarProps} />}
        characters={<TabContent results={props.byCharacterRecommendation} {...tabBarProps} />}
        artifacts={<TabContent results={props.byArtifact} {...tabBarProps} />}
        onTabChange={tab => setCurrentTab(tab)}
      >
        <ShowAll />
        <Wrap />
      </TabBar>
    </div>
  );
};

export default SearchResultComponent;