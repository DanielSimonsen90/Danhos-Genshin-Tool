import { Region, ResinCost } from "@/common/types/genshin";
import { Domain } from "./Domain";
import { AscensionMaterial } from "../materials/AscensionMaterial";

/**
 * Domain for character ascension materials.
 */
export class DomainOfMastery extends Domain<AscensionMaterial<'Talent'>> {
  public static isDomainMastery(obj: any): obj is DomainOfMastery {
    return obj instanceof DomainOfMastery;
  }
  constructor(
    public name: string,
    public description: string,
    public region: Region,
  ) {
    super(name, description, ResinCost.Twenty, region);
  }
}

export default DomainOfMastery;