import { BaseMaterial } from "./BaseMaterial";
import { Rarity, Region } from "@/common/types";
type Wild = any; // TODO

/**
 * Regional local specialties like Philanemo Mushroom, Cor Lapis, Sea Ganoderma and so on
 */
export class LocalSpecialty extends BaseMaterial<Wild> {
  public static isLocalSpecialty(obj: any): obj is LocalSpecialty {
    return obj instanceof LocalSpecialty;
  }

  constructor(
    name: string,
    description: string,
    region: Region
  ) {
    super(name, description, region, Rarity.Common, [region])
  }
}
export default LocalSpecialty;