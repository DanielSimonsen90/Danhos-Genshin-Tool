import { useNavigate } from "react-router-dom";

import { SearchFormData } from "@/common/types/store-data";
import { DebugLog } from "@/common/functions/dev";
import { generateId } from "@/common/functions/random";
import { formatSearchData, pascalCaseFromSnakeCase } from '@/common/functions/strings';

import { useActionState } from "@/hooks/useActionState";
import { useComponent } from "@/hooks/useComponent";

import { useCacheItemMapped, useCacheStore } from "@/stores/CacheStore";

import { SelectArtifactPartName, SelectArtifactSet, SelectMainStat as SelectMainStatComponent, SelectSubStat } from "../Select";

const debugLog = DebugLog(DebugLog.DEBUGS.searchComponent);

export default function Search() {
  const navigate = useNavigate();
  const CacheStore = useCacheStore();
  const defaultSearch = useCacheItemMapped('currentSearch', currentSearchId => {
    if (!currentSearchId) return undefined;
    const currentSearch = CacheStore.findObject('searchResults', result => result.id === currentSearchId);
    if (!currentSearch) return undefined;

    return Array.from(currentSearch.form.entries()).reduce((acc, [key, value]) => {
      // @ts-ignore
      acc[key] = value;
      return acc;
    }, {} as SearchFormData);
  })
  const [loading, onSubmit] = useActionState<SearchFormData>(4, data => {
    debugLog('onSubmit', data);
    if (data.subStats.length > 4) {
      throw new Error('Substats must be 4 or less');
    }

    const searchId = generateId();
    CacheStore.update('searchHistory', {
      [searchId]: { 
        ...data,
        id: searchId,
        title: pascalCaseFromSnakeCase(formatSearchData(data, true)),
        titleNoSet: formatSearchData(data),
        timestamp: Date.now()
      }
    }, '{}');
    navigate(`/search/${searchId}`);
  });
  const [SelectMainStat, setSelectMainStat] = useComponent(SelectMainStatComponent, {
    name: 'mainStat',
    artifactPartName: 'Flower',
    defaultValue: defaultSearch?.mainStat,
    required: true
  });

  return (
    <form className="search-form" onSubmit={onSubmit}>
      <SelectArtifactSet name="artifactSetName" defaultValue={defaultSearch?.artifactSetName} required />
      <SelectArtifactPartName name="artifactPartName" defaultValue={defaultSearch?.artifactPartName} required
        onChange={part => setSelectMainStat({
          artifactPartName: part,
          defaultValue: part === 'Flower' ? 'HP%' : part === 'Feather' ? 'ATK%' : undefined
        })} />
      <SelectMainStat />
      <SelectSubStat name="subStats" defaultValue={defaultSearch?.subStats} required />

      <button className="primary" type="submit" disabled={loading}>Search</button>
    </form>
  );
}