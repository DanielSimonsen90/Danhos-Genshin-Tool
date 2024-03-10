import { Nullable } from '../../types';

export class ArtifactSet {
  constructor(
    public name: string,
    public twoPieceSetDescription: string,
    public fourPieceSetDescription: string
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