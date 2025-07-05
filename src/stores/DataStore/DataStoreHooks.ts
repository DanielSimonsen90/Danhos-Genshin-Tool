import { DataStore } from "./DataStoreTypes";
import { useDataStore } from "./DataStore";

export const useArtifactData = () => useDataStore() as Pick<DataStore, 
  | 'ArtifactNames' | 'Artifacts' | 'ArtifactsData'
  | 'findArtifactByName' | 'getArtifactsFromDomain' | 'getDomainsFromArtifact'
>;
export const useCharacterData = () => useDataStore() as Pick<DataStore, 
  | 'CharacterNames' | 'Characters' | 'CharactersData'
  | 'findCharacterByName'
>;
export const useDomainData = () => useDataStore() as Pick<DataStore,
  | 'DomainNames' | 'Domains' | 'DomainsData'
  | 'findDomainByName' | 'getDomainsFromArtifact' | 'getArtifactsFromDomain'
>;
export const useMaterialsData = () => useDataStore() as Pick<DataStore,
 | 'MaterialNames' | 'Materials' | 'MaterialsData'
>;
export const useMobData = () => useDataStore() as Pick<DataStore,
  | 'MobNames' | 'Mobs' | 'MobsData'
>;