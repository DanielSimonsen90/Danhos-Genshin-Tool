import { Rarity } from "@/common/types";
import { Character, CharacterSet, CharacterArtifactSet } from "../common/models";
import * as Sets from './artifact-sets';
import ElementalCrystals from "./materials/drops/crystals";
import * as LocalSpecialties from "./materials/local-specialties";
import * as MobDrops from './materials/drops';
import * as EasyMobDrops from './materials/drops/easy';
import * as TalentAscension from "./materials/talents";

const HPSets = (priority: CharacterArtifactSet['effectiveness']) => [
  new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, priority),
  new CharacterArtifactSet(Sets.VourukashasGlow, 2, priority),
];
const AttackSets = (priority: CharacterArtifactSet['effectiveness']) => [
  new CharacterArtifactSet(Sets.FragmentOfHarmonicWhimsy, 2, priority),
  new CharacterArtifactSet(Sets.GladiatorsFinale, 2, priority),
  new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, priority),
  new CharacterArtifactSet(Sets.VermillionHereafter, 2, priority),
  new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, priority),
];

const ElementalMasterySets = (priority: CharacterArtifactSet['effectiveness']) => [
  new CharacterArtifactSet(Sets.GildedDreams, 2, priority),
  new CharacterArtifactSet(Sets.WanderersTroupe, 2, priority),
  new CharacterArtifactSet(Sets.FlowerOfParadiseLost, 2, priority),
];
const EnergyRechargeSets = (priority: CharacterArtifactSet['effectiveness']) => [
  new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, priority),
  new CharacterArtifactSet(Sets.TheExile, 2, priority),
  new CharacterArtifactSet(Sets.Scholar, 2, priority),
];

const PhysicalDMGSets = (priority: CharacterArtifactSet['effectiveness']) => [
  new CharacterArtifactSet(Sets.PaleFlame, 2, priority),
  new CharacterArtifactSet(Sets.BloodstainedChivalry, 2, priority),
];
const HealingBonusSets = (priority: CharacterArtifactSet['effectiveness']) => [
  new CharacterArtifactSet(Sets.MaidenBeloved, 2, priority),
  new CharacterArtifactSet(Sets.OceanHuedClam, 2, priority),
  new CharacterArtifactSet(Sets.SongOfDaysPast, 2, priority)
];
const AnemoDMGSets = (priority: CharacterArtifactSet['effectiveness']) => [
  new CharacterArtifactSet(Sets.ViridescentVenerer, 2, priority),
  new CharacterArtifactSet(Sets.DesertPavilionChronicle, 2, priority),
];
const HydroDMGSets = (priority: CharacterArtifactSet['effectiveness']) => [
  new CharacterArtifactSet(Sets.HeartOfDepth, 2, priority),
  new CharacterArtifactSet(Sets.NymphsDream, 2, priority),
];

export const Albedo = new Character("Albedo", "Geo", "Sword", [], Rarity.Legendary, 'Mondstadt', {
  crystal: ElementalCrystals.Geo,
  localSpecialty: LocalSpecialties.Cecilia,
  material: TalentAscension.Ballad,
  mobDrop: EasyMobDrops.Scroll,
  worldBossDrop: MobDrops.BasaltPillar,
  weeklyBossDrop: MobDrops.TuskOfMonocerosCaeli,
}, [
  new CharacterSet("Off-field DPS", ["DEF"], 'Skill/Ability', false, [
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 5),
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 2, 4),
    new CharacterArtifactSet(Sets.ArchaicPetra, 2, 4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 3),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 2),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 1),
  ])
]);

export const Alhaitham = new Character("Alhaitham", "Dendro", "Sword", [], Rarity.Legendary, 'Sumeru', {
  crystal: ElementalCrystals.Dendro,
  localSpecialty: LocalSpecialties.SandGreasePupa,
  material: TalentAscension.Ingenuity,
  mobDrop: EasyMobDrops.EremiteDrop,
  worldBossDrop: MobDrops.PseudoStamens,
  weeklyBossDrop: MobDrops.MirrorOfMushin,
}, [
  new CharacterSet("Spread DPS", ["Elemental Mastery", "ATK"], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.GildedDreams, 4, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 4),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 2, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 4),
    new CharacterArtifactSet(Sets.WanderersTroupe, 2, 4),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 3),
  ])
]);

export const Aloy = new Character("Aloy", "Cryo", "Bow", [], Rarity.Legendary, 'Unknown', {
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.CrystalMarrow,
  material: TalentAscension.Freedom,
  mobDrop: EasyMobDrops.Spectral,
  worldBossDrop: MobDrops.CrystallineBloom,
  weeklyBossDrop: MobDrops.MoltenMoment,
}, [
  new CharacterSet("Burst Support", ["ATK"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 5),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 3),
    ...ElementalMasterySets(2),
    ...AttackSets(2),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 2),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 1),
  ])
]);

export const Amber = new Character("Amber", "Pyro", "Bow", ["Off-field Damage"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Freedom,
  weeklyBossDrop: MobDrops.DvalinsSigh,
  crystal: ElementalCrystals.Pyro,
  worldBossDrop: MobDrops.EverflameSeed,
  localSpecialty: LocalSpecialties.SmallLampGrass,
  mobDrop: EasyMobDrops.Arrowhead,
}, [
  new CharacterSet('Off-field Support', ["Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    new CharacterArtifactSet(Sets.Instructor, 4, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
    new CharacterArtifactSet(Sets.TheExile, 2, 3),
    new CharacterArtifactSet(Sets.Scholar, 2, 3),
    new CharacterArtifactSet(Sets.TheExile, 4, 2),
  ]),
  new CharacterSet("Off-field DPS", ["ATK"], "Normal/Press", false, [
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 5),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 4, 4),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 4),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 3),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 3),
    new CharacterArtifactSet(Sets.WanderersTroupe, 2, 3),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 2),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 2),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 2),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 2),
  ])
]);

export const AratakiItto = new Character("Arataki Itto", "Geo", "Claymore", ["Off-field Damage"], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Elegance,
  weeklyBossDrop: MobDrops.AshenHeart,
  crystal: ElementalCrystals.Geo,
  worldBossDrop: MobDrops.RiftbornRegalia,
  localSpecialty: LocalSpecialties.Onikabuto,
  mobDrop: EasyMobDrops.Slime,
}, [
  new CharacterSet("On-field DPS", ["DEF", "HP"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 5),
    new CharacterArtifactSet(Sets.DesertPavilionChronicle, 4, 4),
    new CharacterArtifactSet(Sets.RetracingBolide, 4, 4),
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 2, 3),
    new CharacterArtifactSet(Sets.ArchaicPetra, 2, 3),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
  ])
]);

export const Arlecchino = new Character("Arlecchino", "Pyro", "Polearm", ["Bond of Life"], Rarity.Legendary, 'Snezhnaya', {
  material: TalentAscension.Order,
  weeklyBossDrop: MobDrops.FadingCandle,
  crystal: ElementalCrystals.Pyro,
  worldBossDrop: MobDrops.FragmentOfAGoldenMelody,
  localSpecialty: LocalSpecialties.RainbowRose,
  mobDrop: EasyMobDrops.FatuiInsignia,
}, [
  new CharacterSet("On-field DPS", ["ATK", "HP"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.FragmentOfHarmonicWhimsy, 4, 5),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 4),
    new CharacterArtifactSet(Sets.DesertPavilionChronicle, 4, 3),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 2),
    new CharacterArtifactSet(Sets.FragmentOfHarmonicWhimsy, 2, 2),
    ...AttackSets(1),
  ])
]);

export const Baizhu = new Character("Baizhu", "Dendro", "Catalyst", ["Heal"], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Gold,
  weeklyBossDrop: MobDrops.WorldspanFern,
  crystal: ElementalCrystals.Dendro,
  worldBossDrop: MobDrops.EvergloomRing,
  mobDrop: EasyMobDrops.FungalSpores,
  localSpecialty: LocalSpecialties.Violetgrass,
}, [
  new CharacterSet("Off-field Support", ["HP", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 5),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 4),
    new CharacterArtifactSet(Sets.Instructor, 4, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 2),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 1),
    new CharacterArtifactSet(Sets.VourukashasGlow, 2, 1),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 1),
  ])
]);

export const Barbara = new Character("Barbara", "Hydro", "Catalyst", ["Heal"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Freedom,
  weeklyBossDrop: MobDrops.RingOfBoreas,
  crystal: ElementalCrystals.Hydro,
  worldBossDrop: MobDrops.CleansingHeart,
  localSpecialty: LocalSpecialties.PhilanemoMushroom,
  mobDrop: EasyMobDrops.Scroll,
}, [
  new CharacterSet("Off-field Support", ["HP"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.MaidenBeloved, 4, 5),
    new CharacterArtifactSet(Sets.MaidenBeloved, 2, 4),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 4),
    new CharacterArtifactSet(Sets.OceanHuedClam, 2, 4),
    new CharacterArtifactSet(Sets.Instructor, 4, 3),
  ]),
  new CharacterSet("Bloom DPS", ["Elemental Mastery"], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.FlowerOfParadiseLost, 4, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 4),
    ...ElementalMasterySets(3),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 2),
  ])
]);

export const Beidou = new Character("Beidou", "Electro", "Claymore", ["Shield"], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Gold,
  weeklyBossDrop: MobDrops.DvalinsSigh,
  crystal: ElementalCrystals.Electro,
  worldBossDrop: MobDrops.LightningPrism,
  localSpecialty: LocalSpecialties.NoctilucousJade,
  mobDrop: EasyMobDrops.FatuiInsignia,
}, [
  new CharacterSet("Off-field DPS", ["ATK"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 4),
    ...AttackSets(4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 4),
    new CharacterArtifactSet(Sets.Thundersoother, 4, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 2),
  ])
]);

