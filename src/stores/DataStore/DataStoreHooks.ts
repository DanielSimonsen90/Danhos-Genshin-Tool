import { useContext } from "react";
import { DataStoreContext } from "./DataStoreConstants";
import { DataStore } from "./DataStoreTypes";

export const useDataStore = () => useContext(DataStoreContext);
export const useArtifactData = () => useDataStore() as Pick<DataStore, 'ArtifactSetNames' | 'ArtifactSets' | 'ArtifactSetsData'>;
export const useCharacterData = () => useDataStore() as Pick<DataStore, 'CharacterNames' | 'Characters' | 'CharactersData'>;