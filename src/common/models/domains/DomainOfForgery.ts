import { TeyvatRegion, ResinCost } from "@/common/types/genshin";
import { Domain } from "./Domain";
import { DomainType } from "../Model";

/**
 * Domain for weapon ascension materials.
 */
export class DomainOfForgery extends Domain {
  public static isDomainForgery(obj: any): obj is DomainOfForgery {
    return obj instanceof DomainOfForgery;
  }
  constructor(
    public name: string,
    public description: string,
    public leyLineDisorder: Record<number, string>,
    public region: TeyvatRegion,
  ) {
    super(name, description, leyLineDisorder, ResinCost.Twenty, region);
  }

  public getDomainType(): DomainType {
    return 'Forgery';
  }
}

export default DomainOfForgery;