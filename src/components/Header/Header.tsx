import { CacheStore } from "@/stores";
import Search from "../Search";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="site-header">
      <Navigation />

      <section className="header-content">
        <Search />

        <button className='clear-cache danger secondary' onClick={() => confirm("You're about to clear the search cache.") && CacheStore.clear()}>Clear Cache</button>
      </section>
    </header>
  );
}