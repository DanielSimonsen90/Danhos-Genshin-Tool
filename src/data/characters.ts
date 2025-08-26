import { Rarity } from "@/common/types";
import { Character, CharacterPlaystyle, CharacterArtifactSet } from "../common/models";
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
  new CharacterArtifactSet(Sets.NighttimeWhispersInTheEchoingWoods, 2, priority),
];
const DefenseSets = (priority: CharacterArtifactSet['effectiveness']) => [
  new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 2, priority),
  new CharacterArtifactSet(Sets.DefendersWill, 2, priority),
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

const ChargedAttackSets = (priority: CharacterArtifactSet['effectiveness']) => [
  new CharacterArtifactSet(Sets.MarechausseeHunter, 2, priority),
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
const CryoDMGSets = (priority: CharacterArtifactSet['effectiveness']) => [
  new CharacterArtifactSet(Sets.BlizzardStrayer, 2, priority),
  new CharacterArtifactSet(Sets.FinaleOfTheDeepGalleries, 2, priority),
];
const DendroDMGSets = (priority: CharacterArtifactSet['effectiveness']) => [
  new CharacterArtifactSet(Sets.DeepwoodMemories, 2, priority),
];
const GeoDMGSets = (priority: CharacterArtifactSet['effectiveness']) => [
  new CharacterArtifactSet(Sets.ArchaicPetra, 2, priority),
];
const HydroDMGSets = (priority: CharacterArtifactSet['effectiveness']) => [
  new CharacterArtifactSet(Sets.HeartOfDepth, 2, priority),
  new CharacterArtifactSet(Sets.NymphsDream, 2, priority),
];
const PyroDMGSets = (priority: CharacterArtifactSet['effectiveness']) => [
  new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, priority),
];

export const Albedo = new Character("Albedo", "Geo", "Sword", [], Rarity.Legendary, 'Mondstadt', {
  localSpecialty: LocalSpecialties.Cecilia,
  crystal: ElementalCrystals.Geo,
  material: TalentAscension.Ballad,
  mobDrop: EasyMobDrops.Scroll,
  worldBossDrop: MobDrops.BasaltPillar,
  weeklyBossDrop: MobDrops.TuskOfMonocerosCaeli,
}, '10% chance of double product when crafting Weapon Ascension Materials.',
  new CharacterPlaystyle("Off-field DPS", ["DEF"], ['Skill/Ability', "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 71.2),
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 12.5),
    ...GeoDMGSets(3.0),
    ...DefenseSets(3.0),
  ])
);

export const Alhaitham = new Character("Alhaitham", "Dendro", "Sword", [
  "Elemental Infusion: After Skill/Ability, Alhaitham gains Dendro infusion",
], Rarity.Legendary, 'Sumeru', {
  localSpecialty: LocalSpecialties.SandGreasePupa,
  crystal: ElementalCrystals.Dendro,
  material: TalentAscension.Ingenuity,
  mobDrop: EasyMobDrops.EremiteDrop,
  worldBossDrop: MobDrops.PseudoStamens,
  weeklyBossDrop: MobDrops.MirrorOfMushin,
}, '10% chance of double product when crafting Weapon Ascension Materials.',
  new CharacterPlaystyle("On-field Dendro DPS", ["Elemental Mastery", "ATK"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.GildedDreams, 4, 72.7),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 7.3),
    ...DendroDMGSets(6.3),
    ...ElementalMasterySets(6.3),
  ])
);

export const Aloy = new Character("Aloy", "Cryo", "Bow", [], Rarity.Legendary, 'Unknown', {
  localSpecialty: LocalSpecialties.CrystalMarrow,
  crystal: ElementalCrystals.Cryo,
  material: TalentAscension.Freedom,
  mobDrop: EasyMobDrops.Spectral,
  worldBossDrop: MobDrops.CrystallineBloom,
  weeklyBossDrop: MobDrops.MoltenMoment,
}, 'Party members will not startle animals who produce: Fowl, Raw or Chilled meat.',
  new CharacterPlaystyle("Burst Support", ["ATK"], ["Burst/Ult", "Skill/Ability", "Charged/Hold"], false, [
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 40.9),
    ...CryoDMGSets(12.7),
    ...AttackSets(12.7),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 4, 8.2),
  ])
);

export const Amber = new Character("Amber", "Pyro", "Bow", ["Off-field Damage"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Freedom,
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.SmallLampGrass,
  mobDrop: EasyMobDrops.Arrowhead,
  worldBossDrop: MobDrops.EverflameSeed,
  weeklyBossDrop: MobDrops.DvalinsSigh,
}, '20% Gliding consumption reduction.',
  new CharacterPlaystyle("Off-field DPS", ["ATK", "Energy Recharge"], ["Normal/Press", "Burst/Ult", "Skill/Ability"], false, [
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 53.2),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 10.5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5.3),
  ])
);

export const AratakiItto = new Character("Arataki Itto", "Geo", "Claymore", [
  "Off-field Damage",
  "Elemental Infusion: After Skill/Ability, Arataki Itto gains Geo infusion"
], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Elegance,
  weeklyBossDrop: MobDrops.AshenHeart,
  crystal: ElementalCrystals.Geo,
  localSpecialty: LocalSpecialties.Onikabuto,
  worldBossDrop: MobDrops.RiftbornRegalia,
  mobDrop: EasyMobDrops.Slime,
}, '25% chance of receiving additional log when party members attack trees.',
  new CharacterPlaystyle("On-field DPS", ["DEF"], ["Burst/Ult", "Normal/Press", "Skill/Ability"], true, [
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 91.0),
    ...AttackSets(1.9),
    ...DefenseSets(1.9),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 1.2),
  ])
);

export const Arlecchino = new Character("Arlecchino", "Pyro", "Polearm", ["Bond of Life"], Rarity.Legendary, 'Snezhnaya', {
  material: TalentAscension.Order,
  weeklyBossDrop: MobDrops.FadingCandle,
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.RainbowRose,
  worldBossDrop: MobDrops.FragmentOfAGoldenMelody,
  mobDrop: EasyMobDrops.FatuiInsignia,
}, 'Gains 40% Pyro DMG Bonus and can only be healed using Burst/Ult.',
  new CharacterPlaystyle("On-field DPS", ["ATK"], ["Normal/Press", "Skill/Ability", "Burst/Ult"], true, [
    new CharacterArtifactSet(Sets.FragmentOfHarmonicWhimsy, 4, 69.5),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 20.8),
    ...AttackSets(2.2),
  ])
);

export const Baizhu = new Character("Baizhu", "Dendro", "Catalyst", ["Heal"], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Gold,
  weeklyBossDrop: MobDrops.WorldspanFern,
  crystal: ElementalCrystals.Dendro,
  worldBossDrop: MobDrops.EvergloomRing,
  localSpecialty: LocalSpecialties.Violetgrass,
  mobDrop: EasyMobDrops.FungalSpores,
}, 'When in team, certain harvestable items will trigger a healing effect on the active character consisting of 2.5% of this character\'s Max HP.',
  new CharacterPlaystyle("Off-field Support", ["HP", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 37.4),
    new CharacterArtifactSet(Sets.VourukashasGlow, 2, 17.0),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 17.0),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 8.7),
  ])
);

export const Barbara = new Character("Barbara", "Hydro", "Catalyst", ["Heal"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Freedom,
  weeklyBossDrop: MobDrops.RingOfBoreas,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.PhilanemoMushroom,
  worldBossDrop: MobDrops.CleansingHeart,
  mobDrop: EasyMobDrops.Scroll,
}, '12% chance of double product when cooking Restorative foods.',
  new CharacterPlaystyle("Off-field Support", ["HP"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.MaidenBeloved, 4, 78.1),
    new CharacterArtifactSet(Sets.OceanHuedClam, 2, 29.0),
    new CharacterArtifactSet(Sets.MaidenBeloved, 2, 3.5),
    new CharacterArtifactSet(Sets.OceanHuedClam, 2, 3.5),
  ]),
);

export const Beidou = new Character("Beidou", "Electro", "Claymore", ["Shield"], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Gold,
  weeklyBossDrop: MobDrops.DvalinsSigh,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.NoctilucousJade,
  worldBossDrop: MobDrops.LightningPrism,
  mobDrop: EasyMobDrops.FatuiInsignia,
}, '20% Swimming consumption reduction.',
  new CharacterPlaystyle("Off-field DPS", ["Energy Recharge", "ATK"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 68.0),
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 5.3),
    ...AttackSets(4.0),
  ])
);

export const Bennett = new Character("Bennett", "Pyro", "Sword", [
  "Heal",
  "Buff ATK: While inside Bennett's ult",
  "Elemental Infusion: If C6 activated, Bennet provides Sword/Claymore/Polearm characters Pyro infusion"
], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.DvalinsPlume,
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: MobDrops.EverflameSeed,
  mobDrop: EasyMobDrops.TreasureHoarderInsignia,
}, '25% time consumption reduction when on expeditions in Mondstadt.',
  new CharacterPlaystyle("Burst Support", ["Energy Recharge", "HP"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 91.6),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 1.2),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 0.9),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 0.9),
  ]),
);

