import { Element, WeaponType, BonusAbility, Rarity, GenshinRegion, PassiveTalent } from '@/common/types';
import CharacterPlaystyle from './CharacterPlaystyle';
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
    public region: GenshinRegion,
    public ascension: CharacterAscension<TElement>,
    public passiveTalent: PassiveTalent | undefined,
    public playstyle: CharacterPlaystyle | undefined,
  ) {}

  public needsHP(): boolean { return this.playstyle.talentStats.includes('HP'); }
  public needsATK(): boolean { return this.playstyle.talentStats.includes('ATK'); }
  public needsDEF(): boolean { return this.playstyle.talentStats.includes('DEF'); }
  public needsER(): boolean { return this.playstyle.talentStats.includes('Energy Recharge'); }
  public needsEM(): boolean { return this.playstyle.talentStats.includes('Elemental Mastery'); }
  public needsPhysicalDMG(): boolean { return this.playstyle.talentStats.includes('Physical DMG Bonus'); }
  public canHeal(): boolean { return this.bonusAbilities.includes('Heal'); }
}

export default Character;