export const Bennett = new Character("Bennett", "Pyro", "Sword", ["Heal", "Buff ATK: While inside Bennett's ult"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.DvalinsPlume,
  crystal: ElementalCrystals.Pyro,
  worldBossDrop: MobDrops.EverflameSeed,
  localSpecialty: LocalSpecialties.WindwheelAster,
  mobDrop: EasyMobDrops.TreasureHoarderInsignia,
}, [
  new CharacterSet("Burst Support", ["HP", "ATK"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 4),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 2),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 2),
    ...AttackSets(2),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 2),
    new CharacterArtifactSet(Sets.WanderersTroupe, 2, 2),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 2),
  ]),
  new CharacterSet("On-field DPS", ["Elemental Mastery"], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 5),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 4),
    ...AttackSets(4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 4),
    new CharacterArtifactSet(Sets.WanderersTroupe, 2, 4),
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 3),
  ]),
  new CharacterSet("Off-field Support", ["Energy Recharge", "HP"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 4),
    new CharacterArtifactSet(Sets.TheExile, 4, 4),
    new CharacterArtifactSet(Sets.Scholar, 4, 4),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 3),
    new CharacterArtifactSet(Sets.OceanHuedClam, 2, 3),
    new CharacterArtifactSet(Sets.MaidenBeloved, 2, 3),
    new CharacterArtifactSet(Sets.Instructor, 4, 2),
  ])
]);

export const Candace = new Character("Candace", "Hydro", "Polearm", ["Shield", "Off-field Damage"], Rarity.Epic, 'Sumeru', {
  material: TalentAscension.Admonition,
  weeklyBossDrop: MobDrops.TearsOfTheCalamitousGod,
  crystal: ElementalCrystals.Hydro,
  worldBossDrop: MobDrops.LightGuidingTetrahedron,
  localSpecialty: LocalSpecialties.HennaBerry, // Referred to as "Redcrest"
  mobDrop: EasyMobDrops.EremiteDrop,
}, [
  new CharacterSet("Off-field Support", ["HP", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 4),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 3),
    ...HPSets(2),
  ])
]);

export const Charlotte = new Character("Charlotte", "Cryo", "Catalyst", ["Heal"], Rarity.Epic, 'Fontaine', {
  material: TalentAscension.Justice,
  weeklyBossDrop: MobDrops.LightlessSilkString,
  crystal: ElementalCrystals.Cryo,
  worldBossDrop: MobDrops.TourbillonDevice,
  localSpecialty: LocalSpecialties.BerylConch,
  mobDrop: EasyMobDrops.Gear,
}, [
  new CharacterSet("Off-field Support", ["ATK", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 4),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 3),
    ...AttackSets(3),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 2),
  ])
]);

export const Chasca = new Character("Chasca", "Anemo", "Bow", ["Nightsouls Blessing"], Rarity.Legendary, 'Natlan', {
  material: TalentAscension.Conflict,
  weeklyBossDrop: MobDrops.SilkenFeather,
  crystal: ElementalCrystals.Anemo,
  worldBossDrop: MobDrops.EnsnaringGaze,
  localSpecialty: LocalSpecialties.WitheringPurpurbloom,
  mobDrop: EasyMobDrops.Fang,
}, [
  new CharacterSet("On-field DPS", ["ATK", "Elemental Mastery"], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 5),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 4),
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 3),
    ...ElementalMasterySets(3),
  ])
]);

export const Chevreuse = new Character("Chevreuse", "Pyro", "Polearm", ["Heal"], Rarity.Epic, 'Fontaine', {
  material: TalentAscension.Order,
  weeklyBossDrop: MobDrops.LightlessEyeOfTheMaelstrom,
  crystal: ElementalCrystals.Pyro,
  worldBossDrop: MobDrops.FontemerUnihorn,
  localSpecialty: LocalSpecialties.LumidouceBell,
  mobDrop: EasyMobDrops.Gear,
}, [
  new CharacterSet("Off-field Support", ["HP"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 4),
    new CharacterArtifactSet(Sets.SongOfDaysPast, 4, 3),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 2),
    new CharacterArtifactSet(Sets.VourukashasGlow, 2, 2),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 1),
    new CharacterArtifactSet(Sets.OceanHuedClam, 2, 1),
  ]),
]);

export const Chiori = new Character("Chiori", "Geo", "Sword", ["Off-field Damage"], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Light,
  weeklyBossDrop: MobDrops.LightlessSilkString,
  crystal: ElementalCrystals.Geo,
  worldBossDrop: MobDrops.ArtificedSpareClockworkComponent__Coppelia,
  localSpecialty: LocalSpecialties.Dendrobium,
  mobDrop: EasyMobDrops.Spectral,
}, [
  new CharacterSet("Off-field DPS", ["DEF", "ATK"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 5),
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 2, 4),
    new CharacterArtifactSet(Sets.ArchaicPetra, 2, 4),
  ])
]);

export const Chongyun = new Character("Chongyun", "Cryo", "Claymore", [], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Diligence,
  weeklyBossDrop: MobDrops.DvalinsSigh,
  crystal: ElementalCrystals.Cryo,
  worldBossDrop: MobDrops.HoarfrostCore,
  localSpecialty: LocalSpecialties.CorLapis,
  mobDrop: EasyMobDrops.Mask,
}, [
  new CharacterSet("Burst Support", ["ATK"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 5),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 5),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 3),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 3),
    ...ElementalMasterySets(3),
    ...AttackSets(3),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 2),
  ])
]);

export const Citlali = new Character("Citlali", "Cryo", "Catalyst", ["Shield", "Nightsouls Blessing"], Rarity.Legendary, 'Natlan', {
  material: TalentAscension.Kindling,
  weeklyBossDrop: MobDrops.DenialAndJudgment,
  crystal: ElementalCrystals.Cryo,
  worldBossDrop: MobDrops.TalismanOftheEnigmaticLand,
  localSpecialty: LocalSpecialties.QuenepaBerry,
  mobDrop: EasyMobDrops.Fang,
}, [
  new CharacterSet("Off-field Support", ["Elemental Mastery", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 5),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 4),
    new CharacterArtifactSet(Sets.Instructor, 4, 3),
  ])
]);

export const Clorinde = new Character("Clorinde", "Electro", "Sword", ["Bond of Life"], Rarity.Legendary, 'Fontaine', {
  material: TalentAscension.Justice,
  weeklyBossDrop: MobDrops.Everamber,
  crystal: ElementalCrystals.Electro,
  worldBossDrop: MobDrops.FontemerUnihorn,
  localSpecialty: LocalSpecialties.Lumitoile,
  mobDrop: EasyMobDrops.FontemerAberrantPearl,
}, [
  new CharacterSet("On-field DPS", ["ATK", "HP"], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.FragmentOfHarmonicWhimsy, 4, 5),
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 4),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 3),
  ])
]);

export const Collei = new Character("Collei", "Dendro", "Bow", [], Rarity.Epic, 'Sumeru', {
  material: TalentAscension.Praxis,
  weeklyBossDrop: MobDrops.TearsOfTheCalamitousGod,
  crystal: ElementalCrystals.Dendro,
  worldBossDrop: MobDrops.MajesticHookedBeak,
  localSpecialty: LocalSpecialties.RukkhashavaMushrooms,
  mobDrop: EasyMobDrops.Arrowhead,
}, [
  new CharacterSet("Off-field Support", ["Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 4),
    ...ElementalMasterySets(3),
    new CharacterArtifactSet(Sets.TheExile, 4, 3),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 2),
  ])
]);

export const Cyno = new Character("Cyno", "Electro", "Polearm", [], Rarity.Legendary, 'Sumeru', {
  material: TalentAscension.Admonition,
  weeklyBossDrop: MobDrops.MudraOfTheMaleficGeneral,
  crystal: ElementalCrystals.Electro,
  worldBossDrop: MobDrops.ThunderclapFruitcore,
  localSpecialty: LocalSpecialties.Scarab,
  mobDrop: EasyMobDrops.Scroll,
}, [
  new CharacterSet("Quicken DPS", ["Energy Recharge", "Elemental Mastery", "ATK"], "Burst/Ult", true, [
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 4),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 3),
    new CharacterArtifactSet(Sets.WanderersTroupe, 2, 3),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 3),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 2),
    new CharacterArtifactSet(Sets.FlowerOfParadiseLost, 4, 1),
  ]),
  new CharacterSet("Aggravate DPS", ["Energy Recharge", "Elemental Mastery", "ATK"], "Burst/Ult", true, [
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 5),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 4),
    ...AttackSets(3),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 3),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
    ...ElementalMasterySets(3),
    new CharacterArtifactSet(Sets.Thundersoother, 4, 2),
  ])
]);

export const Dehya = new Character("Dehya", "Pyro", "Claymore", ["Self-heal", "Off-field Damage"], Rarity.Legendary, 'Sumeru', {
  material: TalentAscension.Praxis,
  weeklyBossDrop: MobDrops.PuppetStrings,
  crystal: ElementalCrystals.Pyro,
  worldBossDrop: MobDrops.LightGuidingTetrahedron,
  localSpecialty: LocalSpecialties.SandGreasePupa,
  mobDrop: EasyMobDrops.EremiteDrop,
}, [
  new CharacterSet("On-field DPS", ["ATK", "HP"], "Burst/Ult", true, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 5),
    new CharacterArtifactSet(Sets.VourukashasGlow, 4, 4),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 3),
    new CharacterArtifactSet(Sets.Lavawalker, 4, 2),
  ]),
  new CharacterSet("Off-field DPS", ["HP", "ATK"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 5),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 4),
    new CharacterArtifactSet(Sets.VourukashasGlow, 2, 4),
    new CharacterArtifactSet(Sets.Instructor, 4, 3),
  ]),
  new CharacterSet("Burgeon DPS", ["ATK", "HP"], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.FlowerOfParadiseLost, 4, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 4),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 3),
    new CharacterArtifactSet(Sets.WanderersTroupe, 2, 3),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 2),
  ])
]);

export const Diluc = new Character("Diluc", "Pyro", "Claymore", [], Rarity.Legendary, 'Mondstadt', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.DvalinsPlume,
  crystal: ElementalCrystals.Pyro,
  worldBossDrop: MobDrops.EverflameSeed,
  localSpecialty: LocalSpecialties.SmallLampGrass,
  mobDrop: EasyMobDrops.FatuiInsignia,
}, [
  new CharacterSet("On-field DPS", ["ATK"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 4),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 3),
    ...AttackSets(3),
    ...ElementalMasterySets(3),
  ]),
]);

