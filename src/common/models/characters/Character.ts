import { Element, Weapon, BonusAbility, Rarity, Region } from '@/common/types';
import CharacterSet from './CharacterSet';

export class Character {
  public static isCharacter(obj: any): obj is Character {
    return obj instanceof Character;
  }

  constructor(
    public name: string,
    public element: Element,
    public weapon: Weapon,
    public bonusAbilities: Array<BonusAbility>,
    public rarity: Rarity,
    public region: Region,
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