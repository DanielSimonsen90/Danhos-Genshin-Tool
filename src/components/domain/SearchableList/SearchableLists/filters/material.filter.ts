import { Rarity } from "@/common/types";
import { DataStoreType, AccountStoreType } from "@/stores";
import { FilterObject } from "@/components/common/FormItems/Filter/Filter";
import { SortObject } from "@/components/common/FormItems/Sort/Sort";
import Material from "@/common/models/materials/Material";
import CraftableMaterial from "@/common/models/materials/CraftableMaterial";
import AscensionMaterial, { TalentAscensionMaterial, WeaponAscensionMaterial } from "@/common/models/materials/AscensionMaterial";
import LocalSpecialty from "@/common/models/materials/LocalSpecialty";
import MobDrop, { ElementalCrystal } from "@/common/models/materials/MobDrop";
import { EasyMob, EliteMob, WeeklyBoss, WorldBoss } from "@/common/models";
import { Regions } from "@/data/regions";

export type MaterialFilterKeys = 'type' | 'obtainableThrough' | 'obtainableToday' | 'rarity' | 'region';

export function getMaterialFilterChecks(DataStore: DataStoreType, AccountStore: AccountStoreType): FilterObject<MaterialFilterKeys, Material> {
  return {
    type: {
      crystal: ElementalCrystal.isElementalCrystal,
      localSpecialty: LocalSpecialty.isLocalSpecialty,
      mobDrop: MobDrop.isMobDrop,
      talentAscension: TalentAscensionMaterial.isTalentAscensionMaterial,
      weaponAscension: WeaponAscensionMaterial.isWeaponAscensionMaterial,
    },
    obtainableThrough: {
      domains: material => DataStore.getDomainsFromMaterial(material.name).length > 0,
      easyMobs: material => material instanceof MobDrop && DataStore.getMobsDroppingMaterial(material.name).filter(EasyMob.isEasyMob).length > 0,
      eliteMobs: material => material instanceof MobDrop && DataStore.getMobsDroppingMaterial(material.name).filter(EliteMob.isEliteMob).length > 0,
      worldBosses: material => material instanceof MobDrop && DataStore.getBossesFromMaterial(material.name).filter(WorldBoss.isWorldBoss).length > 0,
      weeklyBosses: material => material instanceof MobDrop && DataStore.getBossesFromMaterial(material.name).filter(WeeklyBoss.isWeeklyBoss).length > 0,
      crafting: CraftableMaterial.isCraftableMaterial,
    },
    obtainableToday: material => AscensionMaterial.isAscensionMaterial(material) ? material.isObtainableToday(AccountStore) : false,
    rarity: {
      legendary: material => material.rarity === Rarity.Legendary,
      epic: material => material.rarity === Rarity.Epic,
      rare: material => material.rarity === Rarity.Rare,
      uncommon: material => material.rarity === Rarity.Uncommon,
      common: material => material.rarity === Rarity.Common,
    },
    region: {
      mondstadt: material => material.region === 'Mondstadt',
      liyue: material => material.region === 'Liyue',
      inazuma: material => material.region === 'Inazuma',
      sumeru: material => material.region === 'Sumeru',
      fontaine: material => material.region === 'Fontaine',
      natlan: material => material.region === 'Natlan',
      snezhnaya: material => material.region === 'Snezhnaya',
    },
  };
}

export function getMaterialSortChecks(): SortObject<Material> {
  return {
    name: (a, b) => a.name.localeCompare(b.name),
    rarity: (a, b) => a.rarity - b.rarity,
    region: (a, b) => {
      const regionAIndex = Regions.findIndex(region => region === a.region);
      const regionBIndex = Regions.findIndex(region => region === b.region);
      return regionAIndex - regionBIndex;
    },
  };
}