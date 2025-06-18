import { Rarity } from "@/common/types";
import CraftableMaterial from "./CraftableMaterial";

type MobDropCreationOptions<Rarities extends Rarity> = {
  prependName?: boolean;
  onCreate?: (name: string, description: string, rarity: Rarities) => MobDrop;
}

/**
 * Drops like nectar, insignia, slime and so on
 */
export class MobDrop extends CraftableMaterial {
  public static isMobDrop(obj: any): obj is MobDrop {
    return obj instanceof MobDrop;
  }

  public static create<Rarities extends Rarity>(
    name: string, 
    map: Record<Rarities, string>, 
    description: Record<Rarities, string>,
    options?: MobDropCreationOptions<Rarities>,
  ) {
    return super.createCraftableMaterial(
      name,
      map,
      '',
      options?.prependName,
      (name, _, rarity) => 
        options?.onCreate?.(name, description[rarity as Rarities], rarity as Rarities) 
        ?? new MobDrop(name, description[rarity as Rarities], undefined, rarity)
    );
  }
}
export default MobDrop;