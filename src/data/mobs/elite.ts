// https://genshin-impact.fandom.com/wiki/Enemy/List

import { EliteMob } from "@/common/models/mobs/Mob";
import * as EasyMobDrops from "../materials/drops/easy";
import * as EliteMobDrops from "../materials/drops/elite";

export const FatuiCicinMage = new EliteMob(
  "Fatui Cicin Mage",
  `A Fatui mage who can command Cicins in battle.\nSimilarly to the way that Cicins go crazy for Mist Grass, Cicin Mages take great pleasure in toying with their prey.\nThey seem to wander the land aimlessly, as if compelled by some unknown duty.`,
  [
    EliteMobDrops.MistGrass,
    EasyMobDrops.FatuiInsignia,
  ]
);

export const AbyssMage = new EliteMob(
  "Abyss Mage",
  `Abyss creatures who can command the power of the elements in combat to a certain extent.\nFor unknown reasons, Abyss Mages are able to communicate with the hilichurls, thus enabling them to manipulate their minds easily. They say Abyss Mages utter a long-forgotten language from which they draw magical power.`,
  [
    EliteMobDrops.LeyLineBranch,
  ]
);

export const RuinGuard = new EliteMob(
  "Ruin Guard",
  `An ancient humanoid war macnine.\nThey are said to be remnants from a lost ancient nation. Some believe that they were developed not as war machines, but as protectors of the ruins.\nThough that hypothesis does not explain why would they choose to employ explosive weaponry inside the very ruins they are supposed to protect...`,
  [
    EliteMobDrops.RuinGuardChaos
  ]
);

export const Mitachurl = new EliteMob(
  "Mitachurl",
  `The most formidable warriors of the hilichurl tribes.\nFighting and eating meat are the two most important things to hilichurls, because those are what make them grow stronger.\nAll young hilichurls dream of growing up to become a big and strong mitachurl, because that way they can eat more meat, and fight more battles.`,
  [
    EliteMobDrops.Horn,
    EasyMobDrops.Mask
  ]
);

export const FatuiAgent = new EliteMob(
  "Fatui Agent",
  `A Fatui secret agent.\nThe duty of a Fatui agent is to settle debts — but not only those of a monetary or goods-in-kind nature.\nThey also ensure dues are paid when it comes to the principle of "an eye for an eye." If there is one thing the Fatui are not known for, it is leniency, and whoever dares to oppose them will invoke the full force of their wrath upon them.`,
  [
    EliteMobDrops.SacrificialKnife,
    EasyMobDrops.FatuiInsignia
  ]
);

export const RuinHunter = new EliteMob(
  "Ruin Hunter",
  `A giant alien war machine.\nThey are said to be remnants from the lost ancient nation. Apparently, the creators opted to forgo the low-performing humanoid-design in pursuit of improved combat effectiveness. They are extremely dangerous both in melee and ranged combat.\nConsidering these mere relics possess such extraordinary power, one cannot help but wonder what the civilization that produced them must have looked like at its height.`,
  [
    EliteMobDrops.RuinGuardChaos
  ]
);

export const GeovishapHatchling = new EliteMob(
  "Geovishap Hatchling",
  `A young vishap with a hard Geo exoskeleton.\nVishaps are exceptionally agile creatures that one would be wise not to underestimate in battle. Experts from Sumeru Akademiya believe that they become dragons when fully grown. By avoiding predators and natural disasters, perhaps they can even live long enough to become formidable beasts that reign over entire mountains.`,
  [
    EliteMobDrops.Horn,
  ]
);

export const HilichurlChieftain = new EliteMob(
  "Hilichurl Chieftain",
  `A mitachurl that has mutated due to an accumulation of a large amount of elements in its body. They are bigger, stronger, and absolutely ferocious.\nHilichurls worship no gods and follow no order or discipline. The strongest and the most ferocious one among them is seen as fit to lead the tribe.`,
  [
    EliteMobDrops.Horn,
    EasyMobDrops.Mask
  ]
);

