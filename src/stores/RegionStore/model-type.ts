import {
  Character, ArtifactSet, Domain,
  Mob, Material, Weapon,
  Model
} from "../../common/models";
import { FavoriteModels } from "./RegionStoreTypes";

// Type-safe mapping of model classes to their favorite store keys
const MODEL_TYPE_CHECKERS: Array<{
  key: keyof FavoriteModels;
  checker: (model: Model) => boolean;
}> = [
    { key: 'characters', checker: Character.isCharacter },
    { key: 'artifacts', checker: ArtifactSet.isArtifactSet },
    { key: 'domains', checker: Domain.isDomain },
    { key: 'mobs', checker: Mob.isMob },
    { key: 'materials', checker: Material.isMaterial },
    { key: 'weapons', checker: Weapon.isWeapon },
  ];

export function getModelType(model: Model): keyof FavoriteModels {
  for (const { key, checker } of MODEL_TYPE_CHECKERS) {
    if (checker(model)) return key;
  }

  throw new Error(`Unknown model type: ${(model as any).constructor.name}`);
}