export const Candace = new Character("Candace", "Hydro", "Polearm", [
  "Shield",
  "Off-field Damage",
  "Elemental Infusion: After Burst/Ult, Candace provides Sword/Claymore/Polearm characters Hydro infusion"
], Rarity.Epic, 'Sumeru', {
  material: TalentAscension.Admonition,
  weeklyBossDrop: MobDrops.TearsOfTheCalamitousGod,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.HennaBerry, // Referred to as "Redcrest"
  worldBossDrop: MobDrops.LightGuidingTetrahedron,
  mobDrop: EasyMobDrops.EremiteDrop,
}, '20% Climbing consumption reduction.',
  new CharacterPlaystyle("Off-field Support", ["HP", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 2, 30.9),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 30.9),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 16.8),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 11.2),
  ])
);

export const Charlotte = new Character("Charlotte", "Cryo", "Catalyst", [
  "Heal",
  "Bond of Life"
], Rarity.Epic, 'Fontaine', {
  material: TalentAscension.Justice,
  weeklyBossDrop: MobDrops.LightlessSilkString,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.BerylConch,
  worldBossDrop: MobDrops.TourbillonDevice,
  mobDrop: EasyMobDrops.Gear,
}, 'Can take photos using Skill after "Special Analysis Zoom Lens" item is activated.',
  new CharacterPlaystyle("Off-field Support", ["Energy Recharge", "ATK"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    ...AttackSets(36.5),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 36.5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 12.3),
    new CharacterArtifactSet(Sets.SongOfDaysPast, 4, 8.7),
  ])
);

export const Chasca = new Character("Chasca", "Anemo", "Bow", ["Nightsouls Blessing"], Rarity.Legendary, 'Natlan', {
  material: TalentAscension.Conflict,
  weeklyBossDrop: MobDrops.SilkenFeather,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.WitheringPurpurbloom,
  worldBossDrop: MobDrops.EnsnaringGaze,
  mobDrop: EasyMobDrops.Fang,
}, '25 Phlogiston is restored when own party members defeat an opponent. This effect can be triggered once every 12s.',
  new CharacterPlaystyle("On-field DPS", ["ATK"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 90.5),
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 2.1),
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 1.2),
  ])
);

export const Chevreuse = new Character("Chevreuse", "Pyro", "Polearm", ["Heal"], Rarity.Epic, 'Fontaine', {
  material: TalentAscension.Order,
  weeklyBossDrop: MobDrops.LightlessEyeOfTheMaelstrom,
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.LumidouceBell,
  worldBossDrop: MobDrops.FontemerUnihorn,
  mobDrop: EasyMobDrops.Gear,
}, '20% Sprinting consumption reduction.',
  new CharacterPlaystyle("Off-field Support", ["HP", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.SongOfDaysPast, 4, 48.5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 22.1 ),
    ...HPSets(8.3)
  ]),
);

export const Chiori = new Character("Chiori", "Geo", "Sword", [
  "Off-field Damage",
  `Elemental Infusion: After triggering "Tapestry effect", Chiori gains Geo infusion for 5 seconds`
], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Light,
  weeklyBossDrop: MobDrops.LightlessSilkString,
  crystal: ElementalCrystals.Geo,
  localSpecialty: LocalSpecialties.Dendrobium,
  worldBossDrop: MobDrops.ArtificedSpareClockworkComponent__Coppelia,
  mobDrop: EasyMobDrops.Spectral,
}, '10% movement speed increase when not wearing default skin or wings for any party member.', 
  new CharacterPlaystyle("Off-field Geo DPS", ["DEF"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 60.1),
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 29.2),
    ...DefenseSets(2.5),
    new CharacterArtifactSet(Sets.GoldenTroupe, 2, 2.5),
  ])
);

export const Chongyun = new Character("Chongyun", "Cryo", "Claymore", [
  "Elemental Infusion: After Skill/Ability, Chongyun provides Sword/Claymore characters Cryo infusion",
], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Diligence,
  weeklyBossDrop: MobDrops.DvalinsSigh,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.CorLapis,
  worldBossDrop: MobDrops.HoarfrostCore,
  mobDrop: EasyMobDrops.Mask,
}, '25% time consumption reduction when on expeditions in Liyue.',
  new CharacterPlaystyle("Burst Support", ["ATK", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 33.4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 11.5),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 11.5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 9.8),
  ])
);

export const Citlali = new Character("Citlali", "Cryo", "Catalyst", [
  "Shield",
  "Nightsouls Blessing"
], Rarity.Legendary, 'Natlan', {
  material: TalentAscension.Kindling,
  weeklyBossDrop: MobDrops.DenialAndJudgment,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.QuenepaBerry,
  worldBossDrop: MobDrops.TalismanOftheEnigmaticLand,
  mobDrop: EasyMobDrops.Fang,
}, 'Triggering Nightsoul Burst within an area with Phlogiston Mechanics in Natlan restores 20 Phlogiston.',
  new CharacterPlaystyle("Off-field Support", ["Elemental Mastery", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 83.7),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 8.6),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 1.7),
  ])
);

export const Clorinde = new Character("Clorinde", "Electro", "Sword", ["Bond of Life"], Rarity.Legendary, 'Fontaine', {
  material: TalentAscension.Justice,
  weeklyBossDrop: MobDrops.Everamber,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.Lumitoile,
  worldBossDrop: MobDrops.FontemerUnihorn,
  mobDrop: EasyMobDrops.FontemerAberrantPearl,
}, 'Shows Local Specialties in Fontaine on minimap.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.FragmentOfHarmonicWhimsy, 4, 74.4),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 10.5),
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 5.2),
  ])
);

export const Collei = new Character("Collei", "Dendro", "Bow", [], Rarity.Epic, 'Sumeru', {
  material: TalentAscension.Praxis,
  weeklyBossDrop: MobDrops.TearsOfTheCalamitousGod,
  crystal: ElementalCrystals.Dendro,
  localSpecialty: LocalSpecialties.RukkhashavaMushrooms,
  worldBossDrop: MobDrops.MajesticHookedBeak,
  mobDrop: EasyMobDrops.Arrowhead,
}, '20% Gliding consumption reduction.',
  new CharacterPlaystyle("Off-field Support", ["Energy Recharge", "Elemental Mastery"], ["Burst/Ult", "Skill/Ability", "Charged/Hold"], false, [
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 70.5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 6.3),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 3.9),
  ])
);

export const Cyno = new Character("Cyno", "Electro", "Polearm", [], Rarity.Legendary, 'Sumeru', {
  material: TalentAscension.Admonition,
  weeklyBossDrop: MobDrops.MudraOfTheMaleficGeneral,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.Scarab,
  worldBossDrop: MobDrops.ThunderclapFruitcore,
  mobDrop: EasyMobDrops.Scroll,
}, '25% more rewards when on expeditions in Sumeru.',
  new CharacterPlaystyle("On-field DPS", ["Energy Recharge", "Elemental Mastery"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.GildedDreams, 4, 56.3),
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 19.9),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 6.3),
  ])
);

export const Dahlia = new Character("Dahlia", "Hydro", "Sword", [
  "Shield",
  "Buff ATK Speed: Use normal attacks or Frozen reaction"
], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Ballad,
  weeklyBossDrop: MobDrops.ErodedScaleFeather,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.CallaLily,
  worldBossDrop: MobDrops.SecretSourceAirflowAccumulator,
  mobDrop: EasyMobDrops.Arrowhead
}, 'During Day (06:00 - 18:00), party members gain 10% increased movement speed.',
  new CharacterPlaystyle("Burst Support", ["HP", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 74.5),
    ...HPSets(6.6),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 5.8),
  ])
);

export const Dehya = new Character("Dehya", "Pyro", "Claymore", ["Self-heal", "Off-field Damage"], Rarity.Legendary, 'Sumeru', {
  material: TalentAscension.Praxis,
  weeklyBossDrop: MobDrops.PuppetStrings,
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.SandGreasePupa,
  worldBossDrop: MobDrops.LightGuidingTetrahedron,
  mobDrop: EasyMobDrops.EremiteDrop,
}, 'During Day (06:00 - 18:00), party members gain 10% increased movement speed.',
  new CharacterPlaystyle("On-field DPS", ["HP", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.VourukashasGlow, 4, 31.1),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 20.2),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 13.2),
  ])
);

export const Diluc = new Character("Diluc", "Pyro", "Claymore", [
  'Elemental Infusion: After Burst/Ult, Diluc gains Pyro infusion'
], Rarity.Legendary, 'Mondstadt', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.DvalinsPlume,
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.SmallLampGrass,
  worldBossDrop: MobDrops.EverflameSeed,
  mobDrop: EasyMobDrops.FatuiInsignia,
}, '15% chance of refunding ore when crafting Claymore weapons.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Elemental Mastery"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 70.6),
    ...AttackSets(8.3),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 8.3),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 7.5),
  ]),
);

export const Diona = new Character("Diona", "Cryo", "Bow", ["Shield"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Freedom,
  weeklyBossDrop: MobDrops.ShardOfAFoulLegacy,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.CallaLily,
  worldBossDrop: MobDrops.HoarfrostCore,
  mobDrop: EasyMobDrops.Arrowhead,
}, '12% chance of double product when cooking Restorative foods.',
  new CharacterPlaystyle("Off-field Support", ["HP", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Charged/Hold"], false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 38.3),
    new CharacterArtifactSet(Sets.MaidenBeloved, 4, 14.6),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 11.4),
  ]),
);