export const Diona = new Character("Diona", "Cryo", "Bow", ["Shield"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Freedom,
  weeklyBossDrop: MobDrops.ShardOfAFoulLegacy,
  crystal: ElementalCrystals.Cryo,
  worldBossDrop: MobDrops.HoarfrostCore,
  localSpecialty: LocalSpecialties.CallaLily,
  mobDrop: EasyMobDrops.Arrowhead,
}, [
  new CharacterSet("Off-field Support", ["HP", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 4),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 4),
    new CharacterArtifactSet(Sets.MaidenBeloved, 2, 3),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 3),
    new CharacterArtifactSet(Sets.MaidenBeloved, 4, 2),
    new CharacterArtifactSet(Sets.MaidenBeloved, 2, 2),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 2),
    new CharacterArtifactSet(Sets.TheExile, 2, 2),
    new CharacterArtifactSet(Sets.Scholar, 2, 2),
    new CharacterArtifactSet(Sets.TheExile, 4, 2),
    new CharacterArtifactSet(Sets.Instructor, 4, 2),
  ]),
]);

export const Dori = new Character("Dori", "Electro", "Claymore", ["Heal"], Rarity.Epic, 'Sumeru', {
  material: TalentAscension.Ingenuity,
  weeklyBossDrop: MobDrops.BloodjadeBranch,
  crystal: ElementalCrystals.Electro,
  worldBossDrop: MobDrops.ThunderclapFruitcore,
  localSpecialty: LocalSpecialties.KalpalataLotus,
  mobDrop: EasyMobDrops.EremiteDrop,
}, [
  new CharacterSet("Off-field Support", ["HP", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 4),
    new CharacterArtifactSet(Sets.Instructor, 4, 3),
    new CharacterArtifactSet(Sets.TheExile, 4, 2),
  ]),
]);

export const Emilie = new Character("Emilie", "Dendro", "Catalyst", ["Off-field Damage"], Rarity.Legendary, 'Fontaine', {
  material: TalentAscension.Order,
  weeklyBossDrop: MobDrops.SilkenFeather,
  crystal: ElementalCrystals.Dendro,
  worldBossDrop: MobDrops.FragmentOfAGoldenMelody,
  localSpecialty: LocalSpecialties.LakelightLily,
  mobDrop: EasyMobDrops.Gear,
}, [
  new CharacterSet("Off-field Support", ["ATK", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.UnfinishedReverie, 4, 5),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 4),
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 3),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 2, 2),
    new CharacterArtifactSet(Sets.GoldenTroupe, 2, 2),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 2, 1),
    ...AttackSets(1),
  ]),
]);

export const Eula = new Character("Eula", "Cryo", "Claymore", [], Rarity.Legendary, 'Mondstadt', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.DragonLordsCrown,
  crystal: ElementalCrystals.Cryo,
  worldBossDrop: MobDrops.CrystallineBloom,
  localSpecialty: LocalSpecialties.DandelionSeed,
  mobDrop: EasyMobDrops.Mask,
}, [
  new CharacterSet("On-field DPS", ["ATK"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.PaleFlame, 4, 5),
    new CharacterArtifactSet(Sets.PaleFlame, 2, 4),
    new CharacterArtifactSet(Sets.BloodstainedChivalry, 2, 4),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 3),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 3),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 3),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 3),
    new CharacterArtifactSet(Sets.PaleFlame, 2, 3),
    new CharacterArtifactSet(Sets.BloodstainedChivalry, 2, 3),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 2),
    ...AttackSets(1),
  ]),
]);

export const Faruzan = new Character("Faruzan", "Anemo", "Bow", ["CRIT Increase: For Anemo DMG if C6 and ult is active", "Off-field Damage"], Rarity.Epic, 'Sumeru', {
  material: TalentAscension.Admonition,
  weeklyBossDrop: MobDrops.PuppetStrings,
  crystal: ElementalCrystals.Anemo,
  worldBossDrop: MobDrops.LightGuidingTetrahedron,
  localSpecialty: LocalSpecialties.HennaBerry,
  mobDrop: EasyMobDrops.EremiteDrop,
}, [
  new CharacterSet("Off-field Support", ["Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 3),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 2),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 1),
    new CharacterArtifactSet(Sets.TheExile, 2, 1),
    new CharacterArtifactSet(Sets.Scholar, 2, 1),
  ])
]);

export const Fischl = new Character("Fischl", "Electro", "Bow", ["Off-field Damage"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Ballad,
  weeklyBossDrop: MobDrops.SpiritLocketOfBoreas,
  crystal: ElementalCrystals.Electro,
  worldBossDrop: MobDrops.LightningPrism,
  localSpecialty: LocalSpecialties.SmallLampGrass,
  mobDrop: EasyMobDrops.Arrowhead,
}, [
  new CharacterSet("Off-field DPS", ["ATK"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 5),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 4),
    ...AttackSets(4),
    new CharacterArtifactSet(Sets.Thundersoother, 4, 3),
  ]),
  new CharacterSet("Aggravate DPS", ["ATK"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 5),
    new CharacterArtifactSet(Sets.WanderersTroupe, 2, 5),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 4),
    ...AttackSets(4),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 3),
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 2),
    new CharacterArtifactSet(Sets.Thundersoother, 4, 1),
  ])
]);

export const Freminet = new Character("Freminet", "Cryo", "Claymore", [], Rarity.Epic, 'Fontaine', {
  material: TalentAscension.Justice,
  weeklyBossDrop: MobDrops.WorldspanFern,
  crystal: ElementalCrystals.Cryo,
  worldBossDrop: MobDrops.ArtificedSpareClockworkComponent__Coppelius,
  localSpecialty: LocalSpecialties.RomaritimeFlower,
  mobDrop: EasyMobDrops.FontemerAberrantPearl,
}, [
  new CharacterSet("On-field DPS", ["ATK"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 5),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 4),
    ...AttackSets(4),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 2),
  ])
]);

export const Furina = new Character("Furina", "Hydro", "Sword", ["Heal", "Off-field Damage"], Rarity.Legendary, 'Fontaine', {
  material: TalentAscension.Justice,
  weeklyBossDrop: MobDrops.LightlessMass,
  crystal: ElementalCrystals.Hydro,
  worldBossDrop: MobDrops.WaterThatFailedToTranscend,
  localSpecialty: LocalSpecialties.LakelightLily,
  mobDrop: EasyMobDrops.Nectar,
}, [
  new CharacterSet("Off-field Support", ["HP"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 5),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 4),
    new CharacterArtifactSet(Sets.GoldenTroupe, 2, 3),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 3),
    new CharacterArtifactSet(Sets.GoldenTroupe, 2, 2),
    new CharacterArtifactSet(Sets.HeartOfDepth, 2, 2),
    new CharacterArtifactSet(Sets.HeartOfDepth, 2, 1),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 1),
  ]),
]);

export const Gaming = new Character("Gaming", "Pyro", "Claymore", ["Self-heal"], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Prosperity,
  weeklyBossDrop: MobDrops.LightlessMass,
  crystal: ElementalCrystals.Pyro,
  worldBossDrop: MobDrops.EmperorsResolution,
  localSpecialty: LocalSpecialties.Starconch,
  mobDrop: EasyMobDrops.Slime,
}, [
  new CharacterSet("On-field DPS", ["ATK", "HP"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 5),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 4),
    ...AttackSets(4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 4),
    new CharacterArtifactSet(Sets.WanderersTroupe, 2, 4),
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 3),
  ]),
]);

export const Ganyu = new Character("Ganyu", "Cryo", "Bow", ["Off-field Damage"], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Diligence,
  weeklyBossDrop: MobDrops.ShadowOfTheWarrior,
  crystal: ElementalCrystals.Cryo,
  worldBossDrop: MobDrops.ShadowOfTheWarrior,
  localSpecialty: LocalSpecialties.Qingxin,
  mobDrop: EasyMobDrops.Nectar,
}, [
  new CharacterSet("Melt DPS", ["HP"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 4, 5),
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 4),
    ...ElementalMasterySets(3),
    ...AttackSets(3),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 3),
  ]),
  new CharacterSet("Freeze DPS", ["ATK", "HP"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 5),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 4),
    ...AttackSets(4),
  ]),
  new CharacterSet("Off-field DPS", ["HP", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 2),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 2),
    ...AttackSets(2),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 2),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 1),
  ])
]);

export const Gorou = new Character("Gorou", "Geo", "Bow", ["Shield"], Rarity.Epic, 'Inazuma', {
  material: TalentAscension.Light,
  weeklyBossDrop: MobDrops.MoltenMoment,
  crystal: ElementalCrystals.Geo,
  worldBossDrop: MobDrops.PerpetualHeart,
  localSpecialty: LocalSpecialties.SangoPearl,
  mobDrop: EasyMobDrops.Spectral,
}, [
  new CharacterSet("Off-field Support", ["DEF"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.TheExile, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
    new CharacterArtifactSet(Sets.TheExile, 2, 3),
    new CharacterArtifactSet(Sets.Scholar, 2, 3),
  ])
]);

export const HuTao = new Character("Hu Tao", "Pyro", "Polearm", ["Self-heal"], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Diligence,
  weeklyBossDrop: MobDrops.ShardOfAFoulLegacy,
  crystal: ElementalCrystals.Pyro,
  worldBossDrop: MobDrops.JuvenileJade,
  localSpecialty: LocalSpecialties.SilkFlower,
  mobDrop: EasyMobDrops.Nectar,
}, [
  new CharacterSet("On-field DPS", ["HP", "Elemental Mastery", "ATK"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 5),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 4, 4),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 3),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 2),
    ...ElementalMasterySets(2),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 2),
    new CharacterArtifactSet(Sets.RetracingBolide, 4, 1),
  ]),
]);

export const Jean = new Character("Jean", "Anemo", "Sword", ["Heal"], Rarity.Legendary, 'Mondstadt', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.DvalinsPlume,
  crystal: ElementalCrystals.Anemo,
  worldBossDrop: MobDrops.HurricaneSeed,
  localSpecialty: LocalSpecialties.DandelionSeed,
  mobDrop: EasyMobDrops.Mask,
}, [
  new CharacterSet("Off-field Support", ["ATK"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 4),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 3),
    new CharacterArtifactSet(Sets.ViridescentVenerer, 2, 2),
    new CharacterArtifactSet(Sets.DesertPavilionChronicle, 2, 2),
    ...AttackSets(2),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 2),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 1),
  ])
]);

