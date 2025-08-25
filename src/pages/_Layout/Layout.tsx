import { Outlet } from "react-router-dom";

import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

import SettingsLayer from "@/components/global/SettingsLayer";

export default function Layout() {
  return (
    <SettingsLayer>
      <div id="app">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </SettingsLayer>
  );
}