import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { pascalCaseFromSnakeCase } from "@/common/functions/strings";
import { DebugLog } from "@/common/functions/dev";
import { SearchFormData } from "@/common/types";

import { ArtifactImage } from "@/components/common/media/Images";
import { ArtifactDetails } from "@/components/domain/models/Artifacts";

import { SearchResult, ArtifactSearchService } from "@/services";

import { useCacheStore, useDataStore } from "@/stores";

import { SearchResult as SearchResultComponent } from "./components";
import ArtifactHelper from "../ArtifactHelper";

const debugLog = DebugLog(DebugLog.DEBUGS.searchQuery);

export default function SearchQuery() {
  const { query = '' } = useParams();

  const CacheStore = useCacheStore();
  const DataStore = useDataStore();

  const [formData, setFormData] = useState<SearchFormData | undefined>(undefined);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [retries, setRetries] = useState(0);

  const artifactSet = useMemo(() => formData?.artifactSetName ? DataStore.findArtifactByName(formData.artifactSetName.replace(/_/g, ' ')) : undefined, [formData, DataStore]);
  const Result = useCallback(() => results ? <SearchResultComponent result={results} /> : <p>No results</p>, [results]);

  useEffect(() => {
    const formData = CacheStore.getFromItem('searchHistory', query, {});
    debugLog('SearchQuery formData', { query, formData });
    if (!formData) return;

    const { artifactSetName } = formData;
    const results = ArtifactSearchService.search({
      ...formData,
      artifactSetName: pascalCaseFromSnakeCase(artifactSetName),
    });

    debugLog('SearchQuery results', { query, results });
    setFormData(formData);
    setResults(results);
  }, [query, retries]);

  if (!formData || !results || !artifactSet) return (
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
      <ArtifactHelper />
      <div className="artifact-display">
        <ArtifactImage set={artifactSetName} piece={artifactPartName} />
        <h1 className="artifact-display__mainstat">{formData.mainStat}</h1>
        <p className="artifact-display__substats">
          {formData.subStats.map((subStat, i) => (
            <span className="artifact-display__substat" key={i}>{subStat}</span>
          ))}
        </p>
        <ArtifactDetails artifact={artifactSet} />
      </div>
      <Result />
    </>
  );
}