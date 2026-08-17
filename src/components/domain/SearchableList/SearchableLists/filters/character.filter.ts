import { Character } from "@/common/models";
import { Rarity } from "@/common/types";
import { DataStoreType } from "@/stores";
import { FilterObject } from "@/components/common/FormItems/Filter/Filter";
import { SortObject } from "@/components/common/FormItems/Sort/Sort";
import { Regions } from "@/data/regions";

export type CharacterFilterKeys = (
  | 'element' | 'weapon' | 'rarity' | 'needs' | 'onField' | 'bonusAbility'
  | 'passiveTalents' | 'hasSignatureWeapon' | 'region'
);

export function getCharacterFilterChecks(DataStore: DataStoreType): FilterObject<CharacterFilterKeys, Character> {
  return {
    element: {
      anemo: character => character.element === "Anemo",
      cryo: character => character.element === "Cryo",
      dendro: character => character.element === "Dendro",
      electro: character => character.element === "Electro",
      geo: character => character.element === "Geo",
      hydro: character => character.element === "Hydro",
      pyro: character => character.element === "Pyro",
    },
    weapon: {
      sword: character => character.weapon === "Sword",
      claymore: character => character.weapon === "Claymore",
      polearm: character => character.weapon === "Polearm",
      bow: character => character.weapon === "Bow",
      catalyst: character => character.weapon === "Catalyst",
    },
    rarity: {
      '5 star': character => character.rarity === Rarity.Legendary,
      '4 star': character => character.rarity === Rarity.Epic,
      // '3 star': character => character.rarity === Rarity.Rare,
      // '2 star': character => character.rarity === Rarity.Uncommon,
      // '1 star': character => character.rarity === Rarity.Common,
    },
    needs: {
      hp: character => character.playstyle?.needsStat('HP') ?? false,
      atk: character => character.playstyle?.needsStat('ATK') ?? false,
      def: character => character.playstyle?.needsStat('DEF') ?? false,
      energyRecharge: character => character.playstyle?.needsStat('Energy Recharge') ?? false,
      elementalMastery: character => character.playstyle?.needsStat('Elemental Mastery') ?? false,
    },
    onField: character => character.playstyle?.onField ?? false,
    bonusAbility: {
      none: character => character.bonusAbilities.length === 0,

      bondOfLife: character => character.bonusAbilities.includes('Bond of Life'),
      buffAttack: character => character.bonusAbilities.some(ability => ability.startsWith('Buff ATK: ')),
      buffAttackSpeed: character => character.bonusAbilities.some(ability => ability.startsWith('Buff ATK Speed: ')),
      critIncrease: character => character.bonusAbilities.some(ability => ability.startsWith('CRIT Increase: ')),
      elementalBased: character => character.bonusAbilities.some(ability => ability.startsWith('Elemental Based: ')),
      elementalInfusion: character => character.bonusAbilities.some(ability => ability.startsWith('Elemental Infusion: ')),
      grouping: character => character.bonusAbilities.includes('Grouping'),
      heal: character => character.bonusAbilities.includes('Heal'),
      hexerei: character => character.bonusAbilities.some(ability => ability.startsWith('Hexerei Able: ')),
      lunarReaction: character => character.bonusAbilities.some(ability => ability.match(/Enables Lunar(-\w+)? Reaction/)),
      nightsoulsBlessing: character => character.bonusAbilities.includes('Nightsouls Blessing'),
      offFieldDamage: character => character.bonusAbilities.includes('Off-field Damage'),
      ousia: character => character.bonusAbilities.includes('Ousia'),
      pneuma: character => character.bonusAbilities.includes('Pneuma'),
      selfHeal: character => character.bonusAbilities.includes('Self-heal'),
      serpentSubtlety: character => character.bonusAbilities.includes(`Serpent's Subtlety`),
      shield: character => character.bonusAbilities.includes('Shield'),
      stellarReaction: character => character.bonusAbilities.some(ability => ability.match(/Enables Stellar(-\w+)? Reaction/)),
    },
    passiveTalents: {
      doubleProduct: character => character.passiveTalent?.toLowerCase().includes('double product') ?? false,
      expeditionMoreRewards: character => character.passiveTalent?.toLowerCase().includes('more rewards') ?? false,
      expeditionTimeReduction: character => character.passiveTalent?.toLowerCase().includes('time consumption reduction') ?? false,
      increaseSpeed: character => !!(
        character.passiveTalent?.toLowerCase().includes('increase')
        && character.passiveTalent?.toLowerCase().includes('speed')
      ),
      localSpecialty: character => character.passiveTalent?.toLowerCase().includes('local specialties') ?? false,
      moraCostReductionOnWeapon: character => !!(
        character.passiveTalent?.toLowerCase().includes('mora cost reduction')
        && character.passiveTalent?.toLowerCase().includes('weapon')
      ),
      refundMaterials: character => character.passiveTalent?.toLowerCase().includes('refund materials') ?? false,
      refundOre: character => character.passiveTalent?.toLowerCase().includes('refunding ore') ?? false,
      transportationConsumptionReduction: character => !!(
        character.passiveTalent?.toLowerCase().includes('consumption reduction')
        && !character.passiveTalent?.toLowerCase().includes('time')
      ),
    },
    hasSignatureWeapon: character => !!DataStore.getSignatureWeaponFor(character.name),
    region: {
      mondstadt: character => character.region === "Mondstadt",
      liyue: character => character.region === "Liyue",
      inazuma: character => character.region === "Inazuma",
      sumeru: character => character.region === "Sumeru",
      fontaine: character => character.region === "Fontaine",
      natlan: character => character.region === "Natlan",
      nodKrai: character => character.region === "Nod-Krai",
      snezhnaya: character => character.region === "Snezhnaya",
      unknown: character => character.region === "Unknown",
    },
  };
}

export function getCharacterSortChecks(): SortObject<Character> {
  return {
    element: (a, b) => a.element.localeCompare(b.element),
    name: (a, b) => a.name.localeCompare(b.name),
    rarity: (a, b) => b.rarity - a.rarity,
    region: (a, b) => {
      const regionAIndex = Regions.findIndex(region => region === a.region);
      const regionBIndex = Regions.findIndex(region => region === b.region);
      return regionAIndex - regionBIndex;
    },
    weapon: (a, b) => a.weapon.localeCompare(b.weapon),
  };
};