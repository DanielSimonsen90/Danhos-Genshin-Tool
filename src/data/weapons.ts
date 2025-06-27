import Weapon from "@/common/models/weapon";
import { Rarity } from "@/common/types";

export const TheCatch = new Weapon(
  '"The Catch"',
  {
    value: `Increase Elemental Burst DMG by $0 and Elemental Burst CRIT Rate by $1.`,
    refinements: [
      '16/20/24/28/32%',
      '6/7.5/9/10.5/12%',
    ]
  },
  'Polearm',
  Rarity.Epic,
  510,
  'Energy Recharge',
  45.9,
  'Fishing'
);

export const UltimateOverlordsMegaMagicSword = new Weapon(
  `"Ultimate Overlord's Mega Magic Sword"`,
  {
    value: `ATK increased by $0. That's not all! The support from all Melusines you've helped Merusea Village fills you with strength! Based on the number of them you've helped, your ATK is increased by up to an additional $1.`,
    refinements: [
      '12/15/18/21/24%',
      '12/15/18/21/24%',
    ]
  },
  'Claymore',
  Rarity.Epic,
  565,
  'Energy Recharge',
  30.6,
  'Event',
);

export const AThousandBlazingSuns = new Weapon(
  "A Thousand Blazing Suns",
  {
    value: `Gain the "Scorching Brilliance" effect when using an Elemental Skill or Burst: CRIT DMG increased by 40% and ATK increased by 56% for 6s. This effect can trigger once every 10s. While a "Scorching Brilliance" instance if active, its duration is increased by 2s after Normal or Charged attacks deal Elemental DMG. This effect can trigger once every second and the max duration increase is 6s. Additionally, when the equipping character is in the nightsoul's Blessing state, "Scorching Brilliance" effects are increased by 75%, and its duration will not count down when the equipping character is off-field.`,
    refinements: [], // TODO
  },
  'Claymore',
  Rarity.Legendary,
  741,
  'Crit Rate',
  11,
  'Wish',
  cs => cs.Mavuika
);

export const AThousandFloatingDreams = new Weapon(
  "A Thousand Floating Dreams",
  {
    value: `Party members other than the equipping character will provide the equipping character with buffs based on whether their Elemental Type is the same as the latter or not. If their Elemental Types are the same, increase Elemental Mastery by $0. If not, increase the equipping character's DMG Bonus from their Elemental Type by $1. Each of the aforementioned effects can have up to 3 stacks. Additionally, all nearby party members other than the equipping character will have their Elemental MMastery increased by 40. Multiple such effects from multiple such weapons can stack.`,
    refinements: [
      '32/40/48/56/64',
      '10/14/18/22/26%',
    ],
  },
  'Catalyst',
  Rarity.Legendary,
  542,
  'Elemental Mastery',
  265,
  'Wish',
  cs => cs.Nahida,
);

export const Absolution = new Weapon(
  'Absolution',
  {
    value: `CRIT DMG increased by $0. Increasing the value of a Bond of Life increases the DMG the equipping character deals by $1 for 6s. Max 3 stacks.`,
    refinements: [
      '20/25/30/35/40%',
      '16/20/24/28/32%',
    ]
  },
  'Sword',
  Rarity.Legendary,
  674,
  'Crit DMG',
  44.1,
  'Wish',
  cs => cs.Clorinde,
);

export const Akuoumaru = new Weapon(
  'Akuoumaru',
  {
    value: `For every point of the entire party's combined maximum Energy capacity, the Elemental Burst DMG of the equipping character is increased by $0. A maximum of $1 increased Elemental Burst DMG can be achieved this way.`,
    refinements: [
      '0.12/0.15/0.18/0.21/0.24%',
      '40/50/60/70/80%',
    ]
  },
  'Claymore',
  Rarity.Epic,
  510,
  "ATK",
  41.3,
  'Wish',
);

export const AlleyHunter = new Weapon(
  'Alley Hunter',
  {
    value: `Every 4s a character is on the field, their ATK increases by $0 and their CRIT DMG increases by $1. This effect has a maximum of 5 stacks and will not be reset if the character leaves the field, but will be cleared when the character takes DMG.`,
    refinements: [
      '4/5/6/7/8%',
      '4/5/6/7/8%',
    ]
  },
  'Bow',
  Rarity.Epic,
  565,
  'ATK',
  41.3,
  'Wish',
);

export const AmenomaKageuchi = new Weapon(
  'Amenoma Kageuchi',
  {
    value: `After casting an Elemental Skill, gain 1 Succession Seed. The Succession Seed lasts for 30s. Up to 3 Succession Seeds may exist simultaneously. After using an Elemental Burst, all Succession Seeds are consumed and after 2s, the character regenerates $0 Energy for each seed consumed.`,
    refinements: [
      '6' // TODO
    ]
  },
  'Sword',
  Rarity.Epic,
  454,
  'ATK',
  55.1,
  'Crafting',
);

