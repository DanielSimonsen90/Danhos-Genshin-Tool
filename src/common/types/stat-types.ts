import type { Percentable, Percentage } from "./common";
import type { Element } from './genshin';

export type StatValue = Percentable<number>;

export type HP = 'HP';
export type ATK = 'ATK';
export type DEF = 'DEF';
export type Crits = `Crit ${'Rate' | 'DMG'}`;
export type ElementalDMGBonus = `${Element} DMG Bonus`;
export type EnergyRecharge = 'Energy Recharge';
export type ElementalMastery = 'Elemental Mastery';
export type HealingBonus = 'Healing Bonus';
export type PhysicalDMGBonus = 'Physical DMG Bonus';


export type BasicStatName = HP | ATK | DEF;
export type TalentStatName = BasicStatName | ElementalMastery | EnergyRecharge;

export type FlowerStatName = Percentage<HP>;
export type FeatherStatName = Percentage<ATK>;
export type SandsStatName = Percentage<BasicStatName> | EnergyRecharge | ElementalMastery;
export type GobletStatName = Percentage<BasicStatName> | ElementalDMGBonus | PhysicalDMGBonus;
export type CircletStatName = Percentage<BasicStatName> | Crits | HealingBonus | ElementalMastery;

export type StatName = 
  | Percentage<BasicStatName> 
  | TalentStatName 
  | Crits 
  | ElementalDMGBonus 
  | HealingBonus 
  | PhysicalDMGBonus;

export type MainStatMap = {
  Flower: FlowerStatName,
  Feather: FeatherStatName,
  Sands: SandsStatName,
  Goblet: GobletStatName,
  Circlet: CircletStatName;
};

export type MainStatName = MainStatMap[keyof MainStatMap];
export type SubStatName = TalentStatName | Percentage<BasicStatName> | Crits | EnergyRecharge | ElementalMastery;