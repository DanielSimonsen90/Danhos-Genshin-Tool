import Character from "./characters/Character";
import ArtifactSet from "./artifacts/ArtifactSet";
import { Domain } from './domains/Domain';
import { Mob } from './mobs/Mob';
import { Material as Material } from './materials/Material'
import { TalentAscensionMaterial, WeaponAscensionMaterial } from "./materials/AscensionMaterial";

export type Model = Character | ArtifactSet | Domain<any> | Mob | Material;
export type ModelKeys = 'Character' | 'Artifact' | 'Domain' | 'Mob' | 'Material';
export const ModelKeys: Array<ModelKeys> = ['Character', 'Artifact', 'Domain', 'Mob', 'Material'];

export type DomainType = 'Blessing' | 'Mastery' | 'Forgery';
export type DomainReward = ArtifactSet | TalentAscensionMaterial | WeaponAscensionMaterial;