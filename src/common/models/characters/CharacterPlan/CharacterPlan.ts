import CharacterArtifactPlan from "./CharacterArtifactPlan";
import CharacterLevel from "./CharacterLevel";
import { GetAscensionPhaseFunction } from "./CharacterPlanProperty";
import CharacterTalents from "./CharacterTalents";
import CharacterWeapon from "./CharacterWeapon";

export default class CharacterPlan {
    constructor(
    public characterName: string,
    public level: CharacterLevel,
    public weapon: CharacterWeapon,
    public artifacts: CharacterArtifactPlan,
    public talents: CharacterTalents
  ) {
    const getAscensionPhase = this.getAscensionPhase.bind(this) as GetAscensionPhaseFunction;
    this.level.getAscensionPhase = getAscensionPhase;
    this.weapon.getAscensionPhase = getAscensionPhase;
    this.talents.setGetAscensionPhase(getAscensionPhase);
  }

  public getAscensionPhase(): number {
    return this.level.ascension;
  }

  public isCompleted(): boolean {
    return [
      this.level,
      this.weapon,
      this.artifacts,
      this.talents
    ].every(item => item.isCompleted());
  }
}
