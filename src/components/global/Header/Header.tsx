import { useSetting, useSettingsStore } from "@/stores/SettingsStore";
import TabBar from "@/components/common/TabBar";
import { Navigation, Search, Cache } from "./components";

export default function Header() {
  // const { update } = useSettingsStore();
  const [preferredTabs] = useSetting('preferredTabs');
  
  return (
    <header className="site-header">
      <Navigation />

      <section className="header-content">
        <TabBar tabs={[
          ['search', 'Search'],
          ['history', 'History']
        ]}
          defaultTab={preferredTabs?.searchOrHistory}
          // onTabChange={tab => preferredTabs?.searchOrHistory !== tab && update(cur => ({ preferredTabs: { ...cur.preferredTabs, searchOrHistory: tab } }))}
          search={<Search />}
          history={<Cache />}
        />
      </section>
    </header>
  );
}