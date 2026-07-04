import { TeyvatRegion, ResinCost } from "@/common/types/genshin";
import { Domain } from "./Domain";
import { DomainType } from "../Model";

/**
 * Domain for artifacts
 */
export class DomainOfBlessing extends Domain {
  public static isDomainBlessing(obj: any): obj is DomainOfBlessing {
    return obj instanceof DomainOfBlessing;
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
    return 'Blessing';
  }
}

export default DomainOfBlessing;