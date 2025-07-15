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
  localSpecialty: LocalSpecialties.Cecilia,
  crystal: ElementalCrystals.Geo,
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
  localSpecialty: LocalSpecialties.SandGreasePupa,
  crystal: ElementalCrystals.Dendro,
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
  localSpecialty: LocalSpecialties.CrystalMarrow,
  crystal: ElementalCrystals.Cryo,
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
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.SmallLampGrass,
  mobDrop: EasyMobDrops.Arrowhead,
  worldBossDrop: MobDrops.EverflameSeed,
  weeklyBossDrop: MobDrops.DvalinsSigh,
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
  localSpecialty: LocalSpecialties.Onikabuto,
  worldBossDrop: MobDrops.RiftbornRegalia,
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
  localSpecialty: LocalSpecialties.RainbowRose,
  worldBossDrop: MobDrops.FragmentOfAGoldenMelody,
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
  localSpecialty: LocalSpecialties.Violetgrass,
  mobDrop: EasyMobDrops.FungalSpores,
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
  localSpecialty: LocalSpecialties.PhilanemoMushroom,
  worldBossDrop: MobDrops.CleansingHeart,
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
  localSpecialty: LocalSpecialties.NoctilucousJade,
  worldBossDrop: MobDrops.LightningPrism,
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
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: MobDrops.EverflameSeed,
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
  localSpecialty: LocalSpecialties.HennaBerry, // Referred to as "Redcrest"
  worldBossDrop: MobDrops.LightGuidingTetrahedron,
  mobDrop: EasyMobDrops.EremiteDrop,
}, [
  new CharacterSet("Off-field Support", ["HP", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 4),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 3),
    ...HPSets(2),
  ])
]);

