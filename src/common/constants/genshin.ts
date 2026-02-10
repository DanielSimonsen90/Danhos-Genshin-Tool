import MemoizeService from "@/services/MemoizeService";
import { Element, Reaction } from "../types";

export const TriggerableReactions: Record<Reaction, Array<Element>> = {
  'Anemo Reaction': ['Anemo'],
  'Cryo Reaction': ['Cryo'],
  'Dendro Reaction': ['Dendro'],
  'Electro Reaction': ['Electro'],
  'Geo Reaction': ['Geo'],
  'Hydro Reaction': ['Hydro'],
  'Pyro Reaction': ['Pyro'],

  'Aggravate': ['Dendro', 'Electro'],
  'Bloom': ['Dendro', 'Hydro'],
  'Burgeon': ['Dendro', 'Hydro', 'Pyro'],
  'Burning': ['Dendro', 'Pyro'],
  'Crystallize': ['Geo', 'Electro', 'Cryo', 'Dendro', 'Hydro', 'Pyro'],
  'Electro-Charged': ['Electro', 'Hydro'],
  'Frozen': ['Cryo', 'Hydro'],
  'Hyperbloom': ['Dendro', 'Electro', 'Hydro'],
  'Lunar': ['Hydro', 'Electro', 'Dendro', 'Geo'],
  'Lunar-Bloom': ['Hydro', 'Dendro'],
  'Lunar-Charged': ['Hydro', 'Electro'],
  'Lunar-Crystallize': ['Hydro', 'Geo'],
  'Melt': ['Cryo', 'Pyro'],
  'Overloaded': ['Electro', 'Pyro'],
  'Quicken': ['Dendro', 'Electro'],
  'Shatter': ['Cryo', 'Geo', 'Hydro'],
  'Spread': ['Dendro', 'Electro'],
  'Superconduct': ['Cryo', 'Electro'],
  'Swirl': ['Anemo', 'Pyro', 'Hydro', 'Electro', 'Cryo'],
  'Vaporize': ['Hydro', 'Pyro'],
};

export const ElementalReactions = Object.keys(TriggerableReactions) as Reaction[];
export const ElementalReactionMemoizeService = new MemoizeService();