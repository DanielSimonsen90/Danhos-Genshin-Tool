import { WorldBoss } from "@/common/models/mobs/Boss";
import { Adventurer, Berserker, GladiatorsFinale, Instructor, LuckyDog, PrayersOfDestiny, PrayersOfIllumination, PrayersOfSpringtime, PrayersOfWisdom, TheExile, TravelingDoctor, WanderersTroupe } from "@/data/artifact-sets";
import { ElementalCrystals } from "@/data/materials/drops/crystals";
import { EvergloomRing, LightGuidingTetrahedron, MajesticHookedBeak, PerpetualCaliber, PseudoStamens, QuielledCreeper, ThunderclapFruitcore } from "@/data/materials/drops/sumeru";

export const ElectroRegisvine = new WorldBoss(
  "Electro Regisvine",
  `A giant plant that violently releases electric charges stored within the Ley Lines.\nElectro awakens plants and boosts soil fertility. If the Regisvine was indeed created to harmonize the turbulent energies of the Ley Lines, then it might be the earth's wish to see the presence of lush forests in Sumeru.`,
  'Sumeru',
  [
    ThunderclapFruitcore,
    ...ElementalCrystals.Electro,
    GladiatorsFinale,
    WanderersTroupe,
    Instructor,
    TheExile,
    PrayersOfWisdom,
    TravelingDoctor
  ]
);

export const JadeplumeTerrorshroom = new WorldBoss(
  "Jadeplume Terrorshroom",
  `The lord of fungal beasts that lives in the heart of the woods and in the company of its kin.\nFungi grow wherever it is damp and fertile. They can always adapt to adversity, and their spores can spread anywhere there is room.\nGiven time, this proud-looking bird-like beast might evolve into something yet more magnificent.`,
  'Sumeru',
  [
    MajesticHookedBeak,
    ...ElementalCrystals.Dendro,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
  ]
);

export const AeonblightDrake = new WorldBoss(
  "Aeonblight Drake",
  `This dragon-shaped combat machine is a being that inspires fear, much like the lord who once ruled these vast lands.\nThis mysterious, tireless mechanical monstrosity seems to be proof that the now-destroyed realm had reached heights that mortals should never have.`,
  'Sumeru',
  [
    PerpetualCaliber,
    ...ElementalCrystals.Cryo,
    ...ElementalCrystals.Hydro,
    GladiatorsFinale,
    WanderersTroupe,
    TheExile,
    Berserker,
    PrayersOfSpringtime,
    LuckyDog
  ]
);

export const DendroHypostasis = new WorldBoss(
  "Dendro Hypostasis",
  `Code Name: Zayin. A high-purity Dendro entity.\nThere are significant deviations in behavior between this being and the other Elemental Hypostases, though no one has yet produced a reliable conclusion as to why this is the case.`,
  'Sumeru',
  [
    QuielledCreeper,
    ...ElementalCrystals.Dendro,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    Adventurer,
  ]
);

export const AlgorithmOfSemiIntransientMatrixOfOverseerNetwork = new WorldBoss(
  "Algorithm of Semi-Intransient Matrix of Overseer Network",
  `A perpetual-motion device from an ancient civilization.\nIt governs the many ruin machines that are scattered throughout the desert and still seems to carry the will of its lonely ruler.`,
  'Sumeru',
  [
    LightGuidingTetrahedron,
    ...ElementalCrystals.Pyro,
    ...ElementalCrystals.Anemo,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    PrayersOfIllumination,
    Adventurer
  ]
);

export const SetekhWenut = new WorldBoss(
  "Setekh Wenut",
  `An eyeless predator that dwells within the depths of the desert and uses sound and vibrations to seek out its prey.\nThey sometimes take on forms very similar to those of plants, and some say that this is because they were once the scions of the lord of plants. Others say that this is their way of fooling their prey to seek fruits or food in their deadly shade.`,
  'Sumeru',
  [
    PseudoStamens,
    ...ElementalCrystals.Anemo,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    LuckyDog
  ]
);

export const IniquitousBaptist = new WorldBoss(
  "Iniquitous Baptist",
  `A creature of the Abyss that, through the dark's stygian powers, has gained additional appendages via "evolution."\nIt is capable of wielding multiple types of elemental powers.`,
  'Sumeru',
  [
    EvergloomRing,
    ...ElementalCrystals.Electro,
    ...ElementalCrystals.Cryo,
    ...ElementalCrystals.Pyro,
    ...ElementalCrystals.Hydro,
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