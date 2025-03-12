import { Model, Character, ArtifactSet, Domain, DomainOfBlessing } from "@/common/models";

export class ModelType<TModel extends Model> {
  constructor(public model: TModel) {}

  public isCharacter(): this is ModelType<Character> {
    return Character.isCharacter(this.model);
  }
  public isArtifact(): this is ModelType<ArtifactSet> {
    return ArtifactSet.isArtifactSet(this.model);
  }

  public isDomain(): this is ModelType<Domain<any>> {
    return Domain.isDomain(this.model);
  }
  public isBlessingDomain(): this is ModelType<DomainOfBlessing> {
    return Domain.isDomain(this.model) && this.model.isBlessing();
  }
}

export default ModelType;