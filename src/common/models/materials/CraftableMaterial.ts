import { Rarity, GenshinRegion } from "@/common/types";
import Material from "./Material";

export abstract class CraftableMaterial extends Material {
  public static isCraftableMaterial(obj: any): obj is CraftableMaterial {
    return obj instanceof CraftableMaterial;
  }

  public craftable: Craftable | undefined;
  public setCraftable(pieces: number, into: CraftableMaterial): this {
    this.craftable = { pieces, into };
    return this;
  }
  public getCraftingTree() {
    if (!this.craftable) return [];

    const tree: Craftable[] = [];
    let current: Craftable | undefined = this.craftable;

    while (current) {
      tree.push(current);
      current = current.into.craftable;
    }

    return tree;
  }
  public getCraftingTreeAsMaterials() {
    const remainder = this.getCraftingTree().map(craftable => craftable.into);
    return [this, ...remainder];
  }

  protected static createCraftableMaterial<T extends CraftableMaterial>(
    name: string,
    map: Partial<Record<Rarity, string>>,
    description: string,
    prependName: boolean,
    onCreate: (name: string, description: string, rarity: Rarity) => T
  ) {
    return Object
      .entries(map)
      .sort(([rarityA], [rarityB]) => Number(rarityA) - Number(rarityB))
      .reduce((acc, [rarity, prefix]) => {
        const materialName = prependName ? `${name} ${prefix}` : `${prefix} ${name}`;
        try {
          const material = onCreate(materialName, description, Number(rarity) as Rarity);
          if (!acc) return material;
          if (!acc.craftable) {
            acc.setCraftable(3, material);
            return acc;
          }

          let craftable = acc.craftable;
          while (craftable && craftable.into.craftable) craftable = craftable.into.craftable;
          craftable.into.setCraftable(3, material);
          return acc;
        } catch (error) {
          console.error(`Error creating material for ${materialName}:`, error);
        }

        return acc;
      }, undefined as T | undefined) as T;
  }
}
export default CraftableMaterial;

type Craftable = {
  pieces: number,
  into: CraftableMaterial,
};