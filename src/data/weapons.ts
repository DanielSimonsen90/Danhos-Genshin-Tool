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

export const CalamityOfEshu = new Weapon(
  'Calamity of Eshu',
  {
    value: `While characters are protected by a Shield, DMG dealt by Normal and Charged Attacks is increased by $0, and Normal and Charged Attack CRIT Rate is increased by $1.`,
    refinements: [
      '20%/25%/30%/35%/40%',
      '8%/10%/12%/14%/16%',
    ],
  },
  'Sword',
  Rarity.Epic,
  565,
  'ATK',
  27.6,
  'Event'
);

export const CalamityQueller = new Weapon(
  'Calamity Queller',
  {
    value: `Gain $0 All Elemental DMG Bonus. Obtain Consummation for 20s after using an Elemental Skill, causing ATK to increase by $1 per second. This ATK increase has a maximum of 6 stacks. When the character equipped with this weapon is not on the field, Consummation's ATK increase is doubled.`,
    refinements: [
      '12%/15%/18%/21%/24%',
      '3.2%/4%/4.8%/5.6%/6.4%',
    ]
  },
  'Polearm',
  Rarity.Legendary,
  741,
  'ATK',
  16.5,
  'Wish',
  cs => cs.Shenhe
);

export const CashflowSupervision = new Weapon(
  'Cashflow Supervision',
  {
    value: `ATK is increased by $0. When current HP increases or decreases, Normal Attack DMG will be increased by $1 and Charged Attack DMG will be increased by $2 for 4s. Max 3 stacks. This effect can be triggered once every 0.3s. When the wielder has 3 stacks, ATK SPD will be increased by $3.`,
    refinements: [
      '16/20/24/28/32%',
      '16/20/24/28/32%',
      '14/17.5/21/24.5/28%',
      '8/10/12/14/16%',
    ]
  },
  'Catalyst',
  Rarity.Legendary,
  674,
  'Crit Rate',
  22.1,
  'Wish',
  cs => cs.Wriothesley
);

export const ChainBreaker = new Weapon(
  'Chain Breaker',
  {
    value: `For every party member from Natlan or who has a different Elemental Type from the equipping character, the equipping character gains $0 increased ATK. When there are no less than 3 of the aforementioned characters, the equipping character gains $1 Elemental Mastery.`,
    refinements: [
      '4.8%/6%/7.2%/8.4%/9.6%',
      '24/30/36/42/48',
    ]
  },
  'Bow',
  Rarity.Epic,
  565,
  'ATK',
  27.6,
  'Crafting'
);

export const CinnabarSpindle = new Weapon(
  'Cinnabar Spindle',
  {
    value: `Elemental Skill DMG is increased by $0 of DEF. The effect will be triggered no more than once every 1.5s and will be cleared 0.1s after the Elemental Skill deals DMG.`,
    refinements: [
      '40%/50%/60%/70%/80%',
    ]
  },
  'Sword',
  Rarity.Epic,
  454,
  'DEF',
  69,
  'Event',
);

export const Cloudforged = new Weapon(
  'Cloudforged',
  {
    value: `After Elemental Energy is decreased, the equipping character's Elemental Mastery will increase by $0 for 18s. Max 2 stacks.`,
    refinements: [
      '40/50/60/70/80',
    ]
  },
  'Bow',
  Rarity.Epic,
  510,
  'Elemental Mastery',
  165,
  'Wish'
);

export const CompoundBow = new Weapon(
  'Compound Bow',
  {
    value: `Normal Attack and Aimed Shot hits increase ATK by $0 and Normal Attack SPD by $1 for 6s. Max 4 stacks. Can only occur once every 0.3s.`,
    refinements: [
      '4/5/6/7/8%',
      '1.2/1.5/1.8/2.1/2.4%',
    ]
  },
  'Bow',
  Rarity.Epic,
  454,
  'Physical DMG Bonus',
  69,
  'Crafting',
);

export const CoolSteel = new Weapon(
  'Cool Steel',
  {
    value: `Normal Attack and Aimed Shot hits increase ATK by $0 and Normal Attack SPD by $1 for 6s. Max 4 stacks. Can only occur once every 0.3s.`,
    refinements: [
      '4/5/6/7/8%',
      '1.2/1.5/1.8/2.1/2.4%',
    ]
  },
  'Sword',
  Rarity.Rare,
  401,
  'ATK',
  35.2,
  'Wish',
);

