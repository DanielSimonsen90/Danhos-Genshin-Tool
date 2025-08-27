import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import { addTabNavigation } from "@/common/functions/accessibility";
import { ROUTES } from "@/common/constants/routes";
import { IS_DEVELOPMENT_ENVIRONMENT } from "@/common/constants/dev";
import useOnChange from "@/hooks/useOnChange";

import NavigationDropdown from "./NavigationDropdown";

// Auto-generate sub-routes from ROUTES object
const getSubRoutes = (parentRoute: string) => {
  const routeEntries = Object.entries(ROUTES) as [string, string][];
  const parentKey = parentRoute.replace('/', '');

  return routeEntries
    .filter(([key, route]) => {
      // Must start with parent key followed by underscore
      if (!key.startsWith(`${parentKey}_`)) return false;

      // Must not contain dynamic parameters (/:)
      if (route.includes('/:')) return false;
      // Must not be a deeply nested route (more than one level deep)
      // Count the number of path segments after the parent
      const routeAfterParent = route.replace(`${parentKey}/`, '');
      const pathSegments = routeAfterParent.split('/').filter(segment => !segment.includes(':'));
      if (pathSegments.length > 1) return false;

      return true;
    })
    .map(([key, route]) => ({
      to: `/${route}`,
      label: key.replace(`${parentKey}_`, '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
};

const routes = [
  ['/', 'Home'],
  [`/${ROUTES.building}`, 'Building'],
  [`/${ROUTES.data}`, 'Data'],
  // [`/${ROUTES.generator}`, 'Generator'],
  IS_DEVELOPMENT_ENVIRONMENT && [`/${ROUTES.development}`, 'Development'],
].filter((route): route is [string, string] => Boolean(route))
.map(([to, label]) => {
  const subRoutes = getSubRoutes(to);
  return [to, label, subRoutes.length > 0 ? subRoutes : undefined] as [string, string, typeof subRoutes?];
});

export const Navigation = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useOnChange(location.pathname, () => setOpenDropdown(null));

  return (
    <nav>
      <ul>
        <li>
          <Link to="#skip-nav" {...addTabNavigation(() => document.querySelector<HTMLElement>('.site-header + * :is(a, select, input, button)')?.focus())}>Skip nav</Link>
        </li>
        {routes.map(([to, label, subRoutes]) => (
          <li 
            key={to} 
            className={subRoutes ? 'has-dropdown' : ''}
            onMouseEnter={() => subRoutes && setOpenDropdown(to)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Link to={to}>
              {label}
              {subRoutes && <span className="chevron">▼</span>}
            </Link>
            {subRoutes && (
              <NavigationDropdown 
                items={subRoutes} 
                isVisible={openDropdown === to}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;