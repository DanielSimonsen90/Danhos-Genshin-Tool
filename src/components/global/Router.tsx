import { Routes, Route, HashRouter } from "react-router-dom";
import {
  Layout, Home, Search,

  DataIndex,
  Characters, Character,
  Artifacts, Artifact,
  Domains, Domain,
  
  BuildingIndex,
  PriorityList,

  Development,
} from '@/pages';

export const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="*" Component={Layout}>
        <Route index element={<Home />} />
        <Route path="search">
          <Route path=":query" element={<Search />} />
        </Route>

        <Route path="data">
          <Route index element={<DataIndex />} />

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
          {/* TODO: Add weapons & materials */}
        </Route>

        <Route path="building">
          <Route index element={<BuildingIndex />} />
          <Route path="priority-list" element={<PriorityList />} />
          {/* 

          /focus-day
          /plan

          */}
        </Route>

        <Route path="generator">
          {/* 
          
          /teams
          /team-builder
          /character
          /artifact

          */}
        </Route>

        {process.env.NODE_ENV === 'development' && (
          <Route path="development">
            <Route index element={<Development />} />
          </Route>
        )}

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