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
export type RegionContextType = Record<Region, RegionData | undefined>;

export type RegionStore = {
  regions: RegionContextType;
  currentRegion: Region;
  regionData: RegionData;

  get regionSettings(): RegionSettings;

  setRegionData: (update: Partial<RegionData>) => void;
  setRegion: (region: Region) => void;
  setTraveler: (traveler: Traveler) => void;
};