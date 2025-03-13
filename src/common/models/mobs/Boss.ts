import { Region, ResinCost } from "@/common/types";

export abstract class Boss {
  constructor(
    public name: string,
    public descriptin: string,
    public region: Region,
    resinCost?: ResinCost,
  ) {
    if (resinCost) this.resinCosts.push(resinCost);
  }

  public resinCosts: ResinCost[] = [];
}

export default Boss;

export class WorldBoss extends Boss {
  constructor(
    name: string,
    description: string,
    region: Region,
  ) {
    super(name, description, region, ResinCost.Forty);
  }
}
export class WeeklyBoss extends Boss {
  constructor(
    name: string,
    description: string,
    region: Region,
  ) {
    super(name, description, region);
    this.resinCosts.push(
      ResinCost.Thirty,
      ResinCost.Sixty,
    )
  }
}