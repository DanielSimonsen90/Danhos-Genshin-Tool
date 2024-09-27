import { ArtifactPartName } from "../../types";

/**
 * Searchable artifact data.
 */
export class Artifact {
  constructor(
    public displayName: string,
    public set: string,
    public part: ArtifactPartName,
    public mainStat: string,
    public subStats: string[]
  ) {}

  public toString(): string {
    return `${this.displayName} (${this.set} ${this.part})`;
  }
}

export default Artifact;