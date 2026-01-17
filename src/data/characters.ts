import { Rarity } from "@/common/types";
import { Character, CharacterPlaystyle, CharacterArtifactSet } from "../common/models";
import * as Sets from './artifact-sets';
import ElementalCrystals from "./materials/drops/crystals";
import * as LocalSpecialties from "./materials/local-specialties";
import * as MobDrops from './materials/drops';
import * as EasyMobDrops from './materials/drops/easy';
import * as TalentAscension from "./materials/talents";
import MemoizeService from "@/services/MemoizeService";

const SetMemoize = new MemoizeService();

// #region 2-piece spread sets
const StatSets = (statName: string, priority: CharacterArtifactSet['effectiveness']) => SetMemoize.memoize(() => (
  Object
    .values(Sets)
    .filter(set => set.doesStatIncrease(statName))
    .map(set => new CharacterArtifactSet(set, 2, priority))
), [statName, priority])

const HPSets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('HP', priority)
const AttackSets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('ATK', priority)
const DefenseSets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('DEF', priority)

const ElementalMasterySets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('Elemental Mastery', priority)
const EnergyRechargeSets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('Energy Recharge', priority)

const PhysicalDMGSets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('Physical DMG Bonus', priority)
const HealingBonusSets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('Healing Bonus', priority)

// Attack type sets
const ChargedAttackSets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('Charged Attack', priority)
const PlungingAttackSets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('Plunging Attack DMG', priority)
const ElementalSkillDMGSets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('Elemental Skill DMG', priority)
const BurstDMGSets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('Burst', priority)

// CRIT and other stats
const CRITRateSets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('CRIT Rate', priority)
const ShieldStrengthSets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('Shield Strength', priority)

// Element DMG Bonus sets
const AnemoDMGSets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('Anemo DMG Bonus', priority)
const CryoDMGSets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('Cryo DMG Bonus', priority)
const DendroDMGSets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('Dendro DMG Bonus', priority)
const ElectroDMGSets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('Electro DMG Bonus', priority)
const GeoDMGSets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('Geo DMG Bonus', priority)
const HydroDMGSets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('Hydro DMG Bonus', priority)
const PyroDMGSets = (priority: CharacterArtifactSet['effectiveness']) => StatSets('Pyro DMG Bonus', priority)
// #endregion

// #region A-G
export const Aino = new Character("Aino", "Hydro", "Claymore", [
  'Off-field Damage',
  'Increases Moonsign'
], Rarity.Epic, 'Nod-Krai', {
  localSpecialty: LocalSpecialties.PortableBearing,
  crystal: ElementalCrystals.Hydro,
  material: TalentAscension.Elysium,
  mobDrop: EasyMobDrops.DriveShaft,
  worldBossDrop: MobDrops.PrecisionKuuvahkiStampingDie,
  weeklyBossDrop: MobDrops.SilkenFeather
}, 'Shows Local Specialties in Nod-Krai on minimap.',
  new CharacterPlaystyle("Burst Support", ["Elemental Mastery", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.SilkenMoonsSerenade, 4, 87.2),
    ...ElementalMasterySets(2.9),
    ...EnergyRechargeSets(2.9),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 1.9)
  ])
);

export const Albedo = new Character("Albedo", "Geo", "Sword", [
  `Hexerei Able: If Skill hits an opponent within 20s of use, spawn Silver Isotomas (another platform), which is indestructible and provides NA/CA/PA/Skill/Burst DMG increase by 4%/1000 DEF of Albedo for 20s for a max of 12% increase. Hexerei members receive 4% => 10% for max of 12% => 30%.`
], Rarity.Legendary, 'Mondstadt', {
  localSpecialty: LocalSpecialties.Cecilia,
  crystal: ElementalCrystals.Geo,
  material: TalentAscension.Ballad,
  mobDrop: EasyMobDrops.Scroll,
  worldBossDrop: MobDrops.BasaltPillar,
  weeklyBossDrop: MobDrops.TuskOfMonocerosCaeli,
}, '10% chance of double product when crafting Weapon Ascension Materials.',
  new CharacterPlaystyle("Off-field DPS", ["DEF"], ['Skill/Ability', "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 71.9),
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 13.7),
    ...GeoDMGSets(2.5),
    ...DefenseSets(2.5),
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
    new CharacterArtifactSet(Sets.GildedDreams, 4, 74.5),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 7.2),
    ...DendroDMGSets(5.6),
    ...ElementalMasterySets(5.6),
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
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 41.8),
    ...CryoDMGSets(13),
    ...AttackSets(13),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 4, 8.4),
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
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 50.6),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 10.3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 6.5),
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
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 90.9),
    ...AttackSets(1.9),
    ...DefenseSets(1.9),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 1.3),
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
    new CharacterArtifactSet(Sets.FragmentOfHarmonicWhimsy, 4, 75.3),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 17),
    ...AttackSets(2),
  ])
);

