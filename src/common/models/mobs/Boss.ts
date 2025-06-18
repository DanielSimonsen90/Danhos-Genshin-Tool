import { Region, ResinCost } from "@/common/types";
import BaseMaterial from "../materials/BaseMaterial";
import Mob from "./Mob";

export abstract class Boss extends Mob {
  constructor(
    name: string,
    description: string,
    public region: Region,
    drops: Array<BaseMaterial>,
    resinCost?: ResinCost,
  ) {
    super(name, description, drops);
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