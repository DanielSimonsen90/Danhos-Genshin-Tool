import { ArtifactSet } from "../common/models";

export const Adventurer = new ArtifactSet(
  "Adventurer",
  "Max HP +1000",
  "Opening a chest regenerates 30% Max HP for 5s."
);
export const ArchaicPetra = new ArtifactSet(
  "Archaic Petra",
  "Geo DMG Bonus +15%",
  "When Elemental Shard picked up from Crystalize reaction, all party members gain 35% DMG Bonus for that particular element for 10s. Only one element DMG Bonus can be gained within that time"
);
export const Berserker = new ArtifactSet(
  "Berserker",
  "CRIT Rate +12%",
  "When HP is below 70%, CRIT Rate +24%"
);
export const BlizzardStrayer = new ArtifactSet(
  "Blizzard Strayer",
  "Cryo DMG Bonus +15%",
  "When wearer attacks enemy affected by Cryo, CRIT Rate +20%. If enemy is Frozen, CRIT Rate +40%"
);
export const BloodstainedChivalry = new ArtifactSet(
  "Bloodstained Chivalry",
  "Physical DMG +25%",
  "After defeating an opponent, Charged Attack DMG +50% + reduce its Stamina cost to 0 for 10s"
);
export const BraveHeart = new ArtifactSet(
  "Brave Heart",
  "ATK +18%",
  "+30% DMG against enemies with more than 50% HP"
);
export const CrimsonWitchOfFlames = new ArtifactSet(
  "Crimson Witch of Flames",
  "Pyro DMG Bonus +15%",
  "Overloaded & Burning DMG +40%. Vaporize & Melt DMG +15%. Using Elemental Skill increases 2-Piece Set effects by 50% (Pyro DMG Bonus +30%) for 10s. Max 3 stacks"
);
export const DeepwoodMemories = new ArtifactSet(
  "Deepwood Memories",
  "Dendro DMG Bonus +15%",
  "Skills (ability) or Bursts (ult) hit opponents, targets' Dendro RES -30% for 8s. Can be triggered off-field."
);
export const DefendersWill = new ArtifactSet(
  "Defender's Will",
  "DEF +30%",
  "Each different element in party, wearer's Elemental RES' element +30%"
);
export const DesertPavilionChronicle = new ArtifactSet(
  "Desert Pavilion Chronicle",
  "Anemo DMG Bonus +15%",
  "Charged Attacks on opponents adds following buffs: Wearer's Normal Attack SPD +10%. Normal, Charged, and Plunging Attack DMG +40% for 15s."
);
export const EchoesOfAnOffering = new ArtifactSet(
  "Echoes of an Offering",
  "ATK +18%",
  `When Normal Attack hit opponents, 36% chance to trigger "Valley Rite": Normal Attack DMG +70% of ATK. Effect is dispelled .05s after Normal Attack deals DMG. If "Valley Rite" was not triggered, odds of triggering +20%. Effect can trigger once every .2s.`
);
export const EmblemOfSeveredFate = new ArtifactSet(
  "Emblem of Severed Fate",
  "Energy Recharge +20%",
  "Elemental Burst (ult) DMG +25% of Energy Recharge. Max 75% bonus DMG can be obtained in this way."
);
export const FlowerOfParadiseLost = new ArtifactSet(
  "Flower of Paradise Lost",
  "Elemental Mastery +80",
  "Wearer's Bloom, Hyperbloom & Burgeon reaction DMG +40%. After reaction, +25% DMG of effect. Max 4 stacks where each stack lasts 10s. Can only trigger once per second. Can trigger off-field."
);
export const Gambler = new ArtifactSet(
  "Gambler",
  "Elemental Skill DMG +20%",
  "Defeating an opponent has 100% chance to remove Elemental Skill CD. Can only occur once every 15s."
);
export const GildedDreams = new ArtifactSet(
  "Gilded Dreams",
  "Elemental Mastery +80",
  "Within 8s of triggering Elemental Reaction, wearer obtains buff based on Elemental Type of other party members. ATK +14% for each member with same Element as wearer. Elemental Mastery +50 for each member with different Element. Each buff can count up to 3 characters. Effect triggerable 1/8s. Can trigger off-field."
);
export const GladiatorsFinale = new ArtifactSet(
  "Gladiator's Finale",
  "ATK +18%",
  "Sword/Claymore/Polearm wearer, Normal Attack DMG +35%"
);
export const HeartOfDepth = new ArtifactSet(
  "Heart of Depth",
  "Hydro DMG Bonus +15%",
  "After using Elemental Skill (ability); Normal and Charged Attack DMG +30% for 15s"
);
export const HuskOfOpulentDreams = new ArtifactSet(
  "Husk of Opulent Dreams",
  "DEF +30%",
  `Wearer obtains "Curiosity" effect in condition: On field and hit opponent with Geo attack, gain 1 stack 1/.3s. Max 4 stacks, each providing 6% DEF & Geo DMG Bonus. After 6s without gaining stack, lose 1 stack.`
);
export const Instructor = new ArtifactSet(
  "Instructor",
  "Elemental Mastery +80",
  "Trigger elemental reaction, party members' Elemental Mastery +120 for 8s."
);
export const Lavawalker = new ArtifactSet(
  "Lavawalker",
  "Pyro RES +40%",
  "DMG, against opponents affected by Pyro, +35%"
);
export const LuckyDog = new ArtifactSet(
  "Lucky Dog",
  "DEF +100",
  "Picking up Mora restores 300 HP"
);
export const MaidenBeloved = new ArtifactSet(
  "Maiden Beloved",
  "Character Healing Effectiveness +15%",
  "Using Elemental Skill (ability) or Burst (ult) increases healing received by all party members by 20% for 10s."
);
export const MartialArtist = new ArtifactSet(
  "Martial Artist",
  "Normal and Charged Attack DMG +15%",
  "After using Elemental Skill (ability); Normal and Charged Attack DMG +25% for 8s"
);
export const NoblesseOblige = new ArtifactSet(
  "Noblesse Oblige",
  "Elemental Burst (ult) DMG +20%",
  "Using Elemental Burst (ult); all party members' ATK +20% for 12s. Non-stackable."
);
export const NymphsDream = new ArtifactSet(
  "Nymph's Dream",
  "Hydro DMG Bonus +15%",
  `After Normal/Charged/Plunging Attacks or Skill/Burst hits opponents, trigger 1 stack of "Mirrored Nymph" for 8s. 1/2/3 stacks of "Mirrored Nymph" +ATK 7/16/25% and +Hydro DMG Bonus 4/9/15%. Stacks created by Normal/Charged/Plunging Attacks or Skill/Burst are independent.`
);
export const OceanHuedClam = new ArtifactSet(
  "Ocean-Hued Clam",
  "Healing Bonus +15%",
  "Wearer heals party member, Sea-Dyed Foam appears for 3s, accumulating HP recovered (incl. overhealth). Sea-Dyed Foam explodes for 90% of accumulated healing after duration. Sea-Dyed Foam produced 1/3.5s. Max 30k hp accumulation (incl. overhealth). Only 1 Sea-Dyed Foam active at a time. Effect can trigger off-field."
);
export const PaleFlame = new ArtifactSet(
  "Pale Flame",
  "Physical DMG +25%",
  "When Elemental Skill (ability) hits opponent, ATK +9% for 7s. Max 2 stacks, then 2-set effect effect +100%. Can occur once every .3s."
);
export const PrayersOfDestiny = new ArtifactSet("Prayers for Destiny", "Affected by Hydro for 40% less time.", "");
export const PrayersOfIllumination = new ArtifactSet("Prayers for Illumination", "Affected by Pyro for 40% less time.", "");
export const PrayersOfWisdom = new ArtifactSet("Prayers for Wisdom", "Affected by Electro for 40% less time.", "");
export const PrayersOfSpringtime = new ArtifactSet("Prayers to Springtime", "Affected by Cryo for 40% less time.", "");
export const ResolutionOfSojourner = new ArtifactSet(
  "Resolution of Sojourner",
  "ATK +18%",
  "Charged Attack CRIT Rate +30%"
);
export const RetracingBolide = new ArtifactSet(
  "Retracing Bolide",
  "Shield Strength +35%",
  "While protected by shield, +40% Normal and Charged Attack DMG"
);
export const Scholar = new ArtifactSet(
  "Scholar",
  "Energy Recharge +20%",
  "Members using Bow/Catalyst gain 3 energy when elemental particle/orb is collected. Can only occur once every 3s."
);
export const ShimenawasReminiscence = new ArtifactSet(
  "Shimenawa's Reminiscence",
  "ATK +18%",
  "When using skill (ability) and has 15+ energy, -15 energy but +50% Normal/Charged/Plunging Attack DMG for 10s. Can only occur once while active."
);
export const TenacityOfTheMillelith = new ArtifactSet(
  "Tenacity of the Millelith",
  "HP +20%",
  "Skill (ability) hits opponent, +20% ATK & +30% Shield Strength for 3s for all party members. Can trigger off-field"
);
export const TheExile = new ArtifactSet(
  "The Exile",
  "Energy Recharge +20%",
  "Using Burst (ult); party members (excl. wearer) gain 2 energy every 2s for 6s. Max 10 energy. Non-stackable."
);
export const ThunderingFury = new ArtifactSet(
  "Thundering Fury",
  "Electro DMG Bonus +15%",
  "+40% DMG caused by Overloaded/Electro-Charged/Superconduct/Hyperbloom. +20% DMG Bonus conferred by Aggravate. Quicken or aforementioned Elemental Reactions triggered, Skill CD -1s. Can only occur 1/.8s."
);
export const Thundersoother = new ArtifactSet(
  "Thundersoother",
  "Electro RES +40%",
  "DMG against opponents affected by Electro +35%"
);
export const TinyMiracle = new ArtifactSet(
  "Tiny Miracle",
  "All Elemental RES +20%",
  "Elemental DMG given, corresponding Elemental RES +30% for 10s. Can only occur once every 10s."
);
export const TravelingDoctor = new ArtifactSet(
  "Traveling Doctor",
  "Incoming Healing Bonus +20%",
  "Burst (ult) restores 20% HP."
);
export const VermillionHereafter = new ArtifactSet(
  "Vermillion Hereafter",
  "ATK +18%",
  `After Burst (ult); wearer gains "Nascent Light" effect; ATK +8% for 16s. When HP decreases, additional ATK +10%. Max 4 stacks. Effect can trigger once every .8s. Nascent Light is dispelled when wearer leaves field. If Burst is used again during Nascent Light, original Nascent Light is dispelled.`
);
export const ViridescentVenerer = new ArtifactSet(
  "Viridescent Venerer",
  "Anemo DMG Bonus +15%",
  "Increases Swirl DMG by 60%. Decrease opponent's Elemental RES to Swirl element by 40% for 10s."
);
export const VourukashasGlow = new ArtifactSet(
  "Vourukasha's Glow",
  "HP +20%",
  "Skill (ability) and Burst (ult) DMG +10%. After wearer takes damage, additional +80% DMG Bonus for 5s. Max 5 stacks. Each stack duration counted independently. Can trigger off-field."
);
export const WanderersTroupe = new ArtifactSet(
  "Wanderer's Troupe",
  "Elemental Mastery +80",
  "Catalyst/Bow wearer, Charged Attack DMG +35%"
);

