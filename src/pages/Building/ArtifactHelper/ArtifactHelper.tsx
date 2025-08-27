import TabBar from "@/components/common/TabBar";
import { useCacheStore, useSetting } from "@/stores";
import { Search, Cache } from "./components";
import { useState } from "react";

export default function ArtifactHelper() {
  const CacheStore = useCacheStore();
  const preferredTabs = useSetting('preferredTabs');
  const hasCachedItems = CacheStore.has('searchHistory');

  return (
    <main className="artifact-helper">
      <TabBar tabs={tabItem => [
        tabItem('search', 'Search', <Search />),
        hasCachedItems && tabItem('history', 'History', <Cache />),
      ]}
        defaultTab={preferredTabs.get()?.searchOrHistory}
      />
    </main>
  );
}