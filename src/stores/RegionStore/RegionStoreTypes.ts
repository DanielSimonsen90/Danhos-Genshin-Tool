import { PriorityListData } from "@/pages/Building/PriorityList/PriorityListTypes";

export type Region = 'North America' | 'Europe' | 'Asia' | 'TW, HK, MO';
export type Traveler = 'lumine' | 'aether';

export type RegionData = {
  region: Region;
  selected: boolean;
  traveler: Traveler | undefined;
  priorityList?: PriorityListData;
};

export type RegionSettings = Pick<RegionData, 'traveler' | 'region'>;