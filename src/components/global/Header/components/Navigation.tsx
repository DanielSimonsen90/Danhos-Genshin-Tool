import { Link } from "react-router-dom";

const routes = [
  ['/', 'Home'],
  ['/characters', 'Characters'],
];

export const Navigation = () => (
  <nav>
    <ul>
      {routes.map(([to, label]) => (
        <li key={to}>
          <Link to={to}>{label}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;