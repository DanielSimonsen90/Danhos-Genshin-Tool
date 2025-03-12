import { ModelKeys } from "@/common/models";
import { Tier } from "@/components/common/Tierlist/TierlistTypes";

export type PriorityList = {
  model: ModelKeys;
  tiers: Array<Tier<string>>;
}
export type PriorityLists = Record<string, PriorityList>;

export type ModifyPriorityListPayload = PriorityList & {
  title: string;
  id: string;
  'preset-title'?: string;
}