export const CranesEchoingCall = new Weapon(
  `Crane's Echoing Call`,
  {
    value: `After the equipping character hits an opponent with a Plunging Attack, all nearby party members' Plunging Attacks deal $0 increased DMG for 20s. When nearby party members hit opponents with Plunging Attacks, they will restore $1 Energy to the equipping character. Energy can be restored this way every 0.7s.`,
    refinements: [
      '28%/41%/54%/67%/80%',
      '2.5/2.75/3/3.25/3.5',
    ]
  },
  'Catalyst',
  Rarity.Legendary,
  741,
  'ATK',
  16.5,
  'Wish',
  cs => cs.Xianyun
);

export const CrescentPike = new Weapon(
  'Crescent Pike',
  {
    value: `After picking up an Elemental Orb/Particle, Normal and Charged Attacks deal an additional $0 ATK as DMG for 5s.`,
    refinements: [
      '20/25/30/35/40%',
    ]
  },
  'Polearm',
  Rarity.Epic,
  565,
  'Physical DMG Bonus',
  34.5,
  'Crafting',
);

export const CrimsonMoonsSemblance = new Weapon(
  `Crimson Moon's Semblance`,
  {
    value: `Grants a Bond of Life equal to 25% of Max HP when a Charged Attack hits an opponent. This effect can be triggered up to once every 14s. In addition, when the equipping character has a Bond of Life. they gain a $0 DMG Bonus; if the value of the Bond of Life is greater than or equal to 30% of Max HP, then gain an additional $1 DMG.`,
    refinements: [
      '12/16/20/24/28%',
      '24/32/40/48/56%',
    ]
  },
  'Polearm',
  Rarity.Legendary,
  674,
  'Crit Rate',
  22.1,
  'Wish',
  cs => cs.Arlecchino
);

export const DarkIronSword = new Weapon(
  'Dark Iron Sword',
  {
    value: `Upon causing an Overloaded, Superconduct, Electro-Charged, Quicken, Aggravate, Hyperbloom, or Electro-infused Swirl reaction, ATK is increased by $0 for 12s.`,
    refinements: [
      '20%/25%/30%/35%/40%',
    ]
  },
  'Sword',
  Rarity.Rare,
  401,
  'Elemental Mastery',
  141,
  'NPC: Chen the Sharp',
);

export const Deathmatch = new Weapon(
  'Deathmatch',
  {
    value: `If there are at least 2 opponents nearby, ATK is increased by $0 and DEF is increased by $1. If there are less than 2 enemies nearby, ATK is increased by $2.`,
    refinements: [
      '16/20/24/28/32%',
      '16/20/24/28/32%',
      '24/30/36/42/48%',
    ]
  },
  'Polearm',
  Rarity.Epic,
  454,
  'Crit Rate',
  36.8,
  'Battle Pass'
);

export const DebateClub = new Weapon(
  'Debate Club',
  {
    value: `After using an Elemental Skill, on hit, Normal and Charged Attacks deal additional DMG equal to $0 of ATK in a small AoE. Effect lasts 15s. DMG can only occur once every 3s.`,
    refinements: [
      '60/75/90/105/120%',
    ]
  },
  'Claymore',
  Rarity.Rare,
  401,
  'ATK',
  35.2,
  'Wish',
);

export const DialoguesOfTheDesertSages = new Weapon(
  'Dialogues of the Desert Sages',
  {
    value: `When the wielder performs healing, restore $0 Energy. This effect can be triggered once every 10s and can occur even when the character is not on the field`,
    refinements: [
      '8/10/12/14/16',
    ]
  },
  'Polearm',
  Rarity.Epic,
  510,
  'HP',
  41.3,
  'Event',
);

export const DodocoTales = new Weapon(
  'Dodoco Tales',
  {
    value: `Normal Attack hits on opponents increase Charged Attack DMG by $0 for 6s. Charged Attack hits on opponents increase ATK by $1 for 6s.`,
    refinements: [
      '16/20/24/28/32%',
      '8/10/12/14/16%',
    ]
  },
  'Catalyst',
  Rarity.Epic,
  454,
  'ATK',
  55.1,
  'Event',
);

