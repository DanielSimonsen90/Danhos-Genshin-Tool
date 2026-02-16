import StoreBuilder from "@/stores/StoreBuilder";
import charactersSlice from "../models/characters.slice";
import weaponsSlice from "../models/weapons.slice";
import memoSlice from "../memo.slice";
import { WeaponSearchService } from "@/services/SearchService";
import { Rarity } from "@/common/types";
import { RecommendedCharacterForWeapon, RecommendedWeaponForCharacter } from "@/services/SearchService/weapon/types";
import { List } from "@/common/models";

export default new StoreBuilder()
  .addSlice(charactersSlice)
  .addSlice(weaponsSlice)
  .addSlice(memoSlice)
  .addApi(({ get, api }) => {
    function getRecommendedCharactersForWeapon(weaponName: string) {
      return api.memoize(
        cacheKeys => cacheKeys.recommendedCharactersForWeapon(weaponName),
        () => {
          const weapon = api.findWeaponByName(weaponName);
          if (!weapon) return new Map<Rarity, List<RecommendedCharacterForWeapon>>();

          return WeaponSearchService.searchFromWeapon(weapon);
        }
      );
    }

    function getSignatureWeaponFor(characterName: string) {
      return api.memoize(
        cacheKeys => cacheKeys.signatureWeaponFor(characterName),
        () => {
          const character = api.findCharacterByName(characterName);
          if (!character) return undefined;

          const signatureWeapons = api.memoize(
            cacheKeys => cacheKeys.signatureWeapons(),
            () => get()
              .Weapons
              .filter(weapon => weapon.signatureWeaponFor)
              .map(weapon => ({
                weapon,
                character: weapon.signatureWeaponFor!(get().CharactersData)
              }))
          )
          if (!signatureWeapons.length) return undefined;

          return signatureWeapons.find(weapon => weapon.character?.name === character.name)?.weapon;
        }
      );
    }

    function getRecommendedWeaponsForCharacter(characterName: string) {
      return api.memoize(
        cacheKeys => cacheKeys.recommendedWeaponsForCharacter(characterName),
        () => {
          const character = api.findCharacterByName(characterName);
          if (!character) return new Map<Rarity, List<RecommendedWeaponForCharacter>>();

          return WeaponSearchService.searchFromCharacter(character);
        }
      );
    }

    return {
      getRecommendedCharactersForWeapon,
      getSignatureWeaponFor,
      getRecommendedWeaponsForCharacter,
    }
  });