import { useSetting } from "@/stores/SettingsStore";
import TabBar from "@/components/TabBar";
import { Navigation, Search, Cache } from "./components";

export default function Header() {
  const [preferredTabs] = useSetting('preferredTabs');
  const defaultTab = preferredTabs?.searchOrHistory;
  
  return (
    <header className="site-header">
      <Navigation />

      <section className="header-content">
        <TabBar tabs={[
          ['search', 'Search'],
          ['history', 'History']
        ]}
          defaultTab={defaultTab}
          search={<Search />}
          history={<Cache />}
        />
      </section>
    </header>
  );
}