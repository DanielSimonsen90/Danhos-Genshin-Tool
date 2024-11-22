import { Outlet } from "react-router-dom";

import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

import GlobalStoresProvider from "@/stores";
import GlobalProvider from "@/providers";

export default function Layout() {
  return (
    <GlobalStoresProvider>
      <GlobalProvider>
        <Header />
        <Outlet />
        <Footer />
      </GlobalProvider>
    </GlobalStoresProvider>
  );
}