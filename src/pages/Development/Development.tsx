import SearchableMaterialList from "@/components/common/SearchableList/SearchableLists/SearchableMaterialList";
import TabBar from "@/components/common/TabBar";
import { useMobData, useMaterialsData } from "@/stores";

export default function Development() {
  const { Materials } = useMaterialsData();
  const { Mobs } = useMobData();

  return (
    <TabBar tabs={tabs => [
      tabs('Mobs', 'Mobs', (
        <code>
          {JSON.stringify(Mobs, null, 2)}
        </code>
      )),
    ]} />
  );
}