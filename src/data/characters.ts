import { Rarity } from "@/common/types";
import { Character, CharacterSet, CharacterArtifactSet, ArtifactSet } from "../common/models";
import * as Sets from './artifact-sets';

export const Albedo = new Character("Albedo", "Geo", "Sword", 'Nothing', Rarity.Legendary, [
  new CharacterSet("Off-field DPS", ["DEF"], 'Skill/Ability', false, [
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 5),
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 2, 4),
    new CharacterArtifactSet(Sets.ArchaicPetra, 2, 4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 3),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 2),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 1),
  ])
]);

export const Alhaitham = new Character("Alhaitham", "Dendro", "Sword", "Nothing", Rarity.Legendary, [
  new CharacterSet("Spread DPS", ["Elemental Mastery", "ATK"], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.GildedDreams, 4, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 4),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 2, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 4),
    new CharacterArtifactSet(Sets.WanderersTroupe, 2, 4),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 3),
  ])
]);

export const Aloy = new Character("Aloy", "Cryo", "Bow", "Nothing", Rarity.Legendary, [
  new CharacterSet("Burst Support", ["ATK"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 5),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 3),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 2),
    new CharacterArtifactSet(Sets.WanderersTroupe, 2, 2),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 2),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 2),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 2),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 2),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 2),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 1),
  ])
]);

export const Amber = new Character("Amber", "Pyro", "Bow", "Nothing", Rarity.Epic, [
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

export const AratakiItto = new Character("Arataki Itto", "Geo", "Claymore", "Nothing", Rarity.Legendary, [
  new CharacterSet("On-field DPS", ["DEF", "HP"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 5),
    new CharacterArtifactSet(Sets.DesertPavilionChronicle, 4, 4),
    new CharacterArtifactSet(Sets.RetracingBolide, 4, 4),
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 2, 3),
    new CharacterArtifactSet(Sets.ArchaicPetra, 2, 3),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
  ])
]);

export const Arlecchino = new Character("Arlecchino", "Pyro", "Polearm", "Bond of Life", Rarity.Legendary, [
  new CharacterSet("On-field DPS", ["ATK", "HP"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.FragmentOfHarmonicWhimsy, 4, 5),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 4),
    new CharacterArtifactSet(Sets.DesertPavilionChronicle, 4, 3),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 2),
    new CharacterArtifactSet(Sets.FragmentOfHarmonicWhimsy, 2, 2),
    new CharacterArtifactSet(Sets.FragmentOfHarmonicWhimsy, 2, 1),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 1),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 1),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 1),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 1),
  ])
]);

export const Baizhu = new Character("Baizhu", "Dendro", "Catalyst", "Heal", Rarity.Legendary, [
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

export const Barbara = new Character("Barbara", "Hydro", "Catalyst", "Heal", Rarity.Epic, [
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
    new CharacterArtifactSet(Sets.GildedDreams, 2, 3),
    new CharacterArtifactSet(Sets.WanderersTroupe, 2, 3),
    new CharacterArtifactSet(Sets.OceanHuedClam, 4, 2),
  ])
]);

export const Beidou = new Character("Beidou", "Electro", "Claymore", "Shield", Rarity.Epic, [
  new CharacterSet("Off-field DPS", ["ATK"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 4),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 4),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 4),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 4),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 4),
    new CharacterArtifactSet(Sets.Thundersoother, 4, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 2),
  ])
]);

export const Bennett = new Character("Bennett", "Pyro", "Sword", "Buff ATK", Rarity.Epic, [
  new CharacterSet("Burst Support", ["HP", "ATK"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 4),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 2),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 2),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 2),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 2),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 2),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 2),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 2),
    new CharacterArtifactSet(Sets.WanderersTroupe, 2, 2),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 2),
  ]),
  new CharacterSet("On-field DPS", ["Elemental Mastery"], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 5),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 4),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 4),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 4),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 4),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 4),
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

export const Candace = new Character("Candace", "Hydro", "Polearm", "Shield", Rarity.Epic, [
  new CharacterSet("Off-field Support", ["HP", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 4),
  ])
]);

