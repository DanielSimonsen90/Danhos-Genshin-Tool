import * as CharactersData from '@/data/characters';
import * as ArtifactSetsData from '@/data/artifact-sets';

export const DataStore = new class DataStore {
  public CharactersData = CharactersData;
  public ArtifactSetsData = ArtifactSetsData;

  public ArtifactSets = Object.values(ArtifactSetsData);
  public ArtifactSetNames = Object.values(ArtifactSetsData).map(a => a.name);
  
  public Characters = Object.values(CharactersData);
  public CharacterNames = Object.values(CharactersData).map(c => c.name);
}
export default DataStore;