import { Element, WeaponType, BonusAbility, Rarity, Region } from '@/common/types';
import CharacterSet from './CharacterSet';
import CharacterAscension from './CharacterAscension';

export class Character<TElement extends Element = Element> {
  public static isCharacter(obj: any): obj is Character {
    return obj instanceof Character;
  }

  constructor(
    public name: string,
    public element: TElement,
    public weapon: WeaponType,
    public bonusAbilities: Array<BonusAbility>,
    public rarity: Rarity,
    public region: Region,
    public ascencion: CharacterAscension<TElement>,
    public sets: CharacterSet[],
  ) {}

  public needsHP(): boolean { return this.sets.some(set => set.talentStats.includes('HP')); }
  public needsATK(): boolean { return this.sets.some(set => set.talentStats.includes('ATK')); }
  public needsDEF(): boolean { return this.sets.some(set => set.talentStats.includes('DEF')); }
  public needsER(): boolean { return this.sets.some(set => set.talentStats.includes('Energy Recharge')); }
  public needsEM(): boolean { return this.sets.some(set => set.talentStats.includes('Elemental Mastery')); }
  public needsPhysicalDMG(): boolean { return this.sets.some(set => set.talentStats.includes('Physical DMG Bonus')); }
  public canHeal(): boolean { return this.bonusAbilities.includes('Heal'); }
}

export default Character;