export const Baizhu = new Character("Baizhu", "Dendro", "Catalyst", [
  "Heal",
  'Off-field Damage'
], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Gold,
  weeklyBossDrop: MobDrops.WorldspanFern,
  crystal: ElementalCrystals.Dendro,
  worldBossDrop: MobDrops.EvergloomRing,
  localSpecialty: LocalSpecialties.Violetgrass,
  mobDrop: EasyMobDrops.FungalSpores,
}, 'When in team, certain harvestable items will trigger a healing effect on the active character consisting of 2.5% of this character\'s Max HP.',
  new CharacterPlaystyle("Off-field Support", ["HP", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 41.8),
    ...HPSets(15.9),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 8.2),
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
    new CharacterArtifactSet(Sets.MaidenBeloved, 4, 40.3),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 26.9),
    new CharacterArtifactSet(Sets.MaidenBeloved, 2, 3.4),
    ...HealingBonusSets(3.4),
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
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 67.7),
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 5.3),
    ...AttackSets(3.6),
    ...ElectroDMGSets(3.6)
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
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 91.9),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 1.1),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 0.8),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 0.8),
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
    ...HPSets(31.9),
    ...EnergyRechargeSets(31.9),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 18.4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 11.1),
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
    ...AttackSets(37.3),
    ...EnergyRechargeSets(37.3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 12.8),
    new CharacterArtifactSet(Sets.SongOfDaysPast, 4, 8.6),
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
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 92.4),
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 1.5),
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 1),
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
    new CharacterArtifactSet(Sets.SongOfDaysPast, 4, 49.4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 23.4),
    ...HPSets(7.3)
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
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 61.9),
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 27.9),
    ...DefenseSets(2.5),
    ...ElementalSkillDMGSets(2.4),
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
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 36),
    ...BurstDMGSets(11.5),
    ...CryoDMGSets(11.5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 9.6),
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
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 85.5),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 8.4),
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
    new CharacterArtifactSet(Sets.FragmentOfHarmonicWhimsy, 4, 77.3),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 9.7),
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 4.6),
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
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 71.1),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 6.5),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 3.4),
  ])
);

// TODO at later update
export const Columbina = new Character("Columbina", "Hydro", "Catalyst", [
  'Increases Moonsign',
  'Enables Lunar Reaction',
], Rarity.Legendary, 'Nod-Krai', {
  material: TalentAscension.Moonlight,
  weeklyBossDrop: MobDrops.MaskOfTheVirtuousDoctor,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.WinterIcelea,
  worldBossDrop: MobDrops.RadiantAntler,
  mobDrop: EasyMobDrops.Slime,
}, `While in Nod-Krai, if a member on your team dies, Columbina will revive them and restore health based on Columbina's friendship level. Cooldown 100s. Does not work in domains.`,
  new CharacterPlaystyle('Off-field Lunar Support', ['HP', 'Energy Recharge'], ['Skill/Ability', 'Burst/Ult', 'Charged/Hold'], false, [
    new CharacterArtifactSet(Sets.AubadeOfMorningstarAndMoon, 4, 100),
    // new CharacterArtifactSet(Sets.SilkenMoonsSerenade, 4, 50),
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
    new CharacterArtifactSet(Sets.GildedDreams, 4, 57.8),
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 19.1),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 6.6),
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
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 71.3),
    ...HPSets(6.2),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 5.7),
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
    new CharacterArtifactSet(Sets.VourukashasGlow, 4, 32.2),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 20.2),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 13.6),
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
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 68.4),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 8.6),
    ...AttackSets(8.6),
    ...PyroDMGSets(8.6),
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
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 38.8),
    new CharacterArtifactSet(Sets.MaidenBeloved, 4, 14.1),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 10.7),
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
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 36.8),
    ...HPSets(13.4),
    ...EnergyRechargeSets(13.4),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 7.3),
  ]),
);

export const Durin = new Character("Durin", "Pyro", "Sword", [
  "Off-field Damage",
  `Elemental Based: Skill + NA = Denail of Darkness => Vape/Melt 40%. Skill + Skill = Principle of Purity => Pyro RES decrease to Burning targets after Burning/Overloaded/Pyro Swirl/Crystallize by 20% for 6s. Requires talent "Light Manifest of the Divine Calculus".`,
  `Hexerei Able: Increases Elemental Based effects by 75%`
], Rarity.Legendary, 'Mondstadt', {
  material: TalentAscension.Ballad,
  weeklyBossDrop: MobDrops.ErodedSunfire,
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.FrostlampFlower,
  worldBossDrop: MobDrops.CyclicMilitaryKuuvahkiCore,
  mobDrop: EasyMobDrops.Warrant,
}, '25% more rewards when on expeditions in Mondstadt.',
  new CharacterPlaystyle("Off-field Pyro Support", ['ATK', 'Energy Recharge'], ['Burst/Ult', 'Skill/Ability', 'Normal/Press'], false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 48.6),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 29.3),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 2.7),
  ])
);

