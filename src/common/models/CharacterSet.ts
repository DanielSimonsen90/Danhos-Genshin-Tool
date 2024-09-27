import { AbilityType, CharacterSetName, TalentStatName } from "../types";
import { CharacterArtifactSet } from "./CharacterArtifactSet";

export class CharacterSet {
  constructor(
    public name: CharacterSetName,
    public talentStats: TalentStatName[],
    public favoredAbility: AbilityType,
    public onField: boolean,
    public artifactSets: CharacterArtifactSet[],
  ) {}
}

export default CharacterSet;