import ArtifactSet from "./ArtifactSet";

export class CharacterArtifactSet {
  constructor(
    public set: ArtifactSet,
    public pieces: number,
    /** How effective/likely should you use this artifact set */
    public effectiveness: number
  ) {}

  public bonusDescription(): string {
    return this.set.bonusDescription(this.pieces);
  }
}