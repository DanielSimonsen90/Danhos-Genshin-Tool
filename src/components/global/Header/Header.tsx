import { useState } from "react";

import TabBar from "@/components/common/TabBar";
import { useSetting } from "@/stores/SettingsStore";

import { Navigation, Search, Cache, SettingsContainer, SettingsModal } from "./components";

export default function Header() {
  const [preferredTabs] = useSetting('preferredTabs');
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <header className="site-header">
        <section className="top-header">
          <div></div>
          <Navigation />
          <SettingsContainer setOpenModal={setOpenModal} />
        </section>

        <section className="header-content">
          <TabBar tabs={[
            ['search', 'Search'],
            ['history', 'History']
          ]}
            defaultTab={preferredTabs?.searchOrHistory}
            search={<Search />}
            history={<Cache />}
          />
        </section>
      </header>
      <SettingsModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}