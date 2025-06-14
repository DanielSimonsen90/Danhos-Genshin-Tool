import { Rarity, Region } from "@/common/types";

export abstract class BaseMaterial {
  public static isMaterial(obj: any): obj is BaseMaterial {
    return obj instanceof BaseMaterial;
  }
  constructor(
    public name: string,
    public description: string,
    public region: Region | undefined,
    public rarity: Rarity
  ) {}
}

export default BaseMaterial;