export const DragonsBane = new Weapon(
  `Dragon's Bane`,
  {
    value: `Increases DMG against enemies affected by Hydro or Pyro by $0.`,
    refinements: [
      '20/24/28/32/36%',
    ]
  },
  'Polearm',
  Rarity.Epic,
  454,
  'Elemental Mastery',
  221,
  'Wish',
);

export const DragonspineSpear = new Weapon(
  'Dragonspine Spear',
  {
    value: `Hitting an opponent with Normal and Charged Attacks has a $0 chance of forming and dropping an Everfrost Icicle above them, dealing $1 AoE ATK DMG. Opponents affected by Cryo are dealt $2 ATK DMG. Can only occur once every 10s.`,
    refinements: [
      '60/70/80/90/100%',
      '80/95/110/125/140%',
      '200/240/280/320/360%'
    ]
  },
  'Polearm',
  Rarity.Epic,
  454,
  'Physical DMG Bonus',
  69,
  'Crafting',
);

export const EarthShaker = new Weapon(
  'Earth Shaker',
  {
    value: `After a party member triggers a Pyro-related reaction, the equipping character's Elemental Skill DMG is increased by $0 for 8s. This effect can be triggered even when the triggering party member is not on the field.`,
    refinements: [
      '16%/20%/24%/28%/32%',
    ]
  },
  'Claymore',
  Rarity.Epic,
  565,
  'ATK',
  27.6,
  'Crafting',
);

export const ElegyForTheEnd = new Weapon(
  'Elegy for the End',
  {
    value: `A part of the "Millennial Movement" that wanders amidst the winds. Increases Elemental Mastery by $0. When the Elemental Skills or Elemental Bursts of the character wielding this weapon hit opponents, that character gains a Sigil of Remembrance. This effect can be triggered once every 0.2s and can be triggered even if said character is not on the field. When you possess 4 Sigils of Remembrance, all of them will be consumed and all nearby party members will obtain the "Millennial Movement: Farewell Song" effect for 12s. "Millennial Movement: Farewell Song" increases Elemental Mastery by $1 and increases ATK by $2. Once this effect is triggered, you will not gain Sigils of Remembrance for 20s. Of the many effects of the "Millennial Movement," buffs of the same type will not stack.`,
    refinements: [
      '60/75/90/105/120',
      '100/125/150/175/200',
      '20/25/30/35/40%',
    ]
  },
  'Bow',
  Rarity.Legendary,
  608,
  'Energy Recharge',
  55.1,
  'Wish',
  cs => cs.Venti
);

export const EmeraldOrb = new Weapon(
  'Emerald Orb',
  {
    value: `Upon causing a Vaporize, Electro-Charged, Frozen, Bloom, or a Hydro-infused Swirl reaction, increases ATK by $0 for 12s.`,
    refinements: [
      '20%/25%/30%/35%/40%',
    ]
  },
  'Catalyst',
  Rarity.Rare,
  448,
  'Elemental Mastery',
  94,
  'Wish'
);

export const EndOfTheLine = new Weapon(
  'End of the Line',
  {
    value: `Triggers the Flowrider effect after using an Elemental Skill, dealing $0 ATK as AoE DMG upon hitting an opponent with an attack. Flowrider will be removed after 15s or after causing 3 instances of AoE DMG. Only 1 instance of AoE DMG can be caused every 2s in this way. Flowrider can be triggered once every 12s.`,
    refinements: [
      '80/100/120/140/160%',
    ]
  },
  'Bow',
  Rarity.Epic,
  510,
  'Energy Recharge',
  45.9,
  'Fishing'
);

export const EngulfingLightning = new Weapon(
  'Engulfing Lightning',
  {
    value: `ATK increased by $0 of Energy Recharge over the base 100%. You can gain a maximum bonus of $1 ATK. Gain $2 Energy Recharge for 12s after using an Elemental Burst.`,
    refinements: [
      '28/34/40/46/52%',
      '80/90/100/110/120%',
      '30/35/40/45/50%'
    ]
  },
  'Polearm',
  Rarity.Legendary,
  608,
  'Energy Recharge',
  55.1,
  'Wish',
  cs => cs.RaidenShogun
);

