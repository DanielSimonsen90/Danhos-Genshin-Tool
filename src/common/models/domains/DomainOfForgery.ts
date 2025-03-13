import { Region, ResinCost } from "@/common/types/genshin";
import ArtifactSet from "../artifacts/ArtifactSet";
import { Domain } from "./Domain";
import { AscensionMaterial } from "../materials/AscensionMaterial";

/**
 * Domain for weapon ascension materials.
 */
export class DomainOfForgery extends Domain<AscensionMaterial<'Weapon'>> {
  public static isDomainForgery(obj: any): obj is DomainOfForgery {
    return obj instanceof DomainOfForgery;
  }
  constructor(
    public name: string,
    public description: string,
    public region: Region,
  ) {
    super(name, description, ResinCost.Twenty, region);
  }
}

export default DomainOfForgery;