export const Charlotte = new Character("Charlotte", "Cryo", "Catalyst", ["Heal", "Bond of Life"], Rarity.Epic, 'Fontaine', {
  material: TalentAscension.Justice,
  weeklyBossDrop: MobDrops.LightlessSilkString,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.BerylConch,
  worldBossDrop: MobDrops.TourbillonDevice,
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
  localSpecialty: LocalSpecialties.WitheringPurpurbloom,
  worldBossDrop: MobDrops.EnsnaringGaze,
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
  localSpecialty: LocalSpecialties.LumidouceBell,
  worldBossDrop: MobDrops.FontemerUnihorn,
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
  localSpecialty: LocalSpecialties.Dendrobium,
  worldBossDrop: MobDrops.ArtificedSpareClockworkComponent__Coppelia,
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
  localSpecialty: LocalSpecialties.CorLapis,
  worldBossDrop: MobDrops.HoarfrostCore,
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
  localSpecialty: LocalSpecialties.QuenepaBerry,
  worldBossDrop: MobDrops.TalismanOftheEnigmaticLand,
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
  localSpecialty: LocalSpecialties.Lumitoile,
  worldBossDrop: MobDrops.FontemerUnihorn,
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
  localSpecialty: LocalSpecialties.RukkhashavaMushrooms,
  worldBossDrop: MobDrops.MajesticHookedBeak,
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
  localSpecialty: LocalSpecialties.Scarab,
  worldBossDrop: MobDrops.ThunderclapFruitcore,
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

export const Dahlia = new Character("Dahlia", "Hydro", "Sword", ["Shield", "Buff ATK Speed: Use normal attacks or Frozen reaction"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Ballad,
  weeklyBossDrop: MobDrops.ErodedScaleFeather,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.CallaLily,
  worldBossDrop: MobDrops.SecretSourceAirflowAccumulator,
  mobDrop: EasyMobDrops.Arrowhead
}, [
  new CharacterSet("Off-field Support", ["HP", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 4),
    ...HPSets(3),
    ...EnergyRechargeSets(3),
  ])
])

export const Dehya = new Character("Dehya", "Pyro", "Claymore", ["Self-heal", "Off-field Damage"], Rarity.Legendary, 'Sumeru', {
  material: TalentAscension.Praxis,
  weeklyBossDrop: MobDrops.PuppetStrings,
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.SandGreasePupa,
  worldBossDrop: MobDrops.LightGuidingTetrahedron,
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
  localSpecialty: LocalSpecialties.SmallLampGrass,
  worldBossDrop: MobDrops.EverflameSeed,
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
  localSpecialty: LocalSpecialties.CallaLily,
  worldBossDrop: MobDrops.HoarfrostCore,
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
  localSpecialty: LocalSpecialties.KalpalataLotus,
  worldBossDrop: MobDrops.ThunderclapFruitcore,
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
  localSpecialty: LocalSpecialties.LakelightLily,
  worldBossDrop: MobDrops.FragmentOfAGoldenMelody,
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

export const Escoffier = new Character('Escoffier', 'Cryo', 'Polearm', ['Off-field Damage', 'Heal'], Rarity.Legendary, 'Fontaine', {
  material: TalentAscension.Justice,
  weeklyBossDrop: MobDrops.ErodedHorn,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.BerylConch,
  worldBossDrop: MobDrops.SecretSourceAirflowAccumulator,
  mobDrop: EasyMobDrops.Gear,
}, [
  new CharacterSet("Off-field Support", ["ATK"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.FinaleOfTheDeepGalleries, 4, 5),
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 4),
    ...AttackSets(3),
  ])
]);

export const Eula = new Character("Eula", "Cryo", "Claymore", [], Rarity.Legendary, 'Mondstadt', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.DragonLordsCrown,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.DandelionSeed,
  worldBossDrop: MobDrops.CrystallineBloom,
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
  localSpecialty: LocalSpecialties.HennaBerry,
  worldBossDrop: MobDrops.LightGuidingTetrahedron,
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
  localSpecialty: LocalSpecialties.SmallLampGrass,
  worldBossDrop: MobDrops.LightningPrism,
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
  localSpecialty: LocalSpecialties.RomaritimeFlower,
  worldBossDrop: MobDrops.ArtificedSpareClockworkComponent__Coppelius,
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
  localSpecialty: LocalSpecialties.LakelightLily,
  worldBossDrop: MobDrops.WaterThatFailedToTranscend,
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
  localSpecialty: LocalSpecialties.Starconch,
  worldBossDrop: MobDrops.EmperorsResolution,
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
  localSpecialty: LocalSpecialties.Qingxin,
  worldBossDrop: MobDrops.ShadowOfTheWarrior,
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
  localSpecialty: LocalSpecialties.SangoPearl,
  worldBossDrop: MobDrops.PerpetualHeart,
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
  localSpecialty: LocalSpecialties.SilkFlower,
  worldBossDrop: MobDrops.JuvenileJade,
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

export const Iansan = new Character("Iansan", "Electro", "Polearm", ["Nightsouls Blessing"], Rarity.Epic, 'Natlan', {
  material: TalentAscension.Contention,
  weeklyBossDrop: MobDrops.DenialAndJudgment,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.Dracolite,
  worldBossDrop: MobDrops.EnsnaringGaze,
  mobDrop: EasyMobDrops.Whistle,
}, [
  new CharacterSet("Off-field DPS", ["ATK", "Energy Recharge"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 5),
    ...AttackSets(2),
  ])
]);

export const Ifa = new Character('Ifa', "Anemo", "Catalyst", ["Heal", "Nightsouls Blessing"], Rarity.Epic, 'Natlan', {
  material: TalentAscension.Conflict,
  weeklyBossDrop: MobDrops.ChessGameRook,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.SaurianClawSucculent,
  worldBossDrop: MobDrops.SparklessStatueCore,
  mobDrop: EasyMobDrops.Fang,
}, [
  new CharacterSet('On-field DPS', ['Elemental Mastery'], 'Skill/Ability', true, [
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 4),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 3),
    new CharacterArtifactSet(Sets.WanderersTroupe, 2, 3),
    ...ElementalMasterySets(3),
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 2),
    new CharacterArtifactSet(Sets.ViridescentVenerer, 2, 1),
  ])
]);