export const EverlastingMoonglow = new Weapon(
  'Everlasting Moonglow',
  {
    value: `Healing Bonus increased by $0, Normal Attack DMG is increased by $1 of the Max HP of the character equipping this weapon. For 12s after using an Elemental Burst, Normal Attacks that hit opponents will restore 0.6 Energy. Energy can be restored this way once every 0.1s.`,
    refinements: [
      '10/12.5/15/17.5/20%',
      '1/1.5/2/2.5/3%',
    ]
  },
  'Catalyst',
  Rarity.Legendary,
  608,
  'HP',
  49.6,
  'Wish',
  cs => cs.SangonomiyaKokomi
);

export const EyeOfPerception = new Weapon(
  'Eye of Perception',
  {
    value: `Normal and Charged Attacks have a 50% chance to fire a Bolt of Perception, dealing $0 ATK as DMG. This bolt can bounce between enemies a maximum of 4 times. This effect can occur once every $1.`,
    refinements: [
      '240/270/300/330/360%',
      '12/11/10/9/8s'
    ]
  },
  'Catalyst',
  Rarity.Epic,
  454,
  'ATK',
  55.1,
  'Wish',
);

export const FadingTwilight = new Weapon(
  'Fading Twilight',
  {
    value: `Has three states, Evengleam, Afterglow, and Dawnblaze, which increase DMG dealt by $0 respectively. When attacks hit opponents, this weapon will switch to the next state. This weapon can change states once every 7s. The character equipping this weapon can still trigger the state switch while not on the field.`,
    refinements: [
      '(6%/10%/14%)/(7.5%/12.5%/17.5%)/(9%/15%/21%)/(10.5%/17.5%/24.5%)/(12%/20%/28%)',
    ]
  },
  'Bow',
  Rarity.Epic,
  565,
  'Energy Recharge',
  30.6,
  'Wish',
);

export const FangOfTheMountainKing = new Weapon(
  'Fang of the Mountain King',
  {
    value: `Gain 1 stack of Canopy's Favor after hitting an opponent with an Elemental Skill. This can be triggered once every 0.5s. After a nearby party member triggers a Burning or Burgeon reaction, the equipping character will gain 3 stacks. This effect can be triggered once every 2s and can be triggered even when the triggering party member is off-field. Canopy's Favor: Elemental Skill and Burst DMG is increased by 20% for 6s. Max 6 stacks. Each stack is counted independently.`,
    refinements: [
      '10%/12.5%/15%/17.5%/20%',
    ]
  },
  'Claymore',
  Rarity.Legendary,
  741,
  'Crit Rate',
  11,
  'Wish',
  cs => cs.Kinich
);

export const FavoniusCodex = new Weapon(
  'Favonius Codex',
  {
    value: `CRIT hits have a $0 chance to generate 1 Elemental Orb, which will regenerate 6 Energy for the character. Can only occur once every $1.`,
    refinements: [
      '60/70/80/90/100%',
      '12/10.5/9/7.5/6s',
    ]
  },
  'Catalyst',
  Rarity.Epic,
  510,
  'Energy Recharge',
  45.9,
  'Wish',
);

export const FavoniusGreatsword = new Weapon(
  'Favonius Greatsword',
  {
    value: `CRIT hits have a $0 chance to generate 1 Elemental Orb, which will regenerate 6 Energy for the character. Can only occur once every $1.`,
    refinements: [
      '60/70/80/90/100%',
      '12/10.5/9/7.5/6s',
    ]
  },
  'Claymore',
  Rarity.Epic,
  454,
  'Energy Recharge',
  61.3,
  'Wish',
);

export const FavoniusLance = new Weapon(
  'Favonius Lance',
  {
    value: `CRIT hits have a $0 chance to generate 1 Elemental Orb, which will regenerate 6 Energy for the character. Can only occur once every $1.`,
    refinements: [
      '60/70/80/90/100%',
      '12/10.5/9/7.5/6s',
    ]
  },
  'Polearm',
  Rarity.Epic,
  565,
  'Energy Recharge',
  30.6,
  'Wish',
);

export const FavoniusSword = new Weapon(
  'Favonius Sword',
  {
    value: `CRIT hits have a $0 chance to generate 1 Elemental Orb, which will regenerate 6 Energy for the character. Can only occur once every $1.`,
    refinements: [
      '60/70/80/90/100%',
      '12/10.5/9/7.5/6s',
    ]
  },
  'Sword',
  Rarity.Epic,
  545,
  'Energy Recharge',
  61.3,
  'Wish',
);

