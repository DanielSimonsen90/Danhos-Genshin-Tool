import CharacterPlanProperty from "./CharacterPlanProperty";
import CollectableMaterial from "./CollectableMaterial";

export default class CharacterWeapon extends CharacterPlanProperty {
  constructor(
    public weaponName: string,
    plannedValue: number,
    materials: Array<CollectableMaterial>,
    value: number,
  ) {
    super(plannedValue, materials, value);
  }
}
