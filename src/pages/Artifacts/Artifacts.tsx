import { ArtifactCard } from "@/components/domain/Artifacts";
import ItemsPage from "../_Layout/ItemsPage";


export default function Artifacts() {
  return <ItemsPage itemsKey="Artifacts" Card={({ item }) => <ArtifactCard artifact={item} wrapInLink />} />;
}