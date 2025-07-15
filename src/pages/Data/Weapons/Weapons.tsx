import { SearchableWeaponList } from "@/components/common/SearchableList";
import { useWeaponData } from "@/stores";

export default function Weapons() {
  const weapons = useWeaponData().Weapons;
  return <SearchableWeaponList className="weapons-list" items={weapons} cardProps={{ 
    wrapInLink: true,
    showRarity: true,
  }} />;
}
