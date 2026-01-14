import { WeeklyBoss } from "@/common/models/mobs/Boss";
import { Berserker, GladiatorsFinale, Instructor, TheExile, WanderersTroupe } from "@/data/artifact-sets";
import { Borderlander } from "@/data/materials/drops/billets";
import { ElementalCrystals } from "@/data/materials/drops/crystals";
import { DreamSolvent } from "@/data/materials/drops/general";
import { MaskOfTheVirtuousDoctor, MadmansRestraint, ElixirOfTheHeretic } from "@/data/materials/drops/nod-krai";

export const TheDoctorDottore = new WeeklyBoss(
  `The Doctor (Dottore)`,
  'Description once Danho plays through it or someone sends it to him', // TODO
  'Nod-Krai',
  [
    MaskOfTheVirtuousDoctor,
    MadmansRestraint,
    ElixirOfTheHeretic,
    ...ElementalCrystals.Cryo.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Hydro.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Electro.getCraftingTreeAsMaterials(),
    DreamSolvent,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    TheExile,
    ...Borderlander
  ]
);