export const Kachina = new Character("Kachina", "Geo", "Polearm", ["Off-field Damage", "Nightsouls Blessing"], Rarity.Epic, "Natlan", {
  material: TalentAscension.Conflict,
  weeklyBossDrop: MobDrops.FadingCandle,
  crystal: ElementalCrystals.Geo,
  worldBossDrop: MobDrops.OverripeFlamegranate,
  localSpecialty: LocalSpecialties.QuenepaBerry,
  mobDrop: EasyMobDrops.Whistle,
}, [
  new CharacterSet("Off-field DPS", ["DEF"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 5),
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 4),
    new CharacterArtifactSet(Sets.ArchaicPetra, 4, 3),
    new CharacterArtifactSet(Sets.ArchaicPetra, 2, 2),
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 2, 2),
  ])
]);

export const KaedeharaKazuha = new Character("Kaedehara Kazuha", "Anemo", "Sword", [
  "Off-field Damage", "Grouping", "Elemental based: Ult can be infused with other party member elements excl. Anemo & Dendro"
], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Diligence,
  weeklyBossDrop: MobDrops.GildedScale,
  crystal: ElementalCrystals.Anemo,
  worldBossDrop: MobDrops.MarionetteCore,
  localSpecialty: LocalSpecialties.SeaGanoderma,
  mobDrop: EasyMobDrops.TreasureHoarderInsignia,
}, [
  new CharacterSet("Off-field Support", ["Elemental Mastery", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 5),
    new CharacterArtifactSet(Sets.Instructor, 4, 4),
    ...ElementalMasterySets(3),
    new CharacterArtifactSet(Sets.ViridescentVenerer, 2, 3),
  ])
]);

export const Kaeya = new Character("Kaeya", "Cryo", "Sword", ["Off-field Damage", "Self-heal"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Ballad,
  weeklyBossDrop: MobDrops.SpiritLocketOfBoreas,
  crystal: ElementalCrystals.Cryo,
  worldBossDrop: MobDrops.HoarfrostCore,
  localSpecialty: LocalSpecialties.CallaLily,
  mobDrop: EasyMobDrops.TreasureHoarderInsignia,
}, [
  new CharacterSet("Freeze Support", ["ATK"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 5),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 4),
    ...AttackSets(4),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 3),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 2),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 2),
  ]),
  new CharacterSet("Reverse-Melt Support", ["Energy Recharge", "ATK"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 3),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 2),
    new CharacterArtifactSet(Sets.Instructor, 4, 1),
  ])
]);

export const KamisatoAyaka = new Character("Kamisato Ayaka", "Cryo", "Sword", ["Off-field Damage"], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Elegance,
  weeklyBossDrop: MobDrops.BloodjadeBranch,
  crystal: ElementalCrystals.Cryo,
  worldBossDrop: MobDrops.PerpetualHeart,
  localSpecialty: LocalSpecialties.SakuraBloom,
  mobDrop: EasyMobDrops.Handguard,
}, [
  new CharacterSet("On-field DPS", ["ATK"], "Burst/Ult", true, [
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 5),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 4),
    ...AttackSets(4),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 3),
    ...AttackSets(3),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 2),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 2),
  ])
]);

export const KamisatoAyato = new Character("Kamisato Ayato", "Hydro", "Sword", [], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Elegance,
  weeklyBossDrop: MobDrops.MudraOfTheMaleficGeneral,
  crystal: ElementalCrystals.Hydro,
  worldBossDrop: MobDrops.DewOfRepudiation,
  localSpecialty: LocalSpecialties.SakuraBloom,
  mobDrop: EasyMobDrops.Handguard,
}, [
  new CharacterSet("On-field DPS", ["ATK"], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.HeartOfDepth, 4, 5),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 4),
    new CharacterArtifactSet(Sets.HeartOfDepth, 2, 3),
    ...AttackSets(3),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 2),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 4, 1),
  ])
]);

export const Kaveh = new Character("Kaveh", "Dendro", "Claymore", ["Self-heal"], Rarity.Epic, 'Sumeru', {
  material: TalentAscension.Ingenuity,
  weeklyBossDrop: MobDrops.PrimordialGreenbloom,
  crystal: ElementalCrystals.Dendro,
  worldBossDrop: MobDrops.QuielledCreeper,
  localSpecialty: LocalSpecialties.MourningFlower,
  mobDrop: EasyMobDrops.FungalSpores,
}, [
  new CharacterSet("Bloom DPS", ["Energy Recharge", "Elemental Mastery"], "Burst/Ult", true, [
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 5),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 4),
    new CharacterArtifactSet(Sets.FlowerOfParadiseLost, 4, 3),
    new CharacterArtifactSet(Sets.Instructor, 4, 2),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 1),
  ])
]);

export const Keqing = new Character("Keqing", "Electro", "Sword", [], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Prosperity,
  weeklyBossDrop: MobDrops.RingOfBoreas,
  crystal: ElementalCrystals.Electro,
  worldBossDrop: MobDrops.LightningPrism,
  localSpecialty: LocalSpecialties.CorLapis,
  mobDrop: EasyMobDrops.Nectar,
}, [
  new CharacterSet("On-field DPS", ["ATK"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 5),
    ...AttackSets(5),
    ...AttackSets(4),
    new CharacterArtifactSet(Sets.Thundersoother, 4, 3)
  ]),
  new CharacterSet("Aggravate DPS", ["ATK", "Elemental Mastery"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 5),
    new CharacterArtifactSet(Sets.Thundersoother, 4, 4),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 3),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 2),
    ...ElementalMasterySets(2),
    ...AttackSets(2),
  ]),
  new CharacterSet("Physical DPS", ["ATK"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.PaleFlame, 4, 5),
    new CharacterArtifactSet(Sets.PaleFlame, 2, 4),
    new CharacterArtifactSet(Sets.BloodstainedChivalry, 2, 4),
    ...PhysicalDMGSets(3),
    ...AttackSets(3),
    new CharacterArtifactSet(Sets.RetracingBolide, 4, 2),
    new CharacterArtifactSet(Sets.BloodstainedChivalry, 4, 1),
  ])
]);

export const Kinich = new Character("Kinich", "Dendro", "Claymore", ["Off-field Damage", "Nightsouls Blessing"], Rarity.Legendary, 'Natlan', {
  material: TalentAscension.Kindling,
  weeklyBossDrop: MobDrops.DenialAndJudgment,
  crystal: ElementalCrystals.Dendro,
  worldBossDrop: MobDrops.OverripeFlamegranate,
  localSpecialty: LocalSpecialties.SaurianClawSucculent,
  mobDrop: EasyMobDrops.Fang,
}, [
  new CharacterSet("On-field DPS", ["ATK"], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 5),
    new CharacterArtifactSet(Sets.UnfinishedReverie, 4, 4),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 2, 3),
    ...AttackSets(3)
  ]),
  new CharacterSet("Burning DPS", ["ATK"], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 5),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 4),
    new CharacterArtifactSet(Sets.UnfinishedReverie, 4, 3),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 2, 2),
    ...AttackSets(1)
  ])
]);

export const Kirara = new Character("Kirara", "Dendro", "Sword", ["Shield"], Rarity.Epic, 'Inazuma', {
  material: TalentAscension.Transience,
  weeklyBossDrop: MobDrops.Everamber,
  crystal: ElementalCrystals.Dendro,
  worldBossDrop: MobDrops.EvergloomRing,
  localSpecialty: LocalSpecialties.AmakumoFruit,
  mobDrop: EasyMobDrops.Spectral,
}, [
  new CharacterSet("Off-field Support", ["HP", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 5),
    new CharacterArtifactSet(Sets.VourukashasGlow, 2, 5),
    new CharacterArtifactSet(Sets.Instructor, 4, 4),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 2),
  ])
]);

export const Klee = new Character("Klee", "Pyro", "Catalyst", [], Rarity.Legendary, 'Mondstadt', {
  material: TalentAscension.Freedom,
  weeklyBossDrop: MobDrops.RingOfBoreas,
  crystal: ElementalCrystals.Pyro,
  worldBossDrop: MobDrops.EverflameSeed,
  localSpecialty: LocalSpecialties.PhilanemoMushroom,
  mobDrop: EasyMobDrops.Scroll,
}, [
  new CharacterSet("On-field DPS", ["ATK"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 5),
    ...AttackSets(5),
    new CharacterArtifactSet(Sets.Lavawalker, 4, 4),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 3),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 2),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 2),
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 1),
  ])
]);

export const KujouSara = new Character("Kujou Sara", "Electro", "Bow", ["Off-field Damage",], Rarity.Epic, 'Inazuma', {
  material: TalentAscension.Elegance,
  weeklyBossDrop: MobDrops.AshenHeart,
  crystal: ElementalCrystals.Electro,
  worldBossDrop: MobDrops.StormBeads,
  localSpecialty: LocalSpecialties.Dendrobium,
  mobDrop: EasyMobDrops.Mask,
}, [
  new CharacterSet("Burst Support", ["ATK"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 3),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 2),
    ...AttackSets(2),
  ])
]);

export const KukiShinobu = new Character("Kuki Shinobu", "Electro", "Sword", ["Heal"], Rarity.Epic, 'Inazuma', {
  material: TalentAscension.Elegance,
  weeklyBossDrop: MobDrops.TearsOfTheCalamitousGod,
  crystal: ElementalCrystals.Electro,
  worldBossDrop: MobDrops.RunicFang,
  localSpecialty: LocalSpecialties.NakuWeed,
  mobDrop: EasyMobDrops.Spectral,
}, [
  new CharacterSet("Hyperbloom Support", ["Elemental Mastery", "HP"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.FlowerOfParadiseLost, 4, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 4),
    ...ElementalMasterySets(3),
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 2),
  ]),
  new CharacterSet("Aggravate Support", ["Energy Recharge", "Elemental Mastery", "HP"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.GildedDreams, 4, 5),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 4),
    ...ElementalMasterySets(4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
    new CharacterArtifactSet(Sets.Thundersoother, 4, 3),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 2),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 1)
  ]),
  new CharacterSet("Off-field Support", ["HP"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 4),
    new CharacterArtifactSet(Sets.Instructor, 2, 3),
    new CharacterArtifactSet(Sets.TheExile, 2, 3),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 2),
  ])
]);

