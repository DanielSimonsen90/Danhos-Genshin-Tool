import { ItemHeader } from "@/components/domain/Item";
import { useMaterialsData } from "@/stores";
import SearchableMaterialList from "@/components/domain/SearchableList/SearchableLists/SearchableMaterialList";

export default function Materials() {
  const materials = useMaterialsData().Materials;
  
  return (
    <>
      <ItemHeader item={materials} itemName="Materials" showItemName />
      <SearchableMaterialList className="materials-list" items={materials} placeholder="Search for a material or mob drop..." cardProps={{
        wrapInLink: true,
        showRegion: true,
      }} />
    </>
  );
}