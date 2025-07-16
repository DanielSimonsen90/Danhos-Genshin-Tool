import { ArtifactSet } from '@/common/models';
import { CharacterCard, CharacterSet } from '@/components/domain/Character';
import { SearchResultItem } from '@/services/SearchService';

type Props = {
  result: SearchResultItem;
  set: ArtifactSet;
};

export const SearchResultItemComponent = ({ result, set: artifactSet }: Props) => {
  const { character, score, set } = result;

  return (<>
    <CharacterCard character={character} score={score} linkOnName />
    <CharacterSet character={character} set={set} artifactSet={artifactSet} />
  </>);
};

export default SearchResultItemComponent;