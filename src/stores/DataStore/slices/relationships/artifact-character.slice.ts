import StoreBuilder from "@/stores/StoreBuilder";
import artifactsSlice from "../models/artifacts.slice";
import charactersSlice from "../models/characters.slice";
import memoSlice from "../memo.slice";
import { List } from "@/common/models";
import { CharacterUsingArtifactResult } from "../../DataStoreTypes";

export default new StoreBuilder()
  .addSlice(artifactsSlice)
  .addSlice(charactersSlice)
  .addSlice(memoSlice)
  .addApi(({ get, api }) => {
    function getCharactersUsingArtifact(artifactName: string) {
      return api.memoize(
        cacheKeys => cacheKeys.charactersUsingArtifact(artifactName),
        () => {
          const artifact = api.findArtifactByName(artifactName);
          if (!artifact) return new List<CharacterUsingArtifactResult>();

          return get()
            .Characters
            .filter(character => (
              character.playstyle?.recommendedArtifactSets.some(cSet => (
                cSet.set.name === artifact.name
              ))
            ))
            .map((character): CharacterUsingArtifactResult => ({
              character,
              cSet: character.playstyle!.recommendedArtifactSets.find(cSet => (
                cSet.set.name === artifact.name
              ))!
            }));
        }
      );
    }

    return {
      getCharactersUsingArtifact,
    };
  });