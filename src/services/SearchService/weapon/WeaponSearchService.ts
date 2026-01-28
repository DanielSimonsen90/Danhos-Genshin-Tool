import BaseService from "@/services/BaseService";
import { LastResult } from "./types";
import { Character, Weapon } from "@/common/models";
import { DataStore } from "@/stores";
import { WEAPON_VARIABLE_SCORES } from "./constants";
import { TalentStatName, WeaponStatName } from "@/common/types/stat-types";

export const WeaponSearchService = new class WeaponSearchService extends BaseService<LastResult> {
  constructor() {
    super({} as LastResult);
  }

  public get lastResult(): LastResult {
    return super.lastResult as LastResult;
  }

  public search(
    character: Character,
    DataStore: DataStore,
  ) {
    return DataStore.Weapons
      .filter(weapon => character.weapon === weapon.type)
      .orderBy(
        (a, b) => b.rarity - a.rarity,
        (a, b) => {
          const aScore = this.getWeaponScore(a, character, DataStore);
          const bScore = this.getWeaponScore(b, character, DataStore);
          return bScore - aScore;
        }
      )
      .groupBy(weapon => weapon.rarity)
  }

  private getWeaponScore(weapon: Weapon, character: Character, DataStore: DataStore): number {
    const scoreModifiers = [
      WeaponSearchService.getBasicWeaponMatchScore,
      WeaponSearchService.getScoreForSignatureWeaponMatch,
      WeaponSearchService.getWeaponMatchScore,
    ];

    return scoreModifiers.reduce(
      (score, modifyScore) => score + modifyScore(weapon, character, DataStore),
      0
    );
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
};