export const AmosBow = new Weapon(
  "Amos' Bow",
  {
    value: `Increases Normal Attack and Aimed Shot DMG by $0. Increases DMG from arrows hsot by a further $1 for every 0.1s that the arrow is in flight, up to 0.5s. Stacks up to 5 times on each arrow.`,
    refinements: [
      '12/15/18/21/24%',
      '8/10/12/14/16%',
    ]
  },
  'Bow',
  Rarity.Legendary,
  608,
  'ATK',
  49.6,
  'Wish',
  cs => cs.Ganyu,
);

export const ApprenticesNotes = new Weapon(
  "Apprentice's Notes",
  {
    value: `Notes left behind by a top student. Many useful spells are listed, and the handwriting is beautiful.`,
    refinements: [],
  },
  'Catalyst',
  Rarity.Common,
  185,
  undefined,
  undefined,
  'Chest'
);

export const AquaSimulacra = new Weapon(
  'Aqua Simulacra',
  {
    value: `HP is increased by $0. When there are opponents nearby, the DMG dealt by the equipping character is increased by 20%. This will take effect whether the character is on-field or not.`,
    refinements: [
      '16/20/24/28/32%',
    ]
  },
  'Bow',
  Rarity.Legendary,
  542,
  'Crit DMG',
  88.2,
  'Wish',
  cs => cs.Yelan,
);

export const AquilaFavonia = new Weapon(
  'Aquila Favonia',
  {
    value: `ATK is increased by $0. Triggers on taking DMG: the soul of the Falcon of the West awakens, holding the banner of the resistance aloft, regenerating HP equal to $1 of ATK and dealing $2 of ATK as DMG to surrounding enemies. this effect can only occur once every 15s.`,
    refinements: [
      '20/25/30/35/40%',
      '100/115/130/145/160%',
      '200/230/260/290/320%',
    ]
  },
  'Sword',
  Rarity.Legendary,
  674,
  'Physical DMG Bonus',
  41.3,
  'Wish',
  cs => cs.Jean,
);

export const AshGravenDrinkingHorn = new Weapon(
  'Ash-Graven Drinking Horn',
  {
    value: `When an attack hits an opponent, deal AoE DMG equal to $0 of Max HP at the target location. This effect can be triggered once every 15s.`,
    refinements: ['80%'] // TODO
  },
  'Catalyst',
  Rarity.Epic,
  510,
  'HP',
  41.3,
  'Event',
);

export const AstralVulturesCrimsonPlumage = new Weapon(
  `Astral Vulture's Crimson Plumage`,
  {
    value: `For 12s after triggering a Swirld reaction, ATK increases by $0. In addition, when 1/2 or more characters in the party are of a different Elemental Type from the equipping character, the DMG dealt by the equipping character is increased by $1 and Elemental Burst DMG is increased by $2.`,
    refinements: [
      '24/30/36/42/48%',
      '(20%/40%)/(25%/60%)/(30%/72%)/(35%/84%)/(40%/96%)',
      '(10%/24%)/(12.5%/30%)/(15%/36%)/(17.5%/42%)/(20%/48%)',
    ]
  },
  'Bow',
  Rarity.Legendary,
  608,
  'Crit DMG',
  66.2,
  'Wish',
  cs => cs.Chasca,
);

export const Azurelight = new Weapon(
  'Azurelight',
  {
    value: `Whithin 12s after an Elemental Skill is used, ATK is increased by 48%. During this time, when the equipping character has 0 Energy, ATK will be further increased by 48%, and CRIT DMG will be increased by 80%.`,
    refinements: [] // TODO
  },
  'Sword',
  Rarity.Legendary,
  674,
  'Crit Rate',
  22.1,
  'Wish',
  // cs => cs.Skirk,
);

export const BalladOfTheBoundlessBlue = new Weapon(
  'Ballad of the Boundless Blue',
  {
    value: `Within 6s after Normal or Charged Attacks hit an opponent, Normal Attack DMG will be increased by $0 and Charged Attack DMG will be increased by $1. Max 3 stacks. This effect can be triggered every 0.3s.`,
    refinements: [
      '8/10/12/14/16%',
      '6/7.5/9/10.5/12%',
    ]
  },
  'Catalyst',
  Rarity.Epic,
  565,
  'Energy Recharge',
  30.6,
  'Event',
);

