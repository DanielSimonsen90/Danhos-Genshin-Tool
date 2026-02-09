import { Nullable, Rarity, StatName } from '@/common/types';
import Character from '../characters/Character';
import { CharacterArtifactSet } from '../characters/CharacterArtifactSet';
import Material from '../materials/Material';
import { ModelKeys } from '../Model';

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

  public includes(query: string | RegExp): boolean {
    const keys = [
      this.name,
      this.twoPieceSetDescription,
      this.fourPieceSetDescription,
    ];
    return keys.some(key => (
      typeof query === 'string'
        ? key.toLowerCase().includes(query.toLowerCase())
        : key.match(query) !== null
    ));
  }

  public doesStatIncrease(stat?: string) {
    return this.rarity > Rarity.Rare && this.includes(
      new RegExp(`${stat ?? '\\w+'}(?:\\s+\\((?:ult|ability)\\))?(?:\\s+(?:DMG|Bonus|Effectiveness|Strength))?\\s+\\+\\d+`, 'i')
    );
  }

  public getModelKey(): ModelKeys {
    return 'Artifact';
  }
}

export default ArtifactSet;