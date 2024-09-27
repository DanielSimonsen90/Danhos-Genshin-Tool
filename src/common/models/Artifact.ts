import { ArtifactPartName, MainStatMap, SubStatName } from "../types";
import type * as ArtifactSetData from "@/data/artifact-sets";

/**
 * Searchable artifact data.
 */
export class Artifact<Name extends ArtifactPartName> {
  constructor(
    public setName: keyof typeof ArtifactSetData,
    public part: Name,
    public mainStat: MainStatMap[Name],
    public subStats: SubStatName[]
  ) {}

  public toString(): string {
    return `${this.setName} ${this.part}`;
  }

  public isFlower(): this is Artifact<'Flower'> { return this.part === 'Flower'; }
  public isFeather(): this is Artifact<'Feather'> { return this.part === 'Feather'; }
  public isSands(): this is Artifact<'Sands'> { return this.part === 'Sands'; }
  public isGoblet(): this is Artifact<'Goblet'> { return this.part === 'Goblet'; }
  public isCirclet(): this is Artifact<'Circlet'> { return this.part === 'Circlet'; }
}

export default Artifact;