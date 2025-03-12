import { ModelKeys } from "@/common/models";

import { Tier } from "@/components/common/Tierlist/TierlistTypes";
import { getDefaultTiers } from "@/components/common/Tierlist/TierlistFunctions";

import { DataStore, RegionStore, Region, RegionContextType, RegionData, } from "@/stores";

import { PriorityList, PriorityLists } from "./PriorityListTypes";

export const onUnsortedSearch = (search: string, name: string) => name.toLowerCase().includes(search.toLowerCase());
export const onStorageLoaded = (tierlistTitle: string, DataStore: DataStore, region: Region) => (data: RegionContextType) => {
  const priorityList = data[region].priorityLists ?? getDefaultPriorityLists(DataStore);
  if (tierlistTitle in priorityList) return priorityList[tierlistTitle];

  const key = Object.keys(priorityList).find(Boolean);
  return priorityList[key];
}
export const onStorageSave = (tierlistTitle: string, model: ModelKeys, RegionStore: RegionStore, region: Region) => (tiers: Array<Tier<string>>) => ({
  ...RegionStore.regions,
  [region]: {
    ...RegionStore.regions[region],
    priorityLists: {
      ...(RegionStore.regions[region].priorityLists ?? {}),
      [tierlistTitle]: {
        tiers,
        model
      } as PriorityLists[string]
    } as PriorityLists
  } as RegionData
} as RegionContextType);

export const getDefaultPriorityLists = (DataStore: DataStore): PriorityLists => ({
  "General Priority": getDefaultPriorityList(DataStore),
})

export const getDefaultPriorityList = (DataStore: DataStore): PriorityList => ({
  model: 'Character',
  tiers: getDefaultTiers(DataStore.CharacterNames)()
})