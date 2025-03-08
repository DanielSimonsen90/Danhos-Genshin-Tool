import { ArtifactSet, Character, Domain } from "@/common/models";

export type FavoriteStore = ModelsCollection & {
  add: <T extends keyof FavoriteModels>(type: T, item: FavoriteModels[T]) => void;
  remove: <T extends keyof FavoriteModels>(type: T, item: FavoriteModels[T]) => void;
  isFavorite: <T extends keyof FavoriteModels>(type: T, item: FavoriteModels[T]) => boolean;

  clear: () => void;
}

export type ModelsCollection = {
  [Key in keyof FavoriteModels]: Array<FavoriteModels[Key]>;
}
export type FavoriteModel = Character | ArtifactSet | Domain<any>;

export type FavoriteModels = {
  characters: Character;
  artifacts: ArtifactSet;
  domains: Domain<any>;
}