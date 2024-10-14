import { AbilityType, Rarity, Reaction } from "../common/types";
import { ArtifactSet, Character, CharacterArtifactSet } from "../common/models";
import * as Domains from './domains';

const threeStar = 5;
const fourStar = 10;
const fiveStar = 20;
const correctElement = 15;

const isPhysicalFavored = (character: Character, artifactSet: CharacterArtifactSet) => (
  ['Normal/Press', 'Charged/Hold', 'Plunging/Hold'] as AbilityType[]
).some(abilityType => character.sets.some(set =>
  set.favoredAbility.includes(abilityType)
  && set.artifactSets.includes(artifactSet)
));

// Bloom, Hyperbloom & Burgeon
const canTriggerReaction = (character: Character, reaction: Reaction) => {
  const anemoReactions: Reaction[] = ['Swirl'];
  const geoReactions: Reaction[] = ['Crystallize', 'Shatter'];
  const cryoReactions: Reaction[] = ['Melt', 'Frozen', 'Shatter', 'Superconduct'];
  const dendroReactions: Reaction[] = ['Burning', 'Bloom', 'Burgeon', 'Hyperbloom', 'Quicken', 'Spread', 'Aggravate'];
  const electroReactions: Reaction[] = ['Overloaded', 'Electro-Charged', 'Superconduct', 'Quicken', 'Spread', 'Aggravate', 'Hyperbloom'];
  const hydroReactions: Reaction[] = ['Vaporize', 'Electro-Charged', 'Frozen', 'Shatter', 'Bloom', 'Burgeon', 'Hyperbloom'];
  const pyroReactions: Reaction[] = ['Vaporize', 'Overloaded', 'Melt', 'Burning', 'Burgeon'];

  return (
    (character.element === 'Anemo' && anemoReactions.includes(reaction))
    || (character.element === 'Geo' && geoReactions.includes(reaction))
    || (character.element === 'Cryo' && cryoReactions.includes(reaction))
    || (character.element === 'Dendro' && dendroReactions.includes(reaction))
    || (character.element === 'Electro' && electroReactions.includes(reaction))
    || (character.element === 'Hydro' && hydroReactions.includes(reaction))
    || (character.element === 'Pyro' && pyroReactions.includes(reaction))
  );
};

/**
 * @two Max HP +1000
 * @four Opening a chest regenerates 30% Max HP for 5s.
 */
export const Adventurer = new ArtifactSet(
  "Adventurer",
  "Max HP +1000",
  "Opening a chest regenerates 30% Max HP for 5s.",
  Rarity.Rare,
  [Domains.MidsummerCourtyard.name],
  false,
  c => c.sets.map(set => set.favoredAbility.includes('HP') ? threeStar : 0).sort().shift()
);

/**
 * @two Geo DMG Bonus +15%
 * @four When Elemental Shard picked up from Crystalize reaction, all party members gain 35% DMG Bonus for that particular element for 10s. Only one element DMG Bonus can be gained within that time
 */
export const ArchaicPetra = new ArtifactSet(
  "Archaic Petra",
  "Geo DMG Bonus +15%",
  "When Elemental Shard picked up from Crystalize reaction, all party members gain 35% DMG Bonus for that particular element for 10s. Only one element DMG Bonus can be gained within that time",
  Rarity.Legendary,
  [Domains.DomainOfGuyun.name],
  true,
  c => c.element === 'Geo' ? correctElement : 0
);

/**
 * @two CRIT Rate +12%
 * @four When HP is below 70%, CRIT Rate +24%
 */
export const Berserker = new ArtifactSet(
  "Berserker",
  "CRIT Rate +12%",
  "When HP is below 70%, CRIT Rate +24%",
  Rarity.Epic,
  ["BOSS_DROP"],
  false,
  () => fourStar
);

/**
 * @two Cryo DMG Bonus +15%
 * @four When wearer attacks enemy affected by Cryo, CRIT Rate +20%. If enemy is Frozen, CRIT Rate +40%
 */
export const BlizzardStrayer = new ArtifactSet(
  "Blizzard Strayer",
  "Cryo DMG Bonus +15%",
  "When wearer attacks enemy affected by Cryo, CRIT Rate +20%. If enemy is Frozen, CRIT Rate +40%",
  Rarity.Legendary,
  [Domains.PeakOfVindagnyr.name],
  true,
  c => c.element === 'Cryo' ? correctElement : 0
);

/**
 * @two Physical DMG +25%
 * @four After defeating an opponent, Charged Attack DMG +50% + reduce its Stamina cost to 0 for 10s
 */
