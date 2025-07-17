import { Character } from "../models/characters/Character";
import { ArtifactSet } from "../models/artifacts/ArtifactSet";
import { Domain } from "../models/domains/Domain";
import { Mob } from "../models/mobs/Mob";
import { Material } from "../models/materials/Material";
import { Weapon } from "../models/weapon";
import { Model } from "../models/Model";
import { FavoriteModels } from "@/stores/FavoriteStore/FavoriteStoreTypes";

export function getModelType(model: Model): keyof FavoriteModels {
  if (Character.isCharacter(model)) return 'characters';
  if (ArtifactSet.isArtifactSet(model)) return 'artifacts';
  if (Domain.isDomain(model)) return 'domains';
  if (Mob.isMob(model)) return 'mobs';
  if (Material.isMaterial(model)) return 'materials';
  if (Weapon.isWeapon(model)) return 'weapons';
  
  throw new Error(`Unknown model type: ${(model as any).constructor.name}`);
}
