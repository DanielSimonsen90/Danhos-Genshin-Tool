import BaseMaterial from "../materials/BaseMaterial";

export abstract class Mob {
  constructor(
    public name: string,
    public description: string,
    public drops: Array<BaseMaterial>,
  ) {}
}

export default Mob;