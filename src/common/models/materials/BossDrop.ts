import { BaseMaterial } from "./BaseMaterial";
type WorldBoss = any; // TODO

/**
 * Drops specifically from bosses like Cleansing heart, Ring of Boreas, Dvalin's Claw and so on
 */
export class BossDrop extends BaseMaterial<WorldBoss> {
  public static isBossDrop(obj: any): obj is BossDrop {
    return obj instanceof BossDrop;
  }
}
export default BossDrop;