export const Dori = new Character("Dori", "Electro", "Claymore", [
  "Heal",
  "Elemental Infusion: If C6 activated, after Skill/Ability, Dori gains Electro infusion"
], Rarity.Epic, 'Sumeru', {
  material: TalentAscension.Ingenuity,
  weeklyBossDrop: MobDrops.BloodjadeBranch,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.KalpalataLotus,
  worldBossDrop: MobDrops.ThunderclapFruitcore,
  mobDrop: EasyMobDrops.EremiteDrop,
}, '25% chance of refund materials used when crafting Character Talent Materials and Weapon Ascension Materials.',
  new CharacterPlaystyle("Off-field Support", ["Energy Recharge", "HP"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 29.4),
    ...HPSets(13.7),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 6.5),
  ]),
);

export const Emilie = new Character("Emilie", "Dendro", "Catalyst", ["Off-field Damage"], Rarity.Legendary, 'Fontaine', {
  material: TalentAscension.Order,
  weeklyBossDrop: MobDrops.SilkenFeather,
  crystal: ElementalCrystals.Dendro,
  localSpecialty: LocalSpecialties.LakelightLily,
  worldBossDrop: MobDrops.FragmentOfAGoldenMelody,
  mobDrop: EasyMobDrops.Gear,
}, 'When Lumidouce Case (lamp) is on field, all party members gain 85% Pyro RES against Burning DMG.',
  new CharacterPlaystyle("Off-field Burning Support", ["ATK", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.UnfinishedReverie, 4, 81.4),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 11.4),
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 1.3),
  ]),
);

export const Escoffier = new Character('Escoffier', 'Cryo', 'Polearm', ['Off-field Damage', 'Heal'], Rarity.Legendary, 'Fontaine', {
  material: TalentAscension.Justice,
  weeklyBossDrop: MobDrops.ErodedHorn,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.BerylConch,
  worldBossDrop: MobDrops.SecretSourceAirflowAccumulator,
  mobDrop: EasyMobDrops.Gear,
}, 'Once a week (reset Monday 4am EST), Low-Temperature Cooking (Skill) can produce foods after hitting a certain limit of elemental energy absorption.',
  new CharacterPlaystyle("Off-field Support", ["ATK", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 92.9),
    ...HPSets(1.2),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 0.6),
  ])
);

export const Eula = new Character("Eula", "Cryo", "Claymore", [], Rarity.Legendary, 'Mondstadt', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.DragonLordsCrown,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.DandelionSeed,
  worldBossDrop: MobDrops.CrystallineBloom,
  mobDrop: EasyMobDrops.Mask,
}, '10% chance of double product when crafting Character Talent Materials.', 
  new CharacterPlaystyle("On-field DPS", ["ATK", "Energy Recharge"], ["Burst/Ult", "Normal/Press", "Skill/Ability"], true, [
    new CharacterArtifactSet(Sets.PaleFlame, 4, 70.8),
    ...PhysicalDMGSets(15.3),
    ...AttackSets(3.6),
    ...PhysicalDMGSets(3.6),
  ]),
);

export const Faruzan = new Character("Faruzan", "Anemo", "Bow", [
  "CRIT Increase: For Anemo DMG if C6 and ult is active",
  "Off-field Damage"
], Rarity.Epic, 'Sumeru', {
  material: TalentAscension.Admonition,
  weeklyBossDrop: MobDrops.PuppetStrings,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.HennaBerry,
  worldBossDrop: MobDrops.LightGuidingTetrahedron,
  mobDrop: EasyMobDrops.EremiteDrop,
}, '25% more rewards when on expeditions in Sumeru.',
  new CharacterPlaystyle("Burst Support", ["Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Charged/Hold"], false, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 35.1),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 20.8),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 15.1),
  ])
);

export const Fischl = new Character("Fischl", "Electro", "Bow", ["Off-field Damage"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Ballad,
  weeklyBossDrop: MobDrops.SpiritLocketOfBoreas,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.SmallLampGrass,
  worldBossDrop: MobDrops.LightningPrism,
  mobDrop: EasyMobDrops.Arrowhead,
}, '25% time consumption reduction when on expeditions in Mondstadt.',
  new CharacterPlaystyle("Off-field DPS", ["ATK", "Elemental Mastery"], ["Skill/Ability", "Burst/Ult", "Charged/Hold"], false, [
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 68.4),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 5.8),
    ...AttackSets(3.8),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 3.8),
  ]),
);

export const Freminet = new Character("Freminet", "Cryo", "Claymore", [], Rarity.Epic, 'Fontaine', {
  material: TalentAscension.Justice,
  weeklyBossDrop: MobDrops.WorldspanFern,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.RomaritimeFlower,
  worldBossDrop: MobDrops.ArtificedSpareClockworkComponent__Coppelius,
  mobDrop: EasyMobDrops.FontemerAberrantPearl,
}, '35% Aquatic Stamina consumption reduction.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Energy Recharge"], ["Skill/Ability", "Normal/Press", "Burst/Ult"], true, [
    new CharacterArtifactSet(Sets.PaleFlame, 4, 47.9),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 9.2),
    new CharacterArtifactSet(Sets.PaleFlame, 2, 6.2),
    ...PhysicalDMGSets(6.2),
  ])
);

export const Furina = new Character("Furina", "Hydro", "Sword", [
  "Heal",
  "Off-field Damage"
], Rarity.Legendary, 'Fontaine', {
  material: TalentAscension.Justice,
  weeklyBossDrop: MobDrops.LightlessMass,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.LakelightLily,
  worldBossDrop: MobDrops.WaterThatFailedToTranscend,
  mobDrop: EasyMobDrops.Nectar,
}, '30% Xenochromatic Fontemer Aberrant ability cooldown reduction.',
  new CharacterPlaystyle("Off-field DPS", ["HP", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 94.1),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 0.5),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 0.5),
  ]),
);

export const Gaming = new Character("Gaming", "Pyro", "Claymore", ["Self-heal"], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Prosperity,
  weeklyBossDrop: MobDrops.LightlessMass,
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.Starconch,
  worldBossDrop: MobDrops.EmperorsResolution,
  mobDrop: EasyMobDrops.Slime,
}, 'During Day (06:00 - 18:00), party members gain 10% increased movement speed.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Plunging/Press"], true, [
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 63.0),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 18.1),
    new CharacterArtifactSet(Sets.LongNightsOath, 4, 3.6),
  ]),
);

export const Ganyu = new Character("Ganyu", "Cryo", "Bow", ["Off-field Damage"], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Diligence,
  weeklyBossDrop: MobDrops.ShadowOfTheWarrior,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.Qingxin,
  worldBossDrop: MobDrops.ShadowOfTheWarrior,
  mobDrop: EasyMobDrops.Nectar,
}, '15% chance of refunding ore when crafting Bow weapons.',
  new CharacterPlaystyle("On-field DPS", ["ATK"], ["Charged/Hold", "Burst/Ult", "Skill/Ability"], true, [
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 74.7),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 15.2),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 1.9),
  ]),
);

export const Gorou = new Character("Gorou", "Geo", "Bow", ["Shield"], Rarity.Epic, 'Inazuma', {
  material: TalentAscension.Light,
  weeklyBossDrop: MobDrops.MoltenMoment,
  crystal: ElementalCrystals.Geo,
  localSpecialty: LocalSpecialties.SangoPearl,
  worldBossDrop: MobDrops.PerpetualHeart,
  mobDrop: EasyMobDrops.Spectral,
}, 'Shows Local Specialties in Inazuma on minimap.',
  new CharacterPlaystyle("Off-field Geo Support", ["DEF", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Charged/Hold"], false, [
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 57.3),
    ...EnergyRechargeSets(17.2),
    ...DefenseSets(17.2),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 12.2),
  ])
);

export const HuTao = new Character("Hu Tao", "Pyro", "Polearm", [
  "Self-heal",
  "Elemental Infusion: After Skill/Ability, Hu Tao gains Pyro infusion"
], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Diligence,
  weeklyBossDrop: MobDrops.ShardOfAFoulLegacy,
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.SilkFlower,
  worldBossDrop: MobDrops.JuvenileJade,
  mobDrop: EasyMobDrops.Nectar,
}, '18% chance of receiving additional "Suspicious" dish of same food type when cooking.',
  new CharacterPlaystyle("On-field DPS", ["HP", "Elemental Mastery", "ATK"], ["Skill/Ability", "Normal/Press", "Burst/Ult"], true, [
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 80.0),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 4, 10.0),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 2.2),
  ]),
);

export const Iansan = new Character("Iansan", "Electro", "Polearm", ["Nightsouls Blessing"], Rarity.Epic, 'Natlan', {
  material: TalentAscension.Contention,
  weeklyBossDrop: MobDrops.DenialAndJudgment,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.Dracolite,
  worldBossDrop: MobDrops.EnsnaringGaze,
  mobDrop: EasyMobDrops.Whistle,
}, 'Gain 10 Phlogiston when Phlogison levels drop below 50%. This effect can be triggered once every 10s.',
  new CharacterPlaystyle("Burst Support", ["ATK", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 88.3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 7.8),
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 2, 0.4),
    new CharacterArtifactSet(Sets.ObsidianCodex, 2, 0.4),
  ])
);

export const Ifa = new Character('Ifa', "Anemo", "Catalyst", [
  "Heal",
  "Nightsouls Blessing"
], Rarity.Epic, 'Natlan', {
  material: TalentAscension.Conflict,
  weeklyBossDrop: MobDrops.ChessGameRook,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.SaurianClawSucculent,
  worldBossDrop: MobDrops.SparklessStatueCore,
  mobDrop: EasyMobDrops.Fang,
}, 'When current character or indwelt saurian has less than 40% HP, they are healed by 40% of their HP with that consumes 10 Phlogiston. This effect can be triggered once every 10s.',
  new CharacterPlaystyle('On-field DPS', ['Elemental Mastery', "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 61.0),
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 7.9),
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 19.6),
  ])
);

