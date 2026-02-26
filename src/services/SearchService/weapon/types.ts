import { Character } from "@/common/models";
import { Weapon } from "@/common/models/weapon";

export type LastResult = {
  search: unknown;
}


interface BaseEntry {
  score: number;
  included: boolean;
}

export interface RecommendedWeaponForCharacter extends BaseEntry {
  weapon: Weapon;
};

export interface RecommendedCharacterForWeapon extends BaseEntry {
  character: Character;
}