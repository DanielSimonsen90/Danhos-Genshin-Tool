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