export const Ineffa = new Character("Ineffa", "Electro", "Polearm", [
  "Enables Lunar-Charged Reaction",
  "Off-field Damage",
  "Shield",
], Rarity.Legendary, 'Nod-Krai', {
  material: TalentAscension.Conflict,
  weeklyBossDrop: MobDrops.ErodedSunfire,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.GlowingHornshroom,
  worldBossDrop: MobDrops.SecretSourceAirflowAccumulator,
  mobDrop: EasyMobDrops.Whistle,
}, 'When using food, there is a 30% chance of gaining seasoning ingredient.',
  new CharacterPlaystyle("Off-field Lunar-Charged Support", ['ATK', 'Elemental Mastery'], ['Skill/Ability', "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.GildedDreams, 4, 48.6),
    ...AttackSets(23.2),
    ...ElementalMasterySets(23.2),
    ...ElementalMasterySets(4.3),
  ])
);

export const Jean = new Character("Jean", "Anemo", "Sword", ["Heal"], Rarity.Legendary, 'Mondstadt', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.DvalinsPlume,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.DandelionSeed,
  worldBossDrop: MobDrops.HurricaneSeed,
  mobDrop: EasyMobDrops.Mask,
}, '12% chance of double product when cooking Restorative foods.',
  new CharacterPlaystyle("Off-field Support", ["ATK", "Elemental Mastery"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 71.8),
    new CharacterArtifactSet(Sets.ViridescentVenerer, 2, 6.5),
    ...AttackSets(6.5),
    ...AttackSets(2.5),
  ])
);

export const Kachina = new Character("Kachina", "Geo", "Polearm", [
  "Off-field Damage",
  "Nightsouls Blessing"
], Rarity.Epic, "Natlan", {
  material: TalentAscension.Conflict,
  weeklyBossDrop: MobDrops.FadingCandle,
  crystal: ElementalCrystals.Geo,
  localSpecialty: LocalSpecialties.QuenepaBerry,
  worldBossDrop: MobDrops.OverripeFlamegranate,
  mobDrop: EasyMobDrops.Whistle,
}, 'Shows Local Specialties in Natlan on minimap.',
  new CharacterPlaystyle("Off-field DPS", ["DEF"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 85.2),
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 3.2),
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 2.8),
  ])
);

export const KaedeharaKazuha = new Character("Kaedehara Kazuha", "Anemo", "Sword", [
  "Off-field Damage",
  "Grouping",
  "Elemental based: Ult can be infused with other party member elements excl. Anemo & Dendro",
  "Elemental Infusion: If C6 activated, after Skill/Ability or Burst/Ult, Kazuha gains Anemo infusion for 5 seconds"
], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Diligence,
  weeklyBossDrop: MobDrops.GildedScale,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.SeaGanoderma,
  worldBossDrop: MobDrops.MarionetteCore,
  mobDrop: EasyMobDrops.TreasureHoarderInsignia,
}, '20% Sprinting consumption reduction.',
  new CharacterPlaystyle("Off-field Swirl Support", ["Elemental Mastery", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Plunging/Press"], false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 95.2),
    new CharacterArtifactSet(Sets.ViridescentVenerer, 2, 1.2),
    ...ElementalMasterySets(1.2),
    ...AttackSets(0.6),
    ...ElementalMasterySets(0.6),
  ])
);

export const Kaeya = new Character("Kaeya", "Cryo", "Sword", [
  "Off-field Damage",
  "Self-heal"
], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Ballad,
  weeklyBossDrop: MobDrops.SpiritLocketOfBoreas,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.CallaLily,
  worldBossDrop: MobDrops.HoarfrostCore,
  mobDrop: EasyMobDrops.TreasureHoarderInsignia,
}, '20% Sprinting consumption reduction.',
  new CharacterPlaystyle("Off-field Cryo DPS", ["ATK", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 34.1),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 30.7),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 6.5),
    ...AttackSets(6.5),
  ])
);

export const KamisatoAyaka = new Character("Kamisato Ayaka", "Cryo", "Sword", [
  "Off-field Damage",
  "Elemental Infusion: After re-appearing from alternate sprint, Ayaka gains Cryo infusion for a short duration",
], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Elegance,
  weeklyBossDrop: MobDrops.BloodjadeBranch,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.SakuraBloom,
  worldBossDrop: MobDrops.PerpetualHeart,
  mobDrop: EasyMobDrops.Handguard,
}, '10% chance of double product when crafting Weapon Ascension Materials.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Energy Recharge"], ["Burst/Ult", "Normal/Press", "Skill/Ability"], true, [
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 86.6),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 3.4),
    ...AttackSets(3.4),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 2.2),
  ])
);

export const KamisatoAyato = new Character("Kamisato Ayato", "Hydro", "Sword", [], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Elegance,
  weeklyBossDrop: MobDrops.MudraOfTheMaleficGeneral,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.SakuraBloom,
  worldBossDrop: MobDrops.DewOfRepudiation,
  mobDrop: EasyMobDrops.Handguard,
}, '18% chance of receiving additional "Suspicious" dish of same food type when cooking.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 4, 44.6),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 23.5),
    new CharacterArtifactSet(Sets.HeartOfDepth, 4, 15.7),
  ])
);

export const Kaveh = new Character("Kaveh", "Dendro", "Claymore", ["Self-heal"], Rarity.Epic, 'Sumeru', {
  material: TalentAscension.Ingenuity,
  weeklyBossDrop: MobDrops.PrimordialGreenbloom,
  crystal: ElementalCrystals.Dendro,
  localSpecialty: LocalSpecialties.MourningFlower,
  worldBossDrop: MobDrops.QuielledCreeper,
  mobDrop: EasyMobDrops.FungalSpores,
}, '100% chance of refunding a portion of materials used when crafting building, courtyard and landscape-type furnishings.',
  new CharacterPlaystyle("On-field DPS", ["Elemental Mastery", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.FlowerOfParadiseLost, 4, 41.1),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 22.5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 12.2),
  ])
);

export const Keqing = new Character("Keqing", "Electro", "Sword", [
  "Elemental Infusion: After Skill/Ability, Keqing gains Electro infusion for 5 seconds",
], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Prosperity,
  weeklyBossDrop: MobDrops.RingOfBoreas,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.CorLapis,
  worldBossDrop: MobDrops.LightningPrism,
  mobDrop: EasyMobDrops.Nectar,
}, '25% time consumption reduction when on expeditions in Liyue.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Elemental Mastery"], ["Burst/Ult", "Normal/Press", "Skill/Ability"], true, [
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 52.4),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 11.8),
    ...AttackSets(11.8),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 7.7)
  ]),
);

export const Kinich = new Character("Kinich", "Dendro", "Claymore", ["Off-field Damage", "Nightsouls Blessing"], Rarity.Legendary, 'Natlan', {
  material: TalentAscension.Kindling,
  weeklyBossDrop: MobDrops.DenialAndJudgment,
  crystal: ElementalCrystals.Dendro,
  localSpecialty: LocalSpecialties.SaurianClawSucculent,
  worldBossDrop: MobDrops.OverripeFlamegranate,
  mobDrop: EasyMobDrops.Fang,
}, 'Shows Local Specialties in Natlan on minimap.',
  new CharacterPlaystyle("On-field Burning DPS", ["ATK", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 90.3),
    new CharacterArtifactSet(Sets.UnfinishedReverie, 4, 1.3),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 1.0),
  ]),
);

export const Kirara = new Character("Kirara", "Dendro", "Sword", ["Shield"], Rarity.Epic, 'Inazuma', {
  material: TalentAscension.Transience,
  weeklyBossDrop: MobDrops.Everamber,
  crystal: ElementalCrystals.Dendro,
  localSpecialty: LocalSpecialties.AmakumoFruit,
  worldBossDrop: MobDrops.EvergloomRing,
  mobDrop: EasyMobDrops.Spectral,
}, 'Party members will not startle animals who produce: Fowl, Raw or Chilled meat.',
  new CharacterPlaystyle("Off-field Support", ["HP"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    ...HPSets(43.7),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 24.8),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 8.5),
  ])
);

export const Klee = new Character("Klee", "Pyro", "Catalyst", [], Rarity.Legendary, 'Mondstadt', {
  material: TalentAscension.Freedom,
  weeklyBossDrop: MobDrops.RingOfBoreas,
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.PhilanemoMushroom,
  worldBossDrop: MobDrops.EverflameSeed,
  mobDrop: EasyMobDrops.Scroll,
}, 'Shows Local Specialties in Mondstadt on minimap.', 
  new CharacterPlaystyle("On-field DPS", ["ATK", "Elemental Mastery"], ["Normal/Press", "Skill/Ability", "Burst/Ult"], true, [
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 65.4),
    ...PyroDMGSets(8.5),
    ...AttackSets(8.5),
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 6.7),
  ])
);

export const KujouSara = new Character("Kujou Sara", "Electro", "Bow", ["Off-field Damage",], Rarity.Epic, 'Inazuma', {
  material: TalentAscension.Elegance,
  weeklyBossDrop: MobDrops.AshenHeart,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.Dendrobium,
  worldBossDrop: MobDrops.StormBeads,
  mobDrop: EasyMobDrops.Mask,
}, '25% time consumption reduction when on expeditions in Inazuma.',
  new CharacterPlaystyle("Burst Support", ["ATK"], ["Skill/Ability", "Burst/Ult", "Charged/Hold"], false, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 82.8),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 6.2),
    ...AttackSets(1.3),
    ...EnergyRechargeSets(1.3),
  ])
);

