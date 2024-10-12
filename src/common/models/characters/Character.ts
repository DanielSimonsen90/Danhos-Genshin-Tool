import { Element, Weapon, BonusAbility, Rarity } from '@/common/types';
import CharacterSet from './CharacterSet';

export class Character {
  constructor(
    public name: string,
    public element: Element,
    public weapon: Weapon,
    public bonusAbility: BonusAbility,
    public rarity: Rarity,
    public sets: CharacterSet[],
  ) {}

  public needsHP(): boolean { return this.sets.some(set => set.talentStats.includes('HP')); }
  public needsATK(): boolean { return this.sets.some(set => set.talentStats.includes('ATK')); }
  public needsDEF(): boolean { return this.sets.some(set => set.talentStats.includes('DEF')); }
  public needsER(): boolean { return this.sets.some(set => set.talentStats.includes('Energy Recharge')); }
  public needsEM(): boolean { return this.sets.some(set => set.talentStats.includes('Elemental Mastery')); }
}

export default Character;