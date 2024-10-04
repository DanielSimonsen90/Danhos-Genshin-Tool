import { useParams } from "react-router-dom";

import { pascalCaseFromSnakeCase } from "@/common/functions/strings";
import { DebugLog } from "@/common/functions/dev";
import { ArtifactImage } from "@/components/Images";

import { SearchResult, SearchService } from "@/services";
import { useCacheStore } from "@/stores/CacheStore";

import type { CacheStore } from "@/stores/CacheStore/CacheStoreTypes";
import SearchResultComponent from "@/components/SearchResult";
import ArtifactDetails from "@/components/ArtifactDetails";
import { useCallback, useEffect, useState } from "react";
import { SearchFormData } from "@/common/types";

const debugLog = DebugLog(DebugLog.DEBUGS.searchQuery);

export default function SearchQuery() {
  const { query } = useParams();
  const CacheStore = useCacheStore();
  const [formData, setFormData] = useState<SearchFormData>(null);
  const [results, setResults] = useState<SearchResult>(null);
  const Result = useCallback(() => results ? <SearchResultComponent result={results} /> : <p>No results</p>, [results]);

  useEffect(() => {
    const { formData, results } = getSearchResultsFromQuery(query, CacheStore);

    setFormData(formData);
    setResults(results);

    if (!CacheStore.get('searchHistory', {})[query]) CacheStore.update('searchHistory', { [query]: formData });
  }, [query, CacheStore]);

  if (!formData || !results) {
    debugLog('Loading', query);
    return <p>Loading...</p>; // TODO: Spinner
  }

  const { artifactSetName, artifactPartName } = formData;
  debugLog('SearchQuery update', { query, results });

  return (
    <>
      <div className="artifact-display">
        <ArtifactImage set={artifactSetName} name={artifactPartName} />
        <h1 className="artifact-display__mainstat">{formData.mainStat}</h1>
        <p className="artifact-display__substats">
          {formData.subStats.map((subStat, i) => (
            <span className="artifact-display__substat" key={i}>{subStat}</span>
          ))}
        </p>
        <ArtifactDetails artifact={results.set} />
      </div>
      <Result />
    </>
  );
}

function getSearchResultsFromQuery(query: string, CacheStore: CacheStore) {
  const formData = CacheStore.getFromItem('searchHistory', query, '{}');
  debugLog('getSearchResultsFromQuery cached', { query, formData });
  const { artifactSetName } = formData;
  const results = SearchService.search({
    ...formData,
    artifactSetName: pascalCaseFromSnakeCase(artifactSetName),
  }, CacheStore);

  debugLog('getSearchResultsFromQuery result', { query, results });
  return { formData, results };
}