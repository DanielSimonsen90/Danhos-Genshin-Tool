import { Rarity, Region } from "@/common/types";
import BaseMaterial from "./BaseMaterial";

export abstract class CraftableMaterial extends BaseMaterial {
  public static isCraftableMaterial(obj: any): obj is CraftableMaterial {
    return obj instanceof CraftableMaterial;
  }

  public craftable: Craftable | undefined;
  public setCraftable(pieces: number, into: CraftableMaterial): this {
    this.craftable = { pieces, into };
    return this;
  }

  protected static createCraftableMaterial<T extends CraftableMaterial>(
    name: string, 
    map: Partial<Record<Rarity, string>>,
    description: string, 
    prependName: boolean,
    onCreate: (name: string, description: string, rarity: Rarity) => T
  ) {
    return Object.entries(map).reduce((acc, [rarity, prefix]) => {
      const materialName = prependName ? `${name} ${prefix}` : `${prefix} ${name}`;
      const material = onCreate(materialName, description, rarity as any as Rarity);

      if (!acc) return material;
      else if (!acc.craftable) acc.setCraftable(3, material);
      else acc.craftable.into.setCraftable(3, material);

      return acc;
    }, undefined as T | undefined);
  }
}
export default CraftableMaterial;

type Craftable = {
  pieces: number,
  into: CraftableMaterial,
}