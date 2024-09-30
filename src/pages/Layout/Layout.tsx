import Header from "@/components/Header";
import GlobalStoresProvider from "@/providers/GlobalStoresProvider";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <GlobalStoresProvider>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </GlobalStoresProvider>
  );
}