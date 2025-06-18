import { Rarity, Region } from "@/common/types";
import { DomainOfMastery } from "../domains/";
import CraftableMaterial from "./CraftableMaterial";

type ObtainableDays = 'Monday/Thursday' | 'Tuesday/Friday' | 'Wednesday/Saturday';

class AscensionMaterial extends CraftableMaterial {
  public static isAscensionMaterial(obj: any): obj is AscensionMaterial {
    return obj instanceof AscensionMaterial;
  }
}
export default AscensionMaterial;

export class TalentAscensionMaterial extends AscensionMaterial {
  public static create(name: string, description: string, region: Region, domain: DomainOfMastery, obtainableDays: ObtainableDays) {
    return super.createCraftableMaterial(
      name,
      {
        [Rarity.Uncommon]: 'Teachings of',
        [Rarity.Rare]: 'Guide of',
        [Rarity.Epic]: 'Philosophies of'
      },
      description,
      (name, description, rarity) => new TalentAscensionMaterial(
        name,
        description,
        region,
        rarity,
        domain,
        obtainableDays
      ));
  }

  private constructor(
    name: string,
    description: string,
    region: Region,
    rarity: Rarity,
    public domain: DomainOfMastery,
    public obtainableDays: ObtainableDays
  ) {
    super(name, description, region, rarity);
  }
}
export class WeaponAscensionMaterial extends AscensionMaterial { }