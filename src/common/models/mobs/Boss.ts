import { TeyvatRegion, ResinCost } from "@/common/types";
import Material from "../materials/Material";
import Mob from "./Mob";

export abstract class Boss extends Mob {
  public static isBoss(mob: any): mob is Boss {
    return mob instanceof Boss;
  }

  constructor(
    name: string,
    description: string,
    public region: TeyvatRegion,
    drops: Array<Material>,
    resinCost?: ResinCost,
  ) {
    super(name, description, drops);
    if (resinCost) this.resinCosts.push(resinCost);
  }

  public resinCosts: ResinCost[] = [];
}

export default Boss;

export class WorldBoss extends Boss {
  public static isWorldBoss(mob: any): mob is WorldBoss {
    return mob instanceof WorldBoss;
  }

  constructor(
    name: string,
    description: string,
    region: TeyvatRegion,
    drops: Array<Material>,
  ) {
    super(name, description, region, drops, ResinCost.Forty);
  }
}
export class WeeklyBoss extends Boss {
  public static isWeeklyBoss(mob: any): mob is WeeklyBoss {
    return mob instanceof WeeklyBoss;
  }

  constructor(
    name: string,
    description: string,
    region: TeyvatRegion,
    drops: Array<Material>,
  ) {
    super(name, description, region, drops);
    this.resinCosts.push(
      // ResinCost.Thirty,
      ResinCost.Sixty,
    )
  }
}