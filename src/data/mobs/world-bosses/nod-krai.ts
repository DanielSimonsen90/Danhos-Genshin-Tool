import { WorldBoss } from "@/common/models/mobs/Boss";
import { Adventurer, Berserker, GladiatorsFinale, Instructor, LuckyDog, PrayersOfIllumination, PrayersOfSpringtime, PrayersOfWisdom, TheExile, TravelingDoctor, WanderersTroupe } from "@/data/artifact-sets";
import { ElementalCrystals } from "@/data/materials/drops/crystals";
import { PrecisionKuuvahkiStampingDie, LightbearingScaleFeather, RadiantAntler, CyclicMilitaryKuuvahkiCore } from '@/data/materials/drops/nod-krai';

export const KnuckleDuckle = new WorldBoss(
  `Knuckle Duckle`,
  `A kuuvahki mechanism of peculiar make.\nIt is crafted from scrap metal and mechanical bearings and bears a partial resemblance — as per its creator's proclivities, apparently — to a "duck."`,
  'Nod-Krai',
  [
    PrecisionKuuvahkiStampingDie,
    ...ElementalCrystals.Electro.getCraftingTreeAsMaterials(),
    GladiatorsFinale,
    WanderersTroupe,
    Instructor, TheExile, PrayersOfWisdom, TravelingDoctor
  ]
);

export const RadiantMoonfly = new WorldBoss(
  `Radiant Moonfly`,
  `The moon's blessing has allowed it to glide through this world while remaining in its prime, displaying the remnants of an older world, when the ancient moon once illuminated the land.`,
  'Nod-Krai',
  [
    LightbearingScaleFeather,
    ...ElementalCrystals.Dendro.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Pyro.getCraftingTreeAsMaterials(),
    GladiatorsFinale,
    WanderersTroupe,
    Berserker, Instructor, Adventurer
  ]
);

export const FrostnightHerra = new WorldBoss(
  `Frostnight Herra`,
  `A majestic being that strides with pride through the frost-laden night. It wields ancient powers long since tamed by the Lord of the Sky, while its iridescent wings still gleam with the glory of an ancient ange.`,
  'Nod-Krai',
  [
    RadiantAntler,
    ...ElementalCrystals.Cryo.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Hydro.getCraftingTreeAsMaterials(),
    GladiatorsFinale,
    WanderersTroupe,
    Berserker, TheExile, PrayersOfSpringtime, LuckyDog
  ]
);

export const SuperHeavyLandroverMechanizedFortress = new WorldBoss(
  "Super-Heavy Landrover Mechanized Fortress",
  `Referred to internally as the "Type Drzislav," this super heavy-class mechanism was jointly developed by the Armory Palace and the Kuuvahki Experimental Design Bureau.`,
  'Nod-Krai',
  [
    CyclicMilitaryKuuvahkiCore,
    ...ElementalCrystals.Pyro.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Cryo.getCraftingTreeAsMaterials(),
    GladiatorsFinale,
    WanderersTroupe,
    Berserker, Instructor, PrayersOfIllumination, Adventurer
  ]
)