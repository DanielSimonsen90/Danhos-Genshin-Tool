import { ArtifactSet, Character, Domain, TalentAscensionMaterial, WeaponAscensionMaterial, Material, Mob, Model, ModelKeys, Boss, CharacterArtifactSet } from '@/common/models';
import type { DataStoreContent } from './DataStoreConstants';
import ModelType from './ModelType';
import { Weapon } from '@/common/models/weapon';
import { TeyvatRegion } from '@/common/types';

export type CharacterUsingArtifactResult = {
  character: Character;
  cSet: CharacterArtifactSet
};


export type DataStoreModelCollections = Extract<
  keyof typeof DataStoreContent,
  'Characters' | 'Artifacts' | 'Domains'
>;
export type DataStore = typeof DataStoreContent & {
  // Find models by name
  findCharacterByName: (name: string) => Character | undefined;
  findArtifactByName: (name: string) => ArtifactSet | undefined;
  findDomainByName: (name: string) => Domain<any> | undefined;
  findMobByName: (name: string) => Mob | undefined;
  findMaterialByName: (name: string) => Material | undefined;
  findWeaponByName: (name: string) => Weapon | undefined;

  // Get linked models from other models
  getDomainsFromArtifact: (artifactName: string) => Domain<any>[] | undefined;
  getArtifactsFromDomain: (domainName: string) => ArtifactSet[] | undefined;
  getTalentAscensionMaterialsFromDomain: (domainName: string) => TalentAscensionMaterial[] | undefined;
  getWeaponAscensionMaterialsFromDomain: (domainName: string) => WeaponAscensionMaterial[] | undefined;
  getRegionsFromArtifact: (artifactName: string) => TeyvatRegion[] | undefined;

  // Get models using a material
  getModelKeysUsingMaterial: (materialName: string) => ModelKeys[];
  getCharactersUsingMaterial: (materialName: string) => Character[];
  getWeaponsUsingMaterial: (materialName: string) => Weapon[];

  // Get models dropping material
  getMobsDroppingMaterial: (materialName: string) => Mob[];
  getDomainDroppingMaterial: (materialName: string) => Domain<any> | undefined;

  // Get models from material
  getDomainsFromMaterial: (material: Material) => Domain<any>[];
  getBossesFromMaterial: (material: Material) => Boss[];

  // Get models that make use of other models
  getCharactersUsingArtifact: (artifactName: string) => CharacterUsingArtifactResult[];
  getSignatureWeaponFor(character: Character): Weapon | undefined;

  getModelType: <TModel extends Model>(model: TModel) => ModelType<TModel>;

  // Cache management
  clearCache: () => void;
};
