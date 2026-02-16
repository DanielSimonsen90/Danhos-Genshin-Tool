import StoreBuilder from "@/stores/StoreBuilder";
import * as CharactersData from '@/data/characters';
import { List } from "@/common/models";
import { findByName } from "../../DataStoreFunctions";

export default new StoreBuilder()
  .addState({
    CharactersData,
    Characters: List.from(CharactersData),
    CharacterNames: List.from(CharactersData).map(character => character.name),
  })
  .addApi(({ get }) => {
    return {
      findCharacterByName(name: string, suppressWarning = false) {
        return findByName(get().Characters, name, suppressWarning);
      }
    };
  });