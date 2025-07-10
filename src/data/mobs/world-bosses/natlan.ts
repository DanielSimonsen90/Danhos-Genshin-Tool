import { WorldBoss } from "@/common/models/mobs/Boss";
import { Adventurer, Berserker, GladiatorsFinale, Instructor, LuckyDog, PrayersOfDestiny, PrayersOfIllumination, PrayersOfSpringtime, TheExile, WanderersTroupe } from "@/data/artifact-sets";
import { ElementalCrystals } from "@/data/materials/drops/crystals";
import { EnsnaringGaze, MarkOfTheBindingBlessing, OverripeFlamegranate, SecretSourceAirflowAccumulator, SparklessStatueCore, TalismanOftheEnigmaticLand } from "@/data/materials/drops/natlan";

export const GluttonousYumkasaurMountainKing = new WorldBoss(
  "Gluttonous Yumkasaur Mountain King",
  `A mighty Yumkasaurus that has survived since ancient times and seen countless battles. It owes its huge size to its rampant gluttony.`,
  'Natlan',
  [
    OverripeFlamegranate,
    ...ElementalCrystals.Dendro.getCraftingTreeAsMaterials(),
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    Adventurer,
  ]
);

export const GoldflameQucusaurTyrant = new WorldBoss(
  "Goldflame Qucusaur Tyrant",
  `A mutated Qucusaurus that has taken on special powers of great magnitude. It stands tall in battle with its majestic panoply of golden flames.`,
  'Natlan',
  [
    MarkOfTheBindingBlessing,
    ...ElementalCrystals.Pyro.getCraftingTreeAsMaterials(),
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    PrayersOfIllumination,
    Adventurer,
  ]
);

export const TenebrousPapilla = new WorldBoss(
  "Tenebrous Papilla",
  `Abyssal monsters that grow like parasitic plants.\nAgents of continuous corrosion, these distorters are capable of extracting memories from deeper layers of the earth, and through the power of the Abyss, reconstructing memories of greater potency. If left unchecked to pursue their corrosion of Teyvat, they may even find a sordid way to twist and trace over the most ancient memories of all.`,
  'Natlan',
  [
    EnsnaringGaze,
    ...ElementalCrystals.Pyro.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Electro.getCraftingTreeAsMaterials(),
    ...ElementalCrystals.Anemo.getCraftingTreeAsMaterials(),
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    PrayersOfIllumination,
    Adventurer,
  ]
);

export const WaywardHermeticSpiritspeaker = new WorldBoss(
  "Wayward Hermetic Spiritspeaker",
  `A priestess of the Masters of the Night-Wind who lives in solitude, away from her tribe. Her Spiritspeaking powers overshadow those of ordinary priests and shamans.`,
  'Natlan',
  [
    TalismanOftheEnigmaticLand,
    ...ElementalCrystals.Cryo.getCraftingTreeAsMaterials(),
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    TheExile,
    PrayersOfSpringtime,
    LuckyDog
  ]
);

export const LavaDragonStatue = new WorldBoss(
  "Lava Dragon Statue",
  `A monster that can continuously generate heat to sustain its activities.\nA failed attempt to birth wisdom from pure energy that bears the outline of a great, race yet possesses no more consciousness than a stone.`,
  'Natlan',
  [
    SparklessStatueCore,
    ...ElementalCrystals.Pyro.getCraftingTreeAsMaterials(),
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    Instructor,
    PrayersOfIllumination,
    Adventurer
  ]
);

export const SecretSourceAutomationsOverseerDevice = new WorldBoss(
  "Secret Source Automatons: Overseer Device",
  `A domination mechanism from the ancient ruins.\nIn the distant past, a once-mighty ancient race used this mechanism to oversee the operation of their cities. Even now, long after the fall of their civilization, it still retains immense authority.`,
  'Natlan',
  [
    SecretSourceAirflowAccumulator,
    ...ElementalCrystals.Hydro.getCraftingTreeAsMaterials(),
    GladiatorsFinale,
    WanderersTroupe,
    Berserker,
    TheExile,
    PrayersOfDestiny,
    Adventurer
  ]
);