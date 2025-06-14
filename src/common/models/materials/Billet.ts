import { Rarity, Region } from "@/common/types";
import BaseMaterial from "./BaseMaterial";

export class Billet extends BaseMaterial {
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