export const Emilie = new Character("Emilie", "Dendro", "Polearm", ["Off-field Damage"], Rarity.Legendary, 'Fontaine', {
  material: TalentAscension.Order,
  weeklyBossDrop: MobDrops.SilkenFeather,
  crystal: ElementalCrystals.Dendro,
  localSpecialty: LocalSpecialties.LakelightLily,
  worldBossDrop: MobDrops.FragmentOfAGoldenMelody,
  mobDrop: EasyMobDrops.Gear,
}, 'When Lumidouce Case (lamp) is on field, all party members gain 85% Pyro RES against Burning DMG.',
  new CharacterPlaystyle("Off-field Burning Support", ["ATK", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.UnfinishedReverie, 4, 82.5),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 11.2),
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 1.2),
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
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 91.7),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 1.8),
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 0.6),
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
    new CharacterArtifactSet(Sets.PaleFlame, 4, 71.9),
    ...PhysicalDMGSets(15.0),
    ...AttackSets(3.3),
    ...PhysicalDMGSets(3.3),
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
  new CharacterPlaystyle("Burst Support", ["Energy Recharge", "ATK"], ["Burst/Ult", "Skill/Ability", "Charged/Hold"], false, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 36.9),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 22.8),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 13.7),
  ])
);

export const Fischl = new Character("Fischl", "Electro", "Bow", [
  "Off-field Damage",
  `Hexerei Able: After party member triggers: Overloaded, Fischl & active party members gain 22.5% ATK for 10s. Electro/Lunar-Charged, Fischl & active party members gain 90 EM for 10s.`
], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Ballad,
  weeklyBossDrop: MobDrops.SpiritLocketOfBoreas,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.SmallLampGrass,
  worldBossDrop: MobDrops.LightningPrism,
  mobDrop: EasyMobDrops.Arrowhead,
}, '25% time consumption reduction when on expeditions in Mondstadt.',
  new CharacterPlaystyle("Off-field DPS", ["ATK", "Elemental Mastery"], ["Skill/Ability", "Burst/Ult", "Charged/Hold"], false, [
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 73.1),
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 4.7),
    ...AttackSets(2.8),
    ...ElectroDMGSets(2.8)
  ]),
);

export const Flins = new Character("Flins", "Electro", "Polearm", [
  'Enables Lunar-Charged Reaction',
  'Elemental Infusion: After Skill/Ability, Flins gains Electro infusion',
  'Increases Moonsign',
], Rarity.Legendary, 'Nod-Krai', {
  material: TalentAscension.Vagrancy,
  weeklyBossDrop: MobDrops.ChessGameQueen,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.FrostlampFlower,
  worldBossDrop: MobDrops.PrecisionKuuvahkiStampingDie,
  mobDrop: MobDrops.DriveShaft,
}, 'Shows Local Specialties in Nod-Krai on minimap.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Elemental Mastery"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.NightOfTheSkysUnveiling, 4, 94.9),
    ...AttackSets(0.7),
    ...ElementalMasterySets(0.7),
  ])
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
    new CharacterArtifactSet(Sets.PaleFlame, 4, 47.5),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 9.9),
    ...PhysicalDMGSets(5.9),
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
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 93.6),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 1.3),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 0.6),
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
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 63.6),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 16.5),
    new CharacterArtifactSet(Sets.LongNightsOath, 4, 6.1),
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
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 74.8),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 15.7),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 1.6),
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
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 57.7),
    ...EnergyRechargeSets(16.6),
    ...DefenseSets(16.6),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 11.7),
  ])
);

// #endregion

// #region H-N
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
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 4, 9.0),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 2.7),
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
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 87.2),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 8.5),
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 2, 0.6),
    new CharacterArtifactSet(Sets.ObsidianCodex, 2, 0.6),
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
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 52.0),
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 27.3),
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 8.7),
  ])
);

export const Illuga = new Character("Illuga", "Geo", "Polearm", [
  "Enables Lunar-Crystallize Reaction"
], Rarity.Epic, 'Nod-Krai', {
  material: TalentAscension.Elysium,
  weeklyBossDrop: MobDrops.ErodedHorn,
  crystal: ElementalCrystals.Geo,
  localSpecialty: LocalSpecialties.PineAmber,
  worldBossDrop: MobDrops.CyclicMilitaryKuuvahkiCore,
  mobDrop: EasyMobDrops.DriveShaft,
}, undefined, 
  new CharacterPlaystyle("Off-field Lunar-Crystallize Support", ["DEF", "Elemental Mastery", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.SilkenMoonsSerenade, 4, 33),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 33),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 33),
  ])
);

