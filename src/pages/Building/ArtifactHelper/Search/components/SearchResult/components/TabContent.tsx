import { ArtifactSet } from "@/common/models";
import { classNames } from "@/common/functions/strings";
import { SearchResultItem } from "@/services";
import SearchResultItemComponent from "./SearchResultItem";
import SearchableList from "@/components/domain/SearchableList";

type Props = {
  results: Array<SearchResultItem>;
  setName: ArtifactSet['name'];
  showAll: boolean;
  onShowMore?: () => void;
};

export { Props as TabContentProps };

export const TabContent = ({ results, setName, showAll, onShowMore }: Props) => (
  !results.length ? (
    <div className="search-result__list-container">
      <ul className="search-result__list--empty">
        <li className="seach-result-item search-result-item--end muted">No results found.</li>
      </ul>
    </div>
  ) : (
    <SearchableList items={results} onSearch={(search, item) => item.characterName.toLowerCase().includes(search.toLowerCase())}
      className="search-result__list-container"
      ulClassName={classNames("search-result__list", showAll && 'search-result__list--show-all')}
      liClassName={({ shouldSave }) => classNames("search-result-item", !shouldSave && 'search-result-item--hide')}
      onShowMore={onShowMore}
    >
      {result => <SearchResultItemComponent key={result.characterName} result={result} setName={setName} />}
    </SearchableList>
  )
);
export default TabContent;