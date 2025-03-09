import { Tier } from "@/components/common/Tierlist/TierlistTypes";
import { ModelKeys } from "@/common/models";

export type PriorityList = {
  model: ModelKeys;
  tiers: Array<Tier<string>>;
}
export type PriorityLists = Record<string, PriorityList>;