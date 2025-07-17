import { ROUTES } from "@/common/constants/routes";
import HubCardList from "./components/HubCardList";
import FarmableTodaySection from "./components/FarmableTodaySection";

const routes = [
  [ROUTES.endRoute('building_priority_list'), 'Priority list', `Make your own tierlist-based priority lists on all models like characters, artifacts and domains.`],
  [ROUTES.endRoute('building_artifact_helper'), 'Artifact Helper', `Insert the data of your artifact and get a list of characters that would benefit from it.`],
  // [ROUTES.endRoute('plan'), 'Plan', `Create your own plan to build your characters, including what to farm and when.`],
] as Array<[route: string, name: string, description: string]>;

export default function BuildingIndex() {
  return (<>
    <main>
      <header>
        <h1>Building</h1>
        <p>This is your hub to help you build your characters.</p>
      </header>

      <HubCardList routes={routes} />
      <FarmableTodaySection />
    </main>
  </>);
}