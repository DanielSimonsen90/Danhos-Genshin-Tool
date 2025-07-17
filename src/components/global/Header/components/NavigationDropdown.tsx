import { Link } from "react-router-dom";

type DropdownItem = {
  to: string;
  label: string;
};

type Props = {
  items: DropdownItem[];
};

export default function NavigationDropdown({ items }: Props) {
  return (
    <div className="navigation-dropdown">
      <ul>
        {items.map(({ to, label }) => (
          <li key={to}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}