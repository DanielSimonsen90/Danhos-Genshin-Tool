import { WeeklyBoss } from "@/common/models/mobs/Boss";
import { Berserker, GladiatorsFinale, Instructor, TheExile, WanderersTroupe } from "@/data/artifact-sets";
import { Midlander } from "@/data/materials/drops/billets";
import { ElementalCrystals } from "@/data/materials/drops/crystals";
import { DreamSolvent } from "@/data/materials/drops/general";
import { DakasBell, Everamber, MirrorOfMushin, PrimordialGreenbloom, PuppetStrings, WorldspanFern } from "@/data/materials/drops/sumeru";

export const ScaramoucheBalladeer = new WeeklyBoss(
  "The Balladeer, Joururi Workshop",
  `The secret workshop hidden in the forest cavern revealed its entrance upon being struck with immense force. The seeds of "surpassing" are sprouting within, and are about to burst forth from the earth...`,
  'Sumeru',
  [
    PuppetStrings,
    MirrorOfMushin,
    DakasBell,
    ...ElementalCrystals.Electro,
    ...ElementalCrystals.Anemo,
    ...ElementalCrystals.Hydro,
    DreamSolvent,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    TheExile,
    ...Midlander
  ]
);

export const Apep = new WeeklyBoss(
  "Apep, The Realm of Beginnings",
  `The Dragon of Verdure once drew up a dreamlike blueprint of life for its people, until the grass turned into sand and the apocalypse came. Then, dreams had to be burned to fuel life. At the end of those "crossroads", their proud forms had been mutilated. In contrast, the new masters of Teyvat who stepped into this land were so beautiful and dazzling...`,
  'Sumeru',
  [
    WorldspanFern,
    PrimordialGreenbloom,
    Everamber,
    ...ElementalCrystals.Dendro,
    DreamSolvent,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    TheExile,
    ...Midlander
  ]
);

export const Sumeru = {
  ScaramoucheBalladeer,
  Apep,
};
export default Sumeru;