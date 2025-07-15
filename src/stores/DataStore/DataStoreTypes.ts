import { ArtifactSet, Character, Domain, TalentAscensionMaterial, WeaponAscensionMaterial, Material, Mob, Model, ModelKeys, Boss, CharacterSet, CharacterArtifactSet } from '@/common/models';
import type { DataStoreContent } from './DataStoreConstants';
import ModelType from './ModelType';
import { Weapon } from '@/common/models/weapon';

export type CharacterUsingArtifactResult = {
  character: Character;
  set: CharacterSet;
  pieces: CharacterArtifactSet['pieces'];
  effectiveness: CharacterArtifactSet['effectiveness'];
};


export type DataStoreModelCollections = Extract<
  keyof typeof DataStoreContent,
  'Characters' | 'Artifacts' | 'Domains'
>;
export type DataStore = typeof DataStoreContent & {
  findCharacterByName: (name: string) => Character | undefined;
  findArtifactByName: (name: string) => ArtifactSet | undefined;
  findDomainByName: (name: string) => Domain<any> | undefined;
  findMobByName: (name: string) => Mob | undefined;
  findMaterialByName: (name: string) => Material | undefined;
  findWeaponByName: (name: string) => Weapon | undefined;

  getDomainsFromArtifact: (artifactName: string) => Domain<any>[] | undefined;
  getArtifactsFromDomain: (domainName: string) => ArtifactSet[] | undefined;
  getTalentAscensionMaterialsFromDomain: (domainName: string) => TalentAscensionMaterial[] | undefined;
  getWeaponAscensionMaterialsFromDomain: (domainName: string) => WeaponAscensionMaterial[] | undefined;

  getModelKeysUsingMaterial: (materialName: string) => ModelKeys[];
  getCharactersUsingMaterial: (materialName: string) => Character[];
  getWeaponsUsingMaterial: (materialName: string) => Weapon[];

  getMobsDroppingMaterial: (materialName: string) => Mob[];
  getDomainDroppingMaterial: (materialName: string) => Domain<any>;

  getDomainsFromMaterial: (material: Material) => Domain<any>[];
  getBossesFromMaterial: (material: Material) => Boss[];

  getCharactersUsingArtifact: (artifactName: string) => CharacterUsingArtifactResult[];
  getSignatureWeaponFor(character: Character): Weapon | undefined;

  getModelType: <TModel extends Model>(model: TModel) => ModelType<TModel>;

  // Cache management
  clearCache: () => void;
};