export const KukiShinobu = new Character("Kuki Shinobu", "Electro", "Sword", ["Heal"], Rarity.Epic, 'Inazuma', {
  material: TalentAscension.Elegance,
  weeklyBossDrop: MobDrops.TearsOfTheCalamitousGod,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.NakuWeed,
  worldBossDrop: MobDrops.RunicFang,
  mobDrop: EasyMobDrops.Spectral,
}, '25% more rewards when on expeditions in Inazuma.',
  new CharacterPlaystyle("Off-field Support", ["Elemental Mastery", "HP"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.GildedDreams, 4, 46.0),
    new CharacterArtifactSet(Sets.FlowerOfParadiseLost, 4, 20.4),
    ...ElementalMasterySets(3),
  ])
);

export const LanYan = new Character("Lan Yan", "Anemo", "Catalyst", ["Shield", "Grouping"], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Diligence,
  weeklyBossDrop: MobDrops.ErodedSunfire,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.ClearwaterJade,
  worldBossDrop: MobDrops.GoldInscribedSecretSourceCore,
  mobDrop: EasyMobDrops.Nectar,
}, 'Party members will not startle Crystalflies and certain other animals.',
  new CharacterPlaystyle("Off-field Support", ["ATK", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 85.3),
    new CharacterArtifactSet(Sets.ViridescentVenerer, 2, 3.2),
    ...ElementalMasterySets(3.2),
    ...ElementalMasterySets(2.6)
  ])
);

export const Layla = new Character("Layla", "Cryo", "Sword", [
  "Shield",
  'Off-field Damage'
], Rarity.Epic, 'Sumeru', {
  material: TalentAscension.Ingenuity,
  weeklyBossDrop: MobDrops.MirrorOfMushin,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.NilotpalaLotus,
  worldBossDrop: MobDrops.PerpetualCaliber,
  mobDrop: EasyMobDrops.Scroll,
}, '10% chance of double product when crafting Character Talent Materials.',
  new CharacterPlaystyle("Off-field Support", ["HP"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 69.0),
    ...HPSets(10.9),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 3.1),
  ]),
);

export const Lisa = new Character("Lisa", "Electro", "Catalyst", ["Off-field Damage"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Ballad,
  weeklyBossDrop: MobDrops.DvalinsClaw,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.Valberry,
  worldBossDrop: MobDrops.LightningPrism,
  mobDrop: EasyMobDrops.Slime,
}, '20% chance of refund materials used when crafting Potions.',
  new CharacterPlaystyle("Off-field DPS", ["ATK", "Elemental Mastery", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 28.5),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 23.4),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 9.4),
  ]),
);

export const Lynette = new Character("Lynette", "Anemo", "Sword", [
  "Elemental Infusion: If C6 activated, after Skill/Ability, Lynette gains Anemo infusion for 6 seconds",
], Rarity.Epic, 'Fontaine', {
  material: TalentAscension.Order,
  weeklyBossDrop: MobDrops.Everamber,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.LumidouceBell,
  worldBossDrop: MobDrops.ArtificedSpareClockworkComponent__Coppelia,
  mobDrop: EasyMobDrops.Gear,
}, 'Shows Recovery Orbs (stamina & hp gained from collision increased by 25%) on minimap.',
  new CharacterPlaystyle("Off-field Support", ["ATK", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 60.9),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 13.8),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 3.3),
  ])
);

export const Lyney = new Character("Lyney", "Pyro", "Bow", ['Self-heal'], Rarity.Legendary, "Fontaine", {
  material: TalentAscension.Equity,
  weeklyBossDrop: MobDrops.PrimordialGreenbloom,
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.RainbowRose,
  worldBossDrop: MobDrops.EmperorsResolution,
  mobDrop: EasyMobDrops.FatuiInsignia,
}, 'Shows Local Specialties in Fontaine on minimap.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Energy Recharge"], ['Charged/Hold', "Skill/Ability", "Burst/Ult"], true, [
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 74.6),
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 8.0),
    ...PyroDMGSets(2.0),
    ...ChargedAttackSets(2.0),
  ])
);

export const Mavuika = new Character("Mavuika", "Pyro", "Claymore", [
  'Nightsouls Blessing',
  'Off-field Damage'
], Rarity.Legendary, 'Natlan', {
  material: TalentAscension.Contention,
  weeklyBossDrop: MobDrops.ErodedHorn,
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.WitheringPurpurbloom,
  worldBossDrop: MobDrops.GoldInscribedSecretSourceCore,
  mobDrop: EasyMobDrops.Whistle,
}, '20% Nightsoul Transmission cooldown reduction.',
  new CharacterPlaystyle("On-field DPS", ["ATK", 'Elemental Mastery'], ["Burst/Ult", "Skill/Ability", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 91.0),
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 2.6),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 1.3),
  ]),
);

export const Mika = new Character("Mika", "Cryo", "Polearm", ["Heal"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Ballad,
  weeklyBossDrop: MobDrops.MirrorOfMushin,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.Wolfhook,
  worldBossDrop: MobDrops.PseudoStamens,
  mobDrop: EasyMobDrops.FatuiInsignia,
}, 'Shows Local Specialties in Mondstadt on minimap.',
  new CharacterPlaystyle("Burst Support", ["Energy Recharge", "HP"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 57.0),
    ...HPSets(8.9),
    ...EnergyRechargeSets(8.9),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 3.4),
  ]),
);

export const Mona = new Character("Mona", "Hydro", "Catalyst", ["Off-field Damage"], Rarity.Legendary, 'Mondstadt', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.RingOfBoreas,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.PhilanemoMushroom,
  worldBossDrop: MobDrops.CleansingHeart,
  mobDrop: EasyMobDrops.Nectar,
}, '25% chance of refund materials used when crafting Weapon Ascension Materials.',
  new CharacterPlaystyle("Burst Support", ["ATK", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 40.8),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 28.8),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 8.2),
  ])
);

export const Mualani = new Character("Mualani", "Hydro", "Catalyst", ["Nightsouls Blessing"], Rarity.Legendary, 'Natlan', {
  material: TalentAscension.Contention,
  weeklyBossDrop: MobDrops.LightlessMass,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.SprayfeatherGill,
  worldBossDrop: MobDrops.MarkOfTheBindingBlessing,
  mobDrop: EasyMobDrops.Whistle,
}, 'Shows Local Specialties in Natlan on minimap.',
  new CharacterPlaystyle("On-field DPS", ["HP", "Elemental Mastery"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 90.5),
    new CharacterArtifactSet(Sets.HeartOfDepth, 4, 1.2),
    new CharacterArtifactSet(Sets.HeartOfDepth, 2, 0.5),
    new CharacterArtifactSet(Sets.ObsidianCodex, 2, 0.5),
  ])
);

export const Nahida = new Character("Nahida", "Dendro", "Catalyst", [
  "Elemental based: While inside ult, different parameters change based on elements within party"
], Rarity.Legendary, "Sumeru", {
  material: TalentAscension.Ingenuity,
  weeklyBossDrop: MobDrops.PuppetStrings,
  crystal: ElementalCrystals.Dendro,
  localSpecialty: LocalSpecialties.KalpalataLotus,
  worldBossDrop: MobDrops.QuielledCreeper,
  mobDrop: EasyMobDrops.FungalSpores,
}, 'Can use Skill to interact with some harvestable items within a fixed AoE.',
  new CharacterPlaystyle("Off-field Support", ["Elemental Mastery", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 85.8),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 4.1),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 2, 2.7),
    ...ElementalMasterySets(2.7)
  ])
);

export const Navia = new Character("Navia", "Geo", "Claymore", [
  "Off-field Damage",
  "Elemental Infusion: After Skill/Ability, Navia gains Geo infusion"
], Rarity.Legendary, "Fontaine", {
  material: TalentAscension.Equity,
  weeklyBossDrop: MobDrops.LightlessSilkString,
  crystal: ElementalCrystals.Geo,
  localSpecialty: LocalSpecialties.SpringOfTheFirstDewdrop,
  worldBossDrop: MobDrops.ArtificedSpareClockworkComponent__Coppelius,
  mobDrop: EasyMobDrops.FontemerAberrantPearl,
}, '25% more rewards when on expeditions in Fontaine.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.NighttimeWhispersInTheEchoingWoods, 4, 74.1),
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 5.7),
    ...AttackSets(3.0),
    new CharacterArtifactSet(Sets.GoldenTroupe, 2, 3.0),
  ])
);

export const Neuvillette = new Character("Neuvillette", "Hydro", "Catalyst", ["Self-heal"], Rarity.Legendary, "Fontaine", {
  material: TalentAscension.Equity,
  weeklyBossDrop: MobDrops.Everamber,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.Lumitoile,
  worldBossDrop: MobDrops.FontemerUnihorn,
  mobDrop: EasyMobDrops.FontemerAberrantPearl,
}, '15% Underwater Sprint Speed consumption reduction.',
  new CharacterPlaystyle("On-field DPS", ["HP", "Energy Recharge"], ["Charged/Hold", "Burst/Ult", "Skill/Ability"], true, [
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 94.9),
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 1.1),
    new CharacterArtifactSet(Sets.HeartOfDepth, 4, 0.6),
  ])
);

