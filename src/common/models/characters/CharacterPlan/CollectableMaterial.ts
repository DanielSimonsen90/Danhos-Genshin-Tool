import Material from "../../materials/Material";

export default class CollectableMaterial {
  constructor(
    public materialName: string,
    public ascensionCount: number,
    public count: number = 0
  ) {}
}
