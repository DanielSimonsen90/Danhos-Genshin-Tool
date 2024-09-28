import { useNavigate } from "react-router-dom";

import { ExpectedFormData } from "@/common/types/store-data";
import { DebugLog } from "@/common/functions/dev";
import { generateId } from "@/common/functions/random";

import { useActionState } from "@/hooks/useActionState";
import { useComponent } from "@/hooks/useComponent";
import CacheStore from "@/stores/CacheStore";

import { SelectArtifactPartName, SelectArtifactSet, SelectMainStat as SelectMainStatComponent, SelectSubStat } from "../Select";

const debugLog = DebugLog(DebugLog.DEBUGS.searchComponent)

export default function Search() {
  const navigate = useNavigate();
  const [loading, onSubmit] = useActionState<ExpectedFormData>(4, data => {
    debugLog('onSubmit', data);
    if (data.subStats.length > 4) {
      throw new Error('Substats must be 4 or less');
    }

    const searchId = generateId();
    CacheStore.update('searchHistory', { [searchId]: data }, '{}');
    navigate(`/search/${searchId}`);
  });
  const [SelectMainStat, setSelectMainStat] = useComponent(SelectMainStatComponent, {
    name: 'mainStat',
    artifactPartName: 'Flower',
    defaultValue: 'HP%',
    required: true
  });

  return (
    <form onSubmit={onSubmit}>
      <SelectArtifactSet name="artifactSetName" defaultValue="Golden Troupe" required />
      <SelectArtifactPartName name="artifactPartName" onChange={part => setSelectMainStat({
        artifactPartName: part,
        defaultValue: part === 'Flower' ? 'HP%' : part === 'Feather' ? 'ATK%' : undefined
      })} defaultValue="Flower" required />
      <SelectMainStat />
      <SelectSubStat name="subStats" required />
      <button type="submit" disabled={loading}>Search</button>
    </form>
  );
}