import { ArtifactSet } from "@/common/models";
import { Rarity } from "@/common/types";
import { DataStoreType } from "@/stores";
import { FilterObject } from "@/components/common/FormItems/Filter/Filter";
import { SortObject } from "@/components/common/FormItems/Sort/Sort";
import Elements from "@/data/elements";

export type ArtifactFilterKeys = 'obtainableThrough' | 'rarity' | 'talentIncrease' | 'region';

export function getArtifactFilterChecks(DataStore: DataStoreType): FilterObject<ArtifactFilterKeys, ArtifactSet> {
  const { getRegionsFromArtifact } = DataStore;

  return {
    obtainableThrough: {
      domains: artifact => artifact.domainNames.length > 0 && artifact.domainNames[0] !== "BOSS_DROP",
      boss: artifact => artifact.domainNames.length > 0 && artifact.domainNames.includes("BOSS_DROP"),
      crafting: artifact => artifact.isCraftable,
    },
    rarity: {
      legendary: artifact => artifact.rarity === Rarity.Legendary,
      epic: artifact => artifact.rarity === Rarity.Epic,
      rare: artifact => artifact.rarity === Rarity.Rare,
      uncommon: artifact => artifact.rarity === Rarity.Uncommon,
      common: artifact => artifact.rarity === Rarity.Common,
    },
    talentIncrease: {
      hp: artifact => artifact.doesStatIncrease('HP'),
      atk: artifact => artifact.doesStatIncrease('ATK'),
      def: artifact => artifact.doesStatIncrease('DEF'),
      elementalMastery: artifact => artifact.doesStatIncrease('Elemental Mastery'),
      energyRecharge: artifact => artifact.doesStatIncrease('Energy Recharge'),
      physicalDMGBonus: artifact => artifact.doesStatIncrease('Physical DMG'),
      healingBonus: artifact => artifact.doesStatIncrease('Healing Bonus') || artifact.doesStatIncrease('Healing Effectiveness'),
      critRate: artifact => artifact.doesStatIncrease('Crit Rate'),
      critDMG: artifact => artifact.doesStatIncrease('Crit DMG'),

      shieldStrength: artifact => artifact.doesStatIncrease('Shield Strength'),

      chargedAttack: artifact => artifact.doesStatIncrease('Charged Attack DMG'),
      normalAndChargedAttack: artifact => artifact.doesStatIncrease('Normal and Charged Attack DMG'),

      skill: artifact => artifact.doesStatIncrease('Elemental Skill DMG'),
      burst: artifact => artifact.doesStatIncrease('Burst'),
      elemental: artifact => (
        artifact.doesStatIncrease('Anemo DMG Bonus')
        || artifact.doesStatIncrease('Cryo DMG Bonus')
        || artifact.doesStatIncrease('Dendro DMG Bonus')
        || artifact.doesStatIncrease('Electro DMG Bonus')
        || artifact.doesStatIncrease('Geo DMG Bonus')
        || artifact.doesStatIncrease('Hydro DMG Bonus')
        || artifact.doesStatIncrease('Pyro DMG Bonus')
      ),
    },
    region: {
      mondstadt: artifact => getRegionsFromArtifact(artifact.name)?.includes('Mondstadt') ?? false,
      liyue: artifact => getRegionsFromArtifact(artifact.name)?.includes('Liyue') ?? false,
      inazuma: artifact => getRegionsFromArtifact(artifact.name)?.includes('Inazuma') ?? false,
      sumeru: artifact => getRegionsFromArtifact(artifact.name)?.includes('Sumeru') ?? false,
      fontaine: artifact => getRegionsFromArtifact(artifact.name)?.includes('Fontaine') ?? false,
      natlan: artifact => getRegionsFromArtifact(artifact.name)?.includes('Natlan') ?? false,
      nodKrai: artifact => getRegionsFromArtifact(artifact.name)?.includes('Nod-Krai') ?? false,
      snezhnaya: artifact => getRegionsFromArtifact(artifact.name)?.includes('Snezhnaya') ?? false,
      // unknown: artifact => getRegionsFromArtifact(artifact.name)?.includes('Unknown') ?? false,
    },
  };
}

export function getArtifactSortChecks(DataStore: DataStoreType): SortObject<ArtifactSet> {
  const { getRegionsFromArtifact } = DataStore;

  return {
    name: (a, b) => a.name.localeCompare(b.name),
    rarity: (a, b) => b.rarity - a.rarity,
    region: (a, b) => {
      const regionOrder = ["Mondstadt", "Liyue", "Inazuma", "Sumeru", "Fontaine", "Natlan", "Nod-Krai", "Snezhnaya", "Unknown"];
      const aRegions = getRegionsFromArtifact(a.name) || [];
      const bRegions = getRegionsFromArtifact(b.name) || [];
      const aMinIndex = Math.min(...aRegions.map(region => regionOrder.indexOf(region)));
      const bMinIndex = Math.min(...bRegions.map(region => regionOrder.indexOf(region)));
      return aMinIndex - bMinIndex;
    },
    element: (a, b) => {
      const aElement = Elements.find(element => a.doesStatIncrease(`${element} DMG Bonus`));
      const bElement = Elements.find(element => b.doesStatIncrease(`${element} DMG Bonus`));

      if (!aElement && !bElement) return 0;
      if (!aElement) return 1;
      if (!bElement) return -1;
      return Elements.indexOf(aElement) - Elements.indexOf(bElement);
    },
  };
}
