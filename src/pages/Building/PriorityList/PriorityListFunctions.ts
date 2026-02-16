import { getDefaultTiers } from "@/components/common/Tierlist/TierlistFunctions";

import { PriorityList, PriorityLists } from "./PriorityListTypes";
import DataStore from "@/stores/DataStore/DataStore";

export const onUnsortedSearch = (search: string, name: string) => name.toLowerCase().includes(search.toLowerCase());

export const getDefaultPriorityLists = (): PriorityLists => ({
  "General Priority": getDefaultPriorityList(),
})

export const getDefaultPriorityList = (): PriorityList => ({
  model: 'Character',
  tiers: getDefaultTiers(DataStore.getState().CharacterNames)
})