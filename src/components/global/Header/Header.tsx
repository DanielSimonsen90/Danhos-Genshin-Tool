import { useState } from "react";

import TabBar from "@/components/common/TabBar";
import SettingsCog from "@/components/common/icons/SettingsCog";
import { useSetting } from "@/stores/SettingsStore";

import { Navigation, Search, Cache, SettingsModal } from "./components";

export default function Header() {
  const [preferredTabs] = useSetting('preferredTabs');
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <header className="site-header">
        <section className="top-header">
          <Navigation />
          <SettingsCog role="button" tabIndex={0} onClick={() => setOpenModal(true)} onKeyDown={e => {
            if (e.key === 'Enter' || e.key === 'NumpadEnter' || e.key === ' ') setOpenModal(true);
          }} />
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