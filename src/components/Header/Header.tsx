import { useSetting } from "@/stores/SettingsStore";
import { Navigation, Search, Cache } from "./components";
import TabBar from "@/components/TabBar";

export default function Header() {
  const [preferredTabs, setPreferredTabs] = useSetting('preferredTabs');
  const defaultTab = preferredTabs.searchOrHistory;
  
  function handleTabChange(tab: 'search' | 'history') {
    setPreferredTabs({ ...preferredTabs, searchOrHistory: tab });
  }

  return (
    <header className="site-header">
      <Navigation />

      <section className="header-content">
        <TabBar tabs={[
          ['search', 'Search'],
          ['history', 'History']
        ]}
          defaultTab={defaultTab}
          onTabChange={handleTabChange}
          search={<Search />}
          history={<Cache />}
        />
      </section>
    </header>
  );
}