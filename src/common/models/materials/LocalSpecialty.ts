import { Material } from "./Material";
import { Rarity, TeyvatRegion } from "@/common/types";

/**
 * Regional local specialties like Philanemo Mushroom, Cor Lapis, Sea Ganoderma and so on
 */
export class LocalSpecialty extends Material {
  public static isLocalSpecialty(obj: any): obj is LocalSpecialty {
    return obj instanceof LocalSpecialty;
  }

  constructor(
    name: string,
    description: string,
    region: TeyvatRegion
  ) {
    super(name, description, region, Rarity.Common)
  }
}
export default LocalSpecialty;