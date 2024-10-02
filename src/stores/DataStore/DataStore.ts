import * as CharactersData from '@/data/characters';
import * as ArtifactSetsData from '@/data/artifact-sets';

import { BaseStore } from '../BaseStore';
import { DataStoreEventsMap } from './DataStoreTypes';

export class DataStore extends BaseStore<DataStoreEventsMap> {
  private static _instance: DataStore;
  public static get instance() {
    return this._instance ??= new DataStore();
  }

  constructor() { super('DataStore'); }
  public CharactersData = CharactersData;
  public ArtifactSetsData = ArtifactSetsData;

  public ArtifactSets = Object.values(ArtifactSetsData);
  public ArtifactSetNames = Object.values(ArtifactSetsData).map(a => a.name);

  public Characters = Object.values(CharactersData);
  public CharacterNames = Object.values(CharactersData).map(c => c.name);
};
export default DataStore;