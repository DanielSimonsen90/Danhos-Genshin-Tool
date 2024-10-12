import { useContext } from "react";
import { DataStoreContext } from "./DataStoreTypes";
import { GlobalStoresContext } from "../GlobalStoresConstants";

export const useDataStore = () => useContext(GlobalStoresContext).DataStore;
export const useArtifactData = () => useDataStore() as Pick<DataStoreContext, 
  | 'ArtifactSetNames' | 'ArtifactSets' | 'ArtifactSetsData'
  | 'findArtifactByName' | 'getArtifactsFromDomain' | 'getDomainsFromArtifact'
>;
export const useCharacterData = () => useDataStore() as Pick<DataStoreContext, 
  | 'CharacterNames' | 'Characters' | 'CharactersData'
  | 'findCharacterByName'
>;
export const useDomainData = () => useDataStore() as Pick<DataStoreContext,
  | 'DomainNames' | 'Domains' | 'DomainsData'
  | 'findDomainByName' | 'getDomainsFromArtifact' | 'getArtifactsFromDomain'
>;