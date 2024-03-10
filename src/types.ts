export type Nullable<T> = T | null;

export type StatValue = number | `${number}%`;
export type ArtifactPartName = 'Flower' | 'Feather' | 'Sands' | 'Goblet' | 'Circlet';
export type Element = 'Anemo' | 'Pyro' | 'Hydro' | 'Electro' | 'Cryo' | 'Geo' | 'Dendro';

type BasicStatName = 'HP' | 'ATK' | 'DEF';
export type TalentStatName = BasicStatName | 'Elemental Mastery' | 'Energy Recharge';
export type StatName = 
  | BasicStatName | `${BasicStatName}%` | TalentStatName
  // | 'Elemental Mastery' | 'Energy Recharge' 
  | `CRIT ${'Rate' | 'DMG'}` 
  | 'Healing Bonus' | `${Element} DMG Bonus` | 'Physical DMG Bonus';
  // | Elemental Skill Bonus

export type AbilityType = 'Normal/Press' | 'Charged/Hold' | 'Plunging/Hold' | 'Skill/Ability' | 'Burst/Ult';
export type BonusAbility = 'Shield' | 'Heal' | 'Buff ATK';
export type Weapon = 'Sword' | 'Claymore' | 'Polearm' | 'Bow' | 'Catalyst';
export type Reaction = 
  | 'Vaporize' | 'Overloaded' | 'Melt' | 'Burning'
  | 'Frozen' | 'Shatter' | 'Burgeon' | 'Hyperbloom' | 'Bloom'
  | 'Electro-Charged' | 'Superconduct' | 'Quicken' | 'Aggravate' | 'Spread'
  | 'Swirl' | 'Crystallize'