export const Ineffa = new Character("Ineffa", "Electro", "Polearm", [
  "Enables Lunar-Charged Reaction",
  "Off-field Damage",
  "Shield",
  'Increases Moonsign',
], Rarity.Legendary, 'Nod-Krai', {
  material: TalentAscension.Conflict,
  weeklyBossDrop: MobDrops.ErodedSunfire,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.GlowingHornshroom,
  worldBossDrop: MobDrops.SecretSourceAirflowAccumulator,
  mobDrop: EasyMobDrops.Whistle,
}, 'When using food, there is a 30% chance of gaining seasoning ingredient.',
  new CharacterPlaystyle("Off-field Lunar-Charged Support", ['ATK', 'Elemental Mastery'], ['Skill/Ability', "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.GildedDreams, 4, 59.1),
    new CharacterArtifactSet(Sets.SilkenMoonsSerenade, 4, 14.8),
    ...AttackSets(9.4),
    ...ElementalMasterySets(9.4),
  ])
);

export const Jahoda = new Character("Jahoda", "Anemo", "Bow", [
  "Off-field Damage",
  "Elemental Infusion: After Skill/Ability, Jahoda will gain elemental infusion based on the elements of affected opponents",
  "Increases Moonsign",
  "Heal",
  "CRIT Increase: If C6 for Moonsign characters: +5% CRIT Rate % +40% CRIT DMG"
], Rarity.Epic, "Nod-Krai", {
  material: TalentAscension.Vagrancy,
  weeklyBossDrop: MobDrops.ChessGameKnight,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.PortableBearing,
  worldBossDrop: MobDrops.LightbearingScaleFeather,
  mobDrop: EasyMobDrops.DriveShaft,
}, '25% more rewards when on expeditions in Nod-Krai.',
  new CharacterPlaystyle("Off-field Support", ['ATK', 'Energy Recharge'], ['Burst/Ult', "Skill/Ability", "Charged/Hold"], false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 65.5),
    new CharacterArtifactSet(Sets.SilkenMoonsSerenade, 4, 25.4),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 1),
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
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 72.7),
    ...AnemoDMGSets(6.5),
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
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 84.7),
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 2.7),
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 2.6),
  ])
);

export const KaedeharaKazuha = new Character("Kaedehara Kazuha", "Anemo", "Sword", [
  "Off-field Damage",
  "Grouping",
  "Elemental Based: Ult can be infused with other party member elements excl. Anemo & Dendro",
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
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 95.3),
    ...AnemoDMGSets(1.2),
    ...ElementalMasterySets(1.2),
    ...AttackSets(0.6),
    ...AnemoDMGSets(0.6),
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
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 36.6),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 29),
    ...CryoDMGSets(6.9),
    ...AttackSets(6.9),
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
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 87.1),
    ...CryoDMGSets(3.2),
    ...AttackSets(3.2),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 2.0),
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
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 4, 44.7),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 24),
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
    new CharacterArtifactSet(Sets.FlowerOfParadiseLost, 4, 41.6),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 22.6),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 11.9),
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
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 52.3),
    ...ElectroDMGSets(11.7),
    ...AttackSets(11.7),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 9.1)
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
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 92),
    new CharacterArtifactSet(Sets.UnfinishedReverie, 4, 1.1),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 0.8),
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
    ...HPSets(42.5),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 26.5),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 8.7),
  ])
);

export const Klee = new Character("Klee", "Pyro", "Catalyst", [
  `Hexerei Able: When Klee deals DMG with NA/Skill/Burst; gain 1 Boom Badge for 20s. Each badge has own timer. Max 3 stacks that deals 115/130/150% of its original DMG.`
], Rarity.Legendary, 'Mondstadt', {
  material: TalentAscension.Freedom,
  weeklyBossDrop: MobDrops.RingOfBoreas,
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.PhilanemoMushroom,
  worldBossDrop: MobDrops.EverflameSeed,
  mobDrop: EasyMobDrops.Scroll,
}, 'Shows Local Specialties in Mondstadt on minimap.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Elemental Mastery"], ["Normal/Press", "Skill/Ability", "Burst/Ult"], true, [
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 66.1),
    ...PyroDMGSets(9.2),
    ...AttackSets(9.2),
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 7.2),
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
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 81.7),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 6.6),
    ...AttackSets(1.5),
    ...EnergyRechargeSets(1.5),
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
    new CharacterArtifactSet(Sets.GildedDreams, 4, 46.9),
    new CharacterArtifactSet(Sets.FlowerOfParadiseLost, 4, 20.6),
    ...ElementalMasterySets(14.1),
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
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 83.9),
    ...ElementalMasterySets(2.3),
    ...AttackSets(2.3),
    ...AttackSets(1.9),
  ])
);

