import { useParams } from "react-router-dom";

import { pascalCaseFromSnakeCase } from "@/common/functions/strings";
import { SearchService } from "@/services";
import CacheStore from "@/stores/CacheStore";

export default function SearchQuery() {
  const { query } = useParams();
  const results = getSearchResultsFromQuery(query);

  return (
    <div> 
      Search Query: {query}
      <code>
        {JSON.stringify(results, null, 2)}
      </code>
    </div>
  );
}

function getSearchResultsFromQuery(query: string) {
  const data = CacheStore.getFromItem('searchHistory', query, '{}');
  const { artifactSetName, artifactPartName, mainStat, subStats } = data;
  return SearchService.Search(
    pascalCaseFromSnakeCase(artifactSetName),
    artifactPartName,
    mainStat,
    subStats
  );
}