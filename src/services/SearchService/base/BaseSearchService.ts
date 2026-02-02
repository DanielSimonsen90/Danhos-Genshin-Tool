import BaseService from "@/services/BaseService";
import { Rarity } from "@/common/types";

const SCORES: Record<Rarity, number> = {
  [Rarity.Common]: 20,
  [Rarity.Uncommon]: 40,
  [Rarity.Rare]: 60,
  [Rarity.Epic]: 80,
  [Rarity.Legendary]: 100,
}

export default abstract class BaseSearchService<TResult> extends BaseService<TResult> {
  public getScoreColor(score: number): string {
    for (const rarity of Object.values(Rarity).sort((a, b) => SCORES[a as keyof typeof SCORES] - SCORES[b as keyof typeof SCORES])) {
      if (score <= SCORES[rarity as keyof typeof SCORES]) {
        return `var(--rarity-${Rarity[rarity as keyof typeof SCORES].toLowerCase()})`;
      }
    }

    return `var(--rarity-legendary)`;
  }
}