export const FavoniusWarbow = new Weapon(
  'Favonius Warbow',
  {
    value: `CRIT hits have a $0 chance to generate 1 Elemental Orb, which will regenerate 6 Energy for the character. Can only occur once every $1.`,
    refinements: [
      '60/70/80/90/100%',
      '12/10.5/9/7.5/6s',
    ]
  },
  'Bow',
  Rarity.Epic,
  454,
  'Energy Recharge',
  61.3,
  'Wish',
);

export const FerrousShadow = new Weapon(
  'Ferrous Shadow',
  {
    value: `When HP falls below $0, increases Charged Attack DMG by $1 and Charged Attacks become harder to interrupt.`,
    refinements: [
      '70%/75%/80%/85%/90%',
      '20/25/30/35/40%',
    ]
  },
  'Claymore',
  Rarity.Rare,
  401,
  'HP',
  35.2,
  'Wish',
);

export const FesteringDesire = new Weapon(
  'Festering Desire',
  {
    value: `Increases Elemental Skill DMG by $0 and Elemental Skill CRIT Rate by $1.`,
    refinements: [
      '16/20/24/28/32%',
      '6/7.5/9/10.5/12%',
    ]
  },
  'Sword',
  Rarity.Epic,
  510,
  'Elemental Mastery',
  45.9,
  'Event',
);

export const FilletBlade = new Weapon(
  'Fillet Blade',
  {
    value: `On hit, has a 50% chance to deal $0 ATK DMG to a single opponent. Can only occur once every $1.`,
    refinements: [
      '240%/280%/320%/360%/400%',
      '15/14/13/12/11s',
    ]
  },
  'Sword',
  Rarity.Rare,
  401,
  'ATK',
  35.2,
  'Chest',
);

export const FinaleOfTheDeep = new Weapon(
  'Finale of the Deep',
  {
    value: `When using an Elemental Skill, ATK will be increased by $0 for 15s, and a Bond of Life worth 25% of Max HP will be granted. This effect can be triggered once every 10s. When the Bond of Life is cleared, a maximum of $1 ATK will be gained based on $2 Of the total amount of the Life Bond cleared, lasting for 15s.`,
    refinements: [
      '12/15/18/21/24%',
      '150/187.5/225/262.5/300',
      '2.4/3/3.6/4.2/4.8%',
    ]
  },
  'Sword',
  Rarity.Epic,
  656,
  'ATK',
  27.6,
  'Crafting',
);

export const FleuveCendreFerryman = new Weapon(
  'Fleuve Cendre Ferryman',
  {
    value: `Increases Elemental Skill CRIT Rate by $0. Additionally, increases Energy Recharge by $1 for 5s after using an Elemental Skill.`,
    refinements: [
      '8/10/12/14/16%',
      '16/20/24/28/32%',
    ]
  },
  'Sword',
  Rarity.Epic,
  510,
  'Energy Recharge',
  45.9,
  'Fishing',
);

export const FlowerWreathedFeathers = new Weapon(
  'Flower-Wreathed Feathers',
  {
    value: `Decreases Gliding Stamina consumption by 15%. When using Aimed Shots, the DMG dealt by Charged Attacks increases by $0 every 0.5s. This effect can stack up to 6 times and will be removed 10s after leaving Aiming Mode.`,
    refinements: [
      '6%/7.5%/9%/10.5%/12%',
    ]
  },
  'Bow',
  Rarity.Epic,
  510,
  'ATK',
  41.3,
  'Wish',
);

export const FlowingPurity = new Weapon(
  'Flowing Purity',
  {
    value: `When using an Elemental Skill, All Elemental DMG Bonus will be increased by $0 for 15s, and a Bond of Life worth 24% of Max HP will be granted. This effect can be triggered once every 10s. When the Bond Of Life is cleared, every 1,000 HP cleared in the process will provide $1 All Elemental DMG Bonus, up to a maximum of $2. This effect lasts 15s.`,
    refinements: [
      '8/10/12/14/16%',
      '2/2.5/3/3.5/4%',
      '12/15/18/21/24%',
    ]
  },
  'Catalyst',
  Rarity.Epic,
  565,
  'ATK',
  27.6,
  'Crafting',
);

export const FluteOfEzpitzal = new Weapon(
  'Flute of Ezpitzal',
  {
    value: `Using an Elemental Skill increases DEF by $0 for 15s.`,
    refinements: [
      '16%/20%/24%/28%/32%',
    ]
  },
  'Sword',
  Rarity.Epic,
  454,
  'DEF',
  69,
  'Crafting',
);

