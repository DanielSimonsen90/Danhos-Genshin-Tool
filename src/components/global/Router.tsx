import { Routes, Route, HashRouter } from "react-router-dom";
import { 
  Layout, Home, Search, 
  Characters, Character, 
  Artifacts, Artifact,
  Domains, Domain,
} from '@/pages';

export const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="*" Component={Layout}>
        <Route index element={<Home />} />
        <Route path="search">
          <Route path=":query" element={<Search />} />
        </Route>

        <Route path="characters">
          <Route index element={<Characters />} />
          <Route path=":characterName" element={<Character />} />
        </Route>
        <Route path="artifacts">
          <Route index element={<Artifacts />} />
          <Route path=":artifactName" element={<Artifact />} />
        </Route>
        <Route path="domains">
          <Route index element={<Domains />} />
          <Route path=":domainName" element={<Domain />} />
        </Route>

        <Route path="*" element={(() => {
          const path = window.location.pathname;
          return <div>404: {path}</div>;
        })()} />
      </Route>
      <Route path="*" element={(() => {
        const path = window.location.pathname;
        return <div>404: {path}</div>;
      })()} />
    </Routes>
  </HashRouter>
);

export default Router;