import Material from "../materials/Material";
import { Berserker, Instructor, TheExile, TravelingDoctor } from "../../../data/artifact-sets";
import { ModelKeys } from "../Model";

export type MobType = 'easy' | 'elite' | 'weekly-boss' | 'world-boss';

export abstract class Mob {
  public static isMob(mob: any): mob is Mob {
    return mob instanceof Mob;
  }
  
  constructor(
    public name: string,
    public description: string,
    public drops: Array<Material>,
  ) {}

  public getModelKey(): ModelKeys {
    return 'Mob'
  }
}

export default Mob;

export class EasyMob extends Mob {
  public static isEasyMob(mob: any): mob is EasyMob {
    return mob instanceof EasyMob;
  }
}
export class EliteMob extends Mob {
  public static isEliteMob(mob: any): mob is EliteMob {
    return mob instanceof EliteMob;
  }

  constructor(
    name: string, 
    description: string, 
    drops: Array<Material>
  ) {
    super(name, description, drops);
    this.drops.push(
      Berserker, Instructor, TheExile, TravelingDoctor
    )
  }
}