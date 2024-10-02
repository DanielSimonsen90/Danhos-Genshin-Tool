import { useParams } from "react-router-dom";

import { pascalCaseFromSnakeCase } from "@/common/functions/strings";
import { DebugLog } from "@/common/functions/dev";
import { ArtifactImage } from "@/components/Images";

import { SearchService } from "@/services";
import { useCacheStore } from "@/stores/CacheStore";

import type { CacheStore } from "@/stores/CacheStore/CacheStore";
import { useEffect } from "react";

const debugLog = DebugLog(DebugLog.DEBUGS.searchQuery);

export default function SearchQuery() {
  const { query } = useParams();
  const CacheStore = useCacheStore()
  const { formData, results } = getSearchResultsFromQuery(query, CacheStore);
  const { artifactSetName, artifactPartName } = formData;
  
  useEffect(() => {
    CacheStore.update('currentSearch', query, '');
  }, [query]);

  debugLog('SearchQuery update', { query, results });

  return (
    <div>
      <p>{query}</p>
      <ArtifactImage set={artifactSetName} name={artifactPartName} />
      <h1>{formData.titleNoSet}</h1>
      {results ? (<>
        <h2>Results</h2>
        <ul>
          {results.combined.map(result => (
            <li key={result.character.name}>
              <label>{result.character.name} - {result.score}</label>
              <input type="checkbox" readOnly checked={result.shouldSave} />
            </li>
          ))}
        </ul>
      </>) : <p>No results</p>}

    </div>
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