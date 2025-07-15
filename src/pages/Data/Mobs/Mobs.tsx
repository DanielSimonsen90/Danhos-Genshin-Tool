import { useMobData } from "@/stores";
import SearchableMobList from "@/components/common/SearchableList/SearchableLists/SearchableMobList";

export default function Mobs() {
  const mobs = useMobData().Mobs;
  return <SearchableMobList className="mobs-list" items={mobs} placeholder="Search for a mob..." cardProps={{
    wrapInLink: true,
    showRegion: true,
  }} />;
}