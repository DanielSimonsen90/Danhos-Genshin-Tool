import { Link } from "react-router-dom";
import { classNames } from "@/common/functions/strings";

type DropdownItem = {
  to: string;
  label: string;
};

type Props = {
  items: DropdownItem[];
  isVisible: boolean;
};

export default function NavigationDropdown({ items, isVisible }: Props) {
  return (
    <div className={classNames("navigation-dropdown", isVisible && "navigation-dropdown--visible")}>
      <ul>
        {items.map(({ to, label }) => (
          <li key={to}>
            <Link 
              to={to} 
              tabIndex={isVisible ? 0 : -1}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}