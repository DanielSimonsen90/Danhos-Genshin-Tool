import { useParams } from "react-router-dom";

import { pascalCaseFromSnakeCase } from "@/common/functions/strings";
import { DebugLog } from "@/common/functions/dev";
import { ArtifactImage } from "@/components/Images";

import { SearchService } from "@/services";
import { useCacheStore } from "@/stores/CacheStore";

import type { CacheStore } from "@/stores/CacheStore/CacheStore";
import { useEffect } from "react";
import SearchResult from "@/components/SearchResult";
import ArtifactDetails from "@/components/ArtifactDetails";

const debugLog = DebugLog(DebugLog.DEBUGS.searchQuery);

export default function SearchQuery() {
  const { query } = useParams();
  const CacheStore = useCacheStore();
  const { formData, results } = getSearchResultsFromQuery(query, CacheStore);
  const { artifactSetName, artifactPartName } = formData;
  const Result = () => results ? <SearchResult result={results} /> : <p>No results</p>;

  useEffect(() => {
    CacheStore.update('currentSearch', query, '');
  }, [query]);

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