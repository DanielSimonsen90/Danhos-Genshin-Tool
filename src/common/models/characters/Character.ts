import { Element, WeaponType, BonusAbility, Rarity, GenshinRegion, PassiveTalent } from '@/common/types';
import CharacterPlaystyle from './CharacterPlaystyle';
import CharacterAscension from './CharacterAscension';
import { ModelKeys } from '../Model';

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
  ) {
    this.bonusAbilities = this.bonusAbilities.sort();
  }
  
  public needsHP(): boolean { return this.playstyle?.talentStats.includes('HP') ?? false; }
  public needsATK(): boolean { return this.playstyle?.talentStats.includes('ATK') ?? false; }
  public needsDEF(): boolean { return this.playstyle?.talentStats.includes('DEF') ?? false; }
  public needsER(): boolean { return this.playstyle?.talentStats.includes('Energy Recharge') ?? false; }
  public needsEM(): boolean { return this.playstyle?.talentStats.includes('Elemental Mastery') ?? false; }
  public needsPhysicalDMG(): boolean { return this.playstyle?.talentStats.includes('Physical DMG Bonus') ?? false; }
  public canHeal(): boolean { return this.bonusAbilities.includes('Heal'); }

  public getModelKey(): ModelKeys {
    return 'Character'
  }
}

export default Character;