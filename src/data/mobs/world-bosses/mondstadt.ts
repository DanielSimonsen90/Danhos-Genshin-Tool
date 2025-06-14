import { WorldBoss } from "@/common/models/mobs/Boss";

import { ElementalCrystals } from '@/data/materials/drops/crystals';
import { HurricaneSeed, HoarfrostCore, LightningPrism, CrystallineBloom } from "@/data/materials/drops/mondstadt";
import { 
  GladiatorsFinale, WanderersTroupe, 
  Berserker, Instructor, TheExile, PrayersOfSpringtime, PrayersOfWisdom,
  LuckyDog, TravelingDoctor
} from '@/data/artifact-sets';

export const AnemoHypostasis = new WorldBoss(
  'Anemo Hypostatsis',
  `Code name: Beth. A high-purity Anemo entity. Elemental hypostases are life forms which have completely abandoned their ormer appearance and biological structure, making them able to reach the highest level of elemental purity. Research into hypostases is mainly led by scholars of Sumeru Akademiya, but due to the level of danger that they pose, little of substance is known about hypostases beyojnd their scientific name and code name.`,
  'Mondstadt',
  [
    HurricaneSeed,
    ...ElementalCrystals.Anemo,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor
  ]
);

export const CryoRegisvine = new WorldBoss(
  'Cryo Regisvine',
  `A monster formed from a vine that was imbued with the essence of biting frost within the leylines. Some studies suggest that plants are like the organs of the world, harmonizing the turbulent elemental energies of the ley lines. Concrete examples of this phenomena are Mist Flowers, Whopperflowers and the like, which briom over with elemental energy.\nIn certain circumstances, ceterain plants will turn into creatures monstrous size and intent - such as the Cryo Regisvines - in the course of many years.`,
  'Mondstadt',
  [
    HoarfrostCore,
    ...ElementalCrystals.Cryo,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    TheExile,
    PrayersOfSpringtime,
    LuckyDog
  ]
);

export const ElectroHypostasis = new WorldBoss(
  'Electro Hypostasis',
  `Code name: Aleph. A high-purity Electro entity. Elemental hypostases are the highest forms of elemental structures, usually formed either at a location bursting with elemental energy or at a clogged ley line.\nElemental hypostases have developed defensive mechanisms based on their elemental attributes.`,
  'Mondstadt',
  [
    LightningPrism,
    ...ElementalCrystals.Electro,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    TheExile,
    PrayersOfWisdom,
    LuckyDog,
    TravelingDoctor
  ]
);

export const CryoHypostasis = new WorldBoss(
  'Cryo Hypostasis',
  `Code name: Daleth. A high-purity Cryo entity.\nResearch suggests that there are subtle differences between elemental hypostases and other elemental life forms in tterms of their physical composition. Perhaps these differences can account for their high leve of homeosasis and their almost mechanical movements.`,
  'Mondstadt',
  [
    CrystallineBloom,
    ...ElementalCrystals.Cryo,
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    TheExile,
    PrayersOfSpringtime,
    LuckyDog,
  ]
);