export const Charlotte = new Character("Charlotte", "Cryo", "Catalyst", "Heal", Rarity.Epic, [
  new CharacterSet("Off-field Support", ["ATK", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 4),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 3),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 3),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 3),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 3),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 3),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 2),
  ])
]);

export const Chevreuse = new Character("Chevreuse", "Pyro", "Polearm", "Heal", Rarity.Epic, [
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

export const Chiori = new Character("Chiori", "Geo", "Sword", "Nothing", Rarity.Legendary, [
  new CharacterSet("Off-field DPS", ["DEF", "ATK"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 4, 5),
    new CharacterArtifactSet(Sets.HuskOfOpulentDreams, 2, 4),
    new CharacterArtifactSet(Sets.ArchaicPetra, 2, 4),
  ])
]);

export const Chongyun = new Character("Chongyun", "Cryo", "Claymore", "Nothing", Rarity.Epic, [
  new CharacterSet("Burst Support", ["ATK"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 5),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 5),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 3),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 3),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 3),
    new CharacterArtifactSet(Sets.WanderersTroupe, 2, 3),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 3),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 3),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 3),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 3),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 2),
  ])
]);

export const Chlorinde = new Character("Clorinde", "Electro", "Sword", "Bond of Life", Rarity.Legendary, [
  new CharacterSet("On-field DPS", ["ATK", "HP"], "Skill/Ability", true, [
    new CharacterArtifactSet(Sets.FragmentOfHarmonicWhimsy, 4, 5),
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 4),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 3),
  ])
]);

export const Collei = new Character("Collei", "Dendro", "Bow", "Nothing", Rarity.Epic, [
  new CharacterSet("Off-field Support", ["Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 4),
    new CharacterArtifactSet(Sets.Instructor, 4, 3),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 3),
    new CharacterArtifactSet(Sets.TheExile, 4, 3),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 2),
  ])
]);

export const Cyno = new Character("Cyno", "Electro", "Polearm", "Nothing", Rarity.Legendary, [
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
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 3),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 3),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 3),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 3),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 3),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 3),
    new CharacterArtifactSet(Sets.WanderersTroupe, 2, 3),
    new CharacterArtifactSet(Sets.Thundersoother, 4, 2),
  ])
]);

export const Dehya = new Character("Dehya", "Pyro", "Claymore", "Self-heal", Rarity.Legendary, [
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

export const Diluc = new Character("Diluc", "Pyro", "Claymore", "Nothing", Rarity.Legendary, [
  new CharacterSet("On-field DPS", ["ATK"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 4),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 3),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 3),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 3),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 3),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 3),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 3),
    new CharacterArtifactSet(Sets.WanderersTroupe, 2, 3),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 4, 2),
  ]),
]);

export const Diona = new Character("Diona", "Cryo", "Bow", "Shield", Rarity.Legendary, [
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

export const Dori = new Character("Dori", "Electro", "Claymore", "Heal", Rarity.Epic, [
  new CharacterSet("Off-field Support", ["HP", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 5),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 4),
    new CharacterArtifactSet(Sets.Instructor, 4, 3),
    new CharacterArtifactSet(Sets.TheExile, 4, 2),
  ]),
]);

export const Emilie = new Character("Emilie", "Dendro", "Catalyst", "Nothing", Rarity.Legendary, [
  new CharacterSet("Off-field Support", ["ATK", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.UnfinishedReverie, 4, 5),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 4, 4),
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 3),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 2, 2),
    new CharacterArtifactSet(Sets.GoldenTroupe, 2, 2),
    new CharacterArtifactSet(Sets.DeepwoodMemories, 2, 1),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 1),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 1),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 1),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 1),
  ]),
]);

export const Eula = new Character("Eula", "Cryo", "Claymore", "Nothing", Rarity.Legendary, [
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
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 1),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 1),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 1),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 1),
  ]),
]);

