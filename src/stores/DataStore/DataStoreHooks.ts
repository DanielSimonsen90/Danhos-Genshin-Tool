import { useContext } from "react";
import { DataStoreContext } from "./DataStoreTypes";
import { GlobalStoresContext } from "../GlobalStoresConstants";

export const useDataStore = () => useContext(GlobalStoresContext).DataStore;
export const useArtifactData = () => useDataStore() as Pick<DataStoreContext, 
  | 'ArtifactSetNames' | 'ArtifactSets' | 'ArtifactSetsData'
  | 'findArtifactByName'
>;
export const useCharacterData = () => useDataStore() as Pick<DataStoreContext, 
  | 'CharacterNames' | 'Characters' | 'CharactersData'
  | 'findCharacterByName'
>;