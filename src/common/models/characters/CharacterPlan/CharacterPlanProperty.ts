import CollectableMaterial from "./CollectableMaterial";

export type AscensionPhase = 1 | 2 | 3 | 4 | 5 | 6;
export type GetAscensionPhaseFunction = () => AscensionPhase;

export default class CharacterPlanProperty {
  constructor(
    public plannedValue: number,
    public materials: Array<CollectableMaterial>,
    public value: number
  ) { }

  public getAscensionPhase: GetAscensionPhaseFunction | undefined;

  public isCompleted(): boolean {
    return this.value >= this.plannedValue;
  }
  public canAscend(): boolean {
    // this.plan.level.value >= this.value?
    return false;
  }
}
