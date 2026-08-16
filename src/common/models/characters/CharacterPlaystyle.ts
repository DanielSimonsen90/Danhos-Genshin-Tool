import { TriggerableReactions } from "@/common/constants/genshin";
import { TalentType, CharacterSetName as CharacterPlaystyleName, TalentStatName, Reaction } from "@/common/types";
import { Character } from "..";
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

  public wantsToTrigger(character: Character, ...reactions: Array<Reaction>) {
    return reactions.some(reaction => {
      const isSwirl = reaction.includes('Swirl') && character.element === 'Anemo';
      const isCrystallize = reaction.includes('Crystallize') && character.element === 'Geo';

      return (
        this.name.includes(reaction)
        || isSwirl
        || isCrystallize
      );
    });
  }
}

export default CharacterPlaystyle;