export type ArtifactPartName = 'Flower' | 'Feather' | 'Sands' | 'Goblet' | 'Circlet';
export type Element = 'Anemo' | 'Pyro' | 'Hydro' | 'Electro' | 'Cryo' | 'Geo' | 'Dendro';

export type Reaction =
  | 'Vaporize' | 'Overloaded' | 'Melt' | 'Burning'
  | 'Frozen' | 'Shatter' | 'Burgeon' | 'Hyperbloom' | 'Bloom'
  | 'Electro-Charged' | 'Lunar-Charged' | 'Superconduct' | 'Quicken' | 'Aggravate' | 'Spread'
  | 'Swirl' | 'Crystallize';

export enum Rarity {
  /** White */
  Common = 1,
  /** Green */
  Uncommon = 2,
  /** Blue */
  Rare = 3,
  /** Purple */
  Epic = 4,
  /** Orange */
  Legendary = 5,
}

export enum ResinCost {
  Twenty = 20, // Basic domains
  Thirty = 30, // Weekly domains (3 times)
  Forty = 40, // World bosses
  Sixty = 60, // Weekly bosses (after 3 times)
}

export type GenshinRegion = 'Mondstadt' | 'Liyue' | 'Inazuma' | 'Sumeru' | 'Fontaine' | 'Natlan' | 'Nod-Krai' | 'Snezhnaya' | 'Unknown';