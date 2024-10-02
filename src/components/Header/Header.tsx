import { Navigation, Search, Cache } from "./components";
import TabBar from "@/components/TabBar";

export default function Header() {
  return (
    <header className="site-header">
      <Navigation />

      <section className="header-content">
        <TabBar tabs={[
          ['search', 'Search'],
          ['history', 'History']
        ]}
          search={<Search />}
          history={<Cache />}
        />
      </section>
    </header>
  );
}