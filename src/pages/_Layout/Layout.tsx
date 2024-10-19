import { Outlet } from "react-router-dom";

import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import GlobalStoresProvider from "@/stores/GlobalStoresProvider";

export default function Layout() {
  return (
    <GlobalStoresProvider>
      <Header />
      <Outlet />
      <Footer />
    </GlobalStoresProvider>
  );
}