import { Weapon } from "@/common/models";
import { Rarity } from "@/common/types";
import { FilterObject } from "@/components/common/FormItems/Filter/Filter";
import { SortObject } from "@/components/common/FormItems/Sort/Sort";

export type WeaponFilterKeys = 'weaponType' | 'rarity' | 'secondaryStat' | 'obtainableThrough';

export function getWeaponFilterChecks(): FilterObject<WeaponFilterKeys, Weapon> {
  return {
    weaponType: {
      sword: weapon => weapon.type === "Sword",
      claymore: weapon => weapon.type === "Claymore",
      polearm: weapon => weapon.type === "Polearm",
      bow: weapon => weapon.type === "Bow",
      catalyst: weapon => weapon.type === "Catalyst",
    },
    rarity: {
      '5 star': weapon => weapon.rarity === Rarity.Legendary,
      '4 star': weapon => weapon.rarity === Rarity.Epic,
      '3 star': weapon => weapon.rarity === Rarity.Rare,
      // '2 star': weapon => weapon.rarity === Rarity.Uncommon,
      // '1 star': weapon => weapon.rarity === Rarity.Common,
    },
    secondaryStat: {
      hp: weapon => weapon.secondaryStat === 'HP',
      attack: weapon => weapon.secondaryStat === 'ATK',
      defense: weapon => weapon.secondaryStat === 'DEF',
      energyRecharge: weapon => weapon.secondaryStat === 'Energy Recharge',
      elementalMastery: weapon => weapon.secondaryStat === 'Elemental Mastery',
      critRate: weapon => weapon.secondaryStat === 'Crit Rate',
      critDamage: weapon => weapon.secondaryStat === 'Crit DMG',
      physicalDamage: weapon => weapon.secondaryStat === 'Physical DMG Bonus',
    },
    obtainableThrough: {
      battlePass: weapon => weapon.droppedBy === 'Battle Pass',
      chest: weapon => weapon.droppedBy === 'Chest',
      event: weapon => weapon.droppedBy === 'Event',
      fishing: weapon => weapon.droppedBy === 'Fishing',
      forgeable: weapon => weapon.droppedBy.includes('Forging'),
      npc: weapon => weapon.droppedBy.startsWith('NPC: '),
      quest: weapon => weapon.droppedBy === 'Quest',
      signatureWeapon: weapon => !!weapon.signatureWeaponFor,
      starglitterExchange: weapon => weapon.droppedBy === 'Starglitter Exchange',
      wish: weapon => weapon.droppedBy === 'Wish',
    },
  };
}

export function getWeaponSortChecks(): SortObject<Weapon> {
  return {
    name: (a, b) => a.name.localeCompare(b.name),
    rarity: (a, b) => a.rarity - b.rarity,
    baseAttack: (a, b) => b.baseAttack - a.baseAttack,
    weaponType: (a, b) => a.type.localeCompare(b.type),
    secondaryStat: (a, b) => {
      if (!a.secondaryStat) return 1;
      if (!b.secondaryStat) return -1;
      return a.secondaryStat.localeCompare(b.secondaryStat);
    },
  };
}