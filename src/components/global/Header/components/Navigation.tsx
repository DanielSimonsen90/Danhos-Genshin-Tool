import { Link } from "react-router-dom";
import { addTabNavigation } from "@/common/functions/accessibility";

const routes = [
  ['/', 'Home'],
  ['/characters', 'Characters'],
  ['/artifacts', 'Artifacts'],
  ['/domains', 'Domains'],
  ['/development', 'Development'],
];

export const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="#skip-nav" {...addTabNavigation(() => document.querySelector<HTMLElement>('.site-header + * :is(a, select, input, button)')?.focus())}>Skip nav</Link>
      </li>
      {routes.map(([to, label]) => (
        <li key={to}>
          <Link to={to}>{label}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;