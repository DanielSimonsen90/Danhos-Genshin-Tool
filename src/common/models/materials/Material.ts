import { Rarity, GenshinRegion } from "@/common/types";
import { ModelKeys } from "../Model";

export abstract class Material {
  public static isMaterial(obj: any): obj is Material {
    return obj instanceof Material;
  }
  constructor(
    public name: string,
    public description: string,
    public region: GenshinRegion | undefined,
    public rarity: Rarity
  ) {}

  public getModelKey(): ModelKeys {
    return 'Material'
  }
}

export default Material;