export const ROUTES = new class Routes {
  public data = 'data' as const;
  public data_characters = `${this.data}/characters` as const;
  public data_character = `${this.data_characters}/:characterName` as const;
  public data_artifacts = `${this.data}/artifacts` as const;
  public data_artifact = `${this.data_artifacts}/:artifactName` as const;
  public data_domains = `${this.data}/domains` as const;
  public data_domain = `${this.data_domains}/:domainName` as const;
  public data_weapons = `${this.data}/weapons` as const;
  public data_weapon = `${this.data_weapons}/:weaponName` as const;
  public data_materials = `${this.data}/materials` as const;
  public data_material = `${this.data_materials}/:materialName` as const;
  public data_mobs = `${this.data}/mobs` as const;
  public data_mob = `${this.data_mobs}/:mobName` as const;

  public building = 'building' as const;
  public building_priority_list = `${this.building}/priority-list` as const;
  public building_artifact_helper = `${this.building}/artifact-helper` as const;
  public building_artifact_helper_search = `${this.building_artifact_helper}/search/:query` as const;

  public building_plan = `${this.building}/plan` as const;

  public generator = 'generator' as const;
  public generator_teams = `${this.generator}/teams` as const;
  public generator_team_builder = `${this.generator}/team-builder` as const;
  public generator_character = `${this.generator}/character` as const;
  public generator_artifact = `${this.generator}/artifact` as const;

  public development = 'development' as const;

  public endRoute(route: keyof this) {
    const _route = this[route];
    if (!_route || typeof _route !== 'string') throw new Error(`Route ${route.toString()} not found`);
    return _route.split('/').pop();
  }
};
