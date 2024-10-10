import SearchableList from "@/components/common/SearchableList";
import { ArtifactCard } from "@/components/domain/Artifacts";
import { useArtifactData } from "@/stores";


export default function Artifacts() {
  const { ArtifactSets } = useArtifactData();

  return <SearchableList
    items={ArtifactSets} renderItem={artifact => <ArtifactCard artifact={artifact} wrapInLink />}
    onSearch={(query, artifact) => artifact.name.toLowerCase().includes(query.toLowerCase())}
    className="artifacts-list" liClassName="artifacts-list-item"
  />;
}