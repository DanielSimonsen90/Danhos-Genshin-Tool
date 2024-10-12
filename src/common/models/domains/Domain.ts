import { ResinCost } from "@/common/types";
import ArtifactSet from "../artifacts/ArtifactSet";

export abstract class Domain<TDrop> {
  constructor(
    public name: string,
    public description: string,
    public resinCost: ResinCost,
  ) {}
}

export class DomainOfBlessing extends Domain<ArtifactSet> {
  constructor(
    public name: string,
    public description: string,
  ) {
    super(name, description, ResinCost.Twenty);
  }
}