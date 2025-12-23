import { TeyvatRegion, ResinCost } from "@/common/types/genshin";
import { Domain } from "./Domain";
import { TalentAscensionMaterial } from "../materials/AscensionMaterial";

/**
 * Domain for character ascension materials.
 */
export class DomainOfMastery extends Domain<TalentAscensionMaterial> {
  public static isDomainMastery(obj: any): obj is DomainOfMastery {
    return obj instanceof DomainOfMastery;
  }
  constructor(
    public name: string,
    public description: string,
    public leyLineDisorder: Record<number, string>,
    public region: TeyvatRegion,
  ) {
    super(name, description, leyLineDisorder, ResinCost.Twenty, region);
  }

  public isMastery(): this is DomainOfMastery { return true; }
}

export default DomainOfMastery;