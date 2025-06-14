import { WorldBoss } from "@/common/models/mobs/Boss";
import { Adventurer, Berserker, GladiatorsFinale, Instructor, LuckyDog, PrayersOfDestiny, PrayersOfIllumination, PrayersOfSpringtime, PrayersOfWisdom, TheExile, TravelingDoctor, WanderersTroupe } from "@/data/artifact-sets";
import { ElementalCrystals } from "@/data/materials/drops/crystals";
import { ArtificedSpareClockworkComponent__Coppelia, ArtificedSpareClockworkComponent__Coppelius, EmperorsResolution, FontemerUnihorn, FragmentOfAGoldenMelody, TourbillonDevice, WaterThatFailedToTranscend } from "@/data/materials/drops/fontaine";

export const LegatusGolem = new WorldBoss(
  "Legatus Golem",
  `A centaur-shaped golem forged of marble and brass. Under the hard stone exterior flows Ichor blood.\nThe shield and sword in its hands can perform a blazing melody of flames.`,
  'Fontaine',
  [
    FragmentOfAGoldenMelody,
    ...ElementalCrystals.Pyro,
    ...ElementalCrystals.Geo,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    PrayersOfIllumination,
    Adventurer
  ]
);

export const EmperorOfFireAndIron = new WorldBoss(
  "Emperor of Fire and Iron",
  `An ancient ruler of the Fontemer Aberrant that lives in the caverns.\nIt is said to have witnessed the seas of Fontaine before the first diluvian period.`,
  'Fontaine',
  [
    EmperorsResolution,
    ...ElementalCrystals.Pyro,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    PrayersOfIllumination,
    Adventurer
  ]
);

export const HydroTulpa = new WorldBoss(
  "Hydro Tulpa",
  `A human-shaped monster formed from the agglomeration of countless drops of water.`,
  'Fontaine',
  [
    WaterThatFailedToTranscend,
    ...ElementalCrystals.Hydro,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    TheExile,
    PrayersOfDestiny,
    Adventurer
  ]
);

export const IcewindSuite = new WorldBoss(
  `"Icewind Suite"`,
  `A gift from the Fontaine Research Institute, it is composed of two pieces, Dirge of Coppelia and Nemesis of Coppelius.`,
  'Fontaine',
  [
    ArtificedSpareClockworkComponent__Coppelia,
    ArtificedSpareClockworkComponent__Coppelius,
    ...ElementalCrystals.Anemo,
    ...ElementalCrystals.Cryo,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    TheExile,
    PrayersOfSpringtime,
    LuckyDog
  ]
);

export const ExperimentalFieldGenerator = new WorldBoss(
  `Experimental Field Generator`,
  `A product of the Fontaine Research Institute of Kinetic Energy Engineering that has gone out of control due to an accident.`,
  'Fontaine',
  [
    TourbillonDevice,
    ...ElementalCrystals.Geo,
    GladiatorsFinale,
    WanderersTroupe,
    Instructor,
    TheExile,
  ]
);

export const MillennialPearlSeahorse = new WorldBoss(
  `Millennial Pearl Seahorse`,
  `An ancient suzerain of the Fontemer Aberrant that dwells in a cavern. Has a body possessed of phantasmal beauty and a temper fiercer than a raging thunderstorm.`,
  'Fontaine',
  [
    FontemerUnihorn,
    ...ElementalCrystals.Electro,
    GladiatorsFinale,
    WanderersTroupe,
    Instructor,
    TheExile,
    PrayersOfWisdom,
    TravelingDoctor,
  ]
);