import { useId } from "react";
import { useNavigate } from "react-router-dom";

import { ExpectedFormData } from "@/common/types/store-data";
import { useActionState } from "@/hooks/useActionState";
import { useComponent } from "@/hooks/useComponent";
import CacheStore from "@/stores/CacheStore";
import { SelectArtifactPartName, SelectArtifactSet, SelectMainStat as SelectMainStatComponent, SelectSubStat } from "../Select";

export default function Search() {
  const navigate = useNavigate();
  const searchId = useId();
  const [loading, onSubmit] = useActionState<ExpectedFormData>(4, data => {
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