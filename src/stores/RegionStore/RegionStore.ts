import { create } from 'zustand';

import * as ObjectUtils from '@/common/functions/object';
import StorageService from '@/services/StorageService';

import { RegionData, WorldRegion, Traveler, RegionContextType, RegionStore, RegionSettings, FavoriteModels, FavoritesCollection, FavoritesAPI, FavoriteModel } from './RegionStoreTypes';
import { DEFAULT_REGION, DEFAULT_REGION_DATA, LOCAL_STORAGE_KEY, REGIONS, DEFAULT_FAVORITES } from './RegionStoreConstants';
import { Model } from '@/common/models/Model';

export const useRegionStore = create<RegionStore>((setState, getState) => {
  const storageService = StorageService<RegionContextType>(LOCAL_STORAGE_KEY);

  const regions = storageService.get() ?? { [DEFAULT_REGION]: DEFAULT_REGION_DATA } as RegionContextType;
  const getCurrentRegion = (regions: RegionContextType) => Object.keys(regions).find(region => regions[region as keyof typeof regions]?.selected) as keyof RegionContextType; 
  const getRegionData = (regions: RegionContextType) => {
    const currentRegion = getCurrentRegion(regions);
    const regionData = currentRegion ? regions[currentRegion as keyof typeof regions] : undefined;

    if (!regionData) throw new Error(`No region data found for current region: ${currentRegion}`);

    // Ensure favorites are always initialized
    const dataWithFavorites = {
      ...regionData,
      favorites: regionData.favorites ?? DEFAULT_FAVORITES,
    };

    return Object.assign({}, dataWithFavorites, { setRegionData });
  };

  const setRegionData = (update: Partial<RegionData> | ((state: RegionData) => RegionData)) => {
    const { regions, currentRegion } = getState();
    const resolvedRegionDataUpdate = typeof update === 'function'
      ? update(getState().regionData)
      : update;
    resolvedRegionDataUpdate.region ??= currentRegion;

    // Define the next selected regionData
    const next = REGIONS.reduce((acc, _region) => {
      const region = _region as keyof RegionContextType;
      const storedData: RegionData = regions[region] ?? Object.assign(
        ObjectUtils.exclude(DEFAULT_REGION_DATA, 'selected'),
        { region, selected: false, favorites: DEFAULT_FAVORITES } as RegionData,
      );

      if (region === resolvedRegionDataUpdate.region) acc[region] = {
        ...storedData,
        ...resolvedRegionDataUpdate,
        selected: true,
      };
      else if (storedData.selected && resolvedRegionDataUpdate.region) acc[region] = { ...storedData, selected: false };
      else if (regions[region]) acc[region] = storedData;

      return acc;
    }, {} as RegionContextType);

    // If no region is selected, create the default region
    if (Object.keys(next).length === 0) next[DEFAULT_REGION] = {
      ...DEFAULT_REGION_DATA,
      ...update,
      selected: true,
    };

    storageService.set(next);

    setState({
      regions: next,
      currentRegion: getCurrentRegion(next),
      regionData: getRegionData(next),
    });
  };
  const setRegion = (region: WorldRegion) => setRegionData({ region });
  const setTraveler = (traveler: Traveler) => setRegionData({ traveler });

  const getGenshinServerDay = (region: WorldRegion): number => {
    const now = new Date();

    // Genshin Impact daily reset happens at 4am server time
    const GENSHIN_RESET_HOUR = 4;

    // Define server timezone offsets (hours from GMT)
    // TW, HK, MO timezone is unknown, so it's excluded and falls back to user's local time
    const serverTimezoneOffsets: Record<WorldRegion, number> = {
      'Asia': 8,           // GMT+8
      'Europe': 1,         // GMT+1
      'North America': -5,  // GMT-5
      'TW, HK, MO': 8      // GMT+8 (assumed, but not confirmed)
    };

    const timezoneOffset = serverTimezoneOffsets[region];

    // If unknown region, return user's current day
    if (timezoneOffset === undefined) return now.getDay();

    // Calculate server time
    const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const serverTime = new Date(utc + (timezoneOffset * 60 * 60 * 1000));

    // If it's before 4am server time, consider it the previous day
    if (serverTime.getHours() < GENSHIN_RESET_HOUR) {
      const previousDay = new Date(serverTime);
      previousDay.setDate(previousDay.getDate() - 1);
      return previousDay.getDay();
    }

    return serverTime.getDay();
  };
  const getGenshinServerDayName = (region: WorldRegion): string => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = getGenshinServerDay(region);
    return days[dayIndex] || 'Unknown';
  }

  const favorites: FavoritesAPI = {
    getAllFavorites: (): FavoritesCollection => getState().regionData.favorites ?? DEFAULT_FAVORITES,

    hasAnyFavorites: (): boolean => {
      const favorites = getState().regionData.favorites ?? DEFAULT_FAVORITES;
      return Object.values(favorites).some(favList => favList.length > 0);
    },

    clearFavorites: () => setRegionData({ favorites: DEFAULT_FAVORITES }),

    getFavorite: <TFavoriteModel extends keyof FavoriteModels>(type: TFavoriteModel): FavoriteModel<TFavoriteModel> => ({
      add: (item: FavoriteModels[TFavoriteModel]) => {
        const currentFavorites = getState().regionData.favorites ?? DEFAULT_FAVORITES;
        const favorites = {
          ...currentFavorites,
          [type]: [...(currentFavorites[type] || []), item]
        };
        setRegionData({ favorites });
      },

      remove: (item: FavoriteModels[TFavoriteModel]) => {
        const currentFavorites = getState().regionData.favorites ?? DEFAULT_FAVORITES;
        const favorites = {
          ...currentFavorites,
          [type]: (currentFavorites[type] as Model[]).filter((model: Model) => model.name !== item.name)
        };
        setRegionData({ favorites });
      },

      isFavorite: (item: FavoriteModels[TFavoriteModel]) => {
        const currentFavorites = getState().regionData.favorites ?? DEFAULT_FAVORITES;
        return currentFavorites[type]?.some((model: Model) => model.name === item.name) ?? false;
      },

      getFavorites: (): Array<FavoriteModels[TFavoriteModel]> => {
        const currentFavorites = getState().regionData.favorites ?? DEFAULT_FAVORITES;
        return (currentFavorites[type] ?? []) as Array<FavoriteModels[TFavoriteModel]>;
      }
    })
  };

  return {
    regions,
    currentRegion: getCurrentRegion(regions),
    regionData: getRegionData(regions),
    get regionSettings(): RegionSettings {
      return ObjectUtils.pick(getState().regionData, 'region', 'traveler');
    },
    setRegionData,
    setRegion,
    setTraveler,
    setState,

    getGenshinServerDay,
    getGenshinServerDayName,

    favorites,

    storageService,
  };
});

export default useRegionStore;