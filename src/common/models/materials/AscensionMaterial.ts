import { Rarity, GenshinRegion } from "@/common/types";
import { DomainOfForgery, DomainOfMastery } from "../domains";
import CraftableMaterial from "./CraftableMaterial";
import { RegionStore, WorldRegion } from "@/stores/RegionStore/RegionStoreTypes";

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

  public isObtainableToday(RegionStore: RegionStore): boolean {
    return this.getDataTodayAttr(RegionStore);
  }  
  public getDataTodayAttr(RegionStore: RegionStore, obtainableDay?: string): boolean {
    const region = RegionStore.currentRegion;
    
    // Get the current day based on Genshin Impact server time (4am server time reset)
    const today = RegionStore.getGenshinServerDay(region);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = dayNames[today];
    if (obtainableDay && obtainableDay !== todayName) return false;

    const obtainableDays = this.obtainableDays.split('/');
    return obtainableDays.includes(todayName) || todayName === 'Sunday';
  }
  public isObtainableOnDay(day: string): boolean {
    const obtainableDays = this.obtainableDays.split('/');
    return obtainableDays.includes(day) || day === 'Sunday';
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