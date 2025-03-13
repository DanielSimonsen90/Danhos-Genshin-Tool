import { Region, ResinCost } from "@/common/types";
import { DataStore } from "@/stores/DataStore/DataStoreTypes";

import DomainOfBlessing from "./DomainOfBlessing";
import DomainOfForgery from "./DomainOfForgery";
import DomainOfMastery from "./DomainOfMastery";

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

  public isBlessing(): this is DomainOfBlessing { return this instanceof DomainOfBlessing; }
  public isMastery(): this is DomainOfMastery { return this instanceof DomainOfMastery; }
  public isForgery(): this is DomainOfForgery { return this instanceof DomainOfForgery; }
}
