import { Element, WeaponType, BonusAbility, Rarity, TeyvatRegion, PassiveTalent, BonusAbilitySimple, Reaction } from '@/common/types';
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
    public region: TeyvatRegion,
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
  public can(bonusAbility: BonusAbilitySimple): boolean { return this.bonusAbilities.includes(bonusAbility as BonusAbility); }
  public canTrigger(...reactions: Reaction[]) {
    const anemoReactions: Reaction[] = ['Swirl'];
    const geoReactions: Reaction[] = ['Crystallize', 'Shatter', 'Lunar-Crystallize'];
    const cryoReactions: Reaction[] = ['Melt', 'Frozen', 'Shatter', 'Superconduct'];
    const dendroReactions: Reaction[] = ['Burning', 'Bloom', 'Burgeon', 'Hyperbloom', 'Quicken', 'Spread', 'Aggravate', 'Lunar-Bloom'];
    const electroReactions: Reaction[] = ['Overloaded', 'Electro-Charged', 'Lunar-Charged', 'Superconduct', 'Quicken', 'Spread', 'Aggravate', 'Hyperbloom'];
    const hydroReactions: Reaction[] = ['Vaporize', 'Electro-Charged', 'Lunar-Charged', 'Frozen', 'Shatter', 'Bloom', 'Burgeon', 'Hyperbloom', 'Lunar-Bloom', 'Lunar-Crystallize'];
    const pyroReactions: Reaction[] = ['Vaporize', 'Overloaded', 'Melt', 'Burning', 'Burgeon'];

    return (
      (this.element === 'Anemo' && anemoReactions.some(reaction => reactions.includes(reaction)))
      || (this.element === 'Geo' && geoReactions.some(reaction => reactions.includes(reaction)))
      || (this.element === 'Cryo' && cryoReactions.some(reaction => reactions.includes(reaction)))
      || (this.element === 'Dendro' && dendroReactions.some(reaction => reactions.includes(reaction)))
      || (this.element === 'Electro' && electroReactions.some(reaction => reactions.includes(reaction)))
      || (this.element === 'Hydro' && hydroReactions.some(reaction => reactions.includes(reaction)))
      || (this.element === 'Pyro' && pyroReactions.some(reaction => reactions.includes(reaction)))
    );
  }

  public getModelKey(): ModelKeys {
    return 'Character'
  }
}

export default Character;