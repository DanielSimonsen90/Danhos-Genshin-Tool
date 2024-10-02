import { Outlet } from "react-router-dom";

import Header from "@/components/Header";
import GlobalStoresProvider from "@/stores/GlobalStoresProvider";

export default function Layout() {
  return (
    <GlobalStoresProvider>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </GlobalStoresProvider>
  );
}