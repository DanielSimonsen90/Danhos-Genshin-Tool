import { Rarity, Region } from "@/common/types";
import { BaseMaterial } from "./BaseMaterial";
import { DomainOfMastery, DomainOfForgery } from "../domains/";
import CraftableMaterial from "./CraftableMaterial";

type ObtainableDays = 'Monday/Thursday' | 'Tuesday/Friday' | 'Wednesday/Saturday';
type AscensionMaterialTypes = 'Talent' | 'Weapon';
type ObtainableFrom = {
  Talent: DomainOfMastery,
  Weapon: DomainOfForgery,
};

class AscensionMaterial<T extends AscensionMaterialTypes> extends CraftableMaterial<ObtainableFrom[T]> {
  public static isAscensionMaterial(obj: any): obj is AscensionMaterial<AscensionMaterialTypes> {
    return obj instanceof AscensionMaterial;
  }
}
export default AscensionMaterial;

export class TalentAscensionMaterial extends AscensionMaterial<'Talent'> {
  public static create(name: string, description: string, region: Region, domain: DomainOfMastery, obtainableDays: ObtainableDays) {
    const prefixes = ['Teachings', 'Guide', 'Philosophies'];
    const rarities = [Rarity.Uncommon, Rarity.Rare, Rarity.Epic];

    const [teachings, guide, philosophies] = prefixes.map((prefix, index) => new TalentAscensionMaterial(
      `${prefix} of ${name}`,
      description,
      region,
      rarities[index],
      domain,
      obtainableDays
    ));

    teachings.setCraftable(3, guide);
    guide.setCraftable(3, philosophies);

    return { teachings, guide, philosophies };
  }

  private constructor(
    name: string, 
    description: string, 
    region: Region, 
    rarity: Rarity,
    public domain: DomainOfMastery, 
    public obtainableDays: ObtainableDays
  ) {
    super(name, description, region, rarity, [domain]);
  }
}
export class WeaponAscensionMaterial extends AscensionMaterial<'Weapon'> {}