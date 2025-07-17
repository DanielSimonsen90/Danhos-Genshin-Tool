import { WorldBoss } from "@/common/models/mobs/Boss";
import { Adventurer, Berserker, GladiatorsFinale, Instructor, LuckyDog, PrayersOfDestiny, PrayersOfIllumination, PrayersOfSpringtime, PrayersOfWisdom, TheExile, TravelingDoctor, WanderersTroupe } from "@/data/artifact-sets";
import { ElementalCrystals } from "@/data/materials/drops/crystals";
import { BasaltPillar, CleansingHeart, CloudseamScale, EverflameSeed, JuvenileJade, RunicFang } from "@/data/materials/drops/liyue";

export const Oceanid = new WorldBoss(
  'Oceanid',
  `A life-formed created from condensed Hydro elements of incredible purity.\nOften attached to bodies of water. It is said that as water bodies become purer, the Hydro elements within grow more abundant, causing the Oceanids to grow more Powerful.\nIt is also said by some that Oceanids were once sea creatures from a home far away who carried the fragments of a long-dead god to the many corners of this world. Perhaps they did this so that the love their god held for this world could be spread through the waters to all the land...`,
  'Liyue',
  [
    CleansingHeart,
    ...ElementalCrystals.Hydro.getCraftingTreeAsMaterials(),
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    TheExile,
    PrayersOfDestiny,
    Adventurer
  ]
);

export const SolitarySuanni = new WorldBoss(
  'Solitary Suanni',
  `An illuminated beast that is oft thought to only exist in fantasy. It is characterized by its graceful form and lonesome, proud nature.`,
  'Liyue',
  [
    CloudseamScale,
    ...ElementalCrystals.Anemo.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Hydro.getCraftingTreeAsMaterials(),
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    LuckyDog
  ]
);

export const PyroRegisvine = new WorldBoss(
  'Pyro Regisvine',
  `A giant vine that has absorbed the ancient flame that rages within the ley lines.\nIt is restless as if filled with endless fury.\nPoets, bards, and even some academics believe that elements also contain emotions and hopes. If this is true, then one can only wonder what emotions cause the Pyro Regisvine to burn eternally, writhing like one longing to be free of the confinments of the earth...`,
  'Liyue',
  [
    EverflameSeed,
    ...ElementalCrystals.Pyro.getCraftingTreeAsMaterials(),
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    PrayersOfIllumination,
  ]
);

export const PrimoGeovishap = new WorldBoss(
  'Primo Geovishap',
  `After many years, the awesomely powerful Primo Geovishaps have grown accustomed to changes in their elemental environment.\nFolktales hold that after the great "draconic calamity" that led to the ruin of Tianqiu Valley, the Geovishaps and Primo Geovishaps burrowed deep into the earth, awaiting their chance to rise once more...`,
  'Liyue',
  [
    JuvenileJade,
    ...ElementalCrystals.Geo.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Electro.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Cryo.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Pyro.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Hydro.getCraftingTreeAsMaterials(),
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    TheExile,
    PrayersOfWisdom,
    PrayersOfSpringtime,
    PrayersOfIllumination,
    PrayersOfDestiny,
  ]
);

export const GeoHypostasis = new WorldBoss(
  'Geo Hypostasis',
  `Code name: Gimel. A high-purity Geo entity.\nElemental hypostases are ultra-compact structures with a high mass.\nConcentrated elemental energy forms a solid shell around the core of the hypostasis, leaving only the core reactive to elemental stimuli.`,
  'Liyue',
  [
    BasaltPillar,
    ...ElementalCrystals.Geo.getCraftingTreeAsMaterials(),
    GladiatorsFinale,
    WanderersTroupe,
    Instructor,
    TheExile,
    TravelingDoctor
  ]
);

export const RuinSerpent = new WorldBoss(
  'Ruin Serpent',
  `A bizarrely-shaped machine that prowls the underground areas of The Chasm.\nIt has a formidable gear in front of it that can carve through rock as if it were butter. It was by this power that it was able to dig a tunnel to The Chasm from "somewhere."`,
  'Liyue',
  [
    RunicFang,
    ...ElementalCrystals.Geo.getCraftingTreeAsMaterials(),
    GladiatorsFinale,
    WanderersTroupe,
    Instructor,
    TheExile
  ]
);