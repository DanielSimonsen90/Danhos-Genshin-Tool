import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SearchFormData } from "@/common/types/store-data";
import { DebugLog } from "@/common/functions/dev";
import { generateId } from "@/common/functions/random";
import { formatSearchData, pascalCaseFromSnakeCase } from '@/common/functions/strings';

import {
  SelectArtifactPartName, SelectArtifactSet,
  SelectMainStat as SelectMainStatComponent,
  SelectSubStat
} from "@/components/common/FormItems";

import { useActionState } from "@/hooks/useActionState";
import { useComponent } from "@/hooks/useComponent";
import { useToast } from "@/providers/ToastProvider";

import { useCacheStore } from "@/stores/CacheStore";
import { ArtifactImage } from "@/components/common/media/Images";
import { ROUTES } from "@/common/constants/routes";
import { ArtifactPartName } from "@/common/types";
import { useDataStore } from "@/stores";

const debugLog = DebugLog(DebugLog.DEBUGS.searchComponent);

export default function Search() {
  const navigate = useNavigate();
  const { query } = useParams();
  
  const DataStore = useDataStore();
  const CacheStore = useCacheStore();
  const { error } = useToast();

  const defaultSearch = useMemo(() => {
    if (!query) return undefined;
    const currentSearch = CacheStore.findObject('searchResults', result => result.id === query);
    if (!currentSearch) return undefined;

    return Array.from(currentSearch.form.entries()).reduce((acc, [key, value]) => {
      // @ts-ignore
      acc[key] = value;
      return acc;
    }, {} as SearchFormData);
  }, [query]);

  const [artifactSetName, setArtifactSetName] = useState<string | undefined>(defaultSearch?.artifactSetName);
  const [artifactSetPiece, setArtifactSetPiece] = useState<ArtifactPartName>(defaultSearch?.artifactPartName ?? 'Flower');

  const [loading, onSubmit] = useActionState<SearchFormData>(data => {
    debugLog('onSubmit', data);
    if (data.subStats.filter(Boolean).length > 4) {
      error('Substats must be 4 or less');
      return;
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
    });
    navigate(ROUTES.endRoute('building_artifact_helper_search').replace(':query', searchId));
  }, 4);
  const [SelectMainStat, setSelectMainStat] = useComponent(SelectMainStatComponent, {
    name: 'mainStat',
    artifactPartName: 'Flower',
    defaultValue: defaultSearch?.mainStat,
    required: true
  });

  debugLog('Default search', defaultSearch);

  return (
    <form className="search-form" onSubmit={onSubmit}>
      <div className="artifact-set-select">
        {artifactSetName ? <ArtifactImage set={artifactSetName} piece={artifactSetPiece} /> : null}
        <SelectArtifactSet name="artifactSetName" defaultValue={defaultSearch?.artifactSetName} required onChange={setArtifactSetName} />
      </div>
      <SelectArtifactPartName name="artifactPartName" defaultValue={defaultSearch?.artifactPartName} required
        onChange={part => {
          setSelectMainStat({
            artifactPartName: part,
            defaultValue: part === 'Flower' ? 'HP%' : part === 'Feather' ? 'ATK%' : undefined
          });
          setArtifactSetPiece(part);
        }} />
      <SelectMainStat />
      <SelectSubStat name="subStats" defaultValue={defaultSearch?.subStats} required floatable />

      <button className="brand primary" type="submit" disabled={loading}>Search</button>
    </form>
  );
}