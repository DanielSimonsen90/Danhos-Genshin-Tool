import { ROUTES } from "@/common/constants/routes";
import { Link } from "react-router-dom";

type Props = {
  routes: Array<[route: string, name: string, description: string]>;
}

export default function HubCardList({ routes }: Props) {
  return (
    <section>
      <h2>Navigate to Building pages</h2>
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
    </section>
  );
}