import { Nullable, Rarity } from '@/common/types';
import Character from '../characters/Character';
import { CharacterArtifactSet } from '../characters/CharacterArtifactSet';

export class ArtifactSet {
  public static isArtifactSet(obj: any): obj is ArtifactSet {
    return obj instanceof ArtifactSet;
  }
  
  public static bonusDescription(set: ArtifactSet, pieces: number): Nullable<string> {
    return (
      pieces < 2 ? null :
      pieces < 4 ? set.twoPieceSetDescription :
      set.fourPieceSetDescription
    );
  }
  constructor(
    public name: string,
    public twoPieceSetDescription: string,
    public fourPieceSetDescription: string,
    public rarity: Rarity,
    public domainNames: string[],
    public isCraftable: boolean,
    public checkIsGood: (character: Character, set: CharacterArtifactSet) => number
  ) { }
}

export default ArtifactSet;