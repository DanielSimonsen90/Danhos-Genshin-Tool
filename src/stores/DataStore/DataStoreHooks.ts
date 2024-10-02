import { useContext } from "react";
import { DataStoreContext } from "./DataStoreConstants";
import { DataStoreContextType } from "./DataStoreTypes";

export const useDataStore = () => useContext(DataStoreContext);
export const useArtifactData = () => useDataStore() as Pick<DataStoreContextType, 'ArtifactSetNames' | 'ArtifactSets' | 'ArtifactSetsData'>;
export const useCharacterData = () => useDataStore() as Pick<DataStoreContextType, 'CharacterNames' | 'Characters' | 'CharactersData'>;