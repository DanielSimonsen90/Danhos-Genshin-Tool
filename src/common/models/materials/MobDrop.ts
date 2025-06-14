import CraftableMaterial from "./CraftableMaterial";

/**
 * Drops like nectar, insignia, slime and so on
 */
export class MobDrop extends CraftableMaterial {
  public static isMobDrop(obj: any): obj is MobDrop {
    return obj instanceof MobDrop;
  }
}
export default MobDrop;