export const Lauma = new Character("Lauma", "Dendro", "Catalyst", [
  "Enables Lunar-Bloom Reaction",
  'Increases Moonsign',
], Rarity.Legendary, 'Nod-Krai', {
  material: TalentAscension.Moonlight,
  weeklyBossDrop: MobDrops.ErodedScaleFeather,
  crystal: ElementalCrystals.Dendro,
  localSpecialty: LocalSpecialties.MoonfallSilver,
  worldBossDrop: MobDrops.LightbearingScaleFeather,
  mobDrop: EasyMobDrops.Warrant,
}, 'Shows Local Specialties in Nod-Krai on minimap.',
  new CharacterPlaystyle("Off-field Lunar-Bloom Support", ['Elemental Mastery', 'Energy Recharge'], ['Burst/Ult', 'Skill/Ability', 'Normal/Press'], false, [
    new CharacterArtifactSet(Sets.SilkenMoonsSerenade, 4, 73.8),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 17.8),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 1.7),
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
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 68.8),
    ...HPSets(10.1),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 3.0),
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
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 26.5),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 25.2),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 10.4),
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
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 60),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 16.8),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 2.9),
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
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 76.9),
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 7.5),
    ...PyroDMGSets(1.8),
    ...ChargedAttackSets(1.8),
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
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 93.8),
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 2.2),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 0.6),
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
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 56.7),
    ...HPSets(8.9),
    ...EnergyRechargeSets(8.9),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 3.3),
  ]),
);

export const Mona = new Character("Mona", "Hydro", "Catalyst", [
  "Off-field Damage",
  `Hexerei Able: When Mona's NA/CA hits an opponent, gain 1 Astral Glow of Mercury for 8s. Max 3 stacks. When team members deal Vape DMG, stacks are consumed. Each consumed stacks does 5% increased DMG to the Vape reaction.`
], Rarity.Legendary, 'Mondstadt', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.RingOfBoreas,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.PhilanemoMushroom,
  worldBossDrop: MobDrops.CleansingHeart,
  mobDrop: EasyMobDrops.Nectar,
}, '25% chance of refund materials used when crafting Weapon Ascension Materials.',
  new CharacterPlaystyle("Burst Support", ["ATK", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 45.4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 26.3),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 7.2),
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
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 92.6),
    new CharacterArtifactSet(Sets.HeartOfDepth, 4, 0.9),
    ...ElementalMasterySets(0.5),
    new CharacterArtifactSet(Sets.ObsidianCodex, 2, 0.5),
  ])
);

export const Nahida = new Character("Nahida", "Dendro", "Catalyst", [
  "Elemental Based: While inside ult, different parameters change based on elements within party"
], Rarity.Legendary, "Sumeru", {
  material: TalentAscension.Ingenuity,
  weeklyBossDrop: MobDrops.PuppetStrings,
  crystal: ElementalCrystals.Dendro,
  localSpecialty: LocalSpecialties.KalpalataLotus,
  worldBossDrop: MobDrops.QuielledCreeper,
  mobDrop: EasyMobDrops.FungalSpores,
}, 'Can use Skill to interact with some harvestable items within a fixed AoE.',
  new CharacterPlaystyle("Off-field Support", ["Elemental Mastery", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 87.2),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 3.6),
    ...DendroDMGSets(2.2),
    ...ElementalMasterySets(2.2)
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
    new CharacterArtifactSet(Sets.NighttimeWhispersInTheEchoingWoods, 4, 76.4),
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 5.7),
    ...ElementalSkillDMGSets(2.7),
    ...AttackSets(2.7),
  ])
);

export const Nefer = new Character("Nefer", "Dendro", "Catalyst", [
  'Increases Moonsign',
  'Enables Lunar-Bloom Reaction'
], Rarity.Legendary, 'Nod-Krai', {
  material: TalentAscension.Elysium,
  weeklyBossDrop: MobDrops.ChessGameRook,
  crystal: ElementalCrystals.Dendro,
  localSpecialty: LocalSpecialties.MoonfallSilver,
  worldBossDrop: MobDrops.RadiantAntler,
  mobDrop: EasyMobDrops.Warrant,
}, '25% more rewards when on expeditions in Nod-Krai.',
  new CharacterPlaystyle('On-field Lunar-Bloom DPS', ['Elemental Mastery'], ['Skill/Ability', 'Burst/Ult', 'Normal/Press'], true, [
    new CharacterArtifactSet(Sets.NightOfTheSkysUnveiling, 4, 95.6),
    ...ElementalMasterySets(1.1),
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 0.5)
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
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 95.6),
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 1.0),
    new CharacterArtifactSet(Sets.HeartOfDepth, 4, 0.5),
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
    ...HPSets(64.5),
    ...ElementalMasterySets(7.4),
    ...HPSets(7.4),
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
    ...AttackSets(30.4),
    ...GeoDMGSets(30.4),
    ...AttackSets(17.4),
    new CharacterArtifactSet(Sets.NighttimeWhispersInTheEchoingWoods, 4, 8.8),
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
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 38),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 24.3),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 17.5),
  ])
);

// #endregion

// #region O-U

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
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 90.3),
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 1.7),
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 2, 1.1),
    new CharacterArtifactSet(Sets.ObsidianCodex, 2, 1.1),
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
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 47.7),
    new CharacterArtifactSet(Sets.MaidenBeloved, 4, 14.0),
    ...HealingBonusSets(3.5),
    ...AttackSets(3.5),
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
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 92.6),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 1.4),
    new CharacterArtifactSet(Sets.FlowerOfParadiseLost, 4, 0.8),
  ]),
);

