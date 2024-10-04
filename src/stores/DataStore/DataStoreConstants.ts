import * as CharactersData from '@/data/characters';
import * as ArtifactSetsData from '@/data/artifact-sets';

export const DataStore = {
  CharactersData,
  ArtifactSetsData,

  ArtifactSets: Object.values(ArtifactSetsData),
  ArtifactSetNames: Object.values(ArtifactSetsData).map(set => set.name),

  Characters: Object.values(CharactersData),
  CharacterNames: Object.values(CharactersData).map(character => character.name),
}