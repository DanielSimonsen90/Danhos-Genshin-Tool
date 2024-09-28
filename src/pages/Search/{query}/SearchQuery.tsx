import { useParams } from "react-router-dom";

import { pascalCaseFromSnakeCase } from "@/common/functions/strings";
import { SearchService } from "@/services";
import CacheStore from "@/stores/CacheStore";
import { DebugLog } from "@/common/functions/dev";
import { ArtifactImage } from "@/components/Images";

const debugLog = DebugLog(DebugLog.DEBUGS.searchQuery);

export default function SearchQuery() {
  const { query } = useParams();
  const { formData, results } = getSearchResultsFromQuery(query);
  const { artifactSetName, artifactPartName, mainStat, subStats } = formData;

  debugLog('SearchQuery update', { query, results });

  return (
    <div>
      <br />
      <ArtifactImage set={artifactSetName} name={artifactPartName} />
      <h1>{mainStat} & {subStats.join(', ')}</h1>
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

function getSearchResultsFromQuery(query: string) {
  const formData = CacheStore.getFromItem('searchHistory', query, '{}');
  debugLog('getSearchResultsFromQuery cached', { query, formData });
  const { artifactSetName } = formData;
  const results = SearchService.search({
    ...formData,
    artifactSetName: pascalCaseFromSnakeCase(artifactSetName),
  });

  debugLog('getSearchResultsFromQuery result', { query, results });
  return { formData, results };
}