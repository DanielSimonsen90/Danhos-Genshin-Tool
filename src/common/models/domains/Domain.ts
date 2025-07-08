import type { Region, ResinCost } from "@/common/types";
import type { DataStore } from "@/stores/DataStore/DataStoreTypes";

import type DomainOfBlessing from "./DomainOfBlessing";
import type DomainOfForgery from "./DomainOfForgery";
import type DomainOfMastery from "./DomainOfMastery";
import { DomainReward, DomainType } from "../Model";

export abstract class Domain<TReward extends DomainReward> {
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
    if (this.isMastery()) return DataStore.getTalentAscensionMaterialsFromDomain(this.name) as any as TReward[];
    if (this.isForgery()) return DataStore.getWeaponAscensionMaterialsFromDomain(this.name) as any as TReward[];
    console.error('Domain.getRewards() not implemented for', this);
    return [];
  }
  public getDomainType(): DomainType {
    if (this.isBlessing()) return 'Blessing';
    if (this.isMastery()) return 'Mastery';
    if (this.isForgery()) return 'Forgery';
    throw new Error(`getDomainType() not implemented for ${this.name}`);
  }

  public isBlessing(): this is DomainOfBlessing { return false; }
  public isMastery(): this is DomainOfMastery { return false; }
  public isForgery(): this is DomainOfForgery { return false; }
}