export const Razor = new Character("Razor", "Electro", "Claymore", [
  `Hexerei Able: Enhanced burst DMG. The Wolf Within receives 70% of Razor's ATK bonus DMG. While Wolf Within summoned, Electro sigils from Razor's Skill claw and Thudnder overflow, Wolf Within deals 150% of Razor's ATK DMG and restores 7 energy to Razor.`
], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.DvalinsClaw,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.Wolfhook,
  worldBossDrop: MobDrops.LightningPrism,
  mobDrop: EasyMobDrops.Mask,
}, '20% Sprinting consumption reduction.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Energy Recharge"], ["Normal/Press", "Burst/Ult", "Skill/Ability"], true, [
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 53.6),
    new CharacterArtifactSet(Sets.PaleFlame, 4, 10.3),
    ...PhysicalDMGSets(5),
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
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 35.1),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 21.3),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 12.9),
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
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 68),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 13.6),
    new CharacterArtifactSet(Sets.FlowerOfParadiseLost, 4, 3.1),
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
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 60.5),
    ...AttackSets(4.8),
    ...ElementalMasterySets(4.8),
    new CharacterArtifactSet(Sets.MaidenBeloved, 4, 3.1),
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
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 79.3),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 7.5),
    ...ElementalMasterySets(2.7)
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
    ...AttackSets(55.5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 20.3),
    ...AttackSets(2.7),
    ...EnergyRechargeSets(2.7),
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
    ...AttackSets(15.8),
    ...AnemoDMGSets(15.8),
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
    new CharacterArtifactSet(Sets.SongOfDaysPast, 4, 46.3),
    ...HPSets(23.4),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 7.8),
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
    new CharacterArtifactSet(Sets.FinaleOfTheDeepGalleries, 4, 87.1),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 7.5),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 1.3),
  ])
);

export const Sucrose = new Character("Sucrose", "Anemo", "Catalyst", [
  "Grouping",
  "Off-field Damage",
  `Hexerei Able: After creating Small Wind Spirit, party members' NA/CA/PA/Skill/Burst DMG increased by 5.71428 for 15s. After creating Large Wind Spirit, party members' NA/CA/PA/Skill/Burst DMG increased by 7.14285 for 20s. I also personally think these numbers are hilarious.`
], Rarity.Epic, 'Mondstadt', {
  material: TalentAscension.Freedom,
  weeklyBossDrop: MobDrops.SpiritLocketOfBoreas,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: MobDrops.HurricaneSeed,
  mobDrop: EasyMobDrops.Nectar,
}, '10% chance of double product when crafting Character Talent Materials and Weapon Ascension Materials.',
  new CharacterPlaystyle("Off-field Support", ["Elemental Mastery", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 88.1),
    ...AnemoDMGSets(2.2),
    ...ElementalMasterySets(2.2),
    ...ElementalMasterySets(1.4),
    ...EnergyRechargeSets(1.4),
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
    new CharacterArtifactSet(Sets.HeartOfDepth, 4, 42.7),
    new CharacterArtifactSet(Sets.NymphsDream, 4, 14.3),
    ...HydroDMGSets(13.5),
    ...AttackSets(13.5),
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
    ...HPSets(35.6),
    ...EnergyRechargeSets(35.6),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 16.1),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 9.9),
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
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 65.4),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 15.3),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 8.3),
  ])
);

export const TravelerAnemo = new Character("Traveler (Anemo)", "Anemo", "Sword", [], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Resistance,
  weeklyBossDrop: MobDrops.DvalinsSigh,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
  mobDrop: EasyMobDrops.Mask,
}, `CRIT Rate +10%. When Pyro/Hydro/CryoElectro attacks from nearby party member hit opponents, gain 1 stack of Blade of the Dawn Breeze. Each Elemental type grants 1 stack. After obtaining 2+, performing CA consumes all stacks to transform into CA: Whirlwind: Each CA deals Anemo DMG. +60% of Traveler's ATK. Every consumption, Blade Wind summoned dealing 50% of Traveler's ATK - considered CA damage. 15s CD.`,
  new CharacterPlaystyle("On-field Swirl DPS", ["ATK", "Elemental Mastery"], ["Skill/Ability", "Normal/Press", "Burst/Ult"], true, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 37.9),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 25.6),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5.3)
  ])
);

export const TravelerGeo = new Character("Traveler (Geo)", "Geo", "Sword", [], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Prosperity,
  weeklyBossDrop: MobDrops.TailOfBoreas,
  crystal: ElementalCrystals.Geo,
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
  mobDrop: EasyMobDrops.Mask,
}, `DEF +20%. When members protected by shield and shield is replaced or Geo Constructs are created, Traveler receives 1 stack of Blade of Archaic Petra of 3 stacks. 1 stack/s. After 3, performing CA consumes all stacks to transform into CA: Rockfell. Each CA deals Geo DMG +120% of Traveler's ATK. After hit of opponent, +20% shield strength for party members for 15s. 15s CD.`,
  new CharacterPlaystyle("On-field DPS", ["ATK", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 24.1),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 9.0),
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 7.3),
  ])
);

