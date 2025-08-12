import { ArtifactSet } from '@/common/models';
import { CharacterCard, CharacterSet } from '@/components/domain/models/Character';
import { SearchResultItem } from '@/services/SearchService';

type Props = {
  result: SearchResultItem;
  set: ArtifactSet;
};

export const SearchResultItemComponent = ({ result, set: artifactSet }: Props) => {
  const { character, score } = result;

  return (<>
    <CharacterCard character={character} score={score} linkOnName />
    <CharacterSet character={character} artifactSet={artifactSet} />
  </>);
};

export default SearchResultItemComponent;