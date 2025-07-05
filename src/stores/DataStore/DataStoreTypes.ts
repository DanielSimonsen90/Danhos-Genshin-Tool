import { ArtifactSet, Character, Domain, TalentAscensionMaterial, WeaponAscensionMaterial, Material, Mob, Model, ModelKeys, Boss } from '@/common/models';
import type { DataStoreContent } from './DataStoreConstants';
import ModelType from './ModelType';

export type DataStore = typeof DataStoreContent & {
  findCharacterByName: (name: string) => Character | undefined;
  findArtifactByName: (name: string) => ArtifactSet | undefined;
  findDomainByName: (name: string) => Domain<any> | undefined;
  findMobByName: (name: string) => Mob | undefined;
  findMaterialByName: (name: string) => Material | undefined;

  getDomainsFromArtifact: (artifactName: string) => Domain<any>[] | undefined;
  getArtifactsFromDomain: (domainName: string) => ArtifactSet[] | undefined;
  getTalentAscensionMaterialsFromDomain: (domainName: string) => TalentAscensionMaterial[] | undefined;
  getWeaponAscensionMaterialsFromDomain: (domainName: string) => WeaponAscensionMaterial[] | undefined;

  getModelKeysUsingMaterial: (materialName: string) => ModelKeys[];
  getCharactersUsingMaterial: (materialName: string) => Character[];
  getMobsDroppingMaterial: (materialName: string) => Mob[];
  getDomainsFromMaterial: (material: Material) => Domain<any>[];
  getBossesFromMaterial: (material: Material) => Boss[];

  getModelType: <TModel extends Model>(model: TModel) => ModelType<TModel>;
}