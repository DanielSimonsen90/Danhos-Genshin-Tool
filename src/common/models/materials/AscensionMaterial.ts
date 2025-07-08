import { Rarity, Region } from "@/common/types";
import { DomainOfMastery } from "../domains/";
import CraftableMaterial from "./CraftableMaterial";

type ObtainableDays = 'Monday/Thursday' | 'Tuesday/Friday' | 'Wednesday/Saturday';

class AscensionMaterial extends CraftableMaterial {
  public static isAscensionMaterial(obj: any): obj is AscensionMaterial {
    return obj instanceof AscensionMaterial;
  }

  protected constructor(
    name: string,
    description: string,
    region: Region,
    rarity: Rarity,
    public domain: DomainOfMastery,
    public obtainableDays: ObtainableDays
  ) {
    super(name, description, region, rarity);
  }

  public isObtainableToday(): boolean {
    const today = new Date().getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = dayNames[today];
    const obtainableDays = this.obtainableDays.split('/');
    return obtainableDays.includes(todayName);
  }
}
export default AscensionMaterial;

export class TalentAscensionMaterial extends AscensionMaterial {
  public static isTalentAscensionMaterial(obj: any): obj is TalentAscensionMaterial {
    return obj instanceof TalentAscensionMaterial;
  }

  public static create(name: string, description: string, region: Region, domain: DomainOfMastery, obtainableDays: ObtainableDays) {
    return super.createCraftableMaterial(
      name,
      {
        [Rarity.Uncommon]: 'Teachings of',
        [Rarity.Rare]: 'Guide to',
        [Rarity.Epic]: 'Philosophies of'
      },
      description,
      false,
      (name, description, rarity) => new TalentAscensionMaterial(
        name,
        description,
        region,
        rarity,
        domain,
        obtainableDays
      ));
  }
}
export class WeaponAscensionMaterial extends AscensionMaterial {
  public static isWeaponAscensionMaterial(obj: any): obj is WeaponAscensionMaterial {
    return obj instanceof WeaponAscensionMaterial;
  }

  public static create(name: string, description: string, region: Region, domain: DomainOfMastery, obtainableDays: ObtainableDays) {
    return super.createCraftableMaterial(
      name,
      {
        [Rarity.Uncommon]: 'Firm Arrowhead',
        [Rarity.Rare]: 'Sharp Arrowhead',
        [Rarity.Epic]: 'Weathered Arrowhead'
      },
      description,
      true,
      (name, description, rarity) => new WeaponAscensionMaterial(
        name,
        description,
        region,
        rarity,
        domain,
        obtainableDays
      ));
  }
}