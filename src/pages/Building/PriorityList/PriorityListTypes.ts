import { Tier } from "@/components/common/Tierlist/TierlistTypes";
import { AREAS } from "./PriorityListConstants";

export type Area = typeof AREAS[number];
export type PriorityListData = Record<Area, Array<Tier<string>>>;