import ArtifactSet from "../artifacts/ArtifactSet";

export class CharacterArtifactSet {
  public static MOST_EFFECTIVE = 5;
  public static LEAST_EFFECTIVE = 1;
  constructor(
    public set: ArtifactSet,
    public pieces: 2 | 4,
    /** How effective/likely should you use this artifact set. Scale 1 - 5 */
    public effectiveness: 1 | 2 | 3 | 4 | 5,
  ) {}
}