export const Jean = new Character("Jean", "Anemo", "Sword", ["Heal"], Rarity.Legendary, 'Mondstadt', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.DvalinsPlume,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.DandelionSeed,
  worldBossDrop: MobDrops.HurricaneSeed,
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
  localSpecialty: LocalSpecialties.QuenepaBerry,
  worldBossDrop: MobDrops.OverripeFlamegranate,
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
  localSpecialty: LocalSpecialties.SeaGanoderma,
  worldBossDrop: MobDrops.MarionetteCore,
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
  localSpecialty: LocalSpecialties.CallaLily,
  worldBossDrop: MobDrops.HoarfrostCore,
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
  localSpecialty: LocalSpecialties.SakuraBloom,
  worldBossDrop: MobDrops.PerpetualHeart,
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
  localSpecialty: LocalSpecialties.SakuraBloom,
  worldBossDrop: MobDrops.DewOfRepudiation,
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
  localSpecialty: LocalSpecialties.MourningFlower,
  worldBossDrop: MobDrops.QuielledCreeper,
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
  localSpecialty: LocalSpecialties.CorLapis,
  worldBossDrop: MobDrops.LightningPrism,
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
  localSpecialty: LocalSpecialties.SaurianClawSucculent,
  worldBossDrop: MobDrops.OverripeFlamegranate,
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
  localSpecialty: LocalSpecialties.AmakumoFruit,
  worldBossDrop: MobDrops.EvergloomRing,
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
  localSpecialty: LocalSpecialties.PhilanemoMushroom,
  worldBossDrop: MobDrops.EverflameSeed,
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
  localSpecialty: LocalSpecialties.Dendrobium,
  worldBossDrop: MobDrops.StormBeads,
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
  localSpecialty: LocalSpecialties.NakuWeed,
  worldBossDrop: MobDrops.RunicFang,
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
  localSpecialty: LocalSpecialties.ClearwaterJade,
  worldBossDrop: MobDrops.GoldInscribedSecretSourceCore,
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
  localSpecialty: LocalSpecialties.NilotpalaLotus,
  worldBossDrop: MobDrops.PerpetualCaliber,
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
  localSpecialty: LocalSpecialties.Valberry,
  worldBossDrop: MobDrops.LightningPrism,
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
  localSpecialty: LocalSpecialties.LumidouceBell,
  worldBossDrop: MobDrops.ArtificedSpareClockworkComponent__Coppelia,
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
  localSpecialty: LocalSpecialties.RainbowRose,
  worldBossDrop: MobDrops.EmperorsResolution,
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
  localSpecialty: LocalSpecialties.WitheringPurpurbloom,
  worldBossDrop: MobDrops.GoldInscribedSecretSourceCore,
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
  localSpecialty: LocalSpecialties.Wolfhook,
  worldBossDrop: MobDrops.PseudoStamens,
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
  localSpecialty: LocalSpecialties.PhilanemoMushroom,
  worldBossDrop: MobDrops.CleansingHeart,
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
  localSpecialty: LocalSpecialties.SprayfeatherGill,
  worldBossDrop: MobDrops.MarkOfTheBindingBlessing,
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
  localSpecialty: LocalSpecialties.KalpalataLotus,
  worldBossDrop: MobDrops.QuielledCreeper,
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
  localSpecialty: LocalSpecialties.SpringOfTheFirstDewdrop,
  worldBossDrop: MobDrops.ArtificedSpareClockworkComponent__Coppelius,
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
  localSpecialty: LocalSpecialties.Lumitoile,
  worldBossDrop: MobDrops.FontemerUnihorn,
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
  localSpecialty: LocalSpecialties.Padisarah,
  worldBossDrop: MobDrops.PerpetualCaliber,
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
  localSpecialty: LocalSpecialties.GlazeLily,
  worldBossDrop: MobDrops.BasaltPillar,
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
  localSpecialty: LocalSpecialties.Valberry,
  worldBossDrop: MobDrops.BasaltPillar,
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
  localSpecialty: LocalSpecialties.GlowingHornshroom,
  worldBossDrop: MobDrops.MarkOfTheBindingBlessing,
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
  localSpecialty: LocalSpecialties.Violetgrass,
  worldBossDrop: MobDrops.HoarfrostCore,
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
  localSpecialty: LocalSpecialties.AmakumoFruit,
  worldBossDrop: MobDrops.StormBeads,
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
  localSpecialty: LocalSpecialties.Wolfhook,
  worldBossDrop: MobDrops.LightningPrism,
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
  localSpecialty: LocalSpecialties.Valberry,
  worldBossDrop: MobDrops.HoarfrostCore,
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
  localSpecialty: LocalSpecialties.SangoPearl,
  worldBossDrop: MobDrops.DewOfRepudiation,
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
  localSpecialty: LocalSpecialties.CrystalMarrow,
  worldBossDrop: MobDrops.MarionetteCore,
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
  localSpecialty: LocalSpecialties.Trishiraite,
  worldBossDrop: MobDrops.CloudseamScale,
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
  localSpecialty: LocalSpecialties.Qingxin,
  worldBossDrop: MobDrops.DragonheirsFalseFin,
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
  localSpecialty: LocalSpecialties.Onikabuto,
  worldBossDrop: MobDrops.RunicFang,
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

export const Sigewinne = new Character("Sigewinne", "Hydro", "Bow", ["Heal", "Bond of Life"], Rarity.Legendary, 'Fontaine', {
  material: TalentAscension.Equity,
  weeklyBossDrop: MobDrops.LightlessEyeOfTheMaelstrom,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.RomaritimeFlower,
  worldBossDrop: MobDrops.WaterThatFailedToTranscend,
  mobDrop: EasyMobDrops.FontemerAberrantPearl,
}, [
  new CharacterSet("Off-field Support", ["HP"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 5),
    new CharacterArtifactSet(Sets.SongOfDaysPast, 4, 4),
    ...HPSets(3),
    ...HealingBonusSets(3)
  ])
]);

