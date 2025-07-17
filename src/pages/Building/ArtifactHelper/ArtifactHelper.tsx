import TabBar from "@/components/common/TabBar";
import { useSetting } from "@/stores";
import { Search, Cache } from "./components";

export default function ArtifactHelper() {
  const preferredTabs = useSetting('preferredTabs');
  
  
  return (
    <main className="artifact-helper">
      <TabBar tabs={tabItem => [
        tabItem('search', 'Search', <Search />),
        tabItem('history', 'History', <Cache />),
      ]}
        defaultTab={preferredTabs.get()?.searchOrHistory}
      />
    </main>
  );
}