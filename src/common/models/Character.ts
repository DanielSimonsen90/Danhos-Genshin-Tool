import { Element, Weapon, BonusAbility } from '../../types';
import CharacterSet from './CharacterSet';

export class Character {
  constructor(
    public name: string,
    public element: Element,
    public weapon: Weapon,
    public bonusAbility: BonusAbility,
    public sets: CharacterSet[],
  ) {}
}

export default Character;