export const Skirk = new Character("Skirk", "Cryo", "Sword", ["Serpent's Subtlety"], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Contention,
  weeklyBossDrop: MobDrops.ChessGameKnight,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.SkysplitGembloom,
  worldBossDrop: MobDrops.EnsnaringGaze,
  mobDrop: EasyMobDrops.Gear,
}, [
  new CharacterSet("On-field DPS", ["ATK"], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.FinaleOfTheDeepGalleries, 4, 5),
  ])
])

export const Sucrose = new Character("Sucrose", "Anemo", "Catalyst", ["Grouping"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Freedom,
  weeklyBossDrop: MobDrops.SpiritLocketOfBoreas,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: MobDrops.HurricaneSeed,
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
  localSpecialty: LocalSpecialties.Starconch,
  worldBossDrop: MobDrops.CleansingHeart,
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
  localSpecialty: LocalSpecialties.FluorescentFungus,
  worldBossDrop: MobDrops.SmolderingPearl,
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
  localSpecialty: LocalSpecialties.NilotpalaLotus,
  worldBossDrop: MobDrops.MajesticHookedBeak,
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
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
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
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
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
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
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
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
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
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
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
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
  mobDrop: EasyMobDrops.Mask,
}, [
  new CharacterSet("Off-field Support", ["ATK", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 4),
    ...AttackSets(3),
    ...EnergyRechargeSets(3),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 3),
  ])
]);
export const TravelerCryo = new Character("Traveler (Cryo)", "Cryo", "Sword", [], Rarity.Legendary, 'Unknown', {
  material: null,
  weeklyBossDrop: null,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
  mobDrop: EasyMobDrops.Mask,
}, []);

export const Varesa = new Character("Varesa", "Electro", "Catalyst", ["Nightsouls Blessing"], Rarity.Legendary, 'Natlan', {
  material: TalentAscension.Conflict,
  weeklyBossDrop: MobDrops.ErodedScaleFeather,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.SkysplitGembloom,
  worldBossDrop: MobDrops.SparklessStatueCore,
  mobDrop: EasyMobDrops.Fang,
}, [
  new CharacterSet("On-field DPS", ["ATK"], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.LongNightsOath, 4, 5),
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 4),
    ...AttackSets(3),
  ])
]);

export const Venti = new Character("Venti", "Anemo", "Bow", ["Grouping"], Rarity.Legendary, 'Mondstadt', {
  material: TalentAscension.Ballad,
  weeklyBossDrop: MobDrops.TailOfBoreas,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.Cecilia,
  worldBossDrop: MobDrops.HurricaneSeed,
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
  localSpecialty: LocalSpecialties.RukkhashavaMushrooms,
  worldBossDrop: MobDrops.PerpetualCaliber,
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
  localSpecialty: LocalSpecialties.SubdetectionUnit,
  worldBossDrop: MobDrops.TourbillonDevice,
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
  localSpecialty: LocalSpecialties.JueyunChili,
  worldBossDrop: MobDrops.EverflameSeed,
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
  localSpecialty: LocalSpecialties.ClearwaterJade,
  worldBossDrop: MobDrops.CloudseamScale,
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
  localSpecialty: LocalSpecialties.Qingxin,
  worldBossDrop: MobDrops.JuvenileJade,
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
  localSpecialty: LocalSpecialties.BrilliantChrysanthemum,
  worldBossDrop: MobDrops.GoldInscribedSecretSourceCore,
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
  localSpecialty: LocalSpecialties.SilkFlower,
  worldBossDrop: MobDrops.CleansingHeart,
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
  localSpecialty: LocalSpecialties.Violetgrass,
  worldBossDrop: MobDrops.EverflameSeed,
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
  localSpecialty: LocalSpecialties.SeaGanoderma,
  worldBossDrop: MobDrops.DragonheirsFalseFin,
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
  localSpecialty: LocalSpecialties.NoctilucousJade,
  worldBossDrop: MobDrops.JuvenileJade,
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
  localSpecialty: LocalSpecialties.JueyunChili,
  worldBossDrop: MobDrops.QuielledCreeper,
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
  localSpecialty: LocalSpecialties.Starconch,
  worldBossDrop: MobDrops.RunicFang,
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
  localSpecialty: LocalSpecialties.NakuWeed,
  worldBossDrop: MobDrops.SmolderingPearl,
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
  localSpecialty: LocalSpecialties.SeaGanoderma,
  worldBossDrop: MobDrops.TalismanOftheEnigmaticLand,
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
  localSpecialty: LocalSpecialties.GlazeLily,
  worldBossDrop: MobDrops.RiftbornRegalia,
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
  localSpecialty: LocalSpecialties.CorLapis,
  worldBossDrop: MobDrops.BasaltPillar,
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