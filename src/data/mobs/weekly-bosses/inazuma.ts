import { WeeklyBoss } from "@/common/models/mobs/Boss";
import { Berserker, GladiatorsFinale, Instructor, TheExile, WanderersTroupe } from "@/data/artifact-sets";
import { Northlander } from "@/data/materials/drops/billets";
import { ElementalCrystals } from "@/data/materials/drops/crystals";
import { DreamSolvent } from "@/data/materials/drops/general";
import { AshenHeart, HellfireButterfly, MoltenMoment, MudraOfTheMaleficGeneral, TearsOfTheCalamitousGod, TheMeaningOfAeons } from "@/data/materials/drops/inazuma";

export const Signora = new WeeklyBoss(
  "Signora, Narukami Island: Tenshukaku",
  `This is the dwelling of the Raiden Shogun, who rules over Inazuma. It is also the perfect place for a "duel before the throne".`,
  'Inazuma',
  [
    MoltenMoment,
    HellfireButterfly,
    AshenHeart,
    ...ElementalCrystals.Cryo.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Pyro.getCraftingTreeAsMaterials(),
    DreamSolvent,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    TheExile,
    ...Northlander
  ]
);

export const RaidenShogun = new WeeklyBoss(
  "Raiden Shogun, End of the Oneiric Euthymia",
  `Countless dreams once blew about here like petals in the wind, never to be fulfilled. This is the origin of Eternity, and it is also "her" end.`,
  'Inazuma',
  [
    MudraOfTheMaleficGeneral,
    TearsOfTheCalamitousGod,
    TheMeaningOfAeons,
    ...ElementalCrystals.Electro.getCraftingTreeAsMaterials(),
    DreamSolvent,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    TheExile,
    ...Northlander
  ]
);