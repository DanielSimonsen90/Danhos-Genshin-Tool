import { Nullable } from '../types';
import Character from './Character';
import { CharacterArtifactSet } from './CharacterArtifactSet';

export class ArtifactSet {
  constructor(
    public name: string,
    public twoPieceSetDescription: string,
    public fourPieceSetDescription: string,
    public checkIsGood: (character: Character, set: CharacterArtifactSet) => number
  ) {}

  public bonusDescription(pieces: number): Nullable<string> {
    return (
      pieces < 2 ? null :
      pieces < 4 ? this.twoPieceSetDescription :
      this.fourPieceSetDescription
    );
  }
}

export default ArtifactSet;