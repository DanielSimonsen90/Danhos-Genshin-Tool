import { AbilityType, CharacterSetName as CharacterPlaystyleName, TalentStatName } from "@/common/types";
import { CharacterArtifactSet } from "./CharacterArtifactSet";

export class CharacterPlaystyle {
  constructor(
    public name: CharacterPlaystyleName,
    public talentStats: TalentStatName[],
    public talentPriorities: AbilityType[],
    public onField: boolean,
    public recommendedArtifactSets: CharacterArtifactSet[],
  ) {}
}

export default CharacterPlaystyle;