export const ArtifactSets = [
  Adventurer,
  ArchaicPetra,
  Berserker,
  BlizzardStrayer,
  BloodstainedChivalry,
  BraveHeart,
  CrimsonWitchOfFlames,
  DeepwoodMemories,
  DefendersWill,
  DesertPavilionChronicle,
  EchoesOfAnOffering,
  EmblemOfSeveredFate,
  FlowerOfParadiseLost,
  Gambler,
  GildedDreams,
  GladiatorsFinale,
  HeartOfDepth,
  HuskOfOpulentDreams,
  Instructor,
  Lavawalker,
  LuckyDog,
  MaidenBeloved,
  MartialArtist,
  NoblesseOblige,
  NymphsDream,
  OceanHuedClam,
  PaleFlame,
  PrayersOfDestiny,
  PrayersOfIllumination,
  PrayersOfWisdom,
  PrayersOfSpringtime,
  ResolutionOfSojourner,
  RetracingBolide,
  Scholar,
  ShimenawasReminiscence,
  TenacityOfTheMillelith,
  TheExile,
  ThunderingFury,
  Thundersoother,
  TinyMiracle,
  TravelingDoctor,
  VermillionHereafter,
  ViridescentVenerer,
  VourukashasGlow,
  WanderersTroupe
];

export default ArtifactSets;