export const LanYan = new Character("Lan Yan", "Anemo", "Catalyst", ["Shield", "Grouping"], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Diligence,
  weeklyBossDrop: MobDrops.ErodedSunfire,
  crystal: ElementalCrystals.Anemo,
  worldBossDrop: MobDrops.SecretSourceAirflowAccumulator,
  localSpecialty: LocalSpecialties.ClearwaterJade,
  mobDrop: EasyMobDrops.Nectar,
}, [
  new CharacterSet("Off-field Support", ["Elemental Mastery"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 4),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 3),
    new CharacterArtifactSet(Sets.ViridescentVenerer, 2, 2),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 2),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 1),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 1),
  ])
]);

export const Layla = new Character("Layla", "Cryo", "Sword", ["Shield"], Rarity.Epic, 'Sumeru', {
  material: TalentAscension.Ingenuity,
  weeklyBossDrop: MobDrops.MirrorOfMushin,
  crystal: ElementalCrystals.Cryo,
  worldBossDrop: MobDrops.PerpetualCaliber,
  localSpecialty: LocalSpecialties.NilotpalaLotus,
  mobDrop: EasyMobDrops.Scroll,
}, [
  new CharacterSet("Off-field Support", ["HP", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 4),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 3),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 3),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 2),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 1),
  ]),
]);

export const Lisa = new Character("Lisa", "Electro", "Catalyst", ["Off-field Damage"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Ballad,
  weeklyBossDrop: MobDrops.DvalinsClaw,
  crystal: ElementalCrystals.Electro,
  worldBossDrop: MobDrops.LightningPrism,
  localSpecialty: LocalSpecialties.Valberry,
  mobDrop: EasyMobDrops.Slime,
}, [
  new CharacterSet("Aggravate DPS", ["ATK", "Elemental Mastery"], "Burst/Ult", true, [
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 4),
    new CharacterArtifactSet(Sets.Thundersoother, 4, 3),
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 2),
    ...AttackSets(2),
    ...ElementalMasterySets(2),
  ]),
  new CharacterSet("Off-field DPS", ["ATK", "Elemental Mastery", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 5),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 4),
    ...AttackSets(4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 2),
    new CharacterArtifactSet(Sets.Thundersoother, 4, 1),
  ]),
  new CharacterSet("Overloaded DPS", ["Elemental Mastery", "Energy Recharge"], "Burst/Ult", true, [
    new CharacterArtifactSet(Sets.FlowerOfParadiseLost, 4, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 4),
    ...ElementalMasterySets(3),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 2),
    new CharacterArtifactSet(Sets.Instructor, 4, 1),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 1),
  ])
]);

export const Lynette = new Character("Lynette", "Anemo", "Sword", [], Rarity.Epic, 'Fontaine', {
  material: TalentAscension.Order,
  weeklyBossDrop: MobDrops.Everamber,
  crystal: ElementalCrystals.Anemo,
  worldBossDrop: MobDrops.ArtificedSpareClockworkComponent__Coppelia,
  localSpecialty: LocalSpecialties.LumidouceBell,
  mobDrop: EasyMobDrops.Gear,
}, [
  new CharacterSet("Off-field Support", ["Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 5),
    new CharacterArtifactSet(Sets.Instructor, 4, 4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 3),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 2),
    new CharacterArtifactSet(Sets.ViridescentVenerer, 2, 2),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 1),
    ...ElementalMasterySets(1)
  ])
]);

export const Lyney = new Character("Lyney", "Pyro", "Bow", ['Self-heal'], Rarity.Legendary, "Fontaine", {
  material: TalentAscension.Equity,
  weeklyBossDrop: MobDrops.PrimordialGreenbloom,
  crystal: ElementalCrystals.Pyro,
  worldBossDrop: MobDrops.EmperorsResolution,
  localSpecialty: LocalSpecialties.RainbowRose,
  mobDrop: EasyMobDrops.FatuiInsignia,
}, [
  new CharacterSet("On-field DPS", ["ATK"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 5),
    new CharacterArtifactSet(Sets.VermillionHereafter, 4, 4),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 4, 3),
    new CharacterArtifactSet(Sets.Lavawalker, 4, 2),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 1),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 2, 1),
  ])
]);

export const Mavuika = new Character("Mavuika", "Pyro", "Claymore", ['Nightsouls Blessing', 'Off-field Damage'], Rarity.Legendary, 'Natlan', {
  material: TalentAscension.Contention,
  weeklyBossDrop: MobDrops.ErodedHorn,
  crystal: ElementalCrystals.Pyro,
  worldBossDrop: MobDrops.SecretSourceAirflowAccumulator,
  localSpecialty: LocalSpecialties.WitheringPurpurbloom,
  mobDrop: EasyMobDrops.Whistle,
}, [
  new CharacterSet("On-field DPS", ["ATK", 'Elemental Mastery'], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 5),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 4),
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 3),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 2),
  ]),
]);

export const Mika = new Character("Mika", "Cryo", "Polearm", ["Heal"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Ballad,
  weeklyBossDrop: MobDrops.MirrorOfMushin,
  crystal: ElementalCrystals.Cryo,
  worldBossDrop: MobDrops.PseudoStamens,
  localSpecialty: LocalSpecialties.Wolfhook,
  mobDrop: EasyMobDrops.FatuiInsignia,
}, [
  new CharacterSet("Off-field Support", ["HP", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 4),
    new CharacterArtifactSet(Sets.MaidenBeloved, 4, 3),
    ...HealingBonusSets(2),
    new CharacterArtifactSet(Sets.TheExile, 4, 1)
  ]),
]);

export const Mona = new Character("Mona", "Hydro", "Catalyst", ["Off-field Damage"], Rarity.Legendary, 'Mondstadt', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.RingOfBoreas,
  crystal: ElementalCrystals.Hydro,
  worldBossDrop: MobDrops.CleansingHeart,
  localSpecialty: LocalSpecialties.PhilanemoMushroom,
  mobDrop: EasyMobDrops.Nectar,
}, [
  new CharacterSet("Off-field DPS", ["ATK", "Energy Recharge", "Elemental Mastery"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
    new CharacterArtifactSet(Sets.HeartOfDepth, 2, 4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 3),
    new CharacterArtifactSet(Sets.HeartOfDepth, 2, 3),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
    ...AttackSets(3),
    ...ElementalMasterySets(3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 2),
    new CharacterArtifactSet(Sets.Instructor, 4, 1)
  ]),
  new CharacterSet("Freeze Support", ["ATK", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 4),
    ...EnergyRechargeSets(3)
  ]),
  new CharacterSet("On-field DPS", ["ATK"], "Burst/Ult", true, [
    new CharacterArtifactSet(Sets.HeartOfDepth, 4, 5),
    new CharacterArtifactSet(Sets.HeartOfDepth, 2, 4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
    new CharacterArtifactSet(Sets.HeartOfDepth, 2, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 3),
    ...AttackSets(3),
    ...ElementalMasterySets(3),
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 2),
  ])
]);

export const Mualani = new Character("Mualani", "Hydro", "Catalyst", ["Nightsouls Blessing"], Rarity.Legendary, 'Natlan', {
  material: TalentAscension.Contention,
  weeklyBossDrop: MobDrops.LightlessMass,
  crystal: ElementalCrystals.Hydro,
  worldBossDrop: MobDrops.MarkOfTheBindingBlessing,
  localSpecialty: LocalSpecialties.SprayfeatherGill,
  mobDrop: EasyMobDrops.Whistle,
}, [
  new CharacterSet("On-field DPS", ["HP", "Elemental Mastery"], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 5),
    new CharacterArtifactSet(Sets.HeartOfDepth, 4, 4),
    new CharacterArtifactSet(Sets.HeartOfDepth, 2, 3),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 3),
    new CharacterArtifactSet(Sets.HeartOfDepth, 2, 2),
    new CharacterArtifactSet(Sets.NymphsDream, 2, 2),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 1),
    new CharacterArtifactSet(Sets.HeartOfDepth, 2, 1),
  ])
]);

export const Nahida = new Character("Nahida", "Dendro", "Catalyst", [
  "Elemental based: While inside ult, different parameters change based on elements within party"
], Rarity.Legendary, "Sumeru", {
  material: TalentAscension.Ingenuity,
  weeklyBossDrop: MobDrops.PuppetStrings,
  crystal: ElementalCrystals.Dendro,
  worldBossDrop: MobDrops.QuielledCreeper,
  localSpecialty: LocalSpecialties.KalpalataLotus,
  mobDrop: EasyMobDrops.FungalSpores,
}, [
  new CharacterSet("Off-field Support", ["Elemental Mastery"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 4),
    ...ElementalMasterySets(3)
  ])
]);

export const Navia = new Character("Navia", "Geo", "Claymore", [], Rarity.Legendary, "Fontaine", {
  material: TalentAscension.Equity,
  weeklyBossDrop: MobDrops.LightlessSilkString,
  crystal: ElementalCrystals.Geo,
  worldBossDrop: MobDrops.ArtificedSpareClockworkComponent__Coppelius,
  localSpecialty: LocalSpecialties.SpringOfTheFirstDewdrop,
  mobDrop: EasyMobDrops.FontemerAberrantPearl,
}, [
  new CharacterSet("On-field DPS", ["ATK"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.NighttimeWhispersInTheEchoingWoods, 4, 5),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 4),
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 3),
    new CharacterArtifactSet(Sets.ArchaicPetra, 2, 2),
    new CharacterArtifactSet(Sets.NighttimeWhispersInTheEchoingWoods, 2, 2),
    new CharacterArtifactSet(Sets.ArchaicPetra, 2, 1),
    new CharacterArtifactSet(Sets.GoldenTroupe, 2, 1),
  ])
]);

export const Neuvillette = new Character("Neuvillette", "Hydro", "Catalyst", ["Self-heal"], Rarity.Legendary, "Fontaine", {
  material: TalentAscension.Equity,
  weeklyBossDrop: MobDrops.Everamber,
  crystal: ElementalCrystals.Hydro,
  worldBossDrop: MobDrops.FontemerUnihorn,
  localSpecialty: LocalSpecialties.Lumitoile,
  mobDrop: EasyMobDrops.FontemerAberrantPearl,
}, [
  new CharacterSet("On-field DPS", ["HP", "Energy Recharge"], "Charged/Hold", true, [
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 5),
    new CharacterArtifactSet(Sets.HeartOfDepth, 4, 4),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 2, 3),
    new CharacterArtifactSet(Sets.HeartOfDepth, 2, 3),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 2, 2),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 2),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 1),
    new CharacterArtifactSet(Sets.HeartOfDepth, 2, 1),
  ])
]);

