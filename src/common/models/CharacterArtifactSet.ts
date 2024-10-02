import ArtifactSet from "./ArtifactSet";

export class CharacterArtifactSet {
  public static MOST_EFFECTIVE = 5;
  public static LEAST_EFFECTIVE = 1;
  constructor(
    public set: ArtifactSet,
    public pieces: number,
    /** How effective/likely should you use this artifact set. Scale 1 - 5 */
    public effectiveness: number
  ) {}
}