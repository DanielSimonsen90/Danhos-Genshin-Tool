import type { TeyvatRegion, ResinCost } from "@/common/types";
import { DomainType, ModelKeys } from "../Model";


export abstract class Domain {
  public static isDomain(obj: any): obj is Domain {
    return obj instanceof Domain;
  }

  constructor(
    public name: string,
    public description: string,
    public leyLineDisorder: Record<number, string>,
    public resinCost: ResinCost,
    public region: TeyvatRegion,
  ) {}

  public abstract getDomainType(): DomainType;

  public getModelKey(): ModelKeys {
    return 'Domain';
  }
}
