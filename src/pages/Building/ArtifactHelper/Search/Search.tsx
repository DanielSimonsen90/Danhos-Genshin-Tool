import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { pascalCaseFromSnakeCase } from "@/common/functions/strings";
import { DebugLog } from "@/common/functions/dev";
import { SearchFormData } from "@/common/types";

import { ArtifactImage } from "@/components/common/media/Images";
import { ArtifactDetails } from "@/components/domain/models/Artifacts";

import { SearchResult, SearchService } from "@/services";

import { useCacheStore, useDataStore } from "@/stores";
import type { CacheStore } from "@/stores/CacheStore/CacheStoreTypes";
import type { DataStore } from "@/stores/DataStore/DataStoreTypes";

import { SearchResult as SearchResultComponent } from "./components";

const debugLog = DebugLog(DebugLog.DEBUGS.searchQuery);

export default function SearchQuery() {
  const { query } = useParams();
  const CacheStore = useCacheStore();
  const DataStore = useDataStore();
  const [formData, setFormData] = useState<SearchFormData>(null);
  const [results, setResults] = useState<SearchResult>(null);
  const [retries, setRetries] = useState(0);
  const Result = useCallback(() => results ? <SearchResultComponent result={results} /> : <p>No results</p>, [results]);

  useEffect(() => {
    const { formData, results } = getSearchResultsFromQuery(query, CacheStore, DataStore);

    setFormData(formData);
    setResults(results);

    if (!CacheStore.get('searchHistory', {})[query] && formData) CacheStore.update('searchHistory', { [query]: formData });
  }, [query, retries]);

  if (!formData || !results) return (
    <div className="loading">
      <p>Results failed.</p>
      <button onClick={() => setRetries(retries + 1)}>Try again?</button>
      {retries > 2 && <p>Attempts: {retries}</p>}
    </div>
  );

  const { artifactSetName, artifactPartName } = formData;
  debugLog('SearchQuery update', { query, results });

  return (
    <>
      <div className="artifact-display">
        <ArtifactImage set={artifactSetName} piece={artifactPartName} />
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

function getSearchResultsFromQuery(query: string, CacheStore: CacheStore, DataStore: DataStore) {
  const formData = CacheStore.getFromItem('searchHistory', query, '{}');
  debugLog('getSearchResultsFromQuery cached', { query, formData });
  if (!formData) return { formData, results: null };

  const { artifactSetName } = formData;
  const results = SearchService.search({
    ...formData,
    artifactSetName: pascalCaseFromSnakeCase(artifactSetName),
  }, CacheStore, DataStore);

  debugLog('getSearchResultsFromQuery result', { query, results });
  return { formData, results };
}