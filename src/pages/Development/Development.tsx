import { SearchableMobList } from "@/components/common/SearchableList";
import SearchableMaterialList from "@/components/common/SearchableList/SearchableLists/SearchableMaterialList";
import TabBar from "@/components/common/TabBar";
import { useMobData, useMaterialsData } from "@/stores";

export default function Development() {
  const { Materials } = useMaterialsData();
  const { Mobs } = useMobData();

  return (
    <TabBar tabs={tabs => [
      tabs('Mobs', 'Mobs', (
        <SearchableMobList
          items={Mobs}
          cardProps={{
            wrapInLink: true,
          }}
        />
      )),
    ]} />
  );
}