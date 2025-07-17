import { ItemHeader } from "@/components/domain/Item";
import { useMobData } from "@/stores";
import SearchableMobList from "@/components/domain/SearchableList/SearchableLists/SearchableMobList";

export default function Mobs() {
  const mobs = useMobData().Mobs;
  
  return (
    <>
      <ItemHeader item={mobs} itemName="Mobs" showItemName />
      <SearchableMobList className="mobs-list" items={mobs} placeholder="Search for a mob..." cardProps={{
        wrapInLink: true,
        showRegion: true,
      }} />
    </>
  );
}