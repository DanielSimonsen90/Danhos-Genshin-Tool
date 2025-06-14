import { Region, ResinCost } from "@/common/types";
import MobDrop from "../materials/MobDrop";
import BaseMaterial from "../materials/BaseMaterial";

export abstract class Boss {
  constructor(
    public name: string,
    public description: string,
    public region: Region,
    public drops: Array<BaseMaterial>,
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
    drops: Array<BaseMaterial>,
  ) {
    super(name, description, region, drops, ResinCost.Forty);
  }
}
export class WeeklyBoss extends Boss {
  constructor(
    name: string,
    description: string,
    region: Region,
    drops: Array<BaseMaterial>,
  ) {
    super(name, description, region, drops);
    this.resinCosts.push(
      ResinCost.Thirty,
      ResinCost.Sixty,
    )
  }
}