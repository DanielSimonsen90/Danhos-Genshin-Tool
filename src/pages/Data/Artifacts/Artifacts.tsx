import { SearchableArtifactList } from "@/components/common/SearchableList";
import { useArtifactData } from "@/stores";


export default function Artifacts() {
  const artifacts = useArtifactData().Artifacts;
  return <SearchableArtifactList liClassName="artifacts-list-item" items={artifacts} cardProps={{ 
    wrapInLink: true,
    showRarity: true,
  }} />
}