export const FootprintOfTheRainbow = new Weapon(
  'Footprint of the Rainbow',
  {
    value: `Using an Elemental Skill increases DEF by $0 for 15s.`,
    refinements: [
      '16%/20%/24%/28%/32%',
    ]
  },
  'Polearm',
  Rarity.Epic,
  510,
  'DEF',
  51.7,
  'Crafting',
);

export const ForestRegalia = new Weapon(
  'Forest Regalia',
  {
    value: `After triggering Burning, Quicken, Aggravate, Spread, Bloom, Hyperbloom, or Burgeon, a Leaf of Consciousness will be created around the character for a maximum of 10s. When picked up, the Leaf will grant the character $0 Elemental Mastery for 12s. Only 1 Leaf can be generated this way every 20s. This effect can still be triggered if the character is not on the field. The Leaf of Consciousness' effect cannot stack.`,
    refinements: [
      '60/75/90/105/120',
    ]
  },
  'Claymore',
  Rarity.Epic,
  510,
  'Energy Recharge',
  30.6,
  'Crafting',
);

export const FreedomSworn = new Weapon(
  'Freedom-Sworn',
  {
    value: `A part of the "Millennial Movement" that wanders amidst the winds. Increases DMG by $0. When the character wielding this weapon triggers Elemental Reactions, they gain a Sigil of Rebellion. This effect can be triggered once every 0.5s and can be triggered even if said character is not on the field. When you possess 2 Sigils of Rebellion, all of them will be consumed and all nearby party members will obtain "Millennial Movement: Song of Resistance" for 12s. "Millennial Movement: Song of Resistance" increases Normal, Charged, and Plunging Attack DMG by $1 and increases ATK by $2. Once this effect is triggered, you will not gain Sigils of Rebellion for 20s. Of the many effects of the "Millennial Movement," buffs of the same type will not stack.`,
    refinements: [
      '10/12.5/15/17.5/20%',
      '16/20/24/28/32%',
      '20/25/30/35/40%',
    ]
  },
  'Sword',
  Rarity.Legendary,
  608,
  'Elemental Mastery',
  198,
  'Wish',
  cs => cs.KaedeharaKazuha,
);

export const Frostbearer = new Weapon(
  'Frostbearer',
  {
    value: `Hitting an opponent with Normal and Charged Attacks has a 60/70/80/90/100% chance of forming and dropping an Everfrost Icicle above them, dealing 80/95/110/125/140% AoE ATK DMG. Opponents affected by Cryo are dealt 200/240/280/320/360% ATK DMG. Can only occur once every 10s.`,
    refinements: [
      '60/70/80/90/100%',
      '80/95/110/125/140%',
      '200/240/280/320/360%'
    ]
  },
  'Catalyst',
  Rarity.Epic,
  510,
  'ATK',
  41.3,
  'Crafting',
);

export const FruitOfFulfillment = new Weapon(
  'Fruit of Fulfillment',
  {
    value: `Obtain the "Wax and Wane" effect after an Elemental Reaction is triggered, gaining $0 Elemental Mastery while losing 5% ATK. For every 0.3s, 1 stack of Wax and Wane can be gained. Max 5 stacks. For every 6s that go by without an Elemental Reaction being triggered, 1 stack will be lost. This effect can be triggered even when the character is off-field.`,
    refinements: [
      '24/27/30/33/36',
    ]
  },
  'Catalyst',
  Rarity.Epic,
  510,
  'Energy Recharge',
  45.9,
  'Crafting',
);

export const FruitfulHook = new Weapon(
  'Fruitful Hook',
  {
    value: `Increase Plunging Attack CRIT Rate by $0; After a Plunging Attack hits an opponent, Normal, Charged, and Plunging Attack DMG increased by $1 for 10s.`,
    refinements: [
      '16%/20%/24%/28%/32%',
      '16%/20%/24%/28%/32%',
    ]
  },
  'Claymore',
  Rarity.Epic,
  565,
  'ATK',
  27.6,
  'Wish',
);

/**
 
https://paimon.moe/weapons
https://genshin.gg/weapons/
https://docs.google.com/document/d/1PZOlgDlOeczabhEdyqYJiQ4qSBwBjM3fx8YY_sL8u9U/edit?tab=t.0

 */