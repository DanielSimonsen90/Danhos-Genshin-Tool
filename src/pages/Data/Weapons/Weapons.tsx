import { SearchableWeaponList } from "@/components/common/SearchableList";
import { useWeaponData } from "@/stores";

export default function Weapons() {
  const weapons = useWeaponData().Weapons;
  return <SearchableWeaponList className="weapons-list" items={weapons} placeholder="Search for a weapon..." cardProps={{ 
    wrapInLink: true,
    showRarity: true,
  }} />;
}
