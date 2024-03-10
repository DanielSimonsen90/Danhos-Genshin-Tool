import { CharacterArtifactSet } from "./CharacterArtifactSet";

export class CharacterSet {
  constructor(
    public name: string,
    public artifactSets: CharacterArtifactSet[]
  ) {}
}

export default CharacterSet;