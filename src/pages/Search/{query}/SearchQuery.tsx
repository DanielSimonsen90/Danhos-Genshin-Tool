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
      <div>
        <h2>By Artifact</h2>
        {results.byArtifact.map(item => (
          <li key={item.character.name}>
            <label>{item.character.name} - {item.score}</label>
            <input type="checkbox" checked={item.shouldSave} readOnly />
          </li>
        ))}
      </div>
      <div>
        <h2>By Character Recommendation</h2>
        {results.byCharacterRecommendation.map(item => (
          <li key={item.character.name}>
            <label>{item.character.name} - {item.score}</label>
            <input type="checkbox" checked={item.shouldSave} readOnly />
          </li>
        ))}
      </div>
    </div>
  );
}

function getSearchResultsFromQuery(query: string) {
  const formData = CacheStore.getFromItem('searchHistory', query, '{}');
  const { artifactSetName, artifactPartName, mainStat, subStats } = formData;
  const results = SearchService.search(
    pascalCaseFromSnakeCase(artifactSetName),
    artifactPartName,
    mainStat,
    subStats
  );

  return { formData, results };
}