import { ArtifactPartName } from "@/common/types/genshin";
import Artifact from "../../artifacts/Artifact";

export default class CharacterArtifactPlan {
  constructor(
    public flower: CharacterArtifactPlanItem<'Flower'>,
    public feather: CharacterArtifactPlanItem<'Feather'>,
    public sands: CharacterArtifactPlanItem<'Sands'>,
    public goblet: CharacterArtifactPlanItem<'Goblet'>,
    public circlet: CharacterArtifactPlanItem<'Circlet'>,
  ) {}

  public isCompleted(): boolean {
    return [
      this.flower,
      this.feather,
      this.sands,
      this.goblet,
      this.circlet
    ].every(artifact => artifact.completed);
  }
}

export class CharacterArtifactPlanItem<TPartName extends ArtifactPartName> extends Artifact<TPartName> {
  constructor(
    artifact: Artifact<TPartName>,
    public mainStatValue: number,
    public subStatValues: number[],
  ) {
    super(artifact.setName, artifact.part, artifact.mainStat, artifact.subStats)
  }

  public completed: boolean;
}