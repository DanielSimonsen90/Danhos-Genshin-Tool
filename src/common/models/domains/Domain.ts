import { Region, ResinCost } from "@/common/types";
import ArtifactSet from "../artifacts/ArtifactSet";
import { DataStoreContext } from "@/stores/DataStore/DataStoreTypes";

export abstract class Domain<TReward> {
  constructor(
    public name: string,
    public description: string,
    public resinCost: ResinCost,
    public region: Region,
  ) {}

  public getRewards(dataStore: DataStoreContext): TReward[] {
    if (this.isBlessing()) return dataStore.getArtifactsFromDomain(this.name) as any as TReward[];
    console.error('Domain.getRewards() not implemented for', this);
    return [];
  }

  public isBlessing(): this is DomainOfBlessing {
    return this instanceof DomainOfBlessing;
  }
}

export class DomainOfBlessing extends Domain<ArtifactSet> {
  constructor(
    public name: string,
    public description: string,
    public region: Region,
  ) {
    super(name, description, ResinCost.Twenty, region);
  }
}