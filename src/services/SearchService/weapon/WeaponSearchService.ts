import { LastResult, RecommendedCharacterForWeapon, RecommendedWeaponForCharacter } from "./types";
import { Character, List, Weapon } from "@/common/models";
import { DataStore } from "@/stores";
import { WEAPON_SCORE_THRESHOLD, WEAPON_VARIABLE_SCORES } from "./constants";
import { TalentStatName, WeaponStatName } from "@/common/types/stat-types";
import { Rarity } from "@/common/types/genshin";
import BaseSearchService from "../base/BaseSearchService";

export const WeaponSearchService = new class WeaponSearchService extends BaseSearchService<LastResult> {
  public searchFromCharacter(
    character: Character,
    DataStore: DataStore,
  ): Map<Rarity, List<RecommendedWeaponForCharacter>> {
    return DataStore.Weapons
      .filter(weapon => character.weapon === weapon.type)
      .map(weapon => {
        const score = this.getWeaponScore(weapon, character, DataStore);
        const included = score >= WEAPON_SCORE_THRESHOLD;

        return {
          weapon,
          score,
          included,
        }
      })
      .orderBy(
        (a, b) => b.weapon.rarity - a.weapon.rarity,
        (a, b) => b.score - a.score,
      )
      .groupBy(result => result.weapon.rarity);
  }

  private getWeaponScore(weapon: Weapon, character: Character, DataStore: DataStore): number {
    const scoreModifiers = [
      WeaponSearchService.getBasicWeaponMatchScore,
      WeaponSearchService.getScoreForSignatureWeaponMatch,
      WeaponSearchService.getWeaponMatchScore,
    ];

    const combinedScore = scoreModifiers.reduce(
      (score, modifyScore) => score + modifyScore(weapon, character, DataStore),
      0
    );

    return Math.round(combinedScore);
  }

  private static getScoreForSignatureWeaponMatch(weapon: Weapon, character: Character, DataStore: DataStore): number {
    const isSignature = DataStore.getSignatureWeaponFor(character)?.name === weapon.name;
    return isSignature ? WEAPON_VARIABLE_SCORES.SIGNATURE : 0;
  }
  private static getBasicWeaponMatchScore(weapon: Weapon, character: Character, DataStore: DataStore): number {
    const talentStats = [...character.playstyle?.talentStats ?? []].reverse();
    const getTalentStatName = (stat: WeaponStatName | undefined) => stat?.replace('%', '') as TalentStatName;
    const secondaryStatScore = weapon.secondaryStat
      ? weapon.secondaryStat === 'Crit DMG' || weapon.secondaryStat === 'Crit Rate'
        ? WEAPON_VARIABLE_SCORES.DESIRED_STAT_CRITS_MULTIPLIER
        : talentStats.indexOf(getTalentStatName(weapon.secondaryStat)) * WEAPON_VARIABLE_SCORES.DESIRED_STAT_MATCH_MULTIPLIER
      : 0;

    const baseAttackScore = weapon.baseAttack / WEAPON_VARIABLE_SCORES.BASE_ATTACK_REDUCER;

    return secondaryStatScore + baseAttackScore;
  }
  private static getWeaponMatchScore(weapon: Weapon, character: Character, DataStore: DataStore): number {
    if (!character.playstyle) return 0;

    return weapon.getMatchScore({
      character,
      playstyle: character.playstyle,
      score: 0,
    });
  }

  public searchFromWeapon(
    weapon: Weapon,
    DataStore: DataStore,
  ): Map<Rarity, List<RecommendedCharacterForWeapon>> {
    const signatureCharacter = weapon.signatureWeaponFor?.(DataStore.CharactersData);
    
    return DataStore.Characters
      .filter(character => character.weapon === weapon.type)
      .map(character => {
        const score = this.getWeaponScore(weapon, character, DataStore);
        const included = score >= WEAPON_SCORE_THRESHOLD;

        return {
          character,
          score,
          included,
        }
      })
      .orderBy(
        (a, b) => b.character.rarity - a.character.rarity,
        (a, b) => b.score - a.score,
        (a, b) => {
          const isASignature = signatureCharacter?.name === a.character.name;
          const isBSignature = signatureCharacter?.name === b.character.name;

          if (isASignature && !isBSignature) return -1;
          if (!isASignature && isBSignature) return 1;
          return 0;
        }
      )
      .groupBy(result => result.character.rarity);
  }
};
