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

  public prioritizesTalents(...talentTypes: TalentType[]): boolean {
    const clone = [...this.talentPriorities];
    clone.pop(); // Least important - usually first is mandatory, second is good and third is unnecessary
    return talentTypes.some(talentType => clone.includes(talentType));
  }

  public needsStat(talentStat: TalentStatName): boolean {
    return this.talentStats.includes(talentStat);
  }
}

export default CharacterPlaystyle;