export const Nilou = new Character("Nilou", "Hydro", "Sword", [], Rarity.Legendary, "Sumeru", {
  material: TalentAscension.Praxis,
  weeklyBossDrop: MobDrops.TearsOfTheCalamitousGod,
  crystal: ElementalCrystals.Hydro,
  worldBossDrop: MobDrops.PerpetualCaliber,
  localSpecialty: LocalSpecialties.Padisarah,
  mobDrop: EasyMobDrops.FungalSpores,
}, [
  new CharacterSet("Bloom Support", ["HP"], "Skill/Ability", false, [
    ...HPSets(5),
    ...HPSets(4),
    new CharacterArtifactSet(Sets.HeartOfDepth, 2, 4),
    ...HPSets(3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 3),
    ...HPSets(2),
    ...ElementalMasterySets(2),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 1)
  ])
]);

export const Ningguang = new Character("Ningguang", "Geo", "Catalyst", ["Shield"], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Prosperity,
  weeklyBossDrop: MobDrops.SpiritLocketOfBoreas,
  crystal: ElementalCrystals.Geo,
  worldBossDrop: MobDrops.BasaltPillar,
  localSpecialty: LocalSpecialties.GlazeLily,
  mobDrop: EasyMobDrops.FatuiInsignia,
}, [
  new CharacterSet("On-field DPS", ["ATK"], "Burst/Ult", true, [
    new CharacterArtifactSet(Sets.ArchaicPetra, 2, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 5),
    new CharacterArtifactSet(Sets.ArchaicPetra, 2, 4),
    ...AttackSets(4),
    new CharacterArtifactSet(Sets.ArchaicPetra, 2, 3),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
    new CharacterArtifactSet(Sets.ArchaicPetra, 4, 2),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 1),
  ])
]);

export const Noelle = new Character("Noelle", "Geo", "Claymore", ["Heal"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.DvalinsClaw,
  crystal: ElementalCrystals.Geo,
  worldBossDrop: MobDrops.BasaltPillar,
  localSpecialty: LocalSpecialties.Valberry,
  mobDrop: EasyMobDrops.Mask,
}, [
  new CharacterSet("On-field DPS", ["DEF"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 5),
    new CharacterArtifactSet(Sets.RetracingBolide, 4, 4),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 3),
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 2, 2),
    new CharacterArtifactSet(Sets.ArchaicPetra, 2, 2),
  ])
]);

export const Ororon = new Character("Ororon", "Electro", "Bow", ['Off-field Damage'], Rarity.Epic, "Natlan", {
  material: TalentAscension.Kindling,
  weeklyBossDrop: MobDrops.LightlessSilkString,
  crystal: ElementalCrystals.Electro,
  worldBossDrop: MobDrops.MarkOfTheBindingBlessing,
  localSpecialty: LocalSpecialties.GlowingHornshroom,
  mobDrop: EasyMobDrops.Fang,
}, [
  new CharacterSet("Off-field DPS", ["ATK"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 5),
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 4),
  ])
]);

export const Qiqi = new Character("Qiqi", "Cryo", "Sword", ["Heal"], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Prosperity,
  weeklyBossDrop: MobDrops.TailOfBoreas,
  crystal: ElementalCrystals.Cryo,
  worldBossDrop: MobDrops.HoarfrostCore,
  localSpecialty: LocalSpecialties.Violetgrass,
  mobDrop: EasyMobDrops.Scroll,
}, [
  new CharacterSet("Off-field Support", ["ATK"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 5),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 4),
    new CharacterArtifactSet(Sets.MaidenBeloved, 4, 3),
    ...HealingBonusSets(2),
    ...AttackSets(2),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 1)
  ])
]);

export const RaidenShogun = new Character("Raiden Shogun", "Electro", "Polearm", ["Off-field Damage"], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Light,
  weeklyBossDrop: MobDrops.MoltenMoment,
  crystal: ElementalCrystals.Electro,
  worldBossDrop: MobDrops.StormBeads,
  localSpecialty: LocalSpecialties.AmakumoFruit,
  mobDrop: EasyMobDrops.Handguard,
}, [
  new CharacterSet("On-field DPS", ["ATK", "Energy Recharge"], "Burst/Ult", true, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 4),
    ...AttackSets(4),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 3),
  ]),
  new CharacterSet("Hyperbloom DPS", ["Elemental Mastery"], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.FlowerOfParadiseLost, 4, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 4),
    ...ElementalMasterySets(3),
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 2)
  ])
]);

export const Razor = new Character("Razor", "Electro", "Claymore", [], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.DvalinsClaw,
  crystal: ElementalCrystals.Electro,
  worldBossDrop: MobDrops.LightningPrism,
  localSpecialty: LocalSpecialties.Wolfhook,
  mobDrop: EasyMobDrops.Mask,
}, [
  new CharacterSet("On-field DPS", ["ATK", "Physical DMG Bonus"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.PaleFlame, 4, 5),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 4),
    ...PhysicalDMGSets(3),
    ...PhysicalDMGSets(2),
    ...AttackSets(2),
    ...AttackSets(1),
  ])
]);

export const Rosaria = new Character("Rosaria", "Cryo", "Polearm", ["Off-field Damage"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Ballad,
  weeklyBossDrop: MobDrops.ShadowOfTheWarrior,
  crystal: ElementalCrystals.Cryo,
  worldBossDrop: MobDrops.HoarfrostCore,
  localSpecialty: LocalSpecialties.Valberry,
  mobDrop: EasyMobDrops.FatuiInsignia,
}, [
  new CharacterSet("Reverse-Melt DPS", ["ATK", "Elemental Mastery"], "Burst/Ult", true, [
    new CharacterArtifactSet(Sets.Lavawalker, 4, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 3),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 3),
  ]),
  new CharacterSet("Freeze DPS", ["ATK"], "Burst/Ult", true, [
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 4),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 3),
  ]),
  new CharacterSet("Off-field Support", ["ATK", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    new CharacterArtifactSet(Sets.Instructor, 4, 4),
  ])
]);

export const SangonomiyaKokomi = new Character("Sangonomiya Kokomi", "Hydro", "Catalyst", ["Heal"], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Transience,
  weeklyBossDrop: MobDrops.HellfireButterfly,
  crystal: ElementalCrystals.Hydro,
  worldBossDrop: MobDrops.DewOfRepudiation,
  localSpecialty: LocalSpecialties.SangoPearl,
  mobDrop: EasyMobDrops.Spectral,
}, [
  new CharacterSet("Off-field Support", ["HP", "Energy Recharge"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 5),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 4),
    new CharacterArtifactSet(Sets.MaidenBeloved, 4, 3),
    ...HealingBonusSets(2),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 2)
  ]),
  new CharacterSet("On-field DPS", ["HP", "Energy Recharge"], "Burst/Ult", true, [
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 5),
    new CharacterArtifactSet(Sets.HeartOfDepth, 4, 4),
    ...HealingBonusSets(3),
    new CharacterArtifactSet(Sets.HeartOfDepth, 2, 2),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 2),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 1),
  ]),
  new CharacterSet("Bloom DPS", ["HP", "Energy Recharge"], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.FlowerOfParadiseLost, 4, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 4),
    ...ElementalMasterySets(3),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 2),
  ])
]);

export const Sayu = new Character("Sayu", "Anemo", "Claymore", ["Heal"], Rarity.Epic, 'Inazuma', {
  material: TalentAscension.Light,
  weeklyBossDrop: MobDrops.GildedScale,
  crystal: ElementalCrystals.Anemo,
  worldBossDrop: MobDrops.MarionetteCore,
  localSpecialty: LocalSpecialties.CrystalMarrow,
  mobDrop: EasyMobDrops.Nectar,
}, [
  new CharacterSet("Off-field Support", ["Elemental Mastery", "Energy Recharge", "ATK"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
    ...HealingBonusSets(3)
  ])
]);

export const Sethos = new Character("Sethos", "Electro", "Bow", [], Rarity.Epic, 'Sumeru', {
  material: TalentAscension.Praxis,
  weeklyBossDrop: MobDrops.DakasBell,
  crystal: ElementalCrystals.Electro,
  worldBossDrop: MobDrops.CloudseamScale,
  localSpecialty: LocalSpecialties.Trishiraite,
  mobDrop: EasyMobDrops.EremiteDrop,
}, [
  new CharacterSet("Off-field DPS", ["Energy Recharge", "Elemental Mastery"], "Charged/Hold", false, [
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 4),
    new CharacterArtifactSet(Sets.DesertPavilionChronicle, 4, 3),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 2),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 2),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 1),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 1),
  ])
]);

export const Shenhe = new Character("Shenhe", "Cryo", "Polearm", ["Off-field Damage"], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Prosperity,
  weeklyBossDrop: MobDrops.HellfireButterfly,
  crystal: ElementalCrystals.Cryo,
  worldBossDrop: MobDrops.DragonheirsFalseFin,
  localSpecialty: LocalSpecialties.Qingxin,
  mobDrop: EasyMobDrops.Nectar,
}, [
  new CharacterSet("Off-field Support", ["ATK", "Energy Recharge"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    ...AttackSets(4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 4)
  ])
]);

export const ShikanoinHeizou = new Character("Shikanoin Heizou", "Anemo", "Catalyst", [], Rarity.Epic, 'Inazuma', {
  material: TalentAscension.Transience,
  weeklyBossDrop: MobDrops.TheMeaningOfAeons,
  crystal: ElementalCrystals.Anemo,
  worldBossDrop: MobDrops.RunicFang,
  localSpecialty: LocalSpecialties.Onikabuto,
  mobDrop: EasyMobDrops.TreasureHoarderInsignia,
}, [
  new CharacterSet("Swirl DPS", ["ATK", "Elemental Mastery"], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 5),
    new CharacterArtifactSet(Sets.DesertPavilionChronicle, 4, 4),
    ...AnemoDMGSets(3),
    ...AttackSets(3),
    ...ElementalMasterySets(3),
  ])
]);

