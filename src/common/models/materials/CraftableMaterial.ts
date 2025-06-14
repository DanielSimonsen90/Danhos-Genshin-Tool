import BaseMaterial from "./BaseMaterial";

export abstract class CraftableMaterial extends BaseMaterial {
  public static isCraftableMaterial(obj: any): obj is CraftableMaterial {
    return obj instanceof CraftableMaterial;
  }

  public craftable: Craftable;
  public setCraftable(pieces: number, into: BaseMaterial): this {
    this.craftable = { pieces, into };
    return this;
  }
}
export default CraftableMaterial;

type Craftable = {
  pieces: number,
  into: BaseMaterial,
}