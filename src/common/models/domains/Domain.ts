import { Region, ResinCost } from "@/common/types";
import ArtifactSet from "../artifacts/ArtifactSet";
import { DataStore } from "@/stores/DataStore/DataStoreTypes";

export abstract class Domain<TReward> {
  public static isDomain(obj: any): obj is Domain<any> {
    return obj instanceof Domain;
  }

  constructor(
    public name: string,
    public description: string,
    public resinCost: ResinCost,
    public region: Region,
  ) {}

  public getRewards(DataStore: DataStore): TReward[] {
    if (this.isBlessing()) return DataStore.getArtifactsFromDomain(this.name) as any as TReward[];
    console.error('Domain.getRewards() not implemented for', this);
    return [];
  }

  public isBlessing(): this is DomainOfBlessing {
    return this instanceof DomainOfBlessing;
  }
}

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
}