import { getDefaultTiers } from "@/components/common/Tierlist/TierlistFunctions";
import { DataStore } from "@/stores";

import { PriorityList, PriorityLists } from "./PriorityListTypes";

export const onUnsortedSearch = (search: string, name: string) => name.toLowerCase().includes(search.toLowerCase());

export const getDefaultPriorityLists = (DataStore: DataStore): PriorityLists => ({
  "General Priority": getDefaultPriorityList(DataStore),
})

export const getDefaultPriorityList = (DataStore: DataStore): PriorityList => ({
  model: 'Character',
  tiers: getDefaultTiers(DataStore.CharacterNames)
})