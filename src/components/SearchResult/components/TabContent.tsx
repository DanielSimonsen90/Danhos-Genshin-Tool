import { ArtifactSet } from "@/common/models";
import { classNames } from "@/common/functions/strings";
import { SearchResultItem } from "@/services";
import SearchResultItemComponent from "./SearchResultItem";

type Props = {
  results: Array<SearchResultItem>;
  set: ArtifactSet;
  showNotSave: boolean;
};

export const TabContent = ({ results, set, showNotSave }: Props) => (
  !results.length ? (
    <div className="search-result__list-container">
      <li className="search-result__list--empty">No results found.</li>
    </div>
  ) : (
    <div className="search-result__list-container">
      <ul className={classNames("search-result__list", showNotSave && 'search-result__list--show-all')}>
        {results.map(result => <SearchResultItemComponent key={result.character.name} result={result} set={set} />)}
      </ul>
    </div>
  )
);
export default TabContent;