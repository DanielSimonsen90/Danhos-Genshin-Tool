import { Nullable, Rarity } from '../types';
import Character from './Character';
import { CharacterArtifactSet } from './CharacterArtifactSet';

export class ArtifactSet {
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
    public checkIsGood: (character: Character, set: CharacterArtifactSet) => number
  ) { }
}

export default ArtifactSet;