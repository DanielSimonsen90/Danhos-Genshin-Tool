import ArtifactSet from "../artifacts/ArtifactSet";

export class CharacterArtifactSet {
  constructor(
    public set: ArtifactSet,
    public pieces: 2 | 4,
    public effectiveness: number
  ) {}
}