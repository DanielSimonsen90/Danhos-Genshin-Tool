import { Percentage, Rarity, WeaponStatName, WeaponType } from "../types";
import Character from "./characters/Character";

type WeaponDroppedBy = 'Battle Pass' | 'Chest' | 'Crafting' | 'Event' | 'Quest' | 'Starglitter Exchange' | 'Fishing' | 'Vendor' | 'Wish';
type SecondaryStatValue<TWeaponStatName extends WeaponStatName> =
  TWeaponStatName extends 'Elemental Mastery'
  ? number
  : Percentage<number>;

export class Weapon<TWeaponStatName extends WeaponStatName = WeaponStatName> {
  constructor(
    public name: string,
    public description: {
      value: string;
      refinements: Array<string>
    },
    public type: WeaponType,
    public rarity: Rarity,
    public baseAttack: number,
    public secondaryStat: TWeaponStatName | undefined,
    secondaryStatValue: number | undefined,
    public droppedBy: WeaponDroppedBy,
    public signatureWeaponFor?: (data: typeof import('@/data/characters')) => Character | undefined
  ) {
    this.secondaryStatValue = (
      secondaryStat ? secondaryStat === 'Elemental Mastery'
        ? secondaryStatValue
        : `${secondaryStatValue}%`
        : undefined
    ) as SecondaryStatValue<TWeaponStatName>;
  }

  public secondaryStatValue: SecondaryStatValue<TWeaponStatName> | undefined;
}

export default Weapon;