export const Nilou = new Character("Nilou", "Hydro", "Sword", [], Rarity.Legendary, "Sumeru", {
  material: TalentAscension.Praxis,
  weeklyBossDrop: MobDrops.TearsOfTheCalamitousGod,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.Padisarah,
  worldBossDrop: MobDrops.PerpetualCaliber,
  mobDrop: EasyMobDrops.FungalSpores,
}, '12% chance of double product when cooking Adventure foods.',
  new CharacterPlaystyle("On-field DPS", ["HP", "Elemental Mastery"], ["Skill/Ability", "Skill/Ability", "Normal/Press"], false, [
    ...HPSets(60.7),
    ...ElementalMasterySets(8.5),
    ...HPSets(8.5),
  ])
);

export const Ningguang = new Character("Ningguang", "Geo", "Catalyst", ["Shield"], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Prosperity,
  weeklyBossDrop: MobDrops.SpiritLocketOfBoreas,
  crystal: ElementalCrystals.Geo,
  localSpecialty: LocalSpecialties.GlazeLily,
  worldBossDrop: MobDrops.BasaltPillar,
  mobDrop: EasyMobDrops.FatuiInsignia,
}, 'Shows Ore veins used in forging on minimap.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Energy Recharge"], ["Normal/Press", "Burst/Ult", "Skill/Ability"], true, [
    ...AttackSets(31.2),
    new CharacterArtifactSet(Sets.ArchaicPetra, 2, 31.2),
    ...AttackSets(16.1),
    new CharacterArtifactSet(Sets.NighttimeWhispersInTheEchoingWoods, 4, 7.8),
  ])
);

export const Noelle = new Character("Noelle", "Geo", "Claymore", [
  "Shield",
  "Heal"
], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.DvalinsClaw,
  crystal: ElementalCrystals.Geo,
  localSpecialty: LocalSpecialties.Valberry,
  worldBossDrop: MobDrops.BasaltPillar,
  mobDrop: EasyMobDrops.Mask,
}, '12% chance of double product when cooking Defense foods.',
  new CharacterPlaystyle("On-field DPS", ["DEF"], ["Burst/Ult", "Normal/Press", "Skill/Ability"], true, [
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 39.0),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 23.7),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 16.8),
  ])
);

export const Ororon = new Character("Ororon", "Electro", "Bow", [
  'Off-field Damage',
  'Nightsouls Blessing'
], Rarity.Epic, "Natlan", {
  material: TalentAscension.Kindling,
  weeklyBossDrop: MobDrops.LightlessSilkString,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.GlowingHornshroom,
  worldBossDrop: MobDrops.MarkOfTheBindingBlessing,
  mobDrop: EasyMobDrops.Fang,
}, '15% Gliding speed increase.',
  new CharacterPlaystyle("Burst Support", ["Energy Recharge", "ATK"], ["Burst/Ult", "Skill/Ability", "Charged/Hold"], false, [
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 91.7),
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 1.9),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 0.9),
  ])
);

export const Qiqi = new Character("Qiqi", "Cryo", "Sword", ["Heal"], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Prosperity,
  weeklyBossDrop: MobDrops.TailOfBoreas,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.Violetgrass,
  worldBossDrop: MobDrops.HoarfrostCore,
  mobDrop: EasyMobDrops.Scroll,
}, 'Shows Local Specialties in Liyue on minimap.',
  new CharacterPlaystyle("Off-field Support", ["ATK", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 5),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 47.4),
    new CharacterArtifactSet(Sets.MaidenBeloved, 4, 14.1),
    ...HealingBonusSets(3.7),
    ...AttackSets(3.7),
  ])
);

export const RaidenShogun = new Character("Raiden Shogun", "Electro", "Polearm", [
  "Off-field Damage",
], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Light,
  weeklyBossDrop: MobDrops.MoltenMoment,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.AmakumoFruit,
  worldBossDrop: MobDrops.StormBeads,
  mobDrop: EasyMobDrops.Handguard,
}, '50% mora cost reduction when ascending Sword and Polearm weapons.',
  new CharacterPlaystyle("On-field DPS", ["Energy Recharge", "ATK"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 93.4),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 1.2),
    new CharacterArtifactSet(Sets.FlowerOfParadiseLost, 4, 0.6),
  ]),
);

export const Razor = new Character("Razor", "Electro", "Claymore", [], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.DvalinsClaw,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.Wolfhook,
  worldBossDrop: MobDrops.LightningPrism,
  mobDrop: EasyMobDrops.Mask,
}, '20% Sprinting consumption reduction.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Energy Recharge"], ["Normal/Press", "Burst/Ult", "Skill/Ability"], true, [
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 49.7),
    new CharacterArtifactSet(Sets.PaleFlame, 4, 13.1),
    ...PhysicalDMGSets(6.9),
  ])
);

export const Rosaria = new Character("Rosaria", "Cryo", "Polearm", ["Off-field Damage"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Ballad,
  weeklyBossDrop: MobDrops.ShadowOfTheWarrior,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.Valberry,
  worldBossDrop: MobDrops.HoarfrostCore,
  mobDrop: EasyMobDrops.FatuiInsignia,
}, 'During Night (18:00 - 06:00), party members gain 10% increased movement speed.',
  new CharacterPlaystyle("Burst Support", ["Energy Recharge", "ATK"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 34.8),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 23.1),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 12.1),
  ])
);

export const SangonomiyaKokomi = new Character("Sangonomiya Kokomi", "Hydro", "Catalyst", ["Heal"], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Transience,
  weeklyBossDrop: MobDrops.HellfireButterfly,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.SangoPearl,
  worldBossDrop: MobDrops.DewOfRepudiation,
  mobDrop: EasyMobDrops.Spectral,
}, '20% Swimming consumption reduction.',
  new CharacterPlaystyle("Off-field Support", ["HP", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 69.3),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 15.1),
    new CharacterArtifactSet(Sets.MaidenBeloved, 4, 2.4),
  ]),
);

export const Sayu = new Character("Sayu", "Anemo", "Claymore", ["Heal"], Rarity.Epic, 'Inazuma', {
  material: TalentAscension.Light,
  weeklyBossDrop: MobDrops.GildedScale,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.CrystalMarrow,
  worldBossDrop: MobDrops.MarionetteCore,
  mobDrop: EasyMobDrops.Nectar,
}, 'Party members will not startle Crystalflies and certain other animals.',
  new CharacterPlaystyle("Off-field Support", ["ATK", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 60.1),
    ...AttackSets(4.0),
    ...ElementalMasterySets(4.0),
    new CharacterArtifactSet(Sets.MaidenBeloved, 4, 3.3),
  ])
);

export const Sethos = new Character("Sethos", "Electro", "Bow", [], Rarity.Epic, 'Sumeru', {
  material: TalentAscension.Praxis,
  weeklyBossDrop: MobDrops.DakasBell,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.Trishiraite,
  worldBossDrop: MobDrops.CloudseamScale,
  mobDrop: EasyMobDrops.EremiteDrop,
}, 'Shows Local Specialties in Sumeru on minimap.',
  new CharacterPlaystyle("On-field DPS", ["Elemental Mastery", "Energy Recharge"], ["Charged/Hold", "Burst/Ult", "Skill/Ability"], true, [
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 80.7),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 7.3),
    ...ElementalMasterySets(2.9)
  ])
);

export const Shenhe = new Character("Shenhe", "Cryo", "Polearm", ["Off-field Damage"], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Prosperity,
  weeklyBossDrop: MobDrops.HellfireButterfly,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.Qingxin,
  worldBossDrop: MobDrops.DragonheirsFalseFin,
  mobDrop: EasyMobDrops.Nectar,
}, '25% more rewards when on expeditions in Liyue.', 
  new CharacterPlaystyle("Off-field Support", ["ATK", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    ...AttackSets(55.1),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 20.0),
    ...AttackSets(2.8),
    ...EnergyRechargeSets(2.8),
  ])
);

export const ShikanoinHeizou = new Character("Shikanoin Heizou", "Anemo", "Catalyst", [], Rarity.Epic, 'Inazuma', {
  material: TalentAscension.Transience,
  weeklyBossDrop: MobDrops.TheMeaningOfAeons,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.Onikabuto,
  worldBossDrop: MobDrops.RunicFang,
  mobDrop: EasyMobDrops.TreasureHoarderInsignia,
}, '20% Sprinting consumption reduction.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Elemental Mastery"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 42.7),
    ...AttackSets(15.9),
    ...AnemoDMGSets(15.9),
  ])
);

export const Sigewinne = new Character("Sigewinne", "Hydro", "Bow", ["Heal", "Bond of Life"], Rarity.Legendary, 'Fontaine', {
  material: TalentAscension.Equity,
  weeklyBossDrop: MobDrops.LightlessEyeOfTheMaelstrom,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.RomaritimeFlower,
  worldBossDrop: MobDrops.WaterThatFailedToTranscend,
  mobDrop: EasyMobDrops.FontemerAberrantPearl,
}, 'While under water and your active character\'s HP fall below 50%, the active character will be healed over 2.5s and gain Elemental and Physical resistance decrease by 10% for 10s. This can be triggered once every 20s.',
  new CharacterPlaystyle("On-field Support", ["HP"], ["Skill/Ability", "Burst/Ult", "Charged/Hold"], false, [
    new CharacterArtifactSet(Sets.SongOfDaysPast, 4, 43.9),
    ...HPSets(25.4),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 8.0),
  ])
);

