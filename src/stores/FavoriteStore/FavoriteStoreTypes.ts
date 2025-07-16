import { ArtifactSet, Character, Domain, Mob, Weapon } from "@/common/models";
import Material from "@/common/models/materials/Material";

export type FavoriteStore = ModelsCollection & {
  add: <T extends keyof FavoriteModels>(type: T, item: FavoriteModels[T]) => void;
  remove: <T extends keyof FavoriteModels>(type: T, item: FavoriteModels[T]) => void;
  isFavorite: <T extends keyof FavoriteModels>(type: T, item: FavoriteModels[T]) => boolean;

  getAll: () => ModelsCollection;
  hasAnyFavorites(): boolean;
  clear: () => void;
}

export type ModelsCollection = {
  [Key in keyof FavoriteModels]: Array<FavoriteModels[Key]>;
}
export type FavoriteModel = Character | ArtifactSet | Domain<any> | Material | Weapon | Mob;

export type FavoriteModels = {
  characters: Character;
  artifacts: ArtifactSet;
  domains: Domain<any>;
  mobs: Mob;
  materials: Material;
  weapons: Weapon;
}