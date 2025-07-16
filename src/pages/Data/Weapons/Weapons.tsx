import { SearchableWeaponList } from "@/components/common/SearchableList";
import { ItemHeader } from "@/components/domain/Item";
import { useWeaponData } from "@/stores";

export default function Weapons() {
  const weapons = useWeaponData().Weapons;
  
  return (
    <>
      <ItemHeader item={weapons} itemName="Weapons" showItemName />
      <SearchableWeaponList className="weapons-list" items={weapons} placeholder="Search for a weapon..." cardProps={{ 
        wrapInLink: true,
        showRarity: true,
      }} />
    </>
  );
}
