import { TeyvatRegion, ResinCost } from "@/common/types/genshin";
import { Domain } from "./Domain";
import { DomainType } from "../Model";

/**
 * Domain for character ascension materials.
 */
export class DomainOfMastery extends Domain {
  public static isDomainMastery(obj: any): obj is DomainOfMastery {
    return obj instanceof DomainOfMastery;
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
    return 'Mastery';
  }
}

export default DomainOfMastery;