export const TravelerElectro = new Character("Traveler (Electro)", "Electro", "Sword", [], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Transience,
  weeklyBossDrop: MobDrops.DragonLordsCrown,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
  mobDrop: EasyMobDrops.Mask,
}, `Energy Recharge +20%. When members burst/ult, Traveler receives 1 stack of Blade of Resounding Thunder of 3 stacks. After 3, performing CA consumes all stacks to transform into CA: Detonate. Each CA deals Electro DMG +100% of Traveler's ATK. 3s after hitting opponent, 1 additional lightning strike triggered, dealing Electro DMG of 200% Traveler's ATK. 1 Abundance Amulet created. DMG is considered CA DMG. 15s CD.`,
  new CharacterPlaystyle("Off-field Support", ["Energy Recharge", "ATK"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 24.2),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 22.7),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 14.2),
  ])
);

export const TravelerDendro = new Character("Traveler (Dendro)", "Dendro", "Sword", [], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Admonition,
  weeklyBossDrop: MobDrops.MudraOfTheMaleficGeneral,
  crystal: ElementalCrystals.Dendro,
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
  mobDrop: EasyMobDrops.Mask,
}, `Elemental Master +60. When Dendro/Bountiful Cores or Seeds of Deceit appears on field or party obtains Verdant Dew, Traveler gains 1 stack of Blade of Verdant Virids. These 2 methods each grant +1 stack/4s of 3. After 3, performing CA consumes all stacks to transform into CA: Verdessence. Each CA deals Dendro DMG +80% of Traveler's ATK. Two Vinecores created, which explode after 4/8s respectively, dealing Dendro DMG of 120% of Traveler's ATK - considered CA DMG. 15s CD.`,
  new CharacterPlaystyle("Off-field Support", ["Energy Recharge", "Elemental Mastery"], ["Burst/Ult", "Skill/Ability", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 56.3),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 7.8),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 6.7),
  ])
);

export const TravelerHydro = new Character("Traveler (Hydro)", "Hydro", "Sword", [], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Equity,
  weeklyBossDrop: MobDrops.WorldspanFern,
  crystal: ElementalCrystals.Hydro,
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
  mobDrop: EasyMobDrops.Mask,
}, `HP +20%. When party members' HP change by 5%, Traveler receives 1 stack of Blade of Many Waters every 4s of 3 stacks. After 3, performing CA consumes all stacks to transform into CA: Tidebound. Each CA deals Hydro DMG +150% of Traveler's ATK. When Traveler's HP > 50%, 10% of max HP consumed to increase DMG inflicted by CA by 100% of Traveler's ATK. When HP < 50%, one instance of healing = 25% of max HP restored upon hitting an enemy. 15s CD.`,
  new CharacterPlaystyle("Off-field Support", ["ATK", "Energy Recharge"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 31),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 7.8),
    new CharacterArtifactSet(Sets.MarechausseeHunter, 4, 6.5),
  ])
);
export const TravelerPyro = new Character("Traveler (Pyro)", "Pyro", "Sword", ['Nightsouls Blessing'], Rarity.Legendary, 'Unknown', {
  material: TalentAscension.Contention,
  weeklyBossDrop: null, // This is not a weekly boss drop, but a world quest drop
  crystal: ElementalCrystals.Pyro,
  localSpecialty: LocalSpecialties.WindwheelAster,
  worldBossDrop: null,
  mobDrop: EasyMobDrops.Mask,
}, `ATK +20%. When party members trigger Nightsoul burst, Traveler receives 1 stack of Blade of Sacred Flame of 2 stacks. After 3, performing CA consumes all stacks to transform into CA: Inferno. Each CA deals Nightsoul-aligned Pyro DMG +200% of Traveler's ATK. 15s CD.`,
  new CharacterPlaystyle("Off-field Support", ["Energy Recharge", "ATK"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], false, [
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 59.9),
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 14.4),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 4.7),
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

// #endregion

// #region V-Z

export const Varesa = new Character("Varesa", "Electro", "Catalyst", ["Nightsouls Blessing"], Rarity.Legendary, 'Natlan', {
  material: TalentAscension.Conflict,
  weeklyBossDrop: MobDrops.ErodedScaleFeather,
  crystal: ElementalCrystals.Electro,
  localSpecialty: LocalSpecialties.SkysplitGembloom,
  worldBossDrop: MobDrops.SparklessStatueCore,
  mobDrop: EasyMobDrops.Fang,
}, 'Sprint speed increased but sprint consumption is also increased outside of combat. Additionally, party members will restore 20 Phlogiston when consuming food. This effect can be triggered once every 10s.',
  new CharacterPlaystyle("On-field DPS", ["ATK", "Energy Recharge"], ["Plunging/Press", "Burst/Ult", "Skill/Ability"], true, [
    new CharacterArtifactSet(Sets.LongNightsOath, 4, 77.3),
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 16.5),
    ...PlungingAttackSets(1.9),
    new CharacterArtifactSet(Sets.ObsidianCodex, 2, 1.9),
  ])
);

