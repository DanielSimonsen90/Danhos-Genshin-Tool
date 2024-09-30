import Search from "../Search";
import Navigation from "./Navigation";
import Cache from "../Cache";
import TabBar from "../TabBar";

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