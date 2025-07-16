import { Link } from "react-router-dom";
import { ROUTES } from "@/common/constants/routes";

const routes = [
  [ROUTES.endRoute('building_priority_list'), 'Priority list', `Make your own tierlist-based priority lists on all models like characters, artifacts and domains.`],
  [ROUTES.endRoute('building_artifact_helper'), 'Artifact Helper', `Insert the data of your artifact and get a list of characters that would benefit from it.`],
  // [ROUTES.endRoute('plan'), 'Plan', `Create your own plan to build your characters, including what to farm and when.`],
];

export default function BuildingIndex() {
  return (<>
    <main>
      <header>
        <h1>Building</h1>
        <p>This is your hub to help you build your characters.</p>
      </header>

      <ul className="hub-card-list">
        {routes.map(([route, name, description]) => (
          <li key={route} className="hub-card">
            <Link to={`/${ROUTES.building}/${route}`}>
              <h2 className="hub-card__title">{name}</h2>
              <p className="hub-card__description">{description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  </>);
}