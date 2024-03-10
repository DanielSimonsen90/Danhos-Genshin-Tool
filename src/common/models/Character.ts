import { TalentStatName } from '../../types';
import CharacterSet from './CharacterSet';

export class Character {
  constructor(
    public name: string,
    public sets: CharacterSet[],
    public talentStat: TalentStatName
  ) {}
}

export default Character;