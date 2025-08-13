import { Rarity, GenshinRegion } from "@/common/types";

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
}

export default Material;