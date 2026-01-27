import { useMemo } from 'react';
import { ArtifactSet } from '@/common/models';
import { CharacterCard, CharacterSet } from '@/components/domain/models/Character';
import { SearchResultItem } from '@/services/SearchService/artifact';
import { useDataStore } from '@/stores';

type Props = {
  result: SearchResultItem;
  setName: ArtifactSet['name'];
};

export const SearchResultItemComponent = ({ result, setName }: Props) => {
  const { characterName, score } = result;
  const DataStore = useDataStore();
  const character = useMemo(() => DataStore.Characters.find(c => c.name === characterName), [DataStore, characterName]);
  const set = useMemo(() => DataStore.Artifacts.find(s => s.name === setName), [DataStore, setName]);

  if (!character) return null;
  return (
    <CharacterCard character={character} score={score} wrapInLink>
      <CharacterSet character={character} artifactSet={set} showRecommendedArtifactSets />
    </CharacterCard>
  )
};

export default SearchResultItemComponent;