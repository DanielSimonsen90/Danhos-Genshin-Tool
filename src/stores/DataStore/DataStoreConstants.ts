import { List } from '@/common/models/List';

import * as CharactersData from '@/data/characters';
import * as ArtifactsData from '@/data/artifact-sets';

import * as DomainOfBlessingData from '@/data/domains/domain-of-blessing';
import * as DomainOfForgeryData from '@/data/domains/domain-of-forgery';
import * as DomainofMasteryData from '@/data/domains/domain-of-mastery';
const DomainsData = Object.assign({},
  DomainOfBlessingData,
  DomainOfForgeryData,
  DomainofMasteryData
);

import * as MaterialDropsData from '@/data/materials/drops';
import { ElementalCrystals } from '@/data/materials/drops/crystals';
import Billets from '@/data/materials/drops/billets';
import * as MaterialLocalSpecialtiesData from '@/data/materials/local-specialties';
import * as MaterialTalentData from '@/data/materials/talents';

const MaterialsData = Object.assign({},
  Object.assign({}, 
    MaterialDropsData,
    MaterialLocalSpecialtiesData,
    MaterialTalentData,
  ),
  Object.assign({}, 
    ElementalCrystals,
    Billets
  )
);

import * as WeeklyBossesData from '@/data/mobs/weekly-bosses';
import * as WorldBossesData from '@/data/mobs/world-bosses';
import * as EliteMobsData from '@/data/mobs/elite';
import * as EasyMobsData from '@/data/mobs/easy';
import { DomainOfBlessing, DomainOfForgery, DomainOfMastery } from '@/common/models';
const BossMobsData = Object.assign({},
  WeeklyBossesData,
  WorldBossesData,
);
const MobsData = Object.assign({},
  BossMobsData,
  EliteMobsData,
  EasyMobsData
);

const DataStoreContent__ArtifactsData = {
  ArtifactsData,
  Artifacts: List.from(ArtifactsData),
  ArtifactNames: List.from(ArtifactsData).map(set => set.name),
}
const DataStoreContent__CharactersData = {
  CharactersData,
  Characters: List.from(CharactersData),
  CharacterNames: List.from(CharactersData).map(character => character.name),
}

const DataStoreContent__DomainsData = {
  DomainsData,
  Domains: List.from(DomainsData) as List<DomainOfBlessing | DomainOfForgery | DomainOfMastery>,
  DomainNames: List.from(DomainsData).map(domain => domain.name),
} as {
  DomainsData: typeof DomainsData,
  Domains: List<DomainOfBlessing | DomainOfForgery | DomainOfMastery>,
  DomainNames: string[],
}
const DataStoreContent__MobsData = {
  MobsData,
  Mobs: List.from(MobsData),
  MobNames: List.from(MobsData).map(mob => mob.name),
}
const DataStoreContent__MaterialsData = {
  MaterialsData,
  Materials: List.from(MaterialsData),
  MaterialNames: List.from(MaterialsData).map(material => material.name),
}


import * as WeaponsData from '@/data/weapons';
const DataStoreContent__WeaponsData = {
  WeaponsData,
  Weapons: List.from(WeaponsData),
  WeaponNames: List.from(WeaponsData).map(weapon => weapon.name),
}

export const DataStoreContent = {
  ...DataStoreContent__ArtifactsData,
  ...DataStoreContent__CharactersData,
  ...DataStoreContent__DomainsData,
  ...DataStoreContent__MobsData,
  ...DataStoreContent__MaterialsData,
  ...DataStoreContent__WeaponsData,
}