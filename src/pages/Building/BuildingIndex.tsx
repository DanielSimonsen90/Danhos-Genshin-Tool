import { Link } from "react-router-dom";

const BUILDING_PREFIX = 'building';
const routes = [
  ['priority-list', 'Priority list'],
  // ['focus-day', 'Focus day'],
  // ['plan', 'Plan'],
];

export default function BuildingIndex() {
  return (<>
    <main>
      <h1>Building</h1>
      <p>This is your hub to help you build your characters.</p>

      <ul>
        {routes.map(([route, name]) => (
          <li key={route}>
            <Link to={`/${BUILDING_PREFIX}/${route}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </main>
  </>);
}