export const Skirk = new Character("Skirk", "Cryo", "Sword", [
  "Serpent's Subtlety",
  "Elemental Infusion: After Skill/Ability, Skirk gains Cryo infusion"
], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Contention,
  weeklyBossDrop: MobDrops.ChessGameKnight,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.SkysplitGembloom,
  worldBossDrop: MobDrops.EnsnaringGaze,
  mobDrop: EasyMobDrops.Gear,
}, 'Elemental Skill is increased by 1 level for all party members, if the team consists of Hydro/Cryo characters and at least 1 of each element.',
  new CharacterPlaystyle("On-field Frozen DPS", ["ATK"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.FinaleOfTheDeepGalleries, 4, 78.3),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 11.6),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 2.7),
  ])
);

export const Sucrose = new Character("Sucrose", "Anemo", "Catalyst", ["Grouping"], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Freedom,
  weeklyBossDrop: MobDrops.SpiritLocketOfBoreas,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: MobDrops.HurricaneSeed,
  mobDrop: EasyMobDrops.Nectar,
}, '10% chance of double product when crafting Character Talent Materials and Weapon Ascension Materials.',
  new CharacterPlaystyle("Off-field Support", ["Elemental Mastery", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 84.4),
    ...AnemoDMGSets(2.9),
    ...ElementalMasterySets(2.9),
    ...ElementalMasterySets(2.2),
  ])
);

export const TartagliaChilde = new Character("Tartaglia (Childe)", "Hydro", "Bow", [
  "Elemental Infusion: After Skill/Ability, Tartaglia (Childe) gains Hydro infusion"
], Rarity.Legendary, 'Snezhnaya', {
  material: TalentAscension.Freedom,
  weeklyBossDrop: MobDrops.ShardOfAFoulLegacy,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.Starconch,
  worldBossDrop: MobDrops.CleansingHeart,
  mobDrop: EasyMobDrops.FatuiInsignia,
}, 'Increase your own party members\' Normal Attack level by 1.', 
  new CharacterPlaystyle("On-field DPS", ["ATK"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.HeartOfDepth, 4, 41.8),
    ...HydroDMGSets(13.8),
    ...AttackSets(13.8),
    new CharacterArtifactSet(Sets.NymphsDream, 4, 13.0),
  ]),
);

export const Thoma = new Character("Thoma", "Pyro", "Polearm", ["Shield"], Rarity.Epic, 'Inazuma', {
  material: TalentAscension.Transience,
  weeklyBossDrop: MobDrops.HellfireButterfly,
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.FluorescentFungus,
  worldBossDrop: MobDrops.SmolderingPearl,
  mobDrop: EasyMobDrops.TreasureHoarderInsignia,
}, '20% of double catch when fishing in Inazuma.',
  new CharacterPlaystyle("Burst Support", ["HP", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    ...HPSets(35.0),
    ...EnergyRechargeSets(35.0),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 15.2),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 9.0),
  ]),
);

export const Tighnari = new Character("Tighnari", "Dendro", "Bow", ["Off-field Damage"], Rarity.Legendary, 'Sumeru', {
  material: TalentAscension.Admonition,
  weeklyBossDrop: MobDrops.TheMeaningOfAeons,
  crystal: ElementalCrystals.Dendro,
  localSpecialty: LocalSpecialties.NilotpalaLotus,
  worldBossDrop: MobDrops.MajesticHookedBeak,
  mobDrop: EasyMobDrops.FungalSpores,
}, 'Shows Local Specialties in Sumeru on minimap.',
  new CharacterPlaystyle("Off-field DPS", ["Elemental Mastery", "ATK"], ["Charged/Hold", "Burst/Ult", "Skill/Ability"], false, [
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 63.5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 16.3),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 8.6),
  ])
);

export const TravelerAnemo = new Character("Traveler (Anemo)", "Anemo", "Sword", [], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.DvalinsSigh,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
  mobDrop: EasyMobDrops.Mask,
}, undefined,
  new CharacterPlaystyle("On-field Swirl DPS", ["Elemental Mastery", "Energy Recharge", "ATK"], ["Skill/Ability", "Normal/Press", "Burst/Ult"], true, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 38.3),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 26.4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 6.1)
  ])
);

export const TravelerGeo = new Character("Traveler (Geo)", "Geo", "Sword", [], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Prosperity,
  weeklyBossDrop: MobDrops.TailOfBoreas,
  crystal: ElementalCrystals.Geo,
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
  mobDrop: EasyMobDrops.Mask,
}, undefined,
  new CharacterPlaystyle("On-field DPS", ["ATK", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 27.7),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 8.2),
    ...AttackSets(7.0),
    new CharacterArtifactSet(Sets.ArchaicPetra, 2, 7.0),
  ])
);

export const TravelerElectro = new Character("Traveler (Electro)", "Electro", "Sword", [], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Transience,
  weeklyBossDrop: MobDrops.DragonLordsCrown,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
  mobDrop: EasyMobDrops.Mask,
}, undefined,
  new CharacterPlaystyle("Off-field Support", ["Energy Recharge", "ATK"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 36.1),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 16.4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 9.7),
  ])
);

export const TravelerDendro = new Character("Traveler (Dendro)", "Dendro", "Sword", [], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Admonition,
  weeklyBossDrop: MobDrops.MudraOfTheMaleficGeneral,
  crystal: ElementalCrystals.Dendro,
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
  mobDrop: EasyMobDrops.Mask,
}, undefined,
  new CharacterPlaystyle("Off-field Support", ["Energy Recharge", "Elemental Mastery"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 54.1),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 7.2),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 6.1),
  ])
);

export const TravelerHydro = new Character("Traveler (Hydro)", "Hydro", "Sword", [], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Equity,
  weeklyBossDrop: MobDrops.WorldspanFern,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
  mobDrop: EasyMobDrops.Mask,
}, undefined,
  new CharacterPlaystyle("Off-field Support", ["ATK", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 29.6),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 6.9),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 6.6),
  ])
);
export const TravelerPyro = new Character("Traveler (Pyro)", "Pyro", "Sword", ['Nightsouls Blessing'], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Contention,
  weeklyBossDrop: null, // This is not a weekly boss drop, but a world quest drop
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
  mobDrop: EasyMobDrops.Mask,
}, undefined,
  new CharacterPlaystyle("Off-field Support", ["Energy Recharge", "ATK"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 57.5),
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 14.5),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 6.1),
  ])
);
export const TravelerCryo = new Character("Traveler (Cryo)", "Cryo", "Sword", [], Rarity.Legendary, 'Unknown', {
  material: null,
  weeklyBossDrop: null,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
  mobDrop: EasyMobDrops.Mask,
}, undefined, undefined);

export const Varesa = new Character("Varesa", "Electro", "Catalyst", ["Nightsouls Blessing"], Rarity.Legendary, 'Natlan', {
  material: TalentAscension.Conflict,
  weeklyBossDrop: MobDrops.ErodedScaleFeather,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.SkysplitGembloom,
  worldBossDrop: MobDrops.SparklessStatueCore,
  mobDrop: EasyMobDrops.Fang,
}, 'Sprint speed increased but sprint consumption is also increased outside of combat. Additionally, party members will restore 20 Phlogiston when consuming food. This effect can be triggered once every 10s.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Energy Recharge"], ["Plunging/Press", "Burst/Ult", "Skill/Ability"], true, [
    new CharacterArtifactSet(Sets.LongNightsOath, 4, 72.2),
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 21.1),
    new CharacterArtifactSet(Sets.LongNightsOath, 2, 2.1),
    new CharacterArtifactSet(Sets.ObsidianCodex, 2, 2.1),
  ])
);

export const Venti = new Character("Venti", "Anemo", "Bow", ["Grouping"], Rarity.Legendary, 'Mondstadt', {
  material: TalentAscension.Ballad,
  weeklyBossDrop: MobDrops.TailOfBoreas,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.Cecilia,
  worldBossDrop: MobDrops.HurricaneSeed,
  mobDrop: EasyMobDrops.Slime,
}, '20% Gliding consumption reduction.',
  new CharacterPlaystyle("Off-field Swirl Support", ["Elemental Mastery", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Charged/Hold"], false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 88.9),
    ...AnemoDMGSets(2.0),
    ...ElementalMasterySets(2.0),
    ...AttackSets(1.6),
    ...AnemoDMGSets(1.6),
  ])
);

export const WandererScaramouche = new Character("Wanderer (Scaramouche)", "Anemo", "Catalyst", [], Rarity.Legendary, 'Sumeru', {
  material: TalentAscension.Praxis,
  weeklyBossDrop: MobDrops.DakasBell,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.RukkhashavaMushrooms,
  worldBossDrop: MobDrops.PerpetualCaliber,
  mobDrop: EasyMobDrops.Handguard,
}, '50% mora cost reduction when ascending Bow and Catalyst weapons.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Energy Recharge"], ["Normal/Press", "Skill/Ability", "Burst/Ult"], true, [
    new CharacterArtifactSet(Sets.DesertPavilionChronicle, 4, 71.9),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 4, 5.5),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 4, 3.4),
  ])
);

