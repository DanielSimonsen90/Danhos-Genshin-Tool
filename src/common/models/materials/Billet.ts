import { Rarity, Region } from "@/common/types";
import Material from "./Material";

export class Billet extends Material {
  public static isBillet(obj: any): obj is Billet {
    return obj instanceof Billet;
  }

  constructor(
    public name: string,
    public description: string,
    public regions: Array<Region>,
  ) {
    super(name, description, undefined, Rarity.Epic);
  }
}