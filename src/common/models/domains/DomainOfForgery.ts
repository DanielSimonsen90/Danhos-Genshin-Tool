import { GenshinRegion, ResinCost } from "@/common/types/genshin";
import { Domain } from "./Domain";
import { WeaponAscensionMaterial } from "../materials/AscensionMaterial";

/**
 * Domain for weapon ascension materials.
 */
export class DomainOfForgery extends Domain<WeaponAscensionMaterial> {
  public static isDomainForgery(obj: any): obj is DomainOfForgery {
    return obj instanceof DomainOfForgery;
  }
  constructor(
    public name: string,
    public description: string,
    public leyLineDisorder: Record<number, string>,
    public region: GenshinRegion,
  ) {
    super(name, description, leyLineDisorder, ResinCost.Twenty, region);
  }

  public isForgery(): this is DomainOfForgery { return true; }
}

export default DomainOfForgery;