export const BalladOfTheFjords = new Weapon(
  'Ballad of the Fjords',
  {
    value: `When there are at least 3 different Elemental Types in your party, Elemental Mastery will be increased by $0.`,
    refinements: [
      '120/150/180/210/240',
    ]
  },
  'Polearm',
  Rarity.Epic,
  510,
  'Crit Rate',
  27.6,
  'Battle Pass',
);

export const BeaconOfTheReedSea = new Weapon(
  'Beacon of the Reed Sea',
  {
    value: `After the character's Elemental Skill hits an opponent, their ATK will be increased by $0 for 8s. After the character takes DMG, their ATK will be increased by $1 for 8s. The 2 aforementioned effects can be triggered even when the character is not on the field. Additionally, when not protected by a shield, the character's Max HP will be increased by $2`,
    refinements: [
      '20%/25%/30%/35%/40%',
      '20%/25%/30%/35%/40%',
      '32%/40%/48%/56%/64%.',
    ]
  },
  'Claymore',
  Rarity.Legendary,
  608,
  'Crit Rate',
  33.1,
  'Wish',
  cs => cs.Dehya,
);

export const BeginnersProtector = new Weapon(
  "Beginner's Protector",
  {
    value: `A polearm as straight as a flag pole. Well suited to most combat situations, it has an imposing presence when swung.`,
    refinements: [],
  },
  'Polearm',
  Rarity.Common,
  185,
  undefined,
  undefined,
  'Chest'
);

export const BlackTassel = new Weapon(
  'Black Tassel',
  {
    value: `Increases DMG against slimes by $0.`,
    refinements: [
      '40%/50%/60%/70%/80%.'
    ],
  },
  'Polearm',
  Rarity.Rare,
  354,
  'HP',
  46.9,
  'Wish',
);

export const BlackcliffAgate = new Weapon(
  'Blackcliff Agate',
  {
    value: `After defeating an enemy, ATK is increased by $0 for 30s. This effect has a maximum of 3 stacks, and the duration of each stack is independent of the others.`,
    refinements: [
      '12%/15%/18%/21%/24%',
    ]
  },
  'Catalyst',
  Rarity.Rare,
  510,
  'Crit DMG',
  55.1,
  'Starglitter Exchange'
);

export const BlackcliffLongsword = new Weapon(
  'Blackcliff Longsword',
  {
    value: `After defeating an enemy, ATK is increased by $0 for 30s. This effect has a maximum of 3 stacks, and the duration of each stack is independent of the others.`,
    refinements: [
      '12%/15%/18%/21%/24%',
    ]
  },
  'Sword',
  Rarity.Rare,
  565,
  'Crit DMG',
  36.8,
  'Starglitter Exchange'
);

export const BlackcliffPole = new Weapon(
  'Blackcliff Pole',
  {
    value: `After defeating an enemy, ATK is increased by $0 for 30s. This effect has a maximum of 3 stacks, and the duration of each stack is independent of the others.`,
    refinements: [
      '12%/15%/18%/21%/24%',
    ]
  },
  'Polearm',
  Rarity.Rare,
  510,
  'Crit DMG',
  55.1,
  'Starglitter Exchange'
);

export const BlackcliffSlasher = new Weapon(
  'Blackcliff Slasher',
  {
    value: `After defeating an enemy, ATK is increased by $0 for 30s. This effect has a maximum of 3 stacks, and the duration of each stack is independent of the others.`,
    refinements: [
      '12%/15%/18%/21%/24%',
    ]
  },
  'Claymore',
  Rarity.Rare,
  510,
  'Crit DMG',
  55.1,
  'Starglitter Exchange'
);

export const BlackcliffWarbow = new Weapon(
  'Blackcliff Warbow',
  {
    value: `After defeating an enemy, ATK is increased by $0 for 30s. This effect has a maximum of 3 stacks, and the duration of each stack is independent of the others.`,
    refinements: [
      '12%/15%/18%/21%/24%',
    ]
  },
  'Bow',
  Rarity.Rare,
  565,
  'Crit DMG',
  36.8,
  'Starglitter Exchange'
);

export const BloodtaintedGreatsword = new Weapon(
  'Bloodtainted Greatsword',
  {
    value: `Increases DMG dealt against opponents affected by Pyro or Electro by $0.`,
    refinements: [
      '12%/15%/18%/21%/24%',
    ]
  },
  'Claymore',
  Rarity.Rare,
  354,
  'Elemental Mastery',
  187,
  'Wish',
);

/**
 
https://paimon.moe/weapons
https://genshin.gg/weapons/
https://docs.google.com/document/d/1PZOlgDlOeczabhEdyqYJiQ4qSBwBjM3fx8YY_sL8u9U/edit?tab=t.0

 */