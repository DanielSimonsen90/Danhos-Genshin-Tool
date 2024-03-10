import { TalentStatName, AbilityType, Element, Weapon, BonusAbility } from '../../types';
import CharacterSet from './CharacterSet';

export class Character {
  constructor(
    public name: string,
    public element: Element,
    public weapon: Weapon,
    public bonusAbility: BonusAbility,
    public onField: boolean,
    public sets: CharacterSet[],
    public talentStat: TalentStatName,
    public favoredAbility: AbilityType
  ) {}
}

export default Character;