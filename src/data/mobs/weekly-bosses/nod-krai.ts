import { WeeklyBoss } from "@/common/models/mobs/Boss";
import { Berserker, GladiatorsFinale, Instructor, TheExile, WanderersTroupe } from "@/data/artifact-sets";
import { Borderlander } from "@/data/materials/drops/billets";
import { ElementalCrystals } from "@/data/materials/drops/crystals";
import { DreamSolvent } from "@/data/materials/drops/general";
import { MaskOfTheVirtuousDoctor, MadmansRestraint, ElixirOfTheHeretic } from "@/data/materials/drops/nod-krai";

export const TheDoctorDottore = new WeeklyBoss(
  `The Doctor (Dottore)`,
  `The heretic who sought godhood through the suffering of others finally met his twilight, brought down by those who stood together to defend their homeland.\nAs the moon traces its path across the night sky, its quiet light meets the resolve of those who stand here to protect their home.\nTogether, they remind us what "home" truly means.\nReflecting on this battle for the sublunary sphere may reveal something you haven't noticed before...`,
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