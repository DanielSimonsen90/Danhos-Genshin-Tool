import { TalentStatName, AbilityType } from '../../types';
import CharacterSet from './CharacterSet';

export class Character {
  constructor(
    public name: string,
    public sets: CharacterSet[],
    public talentStat: TalentStatName,
    public favoredAbility: AbilityType
  ) {}
}

export default Character;