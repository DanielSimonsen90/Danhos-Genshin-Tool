import { Rarity, Region } from "@/common/types";

export abstract class BaseMaterial<TObtainableFrom> {
  public static isMaterial(obj: any): obj is BaseMaterial<any> {
    return obj instanceof BaseMaterial;
  }
  constructor(
    public name: string,
    public description: string,
    public region: Region | undefined,
    public rarity: Rarity,
    public obtainableFrom: Array<TObtainableFrom>
  ) {}
}

export default BaseMaterial;