import { PriorityListData } from "@/pages/Building/PriorityList/PriorityListTypes";

type Region = 'North America' | 'Europe' | 'Asia' | 'TW, HK, MO'
export type Traveler = 'lumine' | 'aether';

export type RegionData = {
  region: Region
  traveler: Traveler | undefined
  priorityList?: PriorityListData
}