export const Venti = new Character("Venti", "Anemo", "Bow", [
  "Grouping",
  'Elemental Infusion: If Hexereied, After Burst/Ult, Venti gains Anemo infusion',
  'Hexerei Able: If Stormeye active during burst; character triggers Swirld, reaction DMG +50%, Stormeye deals +35%'
], Rarity.Legendary, 'Mondstadt', {
  material: TalentAscension.Ballad,
  weeklyBossDrop: MobDrops.TailOfBoreas,
  crystal: ElementalCrystals.Anemo,
  localSpecialty: LocalSpecialties.Cecilia,
  worldBossDrop: MobDrops.HurricaneSeed,
  mobDrop: EasyMobDrops.Slime,
}, '20% Gliding consumption reduction.',
  new CharacterPlaystyle("Off-field Swirl Support", ["Elemental Mastery", "Energy Recharge"], ["Burst/Ult", "Skill/Ability", "Charged/Hold"], false, [
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 77),
    ...AnemoDMGSets(4.6),
    ...AttackSets(4.6),
    new CharacterArtifactSet(Sets.DesertPavilionChronicle, 4, 3.5)
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
    new CharacterArtifactSet(Sets.DesertPavilionChronicle, 4, 73.6),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 4, 5.3),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 4, 3.3),
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
    ...PyroDMGSets(1.7),
    ...EnergyRechargeSets(1.7),
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
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 53),
    new CharacterArtifactSet(Sets.SongOfDaysPast, 4, 19.9),
    ...AttackSets(8.4),
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
    new CharacterArtifactSet(Sets.VermillionHereafter, 4, 58.0),
    ...AttackSets(13.5),
    ...AnemoDMGSets(13.5),
    new CharacterArtifactSet(Sets.LongNightsOath, 4, 4.6)
  ]),
);

export const Xilonen = new Character("Xilonen", "Geo", "Sword", [
  "Elemental Based: Decrease elemental RES based on party members' elements (excl. Anemo & Dendro)",
  "Elemental Infusion: After Skill/Ability, Xilonen gains Geo infusion for the duration of the Nightsoul meter",
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
    new CharacterArtifactSet(Sets.ScrollOfTheHeroOfCinderCity, 4, 93.3),
    new CharacterArtifactSet(Sets.ArchaicPetra, 4, 4.4),
    new CharacterArtifactSet(Sets.ObsidianCodex, 4, 0.3),
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
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 68.8),
    ...BurstDMGSets(7.8),
    ...HydroDMGSets(7.8),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5.2),
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
    ...PhysicalDMGSets(23.1),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 20.5),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 5.9),
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
    new CharacterArtifactSet(Sets.GildedDreams, 4, 29.8),
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 29.0),
    ...AttackSets(6.3),
    ...ElectroDMGSets(6.3),
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
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 39.7),
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 35.7),
    ...AttackSets(3.3),
    ...PyroDMGSets(3.3),
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
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 60.1),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 7.5),
    new CharacterArtifactSet(Sets.MaidenBeloved, 4, 5.4),
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
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 86.5),
    ...HydroDMGSets(2.5),
    ...HPSets(2.5),
    ...HydroDMGSets(1.7),
    ...EnergyRechargeSets(1.7),
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
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 2.0),
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
    new CharacterArtifactSet(Sets.ViridescentVenerer, 4, 75.8),
    ...AnemoDMGSets(3.6),
    ...ElementalMasterySets(3.4),
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
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 66),
    ...DefenseSets(20.7),
    ...EnergyRechargeSets(20.7),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 2.6),
  ])
);

export const Zibai = new Character("Zibai", "Geo", "Sword", [
  'Enables Lunar-Crystallize Reaction',
  'Increases Moonsign'
], Rarity.Legendary, 'Liyue', {
  material: TalentAscension.Gold,
  weeklyBossDrop: MobDrops.RemnantOfTheDreadwing,
  crystal: ElementalCrystals.Geo,
  localSpecialty: LocalSpecialties.GlazeLily,
  worldBossDrop: MobDrops.ChessGameQueen,
  mobDrop: EasyMobDrops.Warrant,
}, `Collects elemental energy at night`, 
  new CharacterPlaystyle("On-field Lunar-Crystallize DPS", ["DEF"], ["Skill/Ability", "Burst/Ult", "Normal/Press"], true, [
    new CharacterArtifactSet(Sets.ADayCarvedFromRisingWinds, 4, 100),
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
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 76.8),
    ...HPSets(4.7),
    new CharacterArtifactSet(Sets.ArchaicPetra, 4, 4.2),
  ]),
);