import { ArtifactCard } from "@/components/domain/Artifacts";
import ItemsPage from "../_Layout/ItemsPage";


export default function Artifacts() {
  return <ItemsPage itemsKey="Artifacts" 
    Card={({ item }) => <ArtifactCard artifact={item} wrapInLink />} 
    filterChecks={{
      domains: artifact => artifact.domainNames.length > 0 && artifact.domainNames[0] !== "BOSS_DROP",
      boss: artifact => artifact.domainNames.length > 0 && artifact.domainNames.includes("BOSS_DROP"),
      craftable: artifact => artifact.isCraftable,
    }}
  />;
}