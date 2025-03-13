import BaseMaterial from "./BaseMaterial";

export abstract class CraftableMaterial<TObtainableFrom> extends BaseMaterial<TObtainableFrom> {
  public static isCraftableMaterial<TObtainableFrom = any>(obj: any): obj is CraftableMaterial<TObtainableFrom> {
    return obj instanceof CraftableMaterial;
  }

  public craftable: Craftable;
  public setCraftable(pieces: number, into: BaseMaterial<TObtainableFrom>): this {
    this.craftable = { pieces, into };
    return this;
  }
}
export default CraftableMaterial;

type Craftable = {
  pieces: number,
  into: BaseMaterial<any>,
}