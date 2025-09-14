// https://genshin-impact.fandom.com/wiki/Enemy/List

import { EasyMob } from "@/common/models/mobs/Mob";
import * as EasyMobDrops from "../materials/drops/easy";

export const HilichurlShooter = new EasyMob(
  "Hilichurl Shooter",
  "Hilichurls that use crossbows to attack at range.\nGiven their limited mental capacity, learning to wield a crossbow is extremely difficult for them, which leads one to wonder how they could craft such intricate equipment in the first place. One could speculate that there's an organization working behind the scenes to provide equipment and training to these hilichurls, seemingly scattered across the land...",
  [
    EasyMobDrops.Arrowhead,
    EasyMobDrops.Mask
  ],
);

export const Hilichurl = new EasyMob(
  "Hilichurl",
  `Primitive humanoid monsters that can be found all across Teyvat.\nMost people have already given up on trying to communicate with the hilichurls, believing that they are monsters simply incapable of communication.`,
  [
    EasyMobDrops.Mask
  ]
);

export const Samachurl = new EasyMob(
  "Samachurl",
  `Shamans of the hilichurl tribes. They display a limited ability to harness elemental energy.\n"While their masks are made with the intent of instilling fear in their enemies, their designs come across as more charming than frightening." - Jacob Musk`,
  [
    EasyMobDrops.Scroll,
    EasyMobDrops.Mask
  ]
);

export const Slime = new EasyMob(
  "Slime",
  `A pudgy elemental life form.\nIt's said that desserts made from slimes of different elements will have incredibly distinctive flavors.`,
  [
    EasyMobDrops.Slime
  ]
);

export const FatuiSkirmisher = new EasyMob(
  "Fatui Skirmisher",
  `A soldier encased within a Fatui war machine.\nThese skirmishers do not question if they shall live or die as they advance into nations far from home to complete reconnaissance missions and lay the groundwork for operations to come.\nUnlike the elite Mages and Agents, Fatui Skirmishers are soldiers of lesser individual might.\nTo complete their tasks and reduce losses in men and material, their tactics are thus more reliant on teamwork.`,
  [
    EasyMobDrops.FatuiInsignia
  ]
);

export const Whopperflower = new EasyMob(
  "Whopperflower",
  `A bizarre mimetic plant monster that harnesses the elements in combat.\nThese plants lurk under the surface and ambush unsuspecting prey. With the passage of years, sufficient nutrition, and the right environment, it could even take root somewhere and grow into a giant tree that sways and spews elemental power...`,
  [
    EasyMobDrops.Nectar
  ]
);

export const TreasureHoarder = new EasyMob(
  "Treasure Hoarder",
  `A ragtag group of bandits whose traces o be found all across the lands, even in the deepest depths of uncharted domains.\nAlthough their main purpose is hunting treasure, they are also known to get roug with unfortunate bystanders who happen to be nearby.\nIt's said that the group's founder, Reed Miller, defined the Treasure Hoarders as "an organization of mutual cooperation."`,
  [
    EasyMobDrops.TreasureHoarderInsignia,
  ]
);

export const Nobushi = new EasyMob(
  "Nobushi",
  `Despite often appearing in groups, the Nobushi do not have a centralized organization. Depending on their temperament or the nature of their crimes, they are also known as the "homeless ones, "vagabonds," "Kairagi," "ne'er-do-wells," or even "the rioters," or just simply known collectively as "those rogues."\nThey are often samurai who have fallen into banditry, and some will even ally themselves with the Treasure Hoarders or the Fatui for survival or monetary gain.`,
  [
    EasyMobDrops.Handguard,
  ]
);

export const Specter = new EasyMob(
  "Specter",
  `A monster born from highly-concentrated elements that can float in the air.\nOn the whole, they are little sprites that have a gentle temperament, much like Slimes, but they can sometimes explode into a rage.`,
  [
    EasyMobDrops.Spectral
  ]
);

export const Eremites = new EasyMob(
  "Eremites",
  `A group of loosely-organized mercenary corps. Will work for anyone as long as the pay is good.\n"The Eremites" is an umbrella term that people from outside the desert have cooined for them. But beneath this name, there are separate entities such as the sellsword group known as the Farrokhzadan and the tribe of Tanit.\nAs a people led not by gods, most of these desert descendants wield their blades to make a living and offer their skills to those who pay.`,
  [
    EasyMobDrops.EremiteDrop
  ]
);

export const Fongus = new EasyMob(
  "Fungus",
  `To put it shortly, the Fungus is the congregation of overgrown and over-evolved spores.\nExposing it to Pyro or Electro will Scorch or Activate it, respectively. While it either one of said states, the Fungus will drop special materials.\nIt is said the infestation of Fungi is the result of a lab accident. At first, a certain sage had hopes of utilizing spores for medical purposes. If that is true, the person had clearly underestimated the spores' adaptive and reproductive powers.`,
  [
    EasyMobDrops.FungalNucleus,
    EasyMobDrops.FungalSpores
  ]
);

export const ClockworkMeka = new EasyMob(
  "Clockwork Meka",
  `A machine made possible by the advanced engineering technology of Fontaine and its energy sources.\nAlso an excellent assistant to thieves and brigands.`,
  [
    EasyMobDrops.Gear,
  ]
);

export const FontemerAberrant = new EasyMob(
  "Fontemer Aberrant",
  `An aquatic creature found throughout Fontaine.\nPerhaps due to enviornmental requirements, it can seemingly only be found in Fontaine.`,
  [
    EasyMobDrops.FontemerAberrantPearl,
  ]
);

export const TribalWarriors = new EasyMob(
  "Sauroform Tribal Warriors",
  `The warriors of Natlan's six great tribes who fight for the honor and glory of their people.\nOver long years of living and fighting alongside their Saurian compantions, these tribal warriors havee gradually acquired their traits and learned how to apply them on the field of battle.`,
  [
    EasyMobDrops.Whistle,
  ]
);

export const Saurian = new EasyMob(
  "Saurian",
  `The Saurians that inhabit the land of Natlan.\nAccording to legend, more ancient dragons were better able to adapt to their environments, taking on different shapes and forms based on their surroundings. It is said that after losing their power, they were forced to become ever more dependent on their environments for survival, finally settling into other forms they still have as Saurians today.\nBut whether this is true or not, no one really knows.`,
  [
    EasyMobDrops.Fang,
  ]
);

export const FatuiOprichnik = new EasyMob(
  "Fatui Oprichnik",
  `A soldier encased within a Fatui war machine.\nUnlike their Skirmisher cousins, soldiers of the Oprichniki are formally recruited and rigorously trained. They are deployed either to the Fatui's most critical strongholds or thrown into the deadliest frontline battles.`,
  [
    EasyMobDrops.Warrant
  ]
);

export const Landcruiser = new EasyMob(
  "Landcruiser",
  `An autonomous machine that applies the principles of naval combat to land battles.\nLandcruisers were engineered by the Armory Palace's finest engineers to serve as "armed ships that cruise on land." They are now deployed en masse at the bleeding edge of the Fatui's conquests.`,
  [
    EasyMobDrops.DriveShaft
  ]
);