export const Faruzan = new Character("Faruzan", "Anemo", "Bow", "Nothing", Rarity.Epic, [
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

export const Fischl = new Character("Fischl", "Electro", "Bow", "Nothing", Rarity.Epic, [
  new CharacterSet("Off-field DPS", ["ATK"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.GoldenTroupe, 4, 5),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 5),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 5),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 5),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 5),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 5),
    new CharacterArtifactSet(Sets.Thundersoother, 4, 4),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 3),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 3),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 3),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 3),
    new CharacterArtifactSet(Sets.TenacityOfTheMillelith, 4, 2),
  ]),
  new CharacterSet("Aggravate DPS", ["ATK"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 5),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 5),
    new CharacterArtifactSet(Sets.WanderersTroupe, 2, 5),
    new CharacterArtifactSet(Sets.ThunderingFury, 2, 4),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 4),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 4),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 4),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 4),
    new CharacterArtifactSet(Sets.GildedDreams, 4, 3),
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 2),
    new CharacterArtifactSet(Sets.Thundersoother, 4, 1),
  ])
]);

export const Freminet = new Character("Freminet", "Cryo", "Claymore", "Nothing", Rarity.Epic, [
  new CharacterSet("On-field DPS", ["ATK"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 5),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 4),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 4),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 4),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 4),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 4),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 2),
  ])
]);

export const Furina = new Character("Furina", "Hydro", "Sword", "Heal", Rarity.Legendary, [
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

export const Gaming = new Character("Gaming", "Pyro", "Claymore", "Self-heal", Rarity.Epic, [
  new CharacterSet("On-field DPS", ["ATK", "HP"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 4, 5),
    new CharacterArtifactSet(Sets.CrimsonWitchOfFlames, 2, 4),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 4),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 4),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 4),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 4),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 4),
    new CharacterArtifactSet(Sets.WanderersTroupe, 2, 4),
    new CharacterArtifactSet(Sets.ThunderingFury, 4, 3),
  ]),
]);

export const Ganyu = new Character("Ganyu", "Cryo", "Bow", "Nothing", Rarity.Legendary, [
  new CharacterSet("Melt DPS", ["HP"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 4, 5),
    new CharacterArtifactSet(Sets.WanderersTroupe, 4, 4),
    new CharacterArtifactSet(Sets.WanderersTroupe, 2, 3),
    new CharacterArtifactSet(Sets.GildedDreams, 2, 3),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 3),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 3),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 3),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 3),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 3),
  ]),
  new CharacterSet("Freeze DPS", ["ATK", "HP"], "Normal/Press", true, [
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 5),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 4),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 4),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 4),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 4),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 4),
  ]),
  new CharacterSet("Off-field DPS", ["HP", "Energy Recharge"], "Burst/Ult", false, [
    new CharacterArtifactSet(Sets.BlizzardStrayer, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 4),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 4, 3),
    new CharacterArtifactSet(Sets.NoblesseOblige, 2, 2),
    new CharacterArtifactSet(Sets.BlizzardStrayer, 2, 2),
    new CharacterArtifactSet(Sets.GladiatorsFinale, 2, 2),
    new CharacterArtifactSet(Sets.ShimenawasReminiscence, 2, 2),
    new CharacterArtifactSet(Sets.VermillionHereafter, 2, 2),
    new CharacterArtifactSet(Sets.EchoesOfAnOffering, 2, 2),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 2),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 1),
  ])
]);

export const Gorou = new Character("Gorou", "Geo", "Bow", "Shield", Rarity.Epic, [
  new CharacterSet("Off-field Support", ["DEF"], "Skill/Ability", false, [
    new CharacterArtifactSet(Sets.TheExile, 4, 5),
    new CharacterArtifactSet(Sets.NoblesseOblige, 4, 4),
    new CharacterArtifactSet(Sets.EmblemOfSeveredFate, 2, 3),
    new CharacterArtifactSet(Sets.TheExile, 2, 3),
    new CharacterArtifactSet(Sets.Scholar, 2, 3),
  ])
]);
