import { Rarity, Region } from "@/common/types";

export abstract class Material {
  public static isMaterial(obj: any): obj is Material {
    return obj instanceof Material;
  }
  constructor(
    public name: string,
    public description: string,
    public region: Region | undefined,
    public rarity: Rarity
  ) {}
}

export default Material;