export const BloodstainedChivalry = new ArtifactSet(
  "Bloodstained Chivalry",
  "Physical DMG +25%",
  "After defeating an opponent, Charged Attack DMG +50% + reduce its Stamina cost to 0 for 10s",
  Rarity.Legendary,
  [Domains.ClearPoolAndMountaincavern.name],
  true,
  (c, set) => c.sets.map(cSet => {
    if (!cSet.artifactSets.includes(set)) return 0;

    if (set.pieces === 2) return cSet.favoredAbility === 'Normal/Press' || cSet.favoredAbility === 'Plunging/Hold' ? correctElement : 0;
    let value = 0;
    if (cSet.favoredAbility === 'Charged/Hold') value += correctElement;
    if (cSet.onField) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two ATK +18%
 * @four +30% DMG against enemies with more than 50% HP
 */
export const BraveHeart = new ArtifactSet(
  "Brave Heart",
  "ATK +18%",
  "+30% DMG against enemies with more than 50% HP",
  Rarity.Epic,
  [
    Domains.RidgeWatch.name,
    Domains.DomainOfGuyun.name,
    Domains.SlumberingCourt.name,
    Domains.CityOfGold.name,
    Domains.FadedTheater.name,
  ],
  false,
  c => c.sets.map(cSet => cSet.talentStats.includes('ATK') ? correctElement : 0).sort().shift()
);

/**
 * @two Pyro DMG Bonus +15%
 * @four Overloaded & Burning DMG +40%. Vaporize & Melt DMG +15%. Using Skill (ability) increases 2-Piece Set effects by 50% (Pyro DMG Bonus +30%) for 10s. Max 3 stacks
 */
export const CrimsonWitchOfFlames = new ArtifactSet(
  "Crimson Witch Of Flames",
  "Pyro DMG Bonus +15%",
  "Overloaded & Burning DMG +40%. Vaporize & Melt DMG +15%. Using Skill (ability) increases 2-Piece Set effects by 50% (Pyro DMG Bonus +30%) for 10s. Max 3 stacks",
  Rarity.Legendary,
  [Domains.HiddenPalaceOfZhouFormula.name],
  true,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (c.element === 'Pyro') value += correctElement;
    if (set.pieces === 4 && cSet.onField) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two Dendro DMG Bonus +15%
 * @four Skill (ability) or Burst (ult) hit opponents, targets' Dendro RES -30% for 8s. Can be triggered off-field.
 */
export const DeepwoodMemories = new ArtifactSet(
  "Deepwood Memories",
  "Dendro DMG Bonus +15%",
  "Skill (ability) or Burst (ult) hit opponents, targets' Dendro RES -30% for 8s. Can be triggered off-field.",
  Rarity.Legendary,
  [Domains.SpireofSolitaryEnlightenment.name],
  true,
  (c, set) => {
    let value = 0;
    if (c.element !== 'Dendro') return 0;

    value += correctElement;
    if (set.pieces === 4) value += correctElement;
    return value;
  }
);

/**
 * @two DEF +30%
 * @four Each different element in party, wearer's Elemental RES' element +30%
 */
export const DefendersWill = new ArtifactSet(
  "Defender's Will",
  "DEF +30%",
  "Each different element in party, wearer's Elemental RES' element +30%",
  Rarity.Epic,
  [
    Domains.HiddenPalaceOfZhouFormula.name,
    Domains.PeakOfVindagnyr.name,
    Domains.SlumberingCourt.name,
    Domains.DenouementOfSin.name,
  ],
  false,
  (c, set) => c.sets.map(cSet => cSet.talentStats.includes('DEF') ? correctElement : 0).sort().shift()
);

/**
 * @two Anemo DMG Bonus +15%
 * @four Charged Attacks on opponents adds following buffs: Wearer's Normal Attack SPD +10%. Normal, Charged, and Plunging Attack DMG +40% for 15s.
 */
export const DesertPavilionChronicle = new ArtifactSet(
  "Desert Pavilion Chronicle",
  "Anemo DMG Bonus +15%",
  "Charged Attacks on opponents adds following buffs: Wearer's Normal Attack SPD +10%. Normal, Charged, and Plunging Attack DMG +40% for 15s.",
  Rarity.Legendary,
  [Domains.CityOfGold.name],
  true,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (c.element === 'Anemo') value += correctElement;
    if (set.pieces === 4 && cSet.favoredAbility === 'Charged/Hold') value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two ATK +18%
 * @four When Normal Attack hit opponents, 36% chance to trigger "Valley Rite": Normal Attack DMG +70% Of ATK. Effect is dispelled .05s after Normal Attack deals DMG. If "Valley Rite" was not triggered, odds Of triggering +20%. Effect can trigger once every .2s.
 */
export const EchoesOfAnOffering = new ArtifactSet(
  "Echoes Of An Offering",
  "ATK +18%",
  `When Normal Attack hit opponents, 36% chance to trigger "Valley Rite": Normal Attack DMG +70% Of ATK. Effect is dispelled .05s after Normal Attack deals DMG. If "Valley Rite" was not triggered, odds Of triggering +20%. Effect can trigger once every .2s.`,
  Rarity.Legendary,
  [Domains.TheLostValley.name],
  true,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (cSet.talentStats.includes('ATK')) value += correctElement;
    if (set.pieces === 4 && cSet.onField) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two Energy Recharge +20%
 * @four Burst (ult) DMG +25% Of Energy Recharge. Max 75% bonus DMG can be obtained in this way.
 */
export const EmblemOfSeveredFate = new ArtifactSet(
  "Emblem Of Severed Fate",
  "Energy Recharge +20%",
  "Burst (ult) DMG +25% Of Energy Recharge. Max 75% bonus DMG can be obtained in this way.",
  Rarity.Legendary,
  [Domains.MomijiDyedCourt.name],
  true,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (cSet.talentStats.includes('Energy Recharge')) value += correctElement;
    if (set.pieces === 4) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two Elemental Mastery +80
 * @four Wearer's Bloom, Hyperbloom & Burgeon reaction DMG +40%. After reaction, +25% DMG Of effect. Max 4 stacks where each stack lasts 10s. Can only trigger once per second. Can trigger off-field.
 */
export const FlowerOfParadiseLost = new ArtifactSet(
  "Flower Of Paradise Lost",
  "Elemental Mastery +80",
  "Wearer's Bloom, Hyperbloom & Burgeon reaction DMG +40%. After reaction, +25% DMG Of effect. Max 4 stacks where each stack lasts 10s. Can only trigger once per second. Can trigger off-field.",
  Rarity.Legendary,
  [Domains.CityOfGold.name],
  true,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (cSet.talentStats.includes('Elemental Mastery')) value += correctElement;
    if (set.pieces !== 4) return value;

    if (canTriggerReaction(c, 'Bloom')) value += correctElement;
    if (canTriggerReaction(c, 'Hyperbloom')) value += correctElement;
    if (canTriggerReaction(c, 'Burgeon')) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two ATK +18%
 * @four When value Of Bond Of Life changes, character deals 18% increased DMG for 6s. Max 3 stacks.
 */
export const FragmentOfHarmonicWhimsy = new ArtifactSet(
  "Fragment Of Harmonic Whimsy",
  "ATK +18%",
  "When value Of Bond Of Life changes, character deals 18% increased DMG for 6s. Max 3 stacks.",
  Rarity.Legendary,
  [Domains.FadedTheater.name],
  false,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (cSet.talentStats.includes('ATK')) value += correctElement;
    if (set.pieces === 4 && c.bonusAbilities.includes('Bond of Life')) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two Elemental Skill DMG +20%
 * @four Defeating an opponent has 100% chance to remove Elemental Skill CD. Can only occur once every 15s.
 */
export const Gambler = new ArtifactSet(
  "Gambler",
  "Elemental Skill DMG +20%",
  "Defeating an opponent has 100% chance to remove Elemental Skill CD. Can only occur once every 15s.",
  Rarity.Epic,
  [
    Domains.PeakOfVindagnyr.name,
    Domains.ClearPoolAndMountaincavern.name,
    Domains.SpireofSolitaryEnlightenment.name,
    Domains.TheLostValley.name,
    Domains.SanctumOfRainbowSpirits.name,
  ],
  false,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (cSet.favoredAbility === 'Skill/Ability') value += correctElement;
    if (set.pieces === 4) value += correctElement;
    if (cSet.onField) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two Elemental Mastery +80
 * @four Within 8s Of triggering Elemental Reaction, wearer obtains buff based on Elemental Type Of other party members. ATK +14% for each member with same Element as wearer. Elemental Mastery +50 for each member with different Element. Each buff can count up to 3 characters. Effect triggerable 1/8s. Can trigger off-field.
 */
export const GildedDreams = new ArtifactSet(
  "Gilded Dreams",
  "Elemental Mastery +80",
  "Within 8s Of triggering Elemental Reaction, wearer obtains buff based on Elemental Type Of other party members. ATK +14% for each member with same Element as wearer. Elemental Mastery +50 for each member with different Element. Each buff can count up to 3 characters. Effect triggerable 1/8s. Can trigger off-field.",
  Rarity.Legendary,
  [Domains.SpireofSolitaryEnlightenment.name],
  true,
  c => c.sets.map(cSet =>
    cSet.talentStats.includes('Elemental Mastery') ? correctElement : 0
  ).sort().shift()
);

/**
 * @two ATK +18%
 * @four Sword/Claymore/Polearm wearer, Normal Attack DMG +35%
 */
export const GladiatorsFinale = new ArtifactSet(
  "Gladiator's Finale",
  "ATK +18%",
  "Sword/Claymore/Polearm wearer, Normal Attack DMG +35%",
  Rarity.Legendary,
  ["BOSS_DROP"],
  true,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (cSet.talentStats.includes('ATK')) value += correctElement;
    if (set.pieces === 4 && (
      c.weapon === 'Sword'
      || c.weapon === 'Claymore'
      || c.weapon === 'Polearm')
      && cSet.onField) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two Increases Elemental Skill DMG by 20%
 * @four Increase Elemental Skill DMG by 25%. Additionally, off-field, Elemental Skill DMG additional +25%. Effect cleared 2s after on-field.
 */
export const GoldenTroupe = new ArtifactSet(
  "Golden Troupe",
  "Increase Elemental Skill DMG by 20%",
  "Increase Elemental Skill DMG by 25%. Additionally, off-field, Elemental Skill DMG additional +25%. Effect cleared 2s after on-field.",
  Rarity.Legendary,
  [Domains.DenouementOfSin.name],
  true,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (cSet.favoredAbility === 'Skill/Ability') value += correctElement;
    if (set.pieces === 4 && !cSet.onField) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two Hydro DMG Bonus +15%
 * @four After using Skill (ability); Normal and Charged Attack DMG +30% for 15s
 */
export const HeartOfDepth = new ArtifactSet(
  "Heart Of Depth",
  "Hydro DMG Bonus +15%",
  "After using Skill (ability); Normal and Charged Attack DMG +30% for 15s",
  Rarity.Legendary,
  [Domains.PeakOfVindagnyr.name],
  true,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (c.element === 'Hydro') value += correctElement;
    if (set.pieces === 4 && cSet.onField) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two DEF +30%
 * @four Wearer obtains "Curiosity" effect in condition: On field and hit opponent with Geo attack, gain 1 stack 1/.3s. Max 4 stacks, each providing 6% DEF & Geo DMG Bonus. After 6s without gaining stack, lose 1 stack.
 */
export const HuskOfOpulentDreams = new ArtifactSet(
  "Husk Of Opulent Dreams",
  "DEF +30%",
  `Wearer obtains "Curiosity" effect in condition: On field and hit opponent with Geo attack, gain 1 stack 1/.3s. Max 4 stacks, each providing 6% DEF & Geo DMG Bonus. After 6s without gaining stack, lose 1 stack.`,
  Rarity.Legendary,
  [Domains.SlumberingCourt.name],
  true,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (cSet.talentStats.includes('DEF')) value += correctElement;
    if (set.pieces === 4 && c.element === 'Geo') value += correctElement;
    if (set.pieces === 4 && c.element === 'Geo' && cSet.onField) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two Elemental Mastery +80
 * @four Trigger elemental reaction, party members' Elemental Mastery +120 for 8s.
 */
export const Instructor = new ArtifactSet(
  "Instructor",
  "Elemental Mastery +80",
  "Trigger elemental reaction, party members' Elemental Mastery +120 for 8s.",
  Rarity.Epic,
  ["BOSS_DROP"],
  false,
  c => c.sets.map(cSet => cSet.talentStats.includes('Elemental Mastery') ? correctElement : 0).sort().shift()
);

/**
 * @two Pyro RES +40%
 * @four DMG, against opponents affected by Pyro, +35%
 */
export const Lavawalker = new ArtifactSet(
  "Lavawalker",
  "Pyro RES +40%",
  "DMG, against opponents affected by Pyro, +35%",
  Rarity.Legendary,
  [Domains.HiddenPalaceOfZhouFormula.name],
  true,
  (c, set) => {
    let value = 0;
    if (c.element === 'Pyro') value += correctElement;
    if (set.pieces === 4) value += correctElement;
    return value;
  }
);

/**
 * @two DEF +100
 * @four Picking up Mora restores 300 HP
 */
export const LuckyDog = new ArtifactSet(
  "Lucky Dog",
  "DEF +100",
  "Picking up Mora restores 300 HP",
  Rarity.Rare,
  [Domains.DomainOfGuyun.name],
  false,
  c => c.sets.map(cSet => cSet.talentStats.includes('DEF') ? threeStar : 0).sort().shift()
);

/**
 * @two Character Healing Effectiveness +15%
 * @four Using Skill (ability) or Burst (ult) increases healing received by all party members by 20% for 10s.
 */
export const MaidenBeloved = new ArtifactSet(
  "Maiden Beloved",
  "Character Healing Effectiveness +15%",
  "Using Skill (ability) or Burst (ult) increases healing received by all party members by 20% for 10s.",
  Rarity.Legendary,
  [Domains.ValleyOfRemembrance.name],
  true,
  c => c.bonusAbilities.includes('Heal') ? correctElement : 0
);

/**
 * @two Normal and Charged Attack DMG +15%
 * @four When current HP changes, CRIT Rate +12% for 5s. Max 3 stacks.
 */
export const MarechausseeHunter = new ArtifactSet(
  "Marechaussee Hunter",
  "Normal and Charged Attack DMG +15%",
  "When current HP changes, CRIT Rate +12% for 5s. Max 3 stacks.",
  Rarity.Legendary,
  [Domains.DenouementOfSin.name],
  true,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (isPhysicalFavored(c, set)) value += correctElement;
    if (set.pieces === 4 && c.bonusAbilities.includes('Self-heal')) value += correctElement;
    if (set.pieces === 4 && c.bonusAbilities.includes('Bond of Life')) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two Normal and Charged Attack DMG +15%
 * @four After using Skill (ability); Normal and Charged Attack DMG +25% for 8s
 */
export const MartialArtist = new ArtifactSet(
  "Martial Artist",
  "Normal and Charged Attack DMG +15%",
  "After using Skill (ability); Normal and Charged Attack DMG +25% for 8s",
  Rarity.Epic,
  [
    Domains.HiddenPalaceOfZhouFormula.name,
    Domains.RidgeWatch.name,
    Domains.TheLostValley.name,
    Domains.MoltenIronFortress.name,
    Domains.WaterfallWen.name,
  ],
  false,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (cSet.favoredAbility === 'Normal/Press' || cSet.favoredAbility === 'Charged/Hold') value += correctElement;
    if (set.pieces === 4 && cSet.onField) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two ATK +18%
 * @four After using Elemental Skill, +20% Geo DMG Bonus for 10s. While shielded by Crystalize reaction, effect increased by 150%. Additional increase disappears 1s after shield is lost.
 */
export const NighttimeWhispersInTheEchoingWoods = new ArtifactSet(
  "Nighttime Whispers in the Echoing Woods",
  "ATK +18%",
  "After using Elemental Skill, +20% Geo DMG Bonus for 10s. While shielded by Crystalize reaction, effect increased by 150%. Additional increase disappears 1s after shield is lost.",
  Rarity.Legendary,
  [Domains.WaterfallWen.name],
  false,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (cSet.talentStats.includes('ATK')) value += correctElement;
    if (set.pieces === 4 && cSet.favoredAbility === 'Skill/Ability') value += correctElement;
    if (set.pieces === 4 && c.element === 'Geo' && cSet.onField) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two Burst (ult) DMG +20%
 * @four Using Burst (ult); all party members' ATK +20% for 12s. Non-stackable.
 */
export const NoblesseOblige = new ArtifactSet(
  "Noblesse Oblige",
  "Burst (ult) DMG +20%",
  "Using Burst (ult); all party members' ATK +20% for 12s. Non-stackable.",
  Rarity.Legendary,
  [Domains.ClearPoolAndMountaincavern.name],
  true,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (cSet.favoredAbility === 'Burst/Ult') value += correctElement;
    if (set.pieces === 4 || c.bonusAbilities.includes('Buff ATK')) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two Hydro DMG Bonus +15%
 * @four After Normal/Charged/Plunging Attacks or Skill/Burst hits opponents, trigger 1 stack Of "Mirrored Nymph" for 8s. 1/2/3 stacks Of "Mirrored Nymph" +ATK 7/16/25% and +Hydro DMG Bonus 4/9/15%. Stacks created by Normal/Charged/Plunging Attacks or Skill/Burst are independent.
 */
export const NymphsDream = new ArtifactSet(
  "Nymph's Dream",
  "Hydro DMG Bonus +15%",
  `After Normal/Charged/Plunging Attacks or Skill/Burst hits opponents, trigger 1 stack Of "Mirrored Nymph" for 8s. 1/2/3 stacks Of "Mirrored Nymph" +ATK 7/16/25% and +Hydro DMG Bonus 4/9/15%. Stacks created by Normal/Charged/Plunging Attacks or Skill/Burst are independent.`,
  Rarity.Legendary,
  [Domains.MoltenIronFortress.name],
  true,
  (c, set) => {
    let value = 0;
    if (c.element === 'Hydro') value += correctElement;
    if (set.pieces === 4 || c.bonusAbilities.includes('Buff ATK')) value += correctElement;
    return value;
  }
);

/**
 * @two While equipping character is in Nightsoul's Blessing and on field, DMG dealt +15%
 * @four After equipping chracter consumes 1 Nightsoul point on field, CRIT Rate +40% for 6s. Can trigger 1/s.
 */
export const ObsidianCodex = new ArtifactSet(
  "Obsidian Codex",
  "While equipping character is in Nightsoul's Blessing and on field, DMG dealt +15%",
  "After equipping chracter consumes 1 Nightsoul point on field, CRIT Rate +40% for 6s. Can trigger 1/s.",
  Rarity.Legendary,
  [Domains.SanctumOfRainbowSpirits.name],
  false,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (c.bonusAbilities.includes('Nightsouls Blessing') && cSet.onField) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two Healing Bonus +15%
 * @four Wearer heals party member, Sea-Dyed Foam appears for 3s, accumulating HP recovered (incl. overhealth). Sea-Dyed Foam explodes for 90% Of accumulated healing after duration. Sea-Dyed Foam produced 1/3.5s. Max 30k hp accumulation (incl. overhealth). Only 1 Sea-Dyed Foam active at a time. Effect can trigger off-field.
 */
export const OceanHuedClam = new ArtifactSet(
  "Ocean-Hued Clam",
  "Healing Bonus +15%",
  "Wearer heals party member, Sea-Dyed Foam appears for 3s, accumulating HP recovered (incl. overhealth). Sea-Dyed Foam explodes for 90% Of accumulated healing after duration. Sea-Dyed Foam produced 1/3.5s. Max 30k hp accumulation (incl. overhealth). Only 1 Sea-Dyed Foam active at a time. Effect can trigger off-field.",
  Rarity.Legendary,
  [Domains.SlumberingCourt.name],
  true,
  c => c.bonusAbilities.includes('Heal' )? correctElement : 0
);

/**
 * @two Physical DMG +25%
 * @four When Skill (ability) hits opponent, ATK +9% for 7s. Max 2 stacks, then 2-set effect effect +100%. Can occur once every .3s.
 */
export const PaleFlame = new ArtifactSet(
  "Pale Flame",
  "Physical DMG +25%",
  "When Skill (ability) hits opponent, ATK +9% for 7s. Max 2 stacks, then 2-set effect effect +100%. Can occur once every .3s.",
  Rarity.Legendary,
  [Domains.RidgeWatch.name],
  true,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (isPhysicalFavored(c, set)) value += correctElement;
    if (set.pieces === 4 && cSet.onField) value += correctElement;
    return value;
  }).sort().shift()
);

/** @one Affected by Hydro for 40% less time. */
export const PrayersOfDestiny = new ArtifactSet("Prayers For Destiny", "Affected by Hydro for 40% less time.", "", Rarity.Epic, ["BOSS_DROP"],
  false, () => 0);
/** @one Affected by Pyro for 40% less time. */
export const PrayersOfIllumination = new ArtifactSet("Prayers For Illumination", "Affected by Pyro for 40% less time.", "", Rarity.Epic, ["BOSS_DROP"],
  false, () => 0);
/** @one Affected by Electro for 40% less time. */
export const PrayersOfWisdom = new ArtifactSet("Prayers For Wisdom", "Affected by Electro for 40% less time.", "", Rarity.Epic, ["BOSS_DROP"],
  false, () => 0);
/** @one Affected by Cryo for 40% less time. */
export const PrayersOfSpringtime = new ArtifactSet("Prayers To Springtime", "Affected by Cryo for 40% less time.", "", Rarity.Epic, ["BOSS_DROP"],
  false, () => 0);

/**
 * @two ATK +18%
 * @four Charged Attack CRIT Rate +30%
 */
export const ResolutionOfSojourner = new ArtifactSet(
  "Resolution Of Sojourner",
  "ATK +18%",
  "Charged Attack CRIT Rate +30%",
  Rarity.Rare,
  [
    Domains.MidsummerCourtyard.name,
    Domains.MomijiDyedCourt.name,
    Domains.CityOfGold.name,
    Domains.DenouementOfSin.name,
    Domains.SanctumOfRainbowSpirits.name,
  ],
  false,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (cSet.talentStats.includes('ATK')) value += correctElement;
    if (set.pieces === 4 && cSet.favoredAbility === 'Charged/Hold') value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two Shield Strength +35%
 * @four While protected by shield, +40% Normal and Charged Attack DMG
 */
export const RetracingBolide = new ArtifactSet(
  "Retracing Bolide",
  "Shield Strength +35%",
  "While protected by shield, +40% Normal and Charged Attack DMG",
  Rarity.Legendary,
  [Domains.DomainOfGuyun.name],
  true,
  (c, set) => {
    let value = 0;
    if (c.bonusAbilities.includes('Shield')) value += correctElement;
    if (set.pieces === 4) value += correctElement;
    return value;
  }
);

/**
 * @two Energy Recharge +20%
 * @four Members using Bow/Catalyst gain 3 energy when elemental particle/orb is collected. Can only occur once every 3s.
 */
export const Scholar = new ArtifactSet(
  "Scholar",
  "Energy Recharge +20%",
  "Members using Bow/Catalyst gain 3 energy when elemental particle/orb is collected. Can only occur once every 3s.",
  Rarity.Epic,
  [
    Domains.ClearPoolAndMountaincavern.name,
    Domains.MoltenIronFortress.name,
    Domains.FadedTheater.name,
  ],
  false,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (cSet.favoredAbility === 'Burst/Ult') value += correctElement;
    if (cSet.talentStats.includes('Energy Recharge')) value += correctElement;
    if (set.pieces === 4 && (c.weapon === 'Bow' || c.weapon === 'Catalyst')) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two When nearby party member triggers Nightsoul Burst, equipping chracater regenerates 6 elemental energy.
 * @four After equipping character triggers reaction related to their elemental type, all nearby party members gain 12% Elemental DMG Bonus for elemental types involved in said reaction for 15s. If equipping character is in Nightsoul's Blessing state when triggering effect, all nearby party members gain additional 28% Elemental DMG Bonus for elemental types involved in said reaction 20s. Can trigger off-field.
 */
export const ScrollOfTheHeroOfCinderCity = new ArtifactSet(
  "Scroll Of The Hero Of Cinder City",
  "When nearby party member triggers Nightsoul Burst, equipping chracater regenerates 6 elemental energy.",
  "After equipping character triggers reaction related to their elemental type, all nearby party members gain 12% Elemental DMG Bonus for elemental types involved in said reaction for 15s. If equipping character is in Nightsoul's Blessing state when triggering effect, all nearby party members gain additional 28% Elemental DMG Bonus for elemental types involved in said reaction 20s. Can trigger off-field.",
  Rarity.Legendary,
  [Domains.SanctumOfRainbowSpirits.name],
  false,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (c.bonusAbilities.includes('Nightsouls Blessing')) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two ATK +18%
 * @four When using skill (ability) and has 15+ energy, -15 energy but +50% Normal/Charged/Plunging Attack DMG for 10s. Can only occur once while active.
 */
export const ShimenawasReminiscence = new ArtifactSet(
  "Shimenawa's Reminiscence",
  "ATK +18%",
  "When using skill (ability) and has 15+ energy, -15 energy but +50% Normal/Charged/Plunging Attack DMG for 10s. Can only occur once while active.",
  Rarity.Legendary,
  [Domains.MomijiDyedCourt.name],
  true,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (cSet.talentStats.includes('ATK')) value += correctElement;
    if (set.pieces === 4 && cSet.favoredAbility === 'Skill/Ability') value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two Healing Bonus +15%
 * @four When equipping character heals party member, Yearning effect created for 6s, which records total healing (and overflow) amount provided. When duration expires, Yearning turns into Waves Of Days Past effect: When active party member hits opponent with normal-, charged-, plunging attack, elemental skill or burst, DMG dealt +8% Of recorded amount. Effect removed after 5x usage or 10s.
 */
export const SongOfDaysPast = new ArtifactSet(
  "Song Of Days Past",
  "Healing Bonus +15%",
  "When equipping character heals party member, Yearning effect created for 6s, which records total healing (and overflow) amount provided. When duration expires, Yearning turns into Waves Of Days Past effect: When active party member hits opponent with normal-, charged-, plunging attack, elemental skill or burst, DMG dealt +8% Of recorded amount. Effect removed after 5x usage or 10s.",
  Rarity.Legendary,
  [Domains.WaterfallWen.name],
  false,
  c => c.bonusAbilities.includes('Heal' )? correctElement : 0
);

/**
 * @two HP +20%
 * @four Skill (ability) hits opponent, +20% ATK & +30% Shield Strength for 3s for all party members. Can trigger off-field
 */
export const TenacityOfTheMillelith = new ArtifactSet(
  "Tenacity Of The Millelith",
  "HP +20%",
  "Skill (ability) hits opponent, +20% ATK & +30% Shield Strength for 3s for all party members. Can trigger off-field",
  Rarity.Legendary,
  [Domains.RidgeWatch.name],
  true,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (cSet.talentStats.includes('HP')) value += correctElement;
    if (set.pieces !== 4) return value;

    if (cSet.favoredAbility === 'Skill/Ability') value += correctElement;
    if (c.element === 'Geo') value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two Energy Recharge +20%
 * @four Using Burst (ult); party members (excl. wearer) gain 2 energy every 2s for 6s. Max 10 energy. Non-stackable.
 */
export const TheExile = new ArtifactSet(
  "The Exile",
  "Energy Recharge +20%",
  "Using Burst (ult); party members (excl. wearer) gain 2 energy every 2s for 6s. Max 10 energy. Non-stackable.",
  Rarity.Epic, 
  ["BOSS_DROP"],
  false,
  c => c.sets.map(cSet => cSet.talentStats.includes('Energy Recharge') ? correctElement : 0).sort().shift()
);

/**
 * @two Electro DMG Bonus +15%
 * @four +40% DMG caused by Overloaded/Electro-Charged/Superconduct/Hyperbloom. +20% DMG Bonus conferred by Aggravate. Quicken or aforementioned Elemental Reactions triggered, Skill CD -1s. Can only occur 1/.8s.
 */
export const ThunderingFury = new ArtifactSet(
  "Thundering Fury",
  "Electro DMG Bonus +15%",
  "+40% DMG caused by Overloaded/Electro-Charged/Superconduct/Hyperbloom. +20% DMG Bonus conferred by Aggravate. Quicken or aforementioned Elemental Reactions triggered, Skill CD -1s. Can only occur 1/.8s.",
  Rarity.Legendary,
  [Domains.MidsummerCourtyard.name],
  true,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (c.element === 'Electro') value += correctElement;
    if (set.pieces !== 4) return value;

    if (canTriggerReaction(c, 'Overloaded')) value += correctElement;
    if (canTriggerReaction(c, 'Electro-Charged')) value += correctElement;
    if (canTriggerReaction(c, 'Superconduct')) value += correctElement;
    if (canTriggerReaction(c, 'Hyperbloom')) value += correctElement;
    if (canTriggerReaction(c, 'Aggravate')) value += correctElement;
    if (canTriggerReaction(c, 'Quicken')) value += correctElement;
    if (cSet.onField) value += correctElement;
    if (cSet.favoredAbility === 'Skill/Ability') value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two Electro RES +40%
 * @four DMG against opponents affected by Electro +35%
 */
export const Thundersoother = new ArtifactSet(
  "Thundersoother",
  "Electro RES +40%",
  "DMG against opponents affected by Electro +35%",
  Rarity.Legendary,
  [Domains.MidsummerCourtyard.name],
  true,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (c.element === 'Electro') value += correctElement;
    if (set.pieces === 4 && cSet.onField) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two All Elemental RES +20%
 * @four Elemental DMG given, corresponding Elemental RES +30% for 10s. Can only occur once every 10s.
 */
export const TinyMiracle = new ArtifactSet(
  "Tiny Miracle",
  "All Elemental RES +20%",
  "Elemental DMG given, corresponding Elemental RES +30% for 10s. Can only occur once every 10s.",
  Rarity.Epic,
  [
    Domains.ValleyOfRemembrance.name,
    Domains.SpireofSolitaryEnlightenment.name,
    Domains.MomijiDyedCourt.name,
    Domains.WaterfallWen.name,
  ],
  false,
  c => c.sets.map(cSet => !cSet.onField ? threeStar : 0).sort().shift()
);

/**
 * @two Incoming Healing Bonus +20%
 * @four Burst (ult) restores 20% HP.
 */
export const TravelingDoctor = new ArtifactSet(
  "Traveling Doctor",
  "Incoming Healing Bonus +20%",
  "Burst (ult) restores 20% HP.",
  Rarity.Uncommon,
  [Domains.ValleyOfRemembrance.name],
  false,
  c => c.bonusAbilities.includes('Heal' )? correctElement : 0
);

/**
 * @two ATK +18%
 * @four After combat left for 3s, DMG dealt +50%. In combat, if no Burning opponents nearby more than 6s, DMG bonus decrease by 10%/s until 0%. When Burning opponent exists, increase by 10% until 50%. Can trigger off-field.
 */
export const UnfinishedReverie = new ArtifactSet(
  "Unfinished Reverie",
  "ATK +18%",
  "After combat left for 3s, DMG dealt +50%. In combat, if no Burning opponents nearby more than 6s, DMG bonus decrease by 10%/s until 0%. When Burning opponent exists, increase by 10% until 50%. Can trigger off-field.",
  Rarity.Legendary,
  [Domains.FadedTheater.name],
  false,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (cSet.talentStats.includes('ATK')) value += correctElement;
    if (!cSet.onField && canTriggerReaction(c, 'Burning')) value += correctElement;
    if (canTriggerReaction(c, 'Burning')) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two ATK +18%
 * @four After Burst (ult); wearer gains "Nascent Light" effect; ATK +8% for 16s. When HP decreases, additional ATK +10%. Max 4 stacks. Effect can trigger once every .8s. Nascent Light is dispelled when wearer leaves field. If Burst is used again during Nascent Light, original Nascent Light is dispelled.
 */
export const VermillionHereafter = new ArtifactSet(
  "Vermillion Hereafter",
  "ATK +18%",
  `After Burst (ult); wearer gains "Nascent Light" effect; ATK +8% for 16s. When HP decreases, additional ATK +10%. Max 4 stacks. Effect can trigger once every .8s. Nascent Light is dispelled when wearer leaves field. If Burst is used again during Nascent Light, original Nascent Light is dispelled.`,
  Rarity.Legendary,
  [Domains.TheLostValley.name],
  true,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (cSet.talentStats.includes('ATK')) value += correctElement;
    if (set.pieces === 4 && cSet.favoredAbility === 'Burst/Ult') value += correctElement;
    if (cSet.onField) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two Anemo DMG Bonus +15%
 * @four Increases Swirl DMG by 60%. Decrease opponent's Elemental RES to Swirl element by 40% for 10s.
 */
export const ViridescentVenerer = new ArtifactSet(
  "Viridescent Venerer",
  "Anemo DMG Bonus +15%",
  "Increases Swirl DMG by 60%. Decrease opponent's Elemental RES to Swirl element by 40% for 10s.",
  Rarity.Legendary,
  [Domains.ValleyOfRemembrance.name],
  true,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (c.element === 'Anemo') value += correctElement;
    if (set.pieces === 4 && cSet.onField) value += correctElement;
    return value;
  }).sort().shift()
);

/**
 * @two HP +20%
 * @four Skill (ability) and Burst (ult) DMG +10%. After wearer takes damage, additional +80% DMG Bonus for 5s. Max 5 stacks. Each stack duration counted independently. Can trigger off-field.
 */
export const VourukashasGlow = new ArtifactSet(
  "Vourukasha's Glow",
  "HP +20%",
  "Skill (ability) and Burst (ult) DMG +10%. After wearer takes damage, additional +80% DMG Bonus for 5s. Max 5 stacks. Each stack duration counted independently. Can trigger off-field.",
  Rarity.Legendary,
  [Domains.MoltenIronFortress.name],
  true,
  c => c.sets.map(cSet => cSet.talentStats.includes('HP') ? correctElement : 0).sort().shift()
);

/**
 * @two Elemental Mastery +80
 * @four Catalyst/Bow wearer, Charged Attack DMG +35%
 */
export const WanderersTroupe = new ArtifactSet(
  "Wanderer's Troupe",
  "Elemental Mastery +80",
  "Catalyst/Bow wearer, Charged Attack DMG +35%",
  Rarity.Legendary, 
  ["BOSS_DROP"],
  true,
  (c, set) => c.sets.map(cSet => {
    let value = 0;
    if (cSet.talentStats.includes('Elemental Mastery')) value += correctElement;
    if (set.pieces === 4 && (c.weapon === 'Catalyst' || c.weapon === 'Bow') && cSet.onField) value += correctElement;
    return value;
  }).sort().shift()
);