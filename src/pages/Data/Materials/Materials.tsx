import { useMaterialsData } from "@/stores";
import SearchableMaterialList from "@/components/common/SearchableList/SearchableLists/SearchableMaterialList";

export default function Materials() {
  const materials = useMaterialsData().Materials;
  return <SearchableMaterialList className="materials-list" items={materials} placeholder="Search for a material or mob drop..." cardProps={{
    wrapInLink: true,
    showRegion: true,
  }} />;
}