export const Sigewinne = new Character("Sigewinne", "Hydro", "Bow", ["Heal"], Rarity.Legendary, 'Fontaine', {
  material: TalentAscension.Equity,
  weeklyBossDrop: MobDrops.LightlessEyeOfTheMaelstrom,
  crystal: ElementalCrystals.Hydro,
  worldBossDrop: MobDrops.WaterThatFailedToTranscend,
  localSpecialty: LocalSpecialties.RomaritimeFlower,
  mobDrop: EasyMobDrops.FontemerAberrantPearl,
}, [
  new CharacterSet("Off-field Support", ["HP"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 5),
    new CharacterArtifactSet(Sets.SongOfDaysPast, 4, 4),
    ...HPSets(3),
    ...HealingBonusSets(3)
  ])
]);

export const Sucrose = new Character("Sucrose", "Anemo", "Catalyst", ["Grouping"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Freedom,
  weeklyBossDrop: MobDrops.SpiritLocketOfBoreas,
  crystal: ElementalCrystals.Hydro,
  worldBossDrop: MobDrops.HurricaneSeed,
  localSpecialty: LocalSpecialties.WindwheelAster,
  mobDrop: EasyMobDrops.Nectar,
}, [
  new CharacterSet("Swirl Support", ["Elemental Mastery", "Energy Recharge"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 5),
    new CharacterArtifactSet(Sets.Instructor, 4, 4),
    ...ElementalMasterySets(3),
  ])
]);

export const TartagliaChilde = new Character("Tartaglia (Childe)", "Hydro", "Bow", [], Rarity.Legendary, 'Snezhnaya', {
  material: TalentAscension.Freedom,
  weeklyBossDrop: MobDrops.ShardOfAFoulLegacy,
  crystal: ElementalCrystals.Hydro,
  worldBossDrop: MobDrops.CleansingHeart,
  localSpecialty: LocalSpecialties.Starconch,
  mobDrop: EasyMobDrops.FatuiInsignia,
}, [
  new CharacterSet("On-field DPS", ["ATK"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.HeartOfDepth, 4, 5),
    new CharacterArtifactSet(Sets.HeartOfDepth, 2, 4),
    ...AttackSets(4),
    new CharacterArtifactSet(Sets.HeartOfDepth, 2, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 3),
    ...AttackSets(3),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 4, 2),
  ]),
]);

export const Thoma = new Character("Thoma", "Pyro", "Polearm", ["Shield"], Rarity.Epic, 'Inazuma', {
  material: TalentAscension.Transience,
  weeklyBossDrop: MobDrops.HellfireButterfly,
  crystal: ElementalCrystals.Pyro,
  worldBossDrop: MobDrops.SmolderingPearl,
  localSpecialty: LocalSpecialties.FluorescentFungus,
  mobDrop: EasyMobDrops.TreasureHoarderInsignia,
}, [
  new CharacterSet("Burgeon Support", ["Energy Recharge", "Elemental Mastery"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.FlowerOfParadiseLost, 4, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 4),
    ...ElementalMasterySets(3),
    ...ElementalMasterySets(2),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 2),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 1),
  ]),
  new CharacterSet("Off-field Support", ["HP", "Energy Recharge"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
    new CharacterArtifactSet(Sets.Instructor, 4, 3),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 2),
    ...EnergyRechargeSets(1)
  ])
]);

export const Tighnari = new Character("Tighnari", "Dendro", "Bow", ["Off-field Damage"], Rarity.Legendary, 'Sumeru', {
  material: TalentAscension.Admonition,
  weeklyBossDrop: MobDrops.TheMeaningOfAeons,
  crystal: ElementalCrystals.Dendro,
  worldBossDrop: MobDrops.MajesticHookedBeak,
  localSpecialty: LocalSpecialties.NilotpalaLotus,
  mobDrop: EasyMobDrops.FungalSpores,
}, [
  new CharacterSet("Off-field DPS", ["ATK", "Elemental Mastery"], "Charged/Hold", false, [
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 4),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 2, 3),
    ...ElementalMasterySets(3),
    ...AttackSets(3),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 2),
  ])
]);

export const TravelerAnemo = new Character("Traveler (Anemo)", "Anemo", "Sword", [], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.DvalinsSigh,
  crystal: ElementalCrystals.Anemo,
  worldBossDrop: null,
  localSpecialty: LocalSpecialties.WindwheelAster,
  mobDrop: EasyMobDrops.Mask,
}, [
  new CharacterSet("Swirl DPS", ["Elemental Mastery", "Energy Recharge", "ATK"], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 5),
    ...AnemoDMGSets(4),
    ...ElementalMasterySets(4),
    ...AttackSets(4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4)
  ])
]);

export const TravelerGeo = new Character("Traveler (Geo)", "Geo", "Sword", [], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Prosperity,
  weeklyBossDrop: MobDrops.TailOfBoreas,
  crystal: ElementalCrystals.Geo,
  worldBossDrop: null,
  localSpecialty: LocalSpecialties.WindwheelAster,
  mobDrop: EasyMobDrops.Mask,
}, [
  new CharacterSet("On-field DPS", ["ATK"], "Burst/Ult", true, [
    new CharacterArtifactSet(Sets.ArchaicPetra, 2, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 5),
    new CharacterArtifactSet(Sets.ArchaicPetra, 4, 4),
    ...AttackSets(4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 3),
    ...AttackSets(2),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 2),
    new CharacterArtifactSet(Sets.Thundersoother, 2, 2),
    new CharacterArtifactSet(Sets.Lavawalker, 2, 2),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 1),
  ])
]);

export const TravelerElectro = new Character("Traveler (Electro)", "Electro", "Sword", [], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Transience,
  weeklyBossDrop: MobDrops.DragonLordsCrown,
  crystal: ElementalCrystals.Electro,
  worldBossDrop: null,
  localSpecialty: LocalSpecialties.WindwheelAster,
  mobDrop: EasyMobDrops.Mask,
}, [
  new CharacterSet("Off-field Support", ["Energy Recharge", "ATK"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 4),
    new CharacterArtifactSet(Sets.Instructor, 4, 3),
    ...EnergyRechargeSets(2),
  ])
]);

export const TravelerDendro = new Character("Traveler (Dendro)", "Dendro", "Sword", [], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Admonition,
  weeklyBossDrop: MobDrops.MudraOfTheMaleficGeneral,
  crystal: ElementalCrystals.Dendro,
  worldBossDrop: null,
  localSpecialty: LocalSpecialties.WindwheelAster,
  mobDrop: EasyMobDrops.Mask,
}, [
  new CharacterSet("Off-field Support", ["Elemental Mastery", "Energy Recharge", "ATK"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 4),
    new CharacterArtifactSet(Sets.Instructor, 4, 3),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 2),
    new CharacterArtifactSet(Sets.TheExile, 4, 1),
  ])
]);

export const TravelerHydro = new Character("Traveler (Hydro)", "Hydro", "Sword", [], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Equity,
  weeklyBossDrop: MobDrops.WorldspanFern,
  crystal: ElementalCrystals.Hydro,
  worldBossDrop: null,
  localSpecialty: LocalSpecialties.WindwheelAster,
  mobDrop: EasyMobDrops.Mask,
}, [
  new CharacterSet("Off-field Support", ["HP", "Energy Recharge"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.Instructor, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 4),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 4),
  ])
]);
export const TravelerPyro = new Character("Traveler (Pyro)", "Pyro", "Sword", ['Nightsouls Blessing'], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Contention,
  weeklyBossDrop: null, // This is not a weekly boss drop, but a world quest drop
  crystal: ElementalCrystals.Pyro,
  worldBossDrop: null,
  localSpecialty: LocalSpecialties.WindwheelAster,
  mobDrop: EasyMobDrops.Mask,
}, [
  // TODO: Update when Genshin.gg has data - https://genshin.gg/characters/traveler(pyro)/
]);
export const TravelerCryo = new Character("Traveler (Cryo)", "Cryo", "Sword", [], Rarity.Legendary, 'Unknown', {
  material: null,
  weeklyBossDrop: null,
  crystal: ElementalCrystals.Cryo,
  worldBossDrop: null,
  localSpecialty: LocalSpecialties.WindwheelAster,
  mobDrop: EasyMobDrops.Mask,
}, []);

export const Venti = new Character("Venti", "Anemo", "Bow", ["Grouping"], Rarity.Legendary, 'Mondstadt', {
  material: TalentAscension.Ballad,
  weeklyBossDrop: MobDrops.TailOfBoreas,
  crystal: ElementalCrystals.Anemo,
  worldBossDrop: MobDrops.HurricaneSeed,
  localSpecialty: LocalSpecialties.Cecilia,
  mobDrop: EasyMobDrops.Slime,
}, [
  new CharacterSet("Swirl Support", ["Elemental Mastery", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 4),
    ...ElementalMasterySets(3),
  ])
]);

export const WandererScaramouche = new Character("Wanderer (Scaramouche)", "Anemo", "Catalyst", [], Rarity.Legendary, 'Sumeru', {
  material: TalentAscension.Praxis,
  weeklyBossDrop: MobDrops.DakasBell,
  crystal: ElementalCrystals.Anemo,
  worldBossDrop: MobDrops.PerpetualCaliber,
  localSpecialty: LocalSpecialties.RukkhashavaMushrooms,
  mobDrop: EasyMobDrops.Handguard,
}, [
  new CharacterSet("On-field DPS", ["ATK", "Elemental Mastery"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.DesertPavilionChronicle, 4, 5),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 4, 4),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 4, 3),
    ...AnemoDMGSets(2),
    ...AttackSets(2),
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 1)
  ])
]);

export const Wriothesley = new Character("Wriothesley", "Cryo", "Catalyst", [], Rarity.Legendary, 'Fontaine', {
  material: TalentAscension.Order,
  weeklyBossDrop: MobDrops.PrimordialGreenbloom,
  crystal: ElementalCrystals.Cryo,
  worldBossDrop: MobDrops.TourbillonDevice,
  localSpecialty: LocalSpecialties.SubdetectionUnit,
  mobDrop: EasyMobDrops.Gear,
}, [
  new CharacterSet("On-field DPS", ["ATK", "Energy Recharge"], "Charged/Hold", true, [
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 5),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 4),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 4, 3),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 2),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 2, 2),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 2, 1),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 1),
  ])
]);

