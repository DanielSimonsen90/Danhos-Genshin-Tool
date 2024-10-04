import { useContext } from "react";
import { DataStore } from "./DataStoreTypes";
import { GlobalStoresContext } from "../GlobalStoresConstants";

export const useDataStore = () => useContext(GlobalStoresContext).DataStore;
export const useArtifactData = () => useDataStore() as Pick<DataStore, 'ArtifactSetNames' | 'ArtifactSets' | 'ArtifactSetsData'>;
export const useCharacterData = () => useDataStore() as Pick<DataStore, 'CharacterNames' | 'Characters' | 'CharactersData'>;