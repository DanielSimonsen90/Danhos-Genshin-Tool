import { useMaterialsData } from "@/stores";
import SearchableMaterialList from "@/components/common/SearchableList/SearchableLists/SearchableMaterialList";

export default function Materials() {
  const materials = useMaterialsData().Materials;
  return <SearchableMaterialList className="materials-list" items={materials} cardProps={{
    wrapInLink: true,
    showDetails: true,
    showRarity: true,
  }} />;
}