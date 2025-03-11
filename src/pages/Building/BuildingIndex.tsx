import { Link } from "react-router-dom";

const BUILDING_PREFIX = 'building';
const routes = [
  ['priority-list', 'Priority list', `Make your own tierlist-based priority lists on all models like characters, artifacts and domains.`],
  // ['focus-day', 'Focus day', `List of items in the game, how to obtain them, when they're available and any other relevant information.`],
  // ['plan', 'Plan', `Create your own plan to build your characters, including what to farm and when.`],
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
            <Link to={`/${BUILDING_PREFIX}/${route}`}>
              <h2 className="hub-card__title">{name}</h2>
              <p className="hub-card__description">{description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  </>);
}