export const Geovishap = new EliteMob(
  "Geovishap",
  `A mature Geovishap.\nIt is said that afer many years have passed, Geovishap Hatchlings will shed the armor that originally protected them and become geovishaps. Hoever, these two and the older, greater Primo Geovishaps have spent many years hibernating under the the mountains, and have only emerged and become active in recent times. As such, none can personally attest to having witnessed or recorded such a thing in person.`,
  [
    EliteMobDrops.BoneShard,
  ]
);

export const FatuiSnezhnayanMaiden = new EliteMob(
  "Fatui: Snezhnayan Maiden",
  `A member of a special Fatui honor guard from Snezhnaya.\nWilling to do anything to achieve the grand goals of the Fatui, they are the stark opposite of the dignity indicated by the title "Maiden."`,
  [
    EliteMobDrops.Prism,
  ]
);

export const RuinSentinels = new EliteMob(
  "Ruin Sentinel",
  `Various bizarrely-shaped machines that have taken different forms and functions as an adaptation to different goals.\nLegend has it that they were war machines left behind by a nation that has now been destroyed. leaving its hard armor and powerful abilities aside, some believe that the design of these ruin machines has greater value in the study of biomimesis than the more common Ruin Guards.`,
  [
    EliteMobDrops.RuinSentinelChaos,
  ]
);

export const WolvesOfTheRift = new EliteMob(
  "Wolves of the Rift",
  `Ominous, alien beasts with dull colors that travel in packs much as wolves do.\nIt is said that they have the power to dissolve the world's borders.`,
  [
    EliteMobDrops.ConcealedClaw,
  ]
);

export const BathysmalVishap = new EliteMob(
  "Bathysmal Vishap",
  `A mighty race of vishaps that dwell within the deep seas.\nThat they hate light is not due to an overly fragile sense of sight. Instead, it is because they have had the selfless sunlight and the surface world taken from them that they refuse to countenance man-made light.`,
  [
    EliteMobDrops.BoneShard,
  ]
);

export const BlacSerpents = new EliteMob(
  "The Black Serpents",
  `Once upon a time, these were knights of the realm and carriers of significant status.\nThe long years and a curse seems to have robbed them of their reason and memory.\nNow, all that remains within that armor is the will to "fight for something, someone, and some matter."\nDepending on how much wear and tear they have undergone, they are by turns known as "Shadowy Husks" or "Black Serpent Knights.`,
  [
    EliteMobDrops.Statuette,
  ]
);

export const RuinDrake = new EliteMob(
  "Ruin Drake",
  `A war machine that is said to be left behind by a now-destroyed nation. It mimics the appearance of the beings known as Vishaps.\nAs an ancient life form, Vishaps have the ability to "absorb" — or perhaps the right word is "counteract" — elemental powers.\nTo enhance that ability, the Ruin Drakes were built with some structural and functional enhancements, and its energy system has a unique design.`,
  [
    EliteMobDrops.RuinDrakeChaos,
  ]
);

export const PrimalConstruct = new EliteMob(
  "Primal Construct",
  `The guardians of the lost ancient desert ruins have power enough to punish any who would presume to disturb the pure dreams of their lord.\nIt is said that the master of the sands once dreamed of an eternal paradise. Today, that utopia is long gone, and the dreams and oaths, forgotten by the world, are now only found in the mantras inscribed upon these machines.`,
  [
    EliteMobDrops.PrimalConstructPrism,
  ]
);

export const ConsecratedBeast = new EliteMob(
  "Consecrated Beast",
  "A lifeform that became twisted and warped by eating some great being.",
  [
    EliteMobDrops.Shell
  ]
);

export const HilichurlRogue = new EliteMob(
  "Hilichurl Rogue",
  `Hilichurl wanderers unaffiliated to any specific tribe or group. They can often be roving the wilds.\nSometimes, they may also lend their aid to other hilichurls for a variety of reasons.`,
  [
    EliteMobDrops.HilichurlFlower,
  ]
);

export const TaintedHydroPhantasm = new EliteMob(
  "Tainted Hydro Phantasm",
  `An elemental life form that arose from the waters of Fontaine, and that replaced the elegant Oceanids.`,
  [
    EliteMobDrops.TaintedWater,
  ]
);

