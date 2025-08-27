import { ElementalCrystalGroup } from "@/data/materials/drops/crystals";
import AscensionMaterial from "../materials/AscensionMaterial";
import MobDrop from "../materials/MobDrop";
import { Element } from "@/common/types";
import LocalSpecialty from "../materials/LocalSpecialty";

export type CharacterAscension<TElement extends Element> = {
  localSpecialty: LocalSpecialty;
  crystal: ElementalCrystalGroup<TElement>;
  material: AscensionMaterial | null;
  weeklyBossDrop: MobDrop | null;
  worldBossDrop: MobDrop | null;
  mobDrop: MobDrop;
};

export default CharacterAscension;