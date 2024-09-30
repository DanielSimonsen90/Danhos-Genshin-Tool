import Search from "../Search";
import Navigation from "./Navigation";
import Cache from "../Cache";

export default function Header() {
  return (
    <header className="site-header">
      <Navigation />

      <section className="header-content">
        <Search />
        <Cache />
      </section>
    </header>
  );
}