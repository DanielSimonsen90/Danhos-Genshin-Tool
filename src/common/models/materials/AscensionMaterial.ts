import { Rarity, GenshinRegion } from "@/common/types";
import { DomainOfForgery, DomainOfMastery } from "../domains/";
import CraftableMaterial from "./CraftableMaterial";
import { useRegionStore } from "@/stores";
import { WorldRegion } from "@/stores/RegionStore/RegionStoreTypes";

type ObtainableDays = 'Monday/Thursday' | 'Tuesday/Friday' | 'Wednesday/Saturday';

class AscensionMaterial extends CraftableMaterial {
  public static isAscensionMaterial(obj: any): obj is AscensionMaterial {
    return obj instanceof AscensionMaterial;
  }

  protected constructor(
    name: string,
    description: string,
    region: GenshinRegion,
    rarity: Rarity,
    public domain: DomainOfMastery | DomainOfForgery,
    public obtainableDays: ObtainableDays
  ) {
    super(name, description, region, rarity);
  }

  public isObtainableToday(): boolean {
    return this.getDataTodayAttr();
  }  public getDataTodayAttr(obtainableDay?: string): boolean {
    const region = useRegionStore.getState().currentRegion;
    
    // Get the current day based on Genshin Impact server time (4am server time reset)
    const today = this.getGenshinServerDay(region);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = dayNames[today];
    if (obtainableDay && obtainableDay !== todayName) return false;

    const obtainableDays = this.obtainableDays.split('/');
    return obtainableDays.includes(todayName) || todayName === 'Sunday';
  }  
  private getGenshinServerDay(region: WorldRegion): number {
    const now = new Date();
    
    // Genshin Impact daily reset happens at 4am server time
    const GENSHIN_RESET_HOUR = 4;
    
    // Define server timezone offsets (hours from GMT)
    // TW, HK, MO timezone is unknown, so it's excluded and falls back to user's local time
    const serverTimezoneOffsets: Record<WorldRegion, number> = {
      'Asia': 8,           // GMT+8
      'Europe': 1,         // GMT+1
      'North America': -6,  // GMT-6
      'TW, HK, MO': undefined // unknown timezone
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
  }
}
export default AscensionMaterial;

export class TalentAscensionMaterial extends AscensionMaterial {
  public static isTalentAscensionMaterial(obj: any): obj is TalentAscensionMaterial {
    return obj instanceof TalentAscensionMaterial;
  }

  public static create(name: string, description: string, region: GenshinRegion, domain: DomainOfMastery, obtainableDays: ObtainableDays) {
    return super.createCraftableMaterial(
      name,
      {
        [Rarity.Uncommon]: 'Teachings of',
        [Rarity.Rare]: 'Guide to',
        [Rarity.Epic]: 'Philosophies of'
      },
      description,
      false,
      (name, description, rarity) => new TalentAscensionMaterial(
        name,
        description,
        region,
        rarity,
        domain,
        obtainableDays
      ));
  }
}
export class WeaponAscensionMaterial extends AscensionMaterial {
  public static isWeaponAscensionMaterial(obj: any): obj is WeaponAscensionMaterial {
    return obj instanceof WeaponAscensionMaterial;
  }

  public static create<TRarity extends Rarity>(
    names: Record<TRarity, string>,
    description: Record<TRarity, string>,
    region: GenshinRegion,
    domain: DomainOfForgery,
    obtainableDays: ObtainableDays
  ) {

    let root: WeaponAscensionMaterial | undefined;
    let current: AscensionMaterial | undefined;
    
    for (const rarity in names) {
      const name = rarity in names ? names[rarity as TRarity] : '';
      const desc = rarity in description ? description[rarity as TRarity] : '';
      const material = new WeaponAscensionMaterial(name, desc, region, rarity, domain, obtainableDays);

      if (current) current.setCraftable(3, material);
      if (!root) root = material;
      current = material;
    }

    return root;
  }
}