import { Nullable, Rarity } from '@/common/types';
import Character from '../characters/Character';
import { CharacterArtifactSet } from '../characters/CharacterArtifactSet';
import Material from '../materials/Material';

export class ArtifactSet extends Material {
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
  ) {
    super(
      name, 
      `2-piece bonus: ${twoPieceSetDescription}\n4-piece bonus: ${fourPieceSetDescription}`, 
      undefined,
      rarity
    );
  }

  public includes(query: string): boolean {
    const keys = [
      this.name,
      this.twoPieceSetDescription,
      this.fourPieceSetDescription,
    ];
    return keys.some(key => key.toLowerCase().includes(query));
  }
}

export default ArtifactSet;