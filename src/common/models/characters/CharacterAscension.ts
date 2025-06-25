import { ElementalCrystal } from "@/data/materials/drops/crystals";
import AscensionMaterial from "../materials/AscensionMaterial";
import MobDrop from "../materials/MobDrop";
import { Element } from "@/common/types";
import LocalSpecialty from "../materials/LocalSpecialty";

export type CharacterAscension<TElement extends Element> = {
  localSpecialty: LocalSpecialty;
  crystal: ElementalCrystal<TElement>;
  material: AscensionMaterial;
  weeklyBossDrop: MobDrop;
  worldBossDrop: MobDrop;
  mobDrop: MobDrop;
};

export default CharacterAscension;