export const BreacherPrimus = new EliteMob(
  "Breacher Primus",
  `A strange and mysterious life form.\nIt has no known similarities with any other creatures on Teyvat.`,
  [
    EliteMobDrops.BreacherCore,
  ]
);

export const FatuiOperative = new EliteMob(
  "Fatui Operative",
  `An elite agent among the Fatui possessing extraordinary skill and indomitable will.`,
  [
    EliteMobDrops.Operatives,
  ]
);

export const XuanwenBeast = new EliteMob(
  "Xuanwen Beast",
  `A fearsome beast that lurks in the mountains. It uses Anemo to pursue its prey.`,
  [
    EliteMobDrops.Fin,
  ]
);

export const PraetorianGolem = new EliteMob(
  "Praetorian Golem",
  `A moving statue shaped like a warrior who will swing their sword at all who dare trespass upon the area under their guardianship.\nThe being beneath its resilient exterior may have long been lost in the mists of ancient memory.`,
  [
    EliteMobDrops.Hilt,
  ]
);

export const WayobManifestations = new EliteMob(
  "Wayob Manifestations",
  `The Wayob worshipped by the various tribes of Natlan manifest themselves in the form of these obsidian totems.`,
  [
    EliteMobDrops.WayobWill,
  ]
);

export const AvatarsOfLava = new EliteMob(
  "Avatars of Lava",
  `A strange monster that needs to constantly absorb thermal energy to survive.\nTheir characteristics may vary depending on the conditions of their formation - namely, the heat of their cores, known as "Seeing Eyes," as well as the composition of the surrounding rocks.`,
  [
    EliteMobDrops.Ignited,
  ]
);

export const SecretSourceAutomaton__HunterSeeker = new EliteMob(
  `Secret Source Automaton: Hunter-Seeker`,
  `An ancient machine used in object collection.\nIt is said that these machines were created by a long-lost civilization, and that they were originally designed to fulfill work functions — in other words, combat was not their intended purpose. Even so, a malfunctioning collection device is still cause for a major headache.`,
  [
    EliteMobDrops.SecretSource,
  ]
);

export const TenebrousMimiflora = new EliteMob(
  "Tenebrous Mimiflora",
  `Abyssal monsters that curl up like leaves.\nCorroders of this realm, they are able to extract shallow memories from the earth, then briefly recreate the images within by drawing upon the power of the Abyss.`,
  [
    EliteMobDrops.AbyssalLeaf,
  ]
);

export const FurnaceShellMountainWeasel = new EliteMob(
  "Furnace Shell Mountain Weasel",
  `An ancient variant of mountain weasel that has adapted to a unique, Phlogiston-rich environment isolated from the outside world. Some researchers from the Saurian Relics Association believe that despite the appearance that it has developed a symbiotic relationship with the Source Mechanisms, said mechanisms are actually controlling it through the ample Phlogiston that permeates its body.`,
  [
    EliteMobDrops.WeaselShell,
  ]
);

export const FrostnightScion = new EliteMob(
  "Frostnight Scion",
  `An elegant elemental lifeform.\nIt was born from the Frost Moon's blessings, symbolizing the pure source and the first radiance. The long years have exposed it to high concentrations of elemental energy, resulting in its present form.`,
  [
    EliteMobDrops.FrostnightsX
  ]
);

export const WastelandWildHunt = new EliteMob(
  "Wasteland Wild Hunt",
  `A ghoul that stalks the frozen wilderness.\nAppearing when the pitch-dark mist rolls in, their emergence is said to presage worse calamities to come.`,
  [
    EliteMobDrops.Mistshroud
  ]
);

export const RadiantBeast = new EliteMob(
  "Radiant Beast",
  `A beast that has undergone a unique evolution due to age-long immersion in the ancient moon's power.\nOnce an ordinary creature, it has been warped by the influence of kuuvahki and imbued with an otherworldly strength.`,
  [
    EliteMobDrops.RaidantBeastDrop
  ]
);