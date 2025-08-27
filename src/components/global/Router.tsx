import { Routes, Route, HashRouter } from "react-router-dom";
import {
  Layout, Home,

  DataIndex,
  Characters, Character,
  Artifacts, Artifact,
  Domains, Domain,
  Materials, Material,
  Mobs, Mob,
  Weapons, Weapon,
  
  BuildingIndex, 
  PriorityList, 
  ArtifactHelper, Search,

  Development,
} from '@/pages';
import { ROUTES } from "@/common/constants/routes";

export const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="*" Component={Layout}>
        <Route index element={<Home />} />

        <Route path={ROUTES.data}>
          <Route index element={<DataIndex />} />

          <Route path={ROUTES.endRoute('data_characters')}>
            <Route index element={<Characters />} />
            <Route path={ROUTES.endRoute('data_character')} element={<Character />} />
          </Route>
          <Route path={ROUTES.endRoute('data_artifacts')}>
            <Route index element={<Artifacts />} />
            <Route path={ROUTES.endRoute('data_artifact')} element={<Artifact />} />
          </Route>
          <Route path={ROUTES.endRoute('data_domains')}>
            <Route index element={<Domains />} />
            <Route path={ROUTES.endRoute('data_domain')} element={<Domain />} />
          </Route>
          <Route path={ROUTES.endRoute('data_materials')}>
            <Route index element={<Materials />} />
            <Route path={ROUTES.endRoute('data_material')} element={<Material />} />
          </Route>          
          <Route path={ROUTES.endRoute('data_mobs')}>
            <Route index element={<Mobs />} />
            <Route path={ROUTES.endRoute('data_mob')} element={<Mob />} />
          </Route>          
          <Route path={ROUTES.endRoute('data_weapons')}>
            <Route index element={<Weapons />} />
            <Route path={ROUTES.endRoute('data_weapon')} element={<Weapon />} />
          </Route>
        </Route>

        <Route path={ROUTES.building}>
          <Route index element={<BuildingIndex />} />
          <Route path={ROUTES.endRoute('building_priority_list')} element={<PriorityList />} />
          <Route path={ROUTES.endRoute('building_artifact_helper')}>
            <Route index element={<ArtifactHelper />} />
            <Route path={ROUTES.endRoute('building_artifact_helper_search')}>
              <Route path={ROUTES.endRoute('building_artifact_helper_search_query')} element={<Search />} />
            </Route>
          </Route>
          {/* 
          /plan
          */}
        </Route>

        <Route path={ROUTES.generator}>
          {/* 
          
          /teams
          /team-builder
          /character
          /artifact

          */}
        </Route>

        {process.env.NODE_ENV === 'development' && (
          <Route path={ROUTES.development}>
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