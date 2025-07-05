import { 
  Model, 
  Character, 
  ArtifactSet, 
  Domain, DomainOfBlessing, DomainOfForgery, DomainOfMastery, 
  Mob, EasyMob, EliteMob,
  Boss, WorldBoss, WeeklyBoss,
  Material,
} from "@/common/models";

export class ModelType<TModel extends Model> {
  constructor(public model: TModel) {}

  public isCharacter(): this is ModelType<Character> {
    return Character.isCharacter(this.model);
  }
  public isArtifact(): this is ModelType<ArtifactSet> {
    return ArtifactSet.isArtifactSet(this.model);
  }

  // #region Domain
  public isDomain(): this is ModelType<Domain<any>> {
    return Domain.isDomain(this.model);
  }
  public isBlessingDomain(): this is ModelType<DomainOfBlessing> {
    return Domain.isDomain(this.model) && this.model.isBlessing();
  }
  public isForgeryDomain(): this is ModelType<DomainOfForgery> {
    return Domain.isDomain(this.model) && this.model.isForgery();
  }
  public isMasteryDomain(): this is ModelType<DomainOfMastery> {
    return Domain.isDomain(this.model) && this.model.isMastery();
  }
  // #endregion Domain

  // #region Mob
  public isMob(): this is ModelType<Mob> {
    return Mob.isMob(this.model);
  }
  public isEasyMob(): this is ModelType<EasyMob> {
    return EasyMob.isEasyMob(this.model);
  }
  public isEliteMob(): this is ModelType<EliteMob> {
    return EliteMob.isEliteMob(this.model);
  }
  // #endregion Mob

  // #region Boss
  public isBoss(): this is ModelType<Boss> {
    return Boss.isBoss(this.model);
  }
  public isWorldBoss(): this is ModelType<WorldBoss> {
    return WorldBoss.isWorldBoss(this.model);
  }
  public isWeeklyBoss(): this is ModelType<WeeklyBoss> {
    return WeeklyBoss.isWeeklyBoss(this.model);
  }
  // #endregion Boss

  // #region Material
  public isMaterial(): this is ModelType<Material> {
    return Material.isMaterial(this.model);
  }
}

export default ModelType;