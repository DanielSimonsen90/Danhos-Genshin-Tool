import { classNames } from "@/common/functions/strings";
import { ControlledProps, OptionalProps } from "../Props";

export default function UncontrolledSearchableList<TItem>({ children, search, setSearch, ...props }: ControlledProps<TItem> & OptionalProps<TItem>) {
  return (
    <div className={classNames("searchable-list", props.className)}>
      <div className="input-group">
        <input type="search"
          placeholder={props.placeholder ?? "Search..."}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="searchable-list__search"
        />
      </div>
      <ul className={classNames("searchable-list__list", props.ulClassName)}>
        {children.map(([child, item], key) => (
          <li key={key} className={classNames(
            "searchable-list__list-item", 
            typeof props.liClassName === 'function' ? props.liClassName(item) : props.liClassName
          )}>
            {child}
          </li>
        ))}
      </ul>
      <p className="searchable-list__list-item searchable-list__list-item--end">
        <span>
          There are no more results to show.
        </span>
        {props.onShowMore && (
          <button onClick={props.onShowMore} className="button link">
            Show more
          </button>
        )}
      </p>

    </div>
  );
}