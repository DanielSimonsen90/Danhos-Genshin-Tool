import { useState } from "react";
import { Navigation, SettingsContainer, SettingsModal } from "./components";

export default function Header() {
  const [openModal, setOpenModal] = useState(true); // TODO: Revert

  return (
    <>
      <header className="site-header">
        <Navigation />
        <SettingsContainer setOpenModal={setOpenModal} />
      </header>
      <SettingsModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}