export const Xiangling = new Character("Xiangling", "Pyro", "Polearm", ["Off-field Damage"], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Diligence,
  weeklyBossDrop: MobDrops.DvalinsClaw,
  crystal: ElementalCrystals.Pyro,
  worldBossDrop: MobDrops.EverflameSeed,
  localSpecialty: LocalSpecialties.JueyunChili,
  mobDrop: EasyMobDrops.Slime,
}, [
  new CharacterSet("Off-field DPS", ["Energy Recharge", "ATK", "Elemental Mastery"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 5),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 4),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 3),
    ...AttackSets(3),
    ...ElementalMasterySets(3),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 2),
  ]),
]);

export const Xianyun = new Character("Xianyun", "Anemo", "Catalyst", ["Heal"], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Gold,
  weeklyBossDrop: MobDrops.LightlessEyeOfTheMaelstrom,
  crystal: ElementalCrystals.Anemo,
  worldBossDrop: MobDrops.CloudseamScale,
  localSpecialty: LocalSpecialties.ClearwaterJade,
  mobDrop: EasyMobDrops.Scroll,
}, [
  new CharacterSet("Off-field Support", ["Energy Recharge", "ATK"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 4),
    new CharacterArtifactSet(Sets.SongOfDaysPast, 4, 3),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 2),
    ...HealingBonusSets(1),
    ...AttackSets(1),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 1),
  ])
]);

export const Xiao = new Character("Xiao", "Anemo", "Polearm", [], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Prosperity,
  weeklyBossDrop: MobDrops.ShadowOfTheWarrior,
  crystal: ElementalCrystals.Anemo,
  worldBossDrop: MobDrops.JuvenileJade,
  localSpecialty: LocalSpecialties.Qingxin,
  mobDrop: EasyMobDrops.Slime,
}, [
  new CharacterSet("On-field DPS", ["ATK"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.VermillionHereafter, 4, 5),
    new CharacterArtifactSet(Sets.DesertPavilionChronicle, 4, 4),
    ...AttackSets(3),
    ...AnemoDMGSets(3)
  ]),
]);

export const Xilonen = new Character("Xilonen", "Geo", "Sword", [
  "Elemental based: Decrease elemental RES based on party members' elements (excl. Anemo & Dendro)", 
  "Heal", 
  "Nightsouls Blessing"
], Rarity.Legendary, 'Natlan', {
  material: TalentAscension.Kindling,
  weeklyBossDrop: MobDrops.MirrorOfMushin,
  crystal: ElementalCrystals.Geo,
  worldBossDrop: MobDrops.SecretSourceAirflowAccumulator,
  localSpecialty: LocalSpecialties.BrilliantChrysanthemum,
  mobDrop: EasyMobDrops.Whistle,
}, [
  new CharacterSet("Off-field Support", ["DEF"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 5),
    new CharacterArtifactSet(Sets.ArchaicPetra, 4, 4),
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 3),
  ])
]);

export const Xingqiu = new Character("Xingqiu", "Hydro", "Sword", ["Off-field Damage", "Heal"], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Gold,
  weeklyBossDrop: MobDrops.TailOfBoreas,
  crystal: ElementalCrystals.Hydro,
  worldBossDrop: MobDrops.CleansingHeart,
  localSpecialty: LocalSpecialties.SilkFlower,
  mobDrop: EasyMobDrops.Mask,
}, [
  new CharacterSet("Off-field DPS", ["Energy Recharge", "ATK"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 4),
    new CharacterArtifactSet(Sets.NymphsDream, 4, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 2),
    ...HydroDMGSets(2),
    ...AttackSets(2),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 2),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 1),
  ]),
]);

export const Xinyan = new Character("Xinyan", "Pyro", "Claymore", [], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Gold,
  weeklyBossDrop: MobDrops.TuskOfMonocerosCaeli,
  crystal: ElementalCrystals.Pyro,
  worldBossDrop: MobDrops.EverflameSeed,
  localSpecialty: LocalSpecialties.Violetgrass,
  mobDrop: EasyMobDrops.TreasureHoarderInsignia,
}, [
  new CharacterSet("Physical DPS", ["Physical DMG Bonus", "ATK", "Energy Recharge"], "Normal/Press", true, [
    ...PhysicalDMGSets(5),
    new CharacterArtifactSet(Sets.PaleFlame, 4, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
    ...PhysicalDMGSets(3),
    ...PhysicalDMGSets(2),
    ...AttackSets(2),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 2),
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 2, 2),
  ]),
  new CharacterSet("On-field DPS", ["ATK"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.Lavawalker, 4, 5),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 4),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
    ...AttackSets(3),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 3),
    ...AttackSets(2),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 2),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 1),
  ]),
]);

export const YaeMiko = new Character("Yae Miko", "Electro", "Catalyst", ["Off-field Damage"], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Light,
  weeklyBossDrop: MobDrops.TheMeaningOfAeons,
  crystal: ElementalCrystals.Electro,
  worldBossDrop: MobDrops.DragonheirsFalseFin,
  localSpecialty: LocalSpecialties.SeaGanoderma,
  mobDrop: EasyMobDrops.Handguard,
}, [
  new CharacterSet("Off-field DPS", ["ATK", "Elemental Mastery", "Energy Recharge"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 5),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 4),
    ...AttackSets(3),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 3),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
    new CharacterArtifactSet(Sets.Thundersoother, 4, 2),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 1),
  ])
]);

export const Yanfei = new Character("Yanfei", "Pyro", "Catalyst", [], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Gold,
  weeklyBossDrop: MobDrops.BloodjadeBranch,
  crystal: ElementalCrystals.Pyro,
  worldBossDrop: MobDrops.JuvenileJade,
  localSpecialty: LocalSpecialties.NoctilucousJade,
  mobDrop: EasyMobDrops.TreasureHoarderInsignia,
}, [
  new CharacterSet("On-field DPS", ["ATK"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 4),
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 3),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 2),
    ...AttackSets(2),
    ...ElementalMasterySets(2),
    new CharacterArtifactSet(Sets.RetracingBolide, 4, 1),
  ])
]);

export const Yaoyao = new Character("Yaoyao", "Dendro", "Polearm", ["Heal", "Off-field Damage"], Rarity.Legendary, 'Sumeru', {
  material: TalentAscension.Diligence,
  weeklyBossDrop: MobDrops.DakasBell,
  crystal: ElementalCrystals.Dendro,
  worldBossDrop: MobDrops.QuielledCreeper,
  localSpecialty: LocalSpecialties.JueyunChili,
  mobDrop: EasyMobDrops.Slime,
}, [
  new CharacterSet("Off-field Support", ["HP", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 5),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 4),
    new CharacterArtifactSet(Sets.Instructor, 4, 3),
  ])
]);

export const Yelan = new Character("Yelan", "Hydro", "Bow", ["Off-field Damage"], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Prosperity,
  weeklyBossDrop: MobDrops.GildedScale,
  crystal: ElementalCrystals.Hydro,
  worldBossDrop: MobDrops.RunicFang,
  localSpecialty: LocalSpecialties.Starconch,
  mobDrop: EasyMobDrops.FatuiInsignia,
}, [
  new CharacterSet("Off-field DPS", ["HP", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 5),
    ...HPSets(4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 4),
    new CharacterArtifactSet(Sets.HeartOfDepth, 2, 4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
  ])
]);

export const Yoimiya = new Character("Yoimiya", "Pyro", "Bow", [], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Transience,
  weeklyBossDrop: MobDrops.DragonLordsCrown,
  crystal: ElementalCrystals.Pyro,
  worldBossDrop: MobDrops.SmolderingPearl,
  localSpecialty: LocalSpecialties.NakuWeed,
  mobDrop: EasyMobDrops.Scroll,
}, [
  new CharacterSet("On-field DPS", ["ATK", "Elemental Mastery"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 4, 5),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 4),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 4, 3),
    new CharacterArtifactSet(Sets.RetracingBolide, 4, 2),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 1),
    ...AttackSets(1)
  ])
]);

export const YumemizukiMizuki = new Character("Yumemizuki Mizuki", "Anemo", "Catalyst", ["Heal"], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Transience,
  weeklyBossDrop: MobDrops.FadingCandle,
  crystal: ElementalCrystals.Anemo,
  worldBossDrop: MobDrops.TalismanOftheEnigmaticLand,
  localSpecialty: LocalSpecialties.SeaGanoderma,
  mobDrop: EasyMobDrops.Handguard,
}, [
  new CharacterSet('On-field DPS', ['Elemental Mastery'], 'Skill/Ability', true, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 5),
    new CharacterArtifactSet(Sets.ViridescentVenerer, 2, 4),
    ...ElementalMasterySets(4)
  ])
]);

export const YunJin = new Character("Yun Jin", "Geo", "Polearm", ["Shield"], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Diligence,
  weeklyBossDrop: MobDrops.AshenHeart,
  crystal: ElementalCrystals.Geo,
  worldBossDrop: MobDrops.RiftbornRegalia,
  localSpecialty: LocalSpecialties.GlazeLily,
  mobDrop: EasyMobDrops.Mask,
}, [
  new CharacterSet("Off-field Support", ["DEF", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 5),
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 2, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 3),
  ])
]);

export const Zhongli = new Character("Zhongli", "Geo", "Polearm", ["Shield"], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Gold,
  weeklyBossDrop: MobDrops.TuskOfMonocerosCaeli,
  crystal: ElementalCrystals.Geo,
  worldBossDrop: MobDrops.BasaltPillar,
  localSpecialty: LocalSpecialties.CorLapis,
  mobDrop: EasyMobDrops.Slime,
}, [
  new CharacterSet("Off-field Support", ["HP"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 5),
    new CharacterArtifactSet(Sets.ArchaicPetra, 4, 4),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 3),
    new CharacterArtifactSet(Sets.Instructor, 4, 2),
  ]),
  new CharacterSet("Burst Support", ["ATK", "HP", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
    new CharacterArtifactSet(Sets.ArchaicPetra, 2, 4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 3),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 2),
  ])
]);