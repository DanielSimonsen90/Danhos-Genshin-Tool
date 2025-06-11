import { Region, ResinCost } from "@/common/types/genshin";
import ArtifactSet from "../artifacts/ArtifactSet";
import { Domain } from "./Domain";

/**
 * Domain for artifacts
 */
export class DomainOfBlessing extends Domain<ArtifactSet> {
  public static isDomainOfBlessing(obj: any): obj is DomainOfBlessing {
    return obj instanceof DomainOfBlessing;
  }
  constructor(
    public name: string,
    public description: string,
    public region: Region,
  ) {
    super(name, description, ResinCost.Twenty, region);
  }

  public isBlessing(): this is DomainOfBlessing { return true; }
}

export default DomainOfBlessing;