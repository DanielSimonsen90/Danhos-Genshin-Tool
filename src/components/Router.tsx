import Home from "@/pages/Home";
import Layout from "@/pages/Layout";

import Search from "@/pages/Search";
import SearchQuery from "@/pages/Search/{query}";

import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" Component={Layout}>
          <Route index element={<Home />} />
          <Route path="search" Component={Search}>
            <Route path=":query" element={<SearchQuery />} />
          </Route>

          {/* <Route path="/data" Component={Data}>
          <Route path="/characters" element={<Characters />}>
            <Route path=":name" element={<Character />} />
          </Route>
          <Route path="/artifacts" element={<Artifacts />}>
            <Route path=":name" element={<Artifact />} />
          </Route>
        </Route> */}

        </Route>
        <Route path="*" element={(() => {
          const path = window.location.pathname;
          return <div>404: {path}</div>;
        })()} />
      </Routes>
    </HashRouter>
  );
}