import { Switch } from "@/components/common/FormItems";
import { SearchResult } from "@/services";
import { useSetting } from "@/stores";
import { DEFAULT_SETTINGS } from "@/stores/SettingsStore/SettingsStoreConstants";
import { useEffect, useState } from "react";

type Props = Pick<SearchResult, 'combined' | 'byCharacterRecommendation' | 'byArtifact'>;

export function ShowAll(props: Props) {
  const showAll = useSetting('showAll');
  const preferredTabs = useSetting('preferredTabs').get() ?? DEFAULT_SETTINGS.preferredTabs;
  const [resultsCount, setResultsCount] = useState(0);

  const total = (
    preferredTabs.results === 'combined' ? props.combined
    : preferredTabs.results === 'characters' ? props.byCharacterRecommendation
    : props.byArtifact
  ).length;

  useEffect(() => {
    const results = (
      preferredTabs.results === 'combined' ? props.combined
      : preferredTabs.results === 'characters' ? props.byCharacterRecommendation
      : props.byArtifact
    );
    const showAllResults = results.length;
    const showShouldSave = results.filter(({ shouldSave }) => shouldSave).length;
    const showShouldNotSave = showAllResults - showShouldSave;
    setResultsCount(showShouldNotSave === 0 ? 0 : showAll.get() ? showAllResults : showShouldSave);
  }, [preferredTabs.results, showAll.get()]);

  return (
    <div className="search-result__show-all-container">
      <Switch enabled={showAll.get()} onChange={showAll.set} disabled={resultsCount < 1} />
      <label>Show all ({resultsCount}/{total})</label>
    </div>
  );
}

export default ShowAll;