export const Wriothesley = new Character("Wriothesley", "Cryo", "Catalyst", [
  'Self-heal',
], Rarity.Legendary, 'Fontaine', {
  material: TalentAscension.Order,
  weeklyBossDrop: MobDrops.PrimordialGreenbloom,
  crystal: ElementalCrystals.Cryo,
  localSpecialty: LocalSpecialties.SubdetectionUnit,
  worldBossDrop: MobDrops.TourbillonDevice,
  mobDrop: EasyMobDrops.Gear,
}, '10% chance of double product when crafting Weapon Ascension Materials.', 
  new CharacterPlaystyle("On-field DPS", ["ATK"], ["Charged/Hold", "Skill/Ability", "Burst/Ult"], true, [
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 88.8),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 2.3),
    ...CryoDMGSets(1.6),
    ...ChargedAttackSets(1.6),
  ])
);

export const Xiangling = new Character("Xiangling", "Pyro", "Polearm", ["Off-field Damage"], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Diligence,
  weeklyBossDrop: MobDrops.DvalinsClaw,
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.JueyunChili,
  worldBossDrop: MobDrops.EverflameSeed,
  mobDrop: EasyMobDrops.Slime,
}, '12% chance of double product when cooking Attack foods.',
  new CharacterPlaystyle("Off-field DPS", ["Energy Recharge", "ATK"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 83.3),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 5.1),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 1.8),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 1.8),
  ]),
);

export const Xianyun = new Character("Xianyun", "Anemo", "Catalyst", ["Heal"], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Gold,
  weeklyBossDrop: MobDrops.LightlessEyeOfTheMaelstrom,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.ClearwaterJade,
  worldBossDrop: MobDrops.CloudseamScale,
  mobDrop: EasyMobDrops.Scroll,
}, '15% Sprinting speed increase.', 
  new CharacterPlaystyle("Off-field Support", ["ATK", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 51.1),
    new CharacterArtifactSet(Sets.SongOfDaysPast, 4, 20.4),
    ...AttackSets(8.6),
  ])
);

export const Xiao = new Character("Xiao", "Anemo", "Polearm", [
  "Elemental Infusion: Afer Burst/Ult, gains Anemo infusion"
], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Prosperity,
  weeklyBossDrop: MobDrops.ShadowOfTheWarrior,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.Qingxin,
  worldBossDrop: MobDrops.JuvenileJade,
  mobDrop: EasyMobDrops.Slime,
}, '20% Climbing consumption reduction.', 
  new CharacterPlaystyle("On-field DPS", ["ATK", "Energy Recharge"], ["Burst/Ult", "Normal/Press", "Skill/Ability"], true, [
    new CharacterArtifactSet(Sets.VermillionHereafter, 4, 58.1),
    ...AttackSets(14.1),
    ...AnemoDMGSets(14.1)
  ]),
);

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
}, 'Triggering Nightsoul Transmission restores 15 Phlogiston.',
  new CharacterPlaystyle("Off-field Support", ["DEF", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 94.6),
    new CharacterArtifactSet(Sets.ArchaicPetra, 4, 3.2),
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 0.4),
  ])
);

export const Xingqiu = new Character("Xingqiu", "Hydro", "Sword", [
  "Off-field Damage",
  "Heal"
], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Gold,
  weeklyBossDrop: MobDrops.TailOfBoreas,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.SilkFlower,
  worldBossDrop: MobDrops.CleansingHeart,
  mobDrop: EasyMobDrops.Mask,
}, '25% chance of refund materials used when crafting Character Talent Materials.',
  new CharacterPlaystyle("Burst DPS", ["Energy Recharge", "ATK"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 67.0),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 8.9),
    ...HydroDMGSets(8.9),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5.0),
  ]),
);

export const Xinyan = new Character("Xinyan", "Pyro", "Claymore", [], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Gold,
  weeklyBossDrop: MobDrops.TuskOfMonocerosCaeli,
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.Violetgrass,
  worldBossDrop: MobDrops.EverflameSeed,
  mobDrop: EasyMobDrops.TreasureHoarderInsignia,
}, '12% chance of double product when cooking Defense foods.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], true, [
    ...PhysicalDMGSets(23.7),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 19.3),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 5.6),
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 2, 2),
  ]),
);

export const YaeMiko = new Character("Yae Miko", "Electro", "Catalyst", ["Off-field Damage"], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Light,
  weeklyBossDrop: MobDrops.TheMeaningOfAeons,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.SeaGanoderma,
  worldBossDrop: MobDrops.DragonheirsFalseFin,
  mobDrop: EasyMobDrops.Handguard,
}, '25% chance to get 1 regional Character Talent Materials when crafting Character Talent Materials.',
  new CharacterPlaystyle("Off-field DPS", ["ATK", "Elemental Mastery"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.GildedDreams, 4, 29.6),
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 26.7),
    ...AttackSets(6.6),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 6.6),
  ])
);

export const Yanfei = new Character("Yanfei", "Pyro", "Catalyst", [], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Gold,
  weeklyBossDrop: MobDrops.BloodjadeBranch,
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.NoctilucousJade,
  worldBossDrop: MobDrops.JuvenileJade,
  mobDrop: EasyMobDrops.TreasureHoarderInsignia,
}, 'Shows Local Specialties in Liyue on minimap.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Energy Recharge"], ["Charged/Hold", "Burst/Ult", "Skill/Ability"], true, [
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 40.2),
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 34.8),
    ...AttackSets(3.4),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 3.4),
  ])
);

export const Yaoyao = new Character("Yaoyao", "Dendro", "Polearm", ["Heal", "Off-field Damage"], Rarity.Epic, 'Sumeru', {
  material: TalentAscension.Diligence,
  weeklyBossDrop: MobDrops.DakasBell,
  crystal: ElementalCrystals.Dendro,
  localSpecialty: LocalSpecialties.JueyunChili,
  worldBossDrop: MobDrops.QuielledCreeper,
  mobDrop: EasyMobDrops.Slime,
}, 'Party members will not startle Crystalflies and certain other animals.',
  new CharacterPlaystyle("Off-field Support", ["HP", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 57.9),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 7.6),
    new CharacterArtifactSet(Sets.MaidenBeloved, 4, 5.7),
  ])
);

export const Yelan = new Character("Yelan", "Hydro", "Bow", ["Off-field Damage"], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Prosperity,
  weeklyBossDrop: MobDrops.GildedScale,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.Starconch,
  worldBossDrop: MobDrops.RunicFang,
  mobDrop: EasyMobDrops.FatuiInsignia,
}, '25% more rewards when on expeditions in Liyue.',
  new CharacterPlaystyle("Off-field DPS", ["HP", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Charged/Hold"], false, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 85.0),
    ...HydroDMGSets(2.9),
    ...HPSets(2.9),
    ...HydroDMGSets(2.0),
    ...EnergyRechargeSets(2.0),
  ])
);

export const Yoimiya = new Character("Yoimiya", "Pyro", "Bow", [
  "Elemental Infusion: After Skill/Ability, gains Pyro infusion",
], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Transience,
  weeklyBossDrop: MobDrops.DragonLordsCrown,
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.NakuWeed,
  worldBossDrop: MobDrops.SmolderingPearl,
  mobDrop: EasyMobDrops.Scroll,
}, '100% chance of refunding a portion of materials used when crafting decoration, ornament and landscape-type furnishings.', 
  new CharacterPlaystyle("On-field DPS", ["ATK", "Elemental Mastery"], ["Charged/Hold", "Skill/Ability", "Burst/Ult"], true, [
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 4, 85.7),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 4, 4.1),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 2.1),
  ])
);

export const YumemizukiMizuki = new Character("Yumemizuki Mizuki", "Anemo", "Catalyst", ["Heal"], Rarity.Legendary, 'Inazuma', {
  material: TalentAscension.Transience,
  weeklyBossDrop: MobDrops.FadingCandle,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.SeaGanoderma,
  worldBossDrop: MobDrops.TalismanOftheEnigmaticLand,
  mobDrop: EasyMobDrops.Handguard,
}, 'When in party, party members that consumed non reviving foods have a 30% chance of recovering additional HP. Trigger chance is increased depending on friendship level of the food consuming character.',
  new CharacterPlaystyle('On-field Swirl DPS', ['Elemental Mastery', "Energy Recharge"], ['Skill/Ability', "Burst/Ult", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 82.3),
    new CharacterArtifactSet(Sets.ViridescentVenerer, 2, 3.2),
    ...ElementalMasterySets(3.2),
    ...ElementalMasterySets(2.6)
  ])
);

export const YunJin = new Character("Yun Jin", "Geo", "Polearm", ["Shield"], Rarity.Epic, 'Liyue', {
  material: TalentAscension.Diligence,
  weeklyBossDrop: MobDrops.AshenHeart,
  crystal: ElementalCrystals.Geo,
  localSpecialty: LocalSpecialties.GlazeLily,
  worldBossDrop: MobDrops.RiftbornRegalia,
  mobDrop: EasyMobDrops.Mask,
}, '12% chance of double product when cooking Adventure foods.',
  new CharacterPlaystyle("Off-field Support", ["DEF", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 66.1),
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 2, 21.6),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 21.6),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 2.6),
  ])
);

export const Zhongli = new Character("Zhongli", "Geo", "Polearm", ["Shield"], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Gold,
  weeklyBossDrop: MobDrops.TuskOfMonocerosCaeli,
  crystal: ElementalCrystals.Geo,
  localSpecialty: LocalSpecialties.CorLapis,
  worldBossDrop: MobDrops.BasaltPillar,
  mobDrop: EasyMobDrops.Slime,
}, '15% chance of refunding ore when crafting Polearm weapons.',
  new CharacterPlaystyle("Off-field Support", ["HP"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 76.3),
    ...HPSets(4.8),
    new CharacterArtifactSet(Sets.ArchaicPetra, 4, 4.3),
  ]),
);