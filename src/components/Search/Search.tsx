import { useNavigate } from "react-router-dom";
import { useActionState } from "@/hooks/useActionState";
import { SearchService } from '@/services';
import { SelectArtifactPartName, SelectArtifactSet, SelectMainStat as SelectMainStatComponent, SelectSubStat } from "../Select";
import { useComponent } from "@/hooks/useComponent";
import { pascalCaseFromSnakeCase } from "@/common/functions/strings";

export default function Search() {
  const [loading, onSubmit] = useActionState<any>(data => {
    try {
      console.log('[Submit]:', data);
      const { artifactSetName, artifactPartName, mainStat, subStats } = data;
      const result = SearchService.Search(pascalCaseFromSnakeCase(artifactSetName) as any, artifactPartName, mainStat, subStats);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  });
  const [SelectMainStat, setSelectMainStat] = useComponent(SelectMainStatComponent, { name: 'mainStat', artifactPartName: 'Flower', defaultValue: 'HP%' });

  return (
    <form onSubmit={onSubmit}>
      <SelectArtifactSet name="artifactSetName" defaultValue="Golden Troupe" />
      <SelectArtifactPartName name="artifactPartName" onChange={part => setSelectMainStat({ 
        artifactPartName: part, 
        defaultValue: part === 'Flower' ? 'HP%' : part === 'Feather' ? 'ATK%' : undefined
      })} defaultValue="Flower" />
      <SelectMainStat />
      <SelectSubStat name="subStats" />
      <button type="submit" disabled={loading}>Search</button>
    </form>
  );
}