import { TalentType, CharacterSetName as CharacterPlaystyleName, TalentStatName } from "@/common/types";
import { CharacterArtifactSet } from "./CharacterArtifactSet";

export class CharacterPlaystyle {
  constructor(
    public name: CharacterPlaystyleName,
    public talentStats: TalentStatName[],
    public talentPriorities: TalentType[],
    public onField: boolean,
    public recommendedArtifactSets: CharacterArtifactSet[],
  ) {}
}

export default CharacterPlaystyle;