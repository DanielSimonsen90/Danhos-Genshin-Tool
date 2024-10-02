import { SearchResult } from '@/services/SearchService';
import TabBar from '@/components/TabBar';
import TabContent from './components/TabContent';
import { useState } from 'react';
import { classNames } from '@/common/functions/strings';

type Props = {
  result: SearchResult;
};

export const SearchResultComponent = ({ result: {
  form, id, set,
  ...props
} }: Props) => {
  const [showNotSave, setShowNotSave] = useState(false);
  const [resultsCount, setResultsCount] = useState(0);
  const tabBarProps = { set, showNotSave };

  const ShowAll = () => (
    <div className={classNames("search-result__show-all-container", resultsCount === -1 && 'hidden')}>
      <label>Show all ({resultsCount})</label>
      <input type="checkbox" checked={showNotSave} onChange={() => setShowNotSave(!showNotSave)} />
    </div>
  )

  function handleTabChanged(tab: string) {
    const results = (
      tab === 'combined' ? props.combined
      : tab === 'characters' ? props.byCharacterRecommendation
      : props.byArtifact
    );
    const showAll = results.length;
    const showShouldSave = results.filter(({ shouldSave }) => shouldSave).length;
    const showShouldNotSave = showAll - showShouldSave;
    setResultsCount(showShouldNotSave === 0 ? -1 : showNotSave ? showAll : showShouldSave);
  }

  return (
    <div className="search-result">
      {/* @ts-ignore */}
      <TabBar tabs={[
        ['combined', 'Combined'],
        ['artifacts', 'By Artifacts'],
        ['characters', 'By Character Recommendation'],
      ]}
        combined={<TabContent results={props.combined} {...tabBarProps} />}
        characters={<TabContent results={props.byCharacterRecommendation} {...tabBarProps} />}
        artifacts={<TabContent results={props.byArtifact} {...tabBarProps} />}
        onTabChange={handleTabChanged}
      >
        <ShowAll />
      </TabBar>
    </div>
  );
};

export default SearchResultComponent;