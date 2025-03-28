import { Link } from "react-router-dom";
import { addTabNavigation } from "@/common/functions/accessibility";
import { ROUTES } from "@/common/constants/routes";

const routes = [
  ['/', 'Home'],
  [`/${ROUTES.building}`, 'Building'],
  [`/${ROUTES.data}`, 'Data'], // TODO: Refactor rendering to support nested routes through SelectMenu
  // [`/${ROUTES.generator}`, 'Generator'],
  process.env.NODE_ENV === 'development' && [`/${ROUTES.development}`, 'Development'],
].filter(Boolean) as [string, string][];

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