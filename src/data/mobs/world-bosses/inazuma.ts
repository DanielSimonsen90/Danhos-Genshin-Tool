import { WorldBoss } from "@/common/models/mobs/Boss";
import { Adventurer, Berserker, GladiatorsFinale, Instructor, LuckyDog, PrayersOfDestiny, PrayersOfIllumination, PrayersOfSpringtime, PrayersOfWisdom, TheExile, TravelingDoctor, WanderersTroupe } from "@/data/artifact-sets";
import { ElementalCrystals } from "@/data/materials/drops/crystals";
import { DewOfRepudiation, DragonheirsFalseFin, MarionetteCore, PerpetualHeart, RiftbornRegalia, SmolderingPearl, StormBeads } from "@/data/materials/drops/inazuma";

export const PerpetualMechanicalArray = new WorldBoss(
  `Perpetual Mechanical Array`,
  `A strange, alien machine.\nThey say that it is a war machine left behind by a nation that has already been destroyed. Composed of several different parts, it can adapt to its combat enviornment and employ a variety of attacks.\nThis machine, comprised of cubic shapes, is on some leve very much like the elemnental hyposases.`,
  'Inazuma',
  [
    PerpetualHeart,
    ...ElementalCrystals.Cryo,
    ...ElementalCrystals.Geo,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    TheExile,
    PrayersOfSpringtime,
    LuckyDog
  ]
);

export const PyroHypostasis = new WorldBoss(
  `Pyro Hypostasis`,
  `Code Name: Ayin. A high-purity Pyro entity.\nElemental hypostases have the ability to often enter a sort of "emergency restart" phase when they are about to be destroyed and can revive themselves in this way.\nSuch rapid regeneration is not possessed even by most creatures for whom survival is the top priority.`,
  'Inazuma',
  [
    SmolderingPearl,
    ...ElementalCrystals.Pyro,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    PrayersOfIllumination,
    Adventurer
  ]
);

export const MaguuKenki = new WorldBoss(
  `Maguu Kenki`,
  `An autonomous humanoid swordsman.\nIt is said that this machine was made using the cumulative memory of the first-generation master of a certain sword school known for its secret technique, Tengu Sweeper.\nHowever, it malfunctioned, lost control, and was ultimately discarded.\nSome sing that this blade-ghost wanders about in a place where fate was severed.`,
  'Inazuma',
  [
    MarionetteCore,
    ...ElementalCrystals.Anemo,
    ...ElementalCrystals.Cryo,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    LuckyDog
  ]
);

export const HydroHypostasis = new WorldBoss(
  `Hydro Hypostasis`,
  `Code Name: He. A high-purity Hydro entity.\nHypostases have strong rejection properties, and will mercilessly expel any that test them.\nThe logic behind such behavior remains a mystery.`,
  'Inazuma',
  [
    DewOfRepudiation,
    ...ElementalCrystals.Hydro,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    TheExile,
    PrayersOfDestiny
  ]
);

export const BathysmalVishapHerd = new WorldBoss(
  `Bathysmal Vishap Herd`,
  `A powerful group of Bathysmal Vishaps.\nThey have been specifically bred and selected by the people of Enkanomiya, which has given them their exceptional strength. Of course, no vishap would consider this some sort of debt to be repaid.\nThe strongest members of this herd can use different elements, which they wield as a show of their hatred.`,
  'Inazuma',
  [
    DragonheirsFalseFin,
    ...ElementalCrystals.Cryo,
    ...ElementalCrystals.Electro,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    TheExile,
    PrayersOfSpringtime,
    LuckyDog
  ]
);

export const ThunderManifestation = new WorldBoss(
  `Thunder Manifestation`,
  `An unusual Electro life form that weaves thunder and lightning as a song unto the resentment that drives its every move.\nEven though this creature may seem similar to the Oceanids, it lacks their intelligence.\nThey say that this is an elemental being driven by pure regret.`,
  'Inazuma',
  [
    StormBeads,
    ...ElementalCrystals.Electro,
    GladiatorsFinale,
    WanderersTroupe,
    Instructor,
    TheExile,
    PrayersOfWisdom,
    TravelingDoctor
  ]
);

export const GoldenWolflord = new WorldBoss(
  `Golden Wolflord`,
  `A twisted beast from antoher world.\nThis creature is the ruler of the Riftwolves, and wields the power to command them to dissolve space itself.`,
  'Inazuma',
  [
    RiftbornRegalia,
    ...ElementalCrystals.Geo,
    GladiatorsFinale,
    WanderersTroupe,
    Instructor,
    TheExile,
    TravelingDoctor
  ]
);