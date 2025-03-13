import CraftableMaterial from "./CraftableMaterial";
type Mob = any; // TODO

/**
 * Drops like nectar, insignia, slime and so on
 */
export class MobDrop extends CraftableMaterial<Mob> {
  public static isMobDrop(obj: any): obj is MobDrop {
    return obj instanceof MobDrop;
  }
}
export default MobDrop;