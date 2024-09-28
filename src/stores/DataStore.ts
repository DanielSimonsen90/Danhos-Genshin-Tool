import * as CharactersData from '@/data/characters';
import * as ArtifactSetsData from '@/data/artifact-sets';

export default class DataStore {
  static CharactersData = CharactersData;
  static ArtifactSetsData = ArtifactSetsData;

  static ArtifactSets = Object.values(ArtifactSetsData);
  static ArtifactSetNames = Object.values(ArtifactSetsData).map(a => a.name);
  
  static Characters = Object.values(CharactersData);
  static CharacterNames = Object.values(CharactersData).map(c => c.name);
}