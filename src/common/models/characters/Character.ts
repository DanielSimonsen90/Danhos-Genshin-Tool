import { Element, WeaponType, BonusAbility, Rarity, TeyvatRegion, PassiveTalent, BonusAbilitySimple, Reaction, TriggerableReactionFilter } from '@/common/types';
import CharacterPlaystyle from './CharacterPlaystyle';
import CharacterAscension from './CharacterAscension';
import { ModelKeys } from '../Model';
import { ElementalReactionMemoizeService, ElementalReactions, TriggerableReactions } from '@/common/constants/genshin';

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
  
  /** @deprecated - use playstyle.needsStat('HP') */
  public needsHP(): boolean { return this.playstyle?.talentStats.includes('HP') ?? false; }
  /** @deprecated - use playstyle.needsStat('ATK') */
  public needsATK(): boolean { return this.playstyle?.talentStats.includes('ATK') ?? false; }
  /** @deprecated - use playstyle.needsStat('DEF') */
  public needsDEF(): boolean { return this.playstyle?.talentStats.includes('DEF') ?? false; }
  /** @deprecated - use playstyle.needsStat('Energy Recharge') */
  public needsER(): boolean { return this.playstyle?.talentStats.includes('Energy Recharge') ?? false; }
  /** @deprecated - use playstyle.needsStat('Elemental Mastery') */
  public needsEM(): boolean { return this.playstyle?.talentStats.includes('Elemental Mastery') ?? false; }
  /** @deprecated - use playstyle.needsStat('Physical DMG Bonus') */
  public needsPhysicalDMG(): boolean { return this.playstyle?.talentStats.includes('Physical DMG Bonus') ?? false; }
  
  public can(...bonusAbilities: Array<BonusAbilitySimple>): boolean { 
    return bonusAbilities.some(ability => 
      this.bonusAbilities.some(bonusAbility => 
        bonusAbility.toString().includes(ability)
      )
    ); 
  }

  public canTrigger(filter: TriggerableReactionFilter, ...reactions: Reaction[]) {
    const triggerableReactions = this.getTriggerableReactions(filter);
    return reactions.some(reaction => triggerableReactions.includes(reaction));
  }

  public getTriggerableReactions(filter: TriggerableReactionFilter) {
    const triggerableReactions = ElementalReactionMemoizeService.memoize(() => (
      Object
      .entries(TriggerableReactions)
      .filter(([_, elements]) => elements.includes(this.element))
      .map(([reaction]) => reaction as Reaction)
    ), [this.element, filter]);

    if (filter === 'all' || !this.playstyle) return triggerableReactions;

    const isReactionLimited = ElementalReactions.some(reaction => (
      this.playstyle?.name.includes(reaction)
    ));

    if (this.name === 'Kinich') console.log({ 
      isReactionLimited, 
      result: triggerableReactions.filter(reaction => (
        this.playstyle?.name.includes(reaction)
      ))
    });

    if (isReactionLimited) return triggerableReactions.filter(reaction => (
      this.playstyle?.name.includes(reaction)
    ));

    return triggerableReactions;
  }

  public getModelKey(): ModelKeys {
    return 'Character'
  }
}

export default Character;