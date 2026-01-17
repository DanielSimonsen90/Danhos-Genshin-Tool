import { SearchableArtifactList } from "@/components/domain/SearchableList";
import { ItemHeader } from "@/components/domain/Item";
import { useArtifactData } from "@/stores";

export default function Artifacts() {
  const artifacts = useArtifactData().Artifacts;
  
  return (
    <>
      <ItemHeader item={artifacts} itemName="Artifacts" showItemName />
      <SearchableArtifactList liClassName="artifacts-list-item" items={artifacts} placeholder="Search for an artifact..." cardProps={{ 
        wrapInLink: true,
        showRarity: true,
        showRegion: true,
      }} />
    </>
  );
}