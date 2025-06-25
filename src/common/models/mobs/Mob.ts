import BaseMaterial from "../materials/BaseMaterial";
import { Berserker, Instructor, TheExile, TravelingDoctor } from "../../../data/artifact-sets";

export abstract class Mob {
  constructor(
    public name: string,
    public description: string,
    public drops: Array<BaseMaterial>,
  ) {}
}

export default Mob;

export class EasyMob extends Mob {}
export class EliteMob extends Mob {
  constructor(
    name: string, 
    description: string, 
    drops: Array<BaseMaterial>
  ) {
    super(name, description, drops);
    this.drops.push(
      Berserker, Instructor, TheExile, TravelingDoctor
    )
  }
}