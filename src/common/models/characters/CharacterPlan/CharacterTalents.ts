import CharacterPlanProperty, { GetAscensionPhaseFunction } from "./CharacterPlanProperty";

export default class CharacterTalents {
  constructor(
    public normal: CharacterPlanProperty,
    public skill: CharacterPlanProperty,
    public burst: CharacterPlanProperty
  ) {}

  public setGetAscensionPhase(getAscensionPhase: GetAscensionPhaseFunction): void {
    [this.normal, this.skill, this.burst].forEach(talent => {
      talent.getAscensionPhase = getAscensionPhase;
    });
  }

  public isCompleted(): boolean {
    return [
      this.normal,
      this.skill,
      this.burst
    ].every(item => item.isCompleted());
  }
}
