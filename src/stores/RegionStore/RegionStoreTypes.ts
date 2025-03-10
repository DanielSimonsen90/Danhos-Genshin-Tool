import { SetStateAction } from "react";
import { PriorityLists } from "@/pages/Building/PriorityList/PriorityListTypes";
import { StorageReturn } from "@/services/StorageService";

export type Region = 'North America' | 'Europe' | 'Asia' | 'TW, HK, MO';
export type Traveler = 'lumine' | 'aether';

export type RegionData = {
  region: Region;
  traveler: Traveler | undefined;
  priorityLists?: PriorityLists;
  
  selected: boolean;
};

export type RegionSettings = Pick<RegionData, 'traveler' | 'region'>;
export type RegionContextType = Record<Region, RegionData | undefined>;

export type RegionStore = {
  regions: RegionContextType;
  currentRegion: Region;
  regionData: RegionData;

  get regionSettings(): RegionSettings;

  setRegionData: (update: Partial<RegionData> | ((state: RegionData) => RegionData)) => void;
  setRegion: (region: Region) => void;
  setTraveler: (traveler: Traveler) => void;
  setState: (state: SetStateAction<RegionStore>) => void;

  storageService: StorageReturn<RegionContextType>;
};