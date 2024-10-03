import { ArtifactSet } from "@/common/models";
import { classNames } from "@/common/functions/strings";
import { SearchResultItem } from "@/services";
import SearchResultItemComponent from "./SearchResultItem";

type Props = {
  results: Array<SearchResultItem>;
  set: ArtifactSet;
  showNotSave: boolean;
  onShowMore?: () => void;
};

export {Props as TabContentProps};

export const TabContent = ({ results, set, showNotSave, onShowMore }: Props) => (
  !results.length ? (
    <div className="search-result__list-container">
      <ul className="search-result__list--empty">
        <li className="seach-result-item search-result-item--end muted">No results found.</li>
      </ul>
    </div>
  ) : (
    <div className="search-result__list-container">
      <ul className={classNames("search-result__list", showNotSave && 'search-result__list--show-all')}>
        {results.map(result => <SearchResultItemComponent key={result.character.name} result={result} set={set} />)}
        <li className="seach-result-item search-result-item--end muted">
          <p>
            <span>
            There are no more results to show.
            </span>
            {onShowMore && (
              <button onClick={onShowMore} className="button link">
                Show more
              </button>
            )}
          </p>
        </li>
      </ul>
    </div>
  )
);
export default TabContent;