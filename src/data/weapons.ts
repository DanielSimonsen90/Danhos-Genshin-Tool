import Weapon from "@/common/models/weapon";
import { Rarity } from "@/common/types";
import * as WeaponAscensionMaterials from './materials/weapon-materials';
import * as Drops from './materials/drops';

const MODIFIERS = {
  FIELD: 5,
  TALENT: 10,
  STAT: 20,
  CAN_TRIGGER_ELEMENT: 30,
  BONUS_ABILITY: 40
} as const;

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
  [
    WeaponAscensionMaterials.MaskOfTheX,
    Drops.RuinSentinelChaos,
    Drops.Spectral
  ],
  'Fishing',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Burst/Ult')) score += MODIFIERS.TALENT;

    return score;
  }
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
  [
    WeaponAscensionMaterials.GobletOfThePristineSea,
    Drops.Operatives,
    Drops.Gear
  ],
  'Event',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT * 2; // Atk buff + "additional" atk buff

    return score;
  }
);

// #region A
export const AthameArtis = new Weapon(
  "Athame Artis",
  {
    value: `CRIT DMG from Elemental Bursts is increased by $0. When an Elemental Burst hits an opponent, gain the Blade of the Daylight Hours effect: ATK is increased by $1. Nearby active party members other than the equipping character have their ATK increased by $2 for 3s.\nAdditionally, when the party possesses Hexerei: Secret Rite effects, the effects of Blade of the Daylight Hours are increased by an additional 75%. This effect can be triggered even if the equipping character is off-field.`,
    refinements: [
      '16/20/24/28/32%',
      '20/25/30/35/40%',
      '16/20/24/28/32%',
    ]
  },
  'Sword',
  Rarity.Legendary,
  608,
  'Crit Rate',
  33.1,
  [
    WeaponAscensionMaterials.XOfDecarabiansX,
    Drops.FrostnightsX,
    Drops.DriveShaft
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (playstyle.prioritizesTalents('Burst/Ult')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT * 2; // Self ATK buff + party ATK buff
    if (character.can('Hexerei Able')) score += MODIFIERS.BONUS_ABILITY;
    if (!playstyle.onField) score += MODIFIERS.FIELD;
    return score;
  },
  cs => cs.Durin
);

export const AThousandBlazingSuns = new Weapon(
  "A Thousand Blazing Suns",
  {
    value: `Gain the "Scorching Brilliance" effect when using an Elemental Skill or Burst: CRIT DMG increased by $0 and ATK increased by $1 for 6s. This effect can trigger once every 10s. While a "Scorching Brilliance" instance is active, its duration is increased by 2s after Normal or Charged attacks deal Elemental DMG. This effect can trigger once every second, and the max duration increase is 6s. Additionally, when the equipping character is in the Nightsoul's Blessing state, "Scorching Brilliance" effects are increased by 75%, and its duration will not count down when the equipping character is off-field.`,
    refinements: [
      '20/25/30/35/40%',
      '28/35/42/49/56%',
    ],
  },
  'Claymore',
  Rarity.Legendary,
  741,
  'Crit Rate',
  11,
  [
    WeaponAscensionMaterials.BlazingSacrificialHearts,
    Drops.SecretSource,
    Drops.Fang,
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (playstyle.prioritizesTalents('Skill/Ability', 'Burst/Ult')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (character.can('Nightsouls Blessing')) score += MODIFIERS.BONUS_ABILITY;

    return score;
  },
  cs => cs.Mavuika
);

export const AThousandFloatingDreams = new Weapon(
  "A Thousand Floating Dreams",
  {
    value: `Party members other than the equipping character will provide the equipping character with buffs based on whether their Elemental Type is the same as the latter or not. If their Elemental Types are the same, increase Elemental Mastery by $0. If not, increase the equipping character's DMG Bonus from their Elemental Type by $1. Each of the aforementioned effects can have up to 3 stacks. Additionally, all nearby party members other than the equipping character will have their Elemental Mastery increased by 40. Multiple such effects from multiple such weapons can stack.`,
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
  [
    WeaponAscensionMaterials.OasisGardens,
    Drops.PrimalConstructPrism,
    Drops.FungalSpores
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
    if (character.can('Off-field Damage') || playstyle.onField) score += MODIFIERS.BONUS_ABILITY;

    return score;
  },
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
  [
    WeaponAscensionMaterials.AncientChord,
    Drops.Operatives,
    Drops.Gear,
  ],
  'Wish',
  ({ score, character }) => {
    if (character.can('Bond of Life')) score += MODIFIERS.BONUS_ABILITY;

    return score;
  },
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
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.RuinGuardChaos,
    Drops.Slime,
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Burst/Ult')) score += MODIFIERS.TALENT;

    return score;
  },
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
  [
    WeaponAscensionMaterials.XBranchOfAXSea,
    Drops.ConcealedClaw,
    Drops.Handguard
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.onField) score += MODIFIERS.FIELD;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  }
);

export const AmenomaKageuchi = new Weapon(
  'Amenoma Kageuchi',
  {
    value: `After casting an Elemental Skill, gain 1 Succession Seed. The Succession Seed lasts for 30s. Up to 3 Succession Seeds may exist simultaneously. After using an Elemental Burst, all Succession Seeds are consumed and after 2s, the character regenerates $0 Energy for each seed consumed.`,
    refinements: [
      '6/7.5/9/10.5/12'
    ]
  },
  'Sword',
  Rarity.Epic,
  454,
  'ATK',
  55.1,
  [
    WeaponAscensionMaterials.XBranchOfAXSea,
    Drops.RuinSentinelChaos,
    Drops.Handguard
  ],
  'Crafting',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;

    return score;
  },
);

export const AmosBow = new Weapon(
  "Amos' Bow",
  {
    value: `Increases Normal Attack and Aimed Shot DMG by $0. Increases DMG from arrows shot by a further $1 for every 0.1s that the arrow is in flight, up to 0.5s. Stacks up to 5 times on each arrow.`,
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
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.RuinGuardChaos,
    Drops.Slime
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Charged/Hold')) score += MODIFIERS.TALENT;

    return score;
  },
  cs => cs.Ganyu,
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
  [
    WeaponAscensionMaterials.XFromGuyun,
    Drops.Statuette,
    Drops.Spectral,
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;

    return score;
  },
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
  [
    WeaponAscensionMaterials.XOfDecarabiansX,
    Drops.Horn,
    Drops.Arrowhead
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  },
  cs => cs.Jean,
);

export const AshGravenDrinkingHorn = new Weapon(
  'Ash-Graven Drinking Horn',
  {
    value: `When an attack hits an opponent, deal AoE DMG equal to $0 of Max HP at the target location. This effect can be triggered once every 15s.`,
    refinements: [
      '40/50/60/70/80%'
    ]
  },
  'Catalyst',
  Rarity.Epic,
  510,
  'HP',
  41.3,
  [
    WeaponAscensionMaterials.NightWindsMysticX,
    Drops.SecretSource,
    Drops.Fang,
  ],
  'Event',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;
    if (!playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  }
);

export const AstralVulturesCrimsonPlumage = new Weapon(
  `Astral Vulture's Crimson Plumage`,
  {
    value: `For 12s after triggering a Swirl reaction, ATK increases by $0. In addition, when 1/2 or more characters in the party are of a different Elemental Type from the equipping character, the DMG dealt by the equipping character is increased by $1 and Elemental Burst DMG is increased by $2.`,
    refinements: [
      '24/30/36/42/48%',
      '(20/40%)/(25/60%)/(30/72%)/(35/84%)/(40/96%)',
      '(10/24%)/(12.5/30%)/(15/36%)/(17.5/42%)/(20/48%)',
    ]
  },
  'Bow',
  Rarity.Legendary,
  608,
  'Crit DMG',
  66.2,
  [
    WeaponAscensionMaterials.NightWindsMysticX,
    Drops.AbyssalLeaf,
    Drops.Whistle,
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (character.canTrigger('playstyle-based', 'Swirl')) {
      score += MODIFIERS.CAN_TRIGGER_ELEMENT;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    }

    return score;
  },
  cs => cs.Chasca,
);

export const Azurelight = new Weapon(
  'Azurelight',
  {
    value: `Within 12s after an Elemental Skill is used, ATK is increased by $0. During this time, when the equipping character has 0 Energy, ATK will be further increased by $0, and CRIT DMG will be increased by $2.`,
    refinements: [
      '24/30/36/42/48%',
      '24/30/36/42/48%',
      '40/50/60/70/80%',
    ]
  },
  'Sword',
  Rarity.Legendary,
  674,
  'Crit Rate',
  22.1,
  [
    WeaponAscensionMaterials.NightWindsMysticX,
    Drops.AbyssalLeaf,
    Drops.Whistle,
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  },
  cs => cs.Skirk,
);
// #endregion

// #region B
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
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.BoneShard,
    Drops.TreasureHoarderInsignia
  ],
  'Event',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  }
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
  [
    WeaponAscensionMaterials.GobletOfThePristineSea,
    Drops.HilichurlFlower,
    Drops.Nectar,
  ],
  'Battle Pass',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;

    return score;
  }
);

export const BeaconOfTheReedSea = new Weapon(
  'Beacon of the Reed Sea',
  {
    value: `After the character's Elemental Skill hits an opponent, their ATK will be increased by $0 for 8s. After the character takes DMG, their ATK will be increased by $1 for 8s. The 2 aforementioned effects can be triggered even when the character is not on the field. Additionally, when not protected by a shield, the character's Max HP will be increased by $2`,
    refinements: [
      '20/25/30/35/40%',
      '20/25/30/35/40%',
      '32/40/48/56/64%.',
    ]
  },
  'Claymore',
  Rarity.Legendary,
  608,
  'Crit Rate',
  33.1,
  [
    WeaponAscensionMaterials.ScorchingMight,
    Drops.Shell,
    Drops.EremiteDrop,
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) {
      score += MODIFIERS.TALENT;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    }

    if (!playstyle.onField) score += MODIFIERS.FIELD;
    if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;

    return score;
  },
  cs => cs.Dehya,
);

export const BlackTassel = new Weapon(
  'Black Tassel',
  {
    value: `Increases DMG against slimes by $0.`,
    refinements: [
      '40/50/60/70/80%.'
    ],
  },
  'Polearm',
  Rarity.Rare,
  354,
  'HP',
  46.9,
  [
    WeaponAscensionMaterials.XOfAerosiderite,
    Drops.BoneShard,
    Drops.Arrowhead,
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('HP')) score += MODIFIERS.STAT * 2  ; // Only because of how much HP it gives
    
    return score;
  });

export const BlackcliffAgate = new Weapon(
  'Blackcliff Agate',
  {
    value: `After defeating an enemy, ATK is increased by $0 for 30s. This effect has a maximum of 3 stacks, and the duration of each stack is independent of the others.`,
    refinements: [
      '12/15/18/21/24%',
    ]
  },
  'Catalyst',
  Rarity.Rare,
  510,
  'Crit DMG',
  55.1,
  [
    WeaponAscensionMaterials.XFromGuyun,
    Drops.SacrificialKnife,
    Drops.Scroll,
  ],
  'Starglitter Exchange',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  }
);

export const BlackcliffLongsword = new Weapon(
  'Blackcliff Longsword',
  {
    value: `After defeating an enemy, ATK is increased by $0 for 30s. This effect has a maximum of 3 stacks, and the duration of each stack is independent of the others.`,
    refinements: [
      '12/15/18/21/24%',
    ]
  },
  'Sword',
  Rarity.Rare,
  565,
  'Crit DMG',
  36.8,
  [
    WeaponAscensionMaterials.XFromGuyun,
    Drops.SacrificialKnife,
    Drops.Arrowhead,
  ],
  'Starglitter Exchange',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  }
);

export const BlackcliffPole = new Weapon(
  'Blackcliff Pole',
  {
    value: `After defeating an enemy, ATK is increased by $0 for 30s. This effect has a maximum of 3 stacks, and the duration of each stack is independent of the others.`,
    refinements: [
      '12/15/18/21/24%',
    ]
  },
  'Polearm',
  Rarity.Rare,
  510,
  'Crit DMG',
  55.1,
  [
    WeaponAscensionMaterials.MistXElixir,
    Drops.MistGrass,
    Drops.FatuiInsignia
  ],
  'Starglitter Exchange',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  }
);

export const BlackcliffSlasher = new Weapon(
  'Blackcliff Slasher',
  {
    value: `After defeating an enemy, ATK is increased by $0 for 30s. This effect has a maximum of 3 stacks, and the duration of each stack is independent of the others.`,
    refinements: [
      '12/15/18/21/24%',
    ]
  },
  'Claymore',
  Rarity.Rare,
  510,
  'Crit DMG',
  55.1,
  [
    WeaponAscensionMaterials.MistXElixir,
    Drops.MistGrass,
    Drops.FatuiInsignia
  ],
  'Starglitter Exchange',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  }
);

export const BlackcliffWarbow = new Weapon(
  'Blackcliff Warbow',
  {
    value: `After defeating an enemy, ATK is increased by $0 for 30s. This effect has a maximum of 3 stacks, and the duration of each stack is independent of the others.`,
    refinements: [
      '12/15/18/21/24%',
    ]
  },
  'Bow',
  Rarity.Rare,
  565,
  'Crit DMG',
  36.8,
  [
    WeaponAscensionMaterials.XFromGuyun,
    Drops.SacrificialKnife,
    Drops.Nectar
  ],
  'Starglitter Exchange',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  }
);

export const BlackmarrowLantern = new Weapon(
  'Blackmarrow Lantern',
  {
    value: `Bloom DMG is increased by $0, and Lunar-Bloom DMG is increased by $1. Moonsign: Ascendant Gleam: Lunar-Bloom DMG is increased by an additional $2.`,
    refinements: [
      '48/60/72/84/96%',
      '12/15/18/21/24%',
      '12/15/18/21/24%',
    ]
  },
  'Catalyst',
  Rarity.Epic,
  454,
  'Elemental Mastery',
  221,
  [
    WeaponAscensionMaterials.ArtfulDeviceX,
    Drops.FrostnightsX,
    Drops.Warrant
  ],
  'Crafting',
  ({ score, character }) => {
    if (character.canTrigger('playstyle-based', 'Bloom')) score += MODIFIERS.CAN_TRIGGER_ELEMENT;
    if (character.canTrigger('playstyle-based', 'Lunar-Bloom')) score += MODIFIERS.CAN_TRIGGER_ELEMENT;
    if (character.can('Increases Moonsign')) {
      score += MODIFIERS.BONUS_ABILITY;

      if (character.canTrigger('playstyle-based', 'Lunar-Bloom')) score += MODIFIERS.CAN_TRIGGER_ELEMENT;
    }

    return score;
  }
);

export const BloodsoakedRuins = new Weapon(
  'Bloodsoaked Ruins',
  {
    value: `For 3.5s after using an Elemental Burst, the equipping character's Lunar-Charged DMG dealt to opponents is increased by $0. Additionally, after triggering a Lunar-Charged reaction, the equipping character will gain Requiem of Ruin: CRIT DMG is increased by $1 for 6s. They will also regain $2 Elemental Energy. Elemental Energy can be restored this way once every 14s.`,
    refinements: [
      '36/48/60/72/84%',
      '28/35/42/49/56%',
      '12/13/14/15/16',
    ]
  },
  'Polearm',
  Rarity.Legendary,
  674,
  'Crit Rate',
  22.1,
  [
    WeaponAscensionMaterials.XOfLongNightFlint,
    Drops.Mistshroud,
    Drops.Warrant
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (
      playstyle.prioritizesTalents('Burst/Ult')
      && character.canTrigger('playstyle-based', 'Lunar-Charged')
    ) {
      score += MODIFIERS.TALENT + MODIFIERS.CAN_TRIGGER_ELEMENT;
    }

    return score;
  },
  cs => cs.Flins
);

export const BloodtaintedGreatsword = new Weapon(
  'Bloodtainted Greatsword',
  {
    value: `Increases DMG dealt against opponents affected by Pyro or Electro by $0.`,
    refinements: [
      '12/15/18/21/24%',
    ]
  },
  'Claymore',
  Rarity.Rare,
  354,
  'Elemental Mastery',
  187,
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.LeyLineBranch,
    Drops.Arrowhead
  ],
  'Wish',
  ({ score }) => score
);
// #endregion

// #region C
export const CalamityOfEshu = new Weapon(
  'Calamity of Eshu',
  {
    value: `While characters are protected by a Shield, DMG dealt by Normal and Charged Attacks is increased by $0, and Normal and Charged Attack CRIT Rate is increased by $1.`,
    refinements: [
      '20/25/30/35/40%',
      '8/10/12/14/16%',
    ],
  },
  'Sword',
  Rarity.Epic,
  565,
  'ATK',
  27.6,
  [
    WeaponAscensionMaterials.DeliriousXOfTheSacredLord,
    Drops.AbyssalLeaf,
    Drops.Whistle,
  ],
  'Event',
  ({ playstyle, score }) => {
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  }
);

export const CalamityQueller = new Weapon(
  'Calamity Queller',
  {
    value: `Gain $0 All Elemental DMG Bonus. Obtain Consummation for 20s after using an Elemental Skill, causing ATK to increase by $1 per second. This ATK increase has a maximum of 6 stacks. When the character equipped with this weapon is not on the field, Consummation's ATK increase is doubled.`,
    refinements: [
      '12/15/18/21/24%',
      '3.2/4/4.8/5.6/6.4%',
    ]
  },
  'Polearm',
  Rarity.Legendary,
  741,
  'ATK',
  16.5,
  [
    WeaponAscensionMaterials.MistXElixir,
    Drops.MistGrass,
    Drops.Nectar
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (!playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
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
  [
    WeaponAscensionMaterials.GobletOfThePristineSea,
    Drops.Operatives,
    Drops.FontemerAberrantPearl
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;

    return score;
  },
  cs => cs.Wriothesley
);

export const ChainBreaker = new Weapon(
  'Chain Breaker',
  {
    value: `For every party member from Natlan or who has a different Elemental Type from the equipping character, the equipping character gains $0 increased ATK. When there are no less than 3 of the aforementioned characters, the equipping character gains $1 Elemental Mastery.`,
    refinements: [
      '4.8/6/7.2/8.4/9.6%',
      '24/30/36/42/48',
    ]
  },
  'Bow',
  Rarity.Epic,
  565,
  'ATK',
  27.6,
  [
    WeaponAscensionMaterials.NightWindsMysticX,
    Drops.Fin,
    Drops.Fang,
  ],
  'Crafting',
  ({ playstyle, score, character }) => {
    if (character.region === 'Natlan') {
      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
      if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
    }

    return score;
  }
);

export const CinnabarSpindle = new Weapon(
  'Cinnabar Spindle',
  {
    value: `Elemental Skill DMG is increased by $0 of DEF. The effect will be triggered no more than once every 1.5s and will be cleared 0.1s after the Elemental Skill deals DMG.`,
    refinements: [
      '40/50/60/70/80%',
    ]
  },
  'Sword',
  Rarity.Epic,
  454,
  'DEF',
  69,
  [
    WeaponAscensionMaterials.XOfDecarabiansX,
    Drops.RuinGuardChaos,
    Drops.Mask
  ],
  'Event',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')
      && playstyle.needsStat('DEF')
    ) {
      score += MODIFIERS.TALENT + MODIFIERS.STAT;
    }

    return score;
  },
  cs => cs.Albedo
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
  [
    WeaponAscensionMaterials.XOfAerosiderite,
    Drops.Hilt,
    Drops.FatuiInsignia
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;

    return score;
  },
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
  [
    WeaponAscensionMaterials.XOfAerosiderite,
    Drops.BoneShard,
    Drops.FatuiInsignia
  ],
  'Crafting',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  }
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
  [
    WeaponAscensionMaterials.XOfDecarabiansX,
    Drops.Horn,
    Drops.Arrowhead
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  }
);

export const CranesEchoingCall = new Weapon(
  `Crane's Echoing Call`,
  {
    value: `After the equipping character hits an opponent with a Plunging Attack, all nearby party members' Plunging Attacks deal $0 increased DMG for 20s. When nearby party members hit opponents with Plunging Attacks, they will restore $1 Energy to the equipping character. Energy can be restored this way every 0.7s.`,
    refinements: [
      '28/41/54/67/80%',
      '2.5/2.75/3/3.25/3.5',
    ]
  },
  'Catalyst',
  Rarity.Legendary,
  741,
  'ATK',
  16.5,
  [
    WeaponAscensionMaterials.MistXElixir,
    Drops.Fin,
    Drops.Scroll
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Plunging/Press')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;

    return score;
  },
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
  [
    WeaponAscensionMaterials.XFromGuyun,
    Drops.SacrificialKnife,
    Drops.TreasureHoarderInsignia
  ],
  'Crafting',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')
      && playstyle.needsStat('ATK')
    ) {
      score += MODIFIERS.TALENT + MODIFIERS.STAT;
    }

    return score;
  }
);

export const CrimsonMoonsSemblance = new Weapon(
  `Crimson Moon's Semblance`,
  {
    value: `Grants a Bond of Life equal to 25% of Max HP when a Charged Attack hits an opponent. This effect can be triggered up to once every 14s. In addition, when the equipping character has a Bond of Life, they gain a $0 DMG Bonus; if the value of the Bond of Life is greater than or equal to 30% of Max HP, then gain an additional $1 DMG.`,
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
  [
    WeaponAscensionMaterials.GobletOfThePristineSea,
    Drops.Hilt,
    Drops.Gear,
  ],
  'Wish',
  ({ score, character }) => {
    if (character.can('Bond of Life')) score += MODIFIERS.BONUS_ABILITY;

    return score;
  },
  cs => cs.Arlecchino
);
// #endregion

// #region D
export const DawningFrost = new Weapon(
  'Dawning Frost',
  {
    value: `For 10s after a Charged Attack hits an opponent, Elemental Mastery is increased by $0. For 10s after an Elemental Skill hits an opponent, Elemental Mastery is increased by $1.`,
    refinements: [
      '72/90/108/126/144',
      '48/60/72/84/96',
    ]
  },
  'Catalyst',
  Rarity.Epic,
  510,
  'Crit DMG',
  55.1,
  [
    WeaponAscensionMaterials.ArtfulDeviceX,
    Drops.FrostnightsX,
    Drops.Warrant
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
    if (playstyle.prioritizesTalents('Skill/Ability', 'Charged/Hold')) score += MODIFIERS.TALENT;

    return score;
  }
);

export const DarkIronSword = new Weapon(
  'Dark Iron Sword',
  {
    value: `Upon causing an Overloaded, Superconduct, Electro-Charged, Quicken, Aggravate, Hyperbloom, or Electro-infused Swirl reaction, ATK is increased by $0 for 12s.`,
    refinements: [
      '20/25/30/35/40%',
    ]
  },
  'Sword',
  Rarity.Rare,
  401,
  'Elemental Mastery',
  141,
  [
    WeaponAscensionMaterials.XFromGuyun,
    Drops.SacrificialKnife,
    Drops.Mask
  ],
  'NPC: Chen the Sharp',
  ({ playstyle, score, character }) => {
    if (character.canTrigger('playstyle-based', 
      'Overloaded',
      'Superconduct',
      'Electro-Charged',
      'Quicken',
      'Aggravate',
      'Hyperbloom',
      'Swirl'
    ) && playstyle.needsStat('ATK')) {
      score += MODIFIERS.CAN_TRIGGER_ELEMENT + MODIFIERS.STAT;
    }

    return score;
  }
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
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.LeyLineBranch,
    Drops.Nectar,
  ],
  'Battle Pass',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT * 2; // ATK is boosted in both cases
    if (playstyle.needsStat('DEF')) score += MODIFIERS.STAT;

    return score;
  },
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
  [
    WeaponAscensionMaterials.MistXElixir,
    Drops.MistGrass,
    Drops.Mask,
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')
      && playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')
      && playstyle.needsStat('ATK')
    ) {
      score += MODIFIERS.TALENT * 2 + MODIFIERS.STAT; // Want it all, get all the score
    }

    return score;
  }
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
  [
    WeaponAscensionMaterials.TalismanOfTheForestDew,
    Drops.Fin,
    Drops.Spectral
  ],
  'Event',
  ({ playstyle, score, character }) => {
    if (character.can('Heal')) {
      score += MODIFIERS.BONUS_ABILITY;

      if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;
    }
    if (!playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  }
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
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.LeyLineBranch,
    Drops.Mask
  ],
  'Event',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  },
  cs => cs.Klee
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
  [
    WeaponAscensionMaterials.MistXElixir,
    Drops.MistGrass,
    Drops.Scroll,
  ],
  'Wish',
  ({ score }) => score
);

// Checkpoint
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
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.MistGrass,
    Drops.FatuiInsignia
  ],
  'Crafting',
  ({ playstyle, score, character }) => {
    if (character.element === 'Cryo') score += MODIFIERS.CAN_TRIGGER_ELEMENT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;

    return score;
  }
);
// #endregion

// #region E
export const EarthShaker = new Weapon(
  'Earth Shaker',
  {
    value: `After a party member triggers a Pyro-related reaction, the equipping character's Elemental Skill DMG is increased by $0 for 8s. This effect can be triggered even when the triggering party member is not on the field.`,
    refinements: [
      '16/20/24/28/32%',
    ]
  },
  'Claymore',
  Rarity.Epic,
  565,
  'ATK',
  27.6,
  [
    WeaponAscensionMaterials.BlazingSacrificialHearts,
    Drops.Ignited,
    Drops.Whistle,
  ],
  'Crafting',
  ({ playstyle, score, character }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    if (character.canTrigger('playstyle-based', 'Pyro Reaction')) {
      score += MODIFIERS.CAN_TRIGGER_ELEMENT;

      if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    }

    return score;
  }
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
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.Horn,
    Drops.FatuiInsignia
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
    if (!playstyle.onField) score += MODIFIERS.FIELD;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  },
  cs => cs.Venti
);

export const EmeraldOrb = new Weapon(
  'Emerald Orb',
  {
    value: `Upon causing a Vaporize, Electro-Charged, Frozen, Bloom, or a Hydro-infused Swirl reaction, increases ATK by $0 for 12s.`,
    refinements: [
      '20/25/30/35/40%',
    ]
  },
  'Catalyst',
  Rarity.Rare,
  448,
  'Elemental Mastery',
  94,
  [
    WeaponAscensionMaterials.XFromGuyun,
    Drops.SacrificialKnife,
    Drops.TreasureHoarderInsignia
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (character.canTrigger('playstyle-based', 
      'Vaporize',
      'Electro-Charged',
      'Frozen',
      'Bloom',
      'Swirl'
    ) && playstyle.needsStat('ATK')) {
      score += MODIFIERS.CAN_TRIGGER_ELEMENT;
    }

    return score;
  }
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
  [
    WeaponAscensionMaterials.ScorchingMight,
    Drops.FungalNucleus,
    Drops.FungalSpores
  ],
  'Fishing',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability') && playstyle.needsStat('ATK')) {
      score += MODIFIERS.TALENT + MODIFIERS.STAT;
    }

    return score;
  }
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
  [
    WeaponAscensionMaterials.MaskOfTheX,
    Drops.RuinSentinelChaos,
    Drops.Handguard
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) {
      score += MODIFIERS.STAT;

      if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;
    }

    if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;

    return score;
  },
  cs => cs.RaidenShogun
);

export const EtherlightSpindlelute = new Weapon(
  'Etherlight Spindlelute',
  {
    value: `For 20s after using an Elemental Skill, the equipping character's Elemental Mastery is increased by $0.`,
    refinements: ['100/125/150/175/200']
  },
  'Catalyst',
  Rarity.Epic,
  510,
  'Energy Recharge',
  45.9,
  [
    WeaponAscensionMaterials.XOfTheFarNorthScions,
    Drops.RaidantBeastDrop,
    Drops.Warrant
  ],
  'Event',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;

    return score;
  },
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
  [
    WeaponAscensionMaterials.XBranchOfAXSea,
    Drops.Prism,
    Drops.Spectral
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (character.can('Heal')) score += MODIFIERS.BONUS_ABILITY;
    if (playstyle.needsStat('HP')) {
      score += MODIFIERS.STAT;

      if (playstyle.prioritizesTalents('Normal/Press')) score += MODIFIERS.TALENT;
    }

    return score;
  },
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
  [
    WeaponAscensionMaterials.MistXElixir,
    Drops.MistGrass,
    Drops.Mask,
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  },
);
// #endregion

// #region F
export const FlameForgedInsight = new Weapon(
  'Flame-Forged Insight',
  {
    value: `When Electro-Charged, Lunar-Charged, Bloom, Lunar-Bloom, Crystallize or Lunar-Crystallize is triggered, restore $0 Elemental Energy and increase Elemental Mastery by $1 for 15 seconds. This effect can be triggered at most once every 15s and can be triggered even when the equipping character is off-field.`,
    refinements: [
      '12/15/18/21/24',
      '60/75/90/105/120',
    ]
  },
  'Claymore',
  Rarity.Epic,
  510,
  'Elemental Mastery',
  165,
  [
    WeaponAscensionMaterials.DeliriousXOfTheSacredLord,
    Drops.WeaselShell,
    Drops.FontemerAberrantPearl,
  ],
  'Event',
  ({ playstyle, score, character }) => {
    if (character.canTrigger('playstyle-based', 
      'Electro-Charged',
      'Lunar-Charged',
      'Bloom',
      'Lunar-Bloom',
      'Crystallize',
      'Lunar-Crystallize'
    )) {
      score += MODIFIERS.CAN_TRIGGER_ELEMENT;
    }
    if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
    if (!playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  }
);

export const FadingTwilight = new Weapon(
  'Fading Twilight',
  {
    value: `Has three states, Evengleam, Afterglow, and Dawnblaze, which increase DMG dealt by $0 respectively. When attacks hit opponents, this weapon will switch to the next state. This weapon can change states once every 7s. The character equipping this weapon can still trigger the state switch while not on the field.`,
    refinements: [
      '(6/10/14%)/(7.5/12.5/17.5%)/(9/15/21%)/(10.5/17.5/24.5%)/(12/20/28%)',
    ]
  },
  'Bow',
  Rarity.Epic,
  565,
  'Energy Recharge',
  30.6,
  [
    WeaponAscensionMaterials.XOfAerosiderite,
    Drops.SacrificialKnife,
    Drops.Scroll,
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (!playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const FangOfTheMountainKing = new Weapon(
  'Fang of the Mountain King',
  {
    value: `Gain 1 stack of Canopy's Favor after hitting an opponent with an Elemental Skill. This can be triggered once every 0.5s. After a nearby party member triggers a Burning or Burgeon reaction, the equipping character will gain 3 stacks. This effect can be triggered once every 2s and can be triggered even when the triggering party member is off-field. Canopy's Favor: Elemental Skill and Burst DMG is increased by 20% for 6s. Max 6 stacks. Each stack is counted independently.`,
    refinements: [
      '10/12.5/15/17.5/20%',
    ]
  },
  'Claymore',
  Rarity.Legendary,
  741,
  'Crit Rate',
  11,
  [
    WeaponAscensionMaterials.DeliriousXOfTheSacredLord,
    Drops.Ignited,
    Drops.Whistle,
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    if (character.canTrigger('playstyle-based', 'Burning', 'Burgeon')) score += MODIFIERS.CAN_TRIGGER_ELEMENT;

    return score;
  },
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
  [
    WeaponAscensionMaterials.XOfDecarabiansX,
    Drops.Horn,
    Drops.Scroll
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;

    return score;
  },
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
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.RuinGuardChaos,
    Drops.FatuiInsignia,
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;

    return score;
  },
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
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.RuinGuardChaos,
    Drops.Slime
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;

    return score;
  },
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
  [
    WeaponAscensionMaterials.XOfDecarabiansX,
    Drops.Horn,
    Drops.Arrowhead,
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;

    return score;
  },
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
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.RuinGuardChaos,
    Drops.Nectar
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;

    return score;
  }
);

export const FerrousShadow = new Weapon(
  'Ferrous Shadow',
  {
    value: `When HP falls below $0, increases Charged Attack DMG by $1 and Charged Attacks become harder to interrupt.`,
    refinements: [
      '70/75/80/85/90%',
      '20/25/30/35/40%',
    ]
  },
  'Claymore',
  Rarity.Rare,
  401,
  'HP',
  35.2,
  [
    WeaponAscensionMaterials.XOfDecarabiansX,
    Drops.Horn,
    Drops.Nectar
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Charged/Hold')) score += MODIFIERS.TALENT;

    return score;
  },
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
  'Energy Recharge',
  45.9,
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.Horn,
    Drops.FatuiInsignia
  ],
  'Event',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;

    return score;
  },
);

export const FilletBlade = new Weapon(
  'Fillet Blade',
  {
    value: `On hit, has a 50% chance to deal $0 ATK DMG to a single opponent. Can only occur once every $1.`,
    refinements: [
      '240/280/320/360/400%',
      '15/14/13/12/11s',
    ]
  },
  'Sword',
  Rarity.Rare,
  401,
  'ATK',
  35.2,
  [
    WeaponAscensionMaterials.MistXElixir,
    Drops.MistGrass,
    Drops.TreasureHoarderInsignia
  ],
  'Chest',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  },
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
  [
    WeaponAscensionMaterials.PureSacredDewdrop,
    Drops.TaintedWater,
    Drops.Handguard
  ],
  'Crafting',
  ({ playstyle, score, character }) => {
    if (playstyle.prioritizesTalents('Skill/Ability') && playstyle.needsStat('ATK')) {
      score += MODIFIERS.TALENT + MODIFIERS.STAT;
    }
    if (character.can('Bond of Life')) {
      score += MODIFIERS.BONUS_ABILITY;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    }

    return score;
  },
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
  [
    WeaponAscensionMaterials.AncientChord,
    Drops.TaintedWater,
    Drops.FontemerAberrantPearl
  ],
  'Fishing',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;

    return score;
  },
);

export const FlowerWreathedFeathers = new Weapon(
  'Flower-Wreathed Feathers',
  {
    value: `Decreases Gliding Stamina consumption by 15%. When using Aimed Shots, the DMG dealt by Charged Attacks increases by $0 every 0.5s. This effect can stack up to 6 times and will be removed 10s after leaving Aiming Mode.`,
    refinements: [
      '6/7.5/9/10.5/12%',
    ]
  },
  'Bow',
  Rarity.Epic,
  510,
  'ATK',
  41.3,
  [
    WeaponAscensionMaterials.NightWindsMysticX,
    Drops.Ignited,
    Drops.Whistle
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Charged/Hold')) score += MODIFIERS.TALENT;

    return score;
  },
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
  [
    WeaponAscensionMaterials.PureSacredDewdrop,
    Drops.BreacherCore,
    Drops.FontemerAberrantPearl
  ],
  'Crafting',
  ({ playstyle, score, character }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    if (character.can('Bond of Life')) {
      score += MODIFIERS.BONUS_ABILITY;

      if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;
    }

    return score;
  },
);

export const FluteOfEzpitzal = new Weapon(
  'Flute of Ezpitzal',
  {
    value: `Using an Elemental Skill increases DEF by $0 for 15s.`,
    refinements: [
      '16/20/24/28/32%',
    ]
  },
  'Sword',
  Rarity.Epic,
  454,
  'DEF',
  69,
  [
    WeaponAscensionMaterials.BlazingSacrificialHearts,
    Drops.Hilt,
    Drops.Fang
  ],
  'Crafting',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability') && playstyle.needsStat('DEF')) {
      score += MODIFIERS.TALENT + MODIFIERS.STAT;
    }

    return score;
  },
);

export const FootprintOfTheRainbow = new Weapon(
  'Footprint of the Rainbow',
  {
    value: `Using an Elemental Skill increases DEF by $0 for 15s.`,
    refinements: [
      '16/20/24/28/32%',
    ]
  },
  'Polearm',
  Rarity.Epic,
  510,
  'DEF',
  51.7,
  [
    WeaponAscensionMaterials.DeliriousXOfTheSacredLord,
    Drops.SecretSource,
    Drops.Whistle,
  ],
  'Crafting',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability') && playstyle.needsStat('DEF')) {
      score += MODIFIERS.TALENT + MODIFIERS.STAT;
    }

    return score;
  },
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
  [
    WeaponAscensionMaterials.TalismanOfTheForestDew,
    Drops.RuinDrakeChaos,
    Drops.EremiteDrop
  ],
  'Crafting',
  ({ playstyle, score, character }) => {
    if (character.canTrigger('playstyle-based', 
      'Burning',
      'Quicken',
      'Aggravate',
      'Spread',
      'Bloom',
      'Hyperbloom',
      'Burgeon'
    )) {
      score += MODIFIERS.CAN_TRIGGER_ELEMENT;

      if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
      if (!playstyle.onField) score += MODIFIERS.FIELD;
    }

    return score;
  }
);

export const FracturedHalo = new Weapon(
  'Fractured Halo',
  {
    value: `After an Elemental Skill or Elemental Burst is used, ATK is increased by $0 for 20s. If the equipping character creates a Shield while this effect is active, they will gain the Electrifying Edict effect for 20s: All nearby party members deal $1 more Lunar-Charged DMG.`,
    refinements: [
      '24/30/36/42/48%',
      '40/50/60/70/80%',
    ]
  },
  'Polearm',
  Rarity.Legendary,
  608,
  'Crit DMG',
  66.2,
  [
    WeaponAscensionMaterials.BlazingSacrificialHearts,
    Drops.WeaselShell,
    Drops.Fang,
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (playstyle.prioritizesTalents('Skill/Ability', 'Burst/Ult')) {
      score += MODIFIERS.TALENT;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
      if (character.can('Shield')) score += MODIFIERS.BONUS_ABILITY;
      if (character.canTrigger('playstyle-based', 'Lunar-Charged')) score += MODIFIERS.CAN_TRIGGER_ELEMENT;
    }

    return score;
  },
  cs => cs.Ineffa
);

// Checkpoint
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
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.RuinGuardChaos,
    Drops.Scroll,
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (!playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
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
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.RuinGuardChaos,
    Drops.Nectar
  ],
  'Crafting',
  ({ playstyle, score, character }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')
      && playstyle.needsStat('ATK')
    ) {
      score += MODIFIERS.TALENT + MODIFIERS.STAT;
    }

    if (character.element === 'Cryo') score += MODIFIERS.CAN_TRIGGER_ELEMENT;

    return score;
  },
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
  [
    WeaponAscensionMaterials.OasisGardens,
    Drops.Statuette,
    Drops.FungalSpores
  ],
  'Crafting',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('Elemental Mastery')
      && !playstyle.needsStat('ATK')
    ) {
      score += MODIFIERS.STAT;
    }

    if (!playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const FruitfulHook = new Weapon(
  'Fruitful Hook',
  {
    value: `Increase Plunging Attack CRIT Rate by $0; After a Plunging Attack hits an opponent, Normal, Charged, and Plunging Attack DMG increased by $1 for 10s.`,
    refinements: [
      '16/20/24/28/32%',
      '16/20/24/28/32%',
    ]
  },
  'Claymore',
  Rarity.Epic,
  565,
  'ATK',
  27.6,
  [
    WeaponAscensionMaterials.NightWindsMysticX,
    Drops.SecretSource,
    Drops.Fang
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Plunging/Press')) {
      score += MODIFIERS.TALENT;

      if (playstyle.onField) score += MODIFIERS.FIELD;
    }

    return score;
  },
);
// #endregion

// #region G
// #endregion

// #region H
export const HakushinRing = new Weapon(
  'Hakushin Ring',
  {
    value: `After the character equipped with this weapon triggers an Electro elemental reaction, nearby party members of an Elemental Type involved in the elemental reaction receive a $0 Elemental DMG Bonus for their element, lasting 6s. Elemental Bonuses gained in this way cannot be stacked.`,
    refinements: [
      '10/12.5/15/17.5/20%',
    ]
  },
  'Catalyst',
  Rarity.Epic,
  565,
  'Energy Recharge',
  30.6,
  [
    WeaponAscensionMaterials.XBranchOfAXSea,
    Drops.Prism,
    Drops.Scroll,
  ],
  'Crafting',
  ({ score, character }) => {
    if (character.canTrigger('playstyle-based', 'Electro Reaction')) score += MODIFIERS.CAN_TRIGGER_ELEMENT;

    return score;
  }
);

export const Halberd = new Weapon(
  'Halberd',
  {
    value: `Normal Attacks deal an additional $0 ATK as DMG. Can only occur once every 10s.`,
    refinements: [
      '160/200/240/280/320%',
    ]
  },
  'Polearm',
  Rarity.Rare,
  448,
  'ATK',
  23.5,
  [
    WeaponAscensionMaterials.MistXElixir,
    Drops.MistGrass,
    Drops.Nectar,
  ],
  'Chest',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press')
      && playstyle.needsStat('ATK')
    ) {
      score += MODIFIERS.TALENT + MODIFIERS.STAT;
    }

    return score;
  }
);

export const Hamayumi = new Weapon(
  'Hamayumi',
  {
    value: `Increases Normal Attack DMG by $0 and Charged Attack DMG by $1. When the equipping character's Energy reaches 100%, this effect is increased by 100%.`,
    refinements: [
      '16/20/24/28/32%',
      '12/15/18/21/24%',
    ]
  },
  'Bow',
  Rarity.Epic,
  454,
  'ATK',
  55.1,
  [
    WeaponAscensionMaterials.NarukamisX,
    Drops.Prism,
    Drops.Arrowhead,
  ],
  'Crafting',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) {
      score += MODIFIERS.TALENT;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    }

    return score;
  },
);

export const HaranGeppakuFutsu = new Weapon(
  'Haran Geppaku Futsu',
  {
    value: `Obtain $0 All Elemental DMG Bonus. When other nearby party members use Elemental Skills, the character equipping this weapon will gain 1 Wavespike stack. Max 2 stacks. This effect can be triggered once every 0.3s. When the character equipping this weapon uses an Elemental Skill, all stacks of Wavespike will be consumed to gain Rippling Upheaval: each stack of Wavespike consumed will increase Normal Attack DMG by $1 for 8s.`,
    refinements: [
      '12/15/18/21/24%',
      '20/25/30/35/40%',
    ]
  },
  'Sword',
  Rarity.Legendary,
  608,
  'Crit Rate',
  33.1,
  [
    WeaponAscensionMaterials.NarukamisX,
    Drops.Statuette,
    Drops.Handguard,
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.onField) score += MODIFIERS.FIELD;
    if (playstyle.prioritizesTalents('Normal/Press')) {
      score += MODIFIERS.TALENT;

      if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    }

    return score;
  },
  cs => cs.KamisatoAyato
);

export const HarbingerOfDawn = new Weapon(
  'Harbinger of Dawn',
  {
    value: `When HP is above 90%, increases CRIT Rate by $0.`,
    refinements: [
      '14/17.5/21/24.5/28%',
    ]
  },
  'Sword',
  Rarity.Rare,
  401,
  'Crit DMG',
  46.9,
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.LeyLineBranch,
    Drops.Slime
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (character.can('Heal', 'Self-heal') && playstyle.onField) {
      score += MODIFIERS.BONUS_ABILITY + MODIFIERS.FIELD;
    }

    return score;
  }
);

export const HuntersPath = new Weapon(
  `Hunter's Path`,
  {
    value: `Gain $0 All Elemental DMG Bonus. Obtain the Tireless Hunt effect after hitting an opponent with a Charged Attack. This effect increases Charged Attack DMG by $1 of Elemental Mastery. This effect will be removed after 12 Charged Attacks or 10s. Only 1 instance of Tireless Hunt can be gained every 12s.`,
    refinements: [
      '12/15/18/21/24%',
      '160/200/240/280/320%',
    ]
  },
  'Bow',
  Rarity.Legendary,
  542,
  'Crit Rate',
  44.1,
  [
    WeaponAscensionMaterials.ScorchingMight,
    Drops.FungalNucleus,
    Drops.EremiteDrop
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Charged/Hold')) {
      score += MODIFIERS.TALENT;

      if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
    }

    return score;
  },
  cs => cs.Tighnari
);
// #endregion

// #region I
export const IbisPiercer = new Weapon(
  'Ibis Piercer',
  {
    value: `The character's Elemental Mastery will increase by $0 within 6s after Charged Attacks hit opponents. Max 2 stacks. This effect can be triggered once every 0.5s.`,
    refinements: [
      '40/50/60/70/80',
    ]
  },
  'Bow',
  Rarity.Epic,
  565,
  'ATK',
  27.6,
  [
    WeaponAscensionMaterials.TalismanOfTheForestDew,
    Drops.HilichurlFlower,
    Drops.EremiteDrop
  ],
  'Event',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('Elemental Mastery')) {
      score += MODIFIERS.STAT;

      if (playstyle.prioritizesTalents('Charged/Hold')) score += MODIFIERS.TALENT;
    }

    return score;
  },
);

export const IronSting = new Weapon(
  'Iron Sting',
  {
    value: `Dealing Elemental DMG increases all DMG by $0 for 6s. Max 2 stacks. Can only occur once every 1s.`,
    refinements: [
      '6/7.5/9/10.5/12%',
    ]
  },
  'Sword',
  Rarity.Epic,
  510,
  'Elemental Mastery',
  165,
  [
    WeaponAscensionMaterials.XOfAerosiderite,
    Drops.BoneShard,
    Drops.Nectar,
  ],
  'Crafting',
  ({ score }) => score
);
// #endregion

// #region J
export const JadefallsSplendor = new Weapon(
  `Jadefall's Splendor`,
  {
    value: `For 3s after using an Elemental Burst or creating a shield, the equipping character can gain the Primordial Jade Regalia effect: Restore $0 Energy every 2.5s, and gain $1 Elemental DMG Bonus for their corresponding Elemental Type for every 1,000 Max HP they possess, up to $2. Primordial Jade Regalia will still take effect even if the equipping character is not on the field.`,
    refinements: [
      '4.5/5/5.5/6/6.5',
      '0.3/0.5/0.7/0.9/1.1%',
      '12/20/28/36/44%',
    ]
  },
  'Catalyst',
  Rarity.Legendary,
  608,
  'HP',
  49.6,
  [
    WeaponAscensionMaterials.XFromGuyun,
    Drops.HilichurlFlower,
    Drops.FungalSpores,
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (playstyle.prioritizesTalents('Burst/Ult') || character.can('Shield')) {
      if (playstyle.prioritizesTalents('Burst/Ult')) score += MODIFIERS.TALENT;
      if (character.can('Shield')) score += MODIFIERS.BONUS_ABILITY;
      if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;
      if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;
      if (!playstyle.onField) score += MODIFIERS.FIELD;
    }

    return score;
  },
  cs => cs.Baizhu
);
// #endregion

// #region K
export const KagotsurubeIsshin = new Weapon(
  'Kagotsurube Isshin',
  {
    value: `When a Normal, Charged, or Plunging Attack hits an opponent, it will whip up a Hewing Gale, dealing AoE DMG equal to 180% of ATK and increasing ATK by 15% for 8s. This effect can be triggered once every 8s.`,
    refinements: []
  },
  'Sword',
  Rarity.Epic,
  510,
  'ATK',
  41.3,
  [
    WeaponAscensionMaterials.MaskOfTheX,
    Drops.Statuette,
    Drops.Spectral
  ],
  'Quest',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold', 'Plunging/Press')
      && playstyle.needsStat('ATK')
    ) {
      score += MODIFIERS.TALENT + MODIFIERS.STAT;
    }

    return score;
  }
);

export const KagurasVerity = new Weapon(
  `Kagura's Verity`,
  {
    value: `Gains the Kagura Dance effect when using an Elemental Skill, causing the Elemental Skill DMG of the character wielding this weapon to increase by $0 for 16s. Max 3 stacks. This character will gain $1 All Elemental DMG Bonus when they possess 3 stacks.`,
    refinements: [
      '12/15/18/21/24%',
      '12/15/18/21/24%',
    ]
  },
  'Catalyst',
  Rarity.Legendary,
  608,
  'Crit DMG',
  66.2,
  [
    WeaponAscensionMaterials.MaskOfTheX,
    Drops.ConcealedClaw,
    Drops.Spectral
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    // if (character.abilities.uses > 1) score += MODIFIERS.BONUS_ABILITY
    if (character.can('Off-field Damage')) {
      score += MODIFIERS.BONUS_ABILITY;

      if (!playstyle.onField) score += MODIFIERS.FIELD;
    }

    return score;
  },
  cs => cs.YaeMiko
);

export const KatsuragikiriNagamasa = new Weapon(
  'Katsuragikiri Nagamasa',
  {
    value: `Increases Elemental Skill DMG by $0. After Elemental Skill hits an opponent, the character loses 3 Energy but regenerates $1 Energy every 2s for the next 6s. This effect can occur once every 10s. Can be triggered even when the character is not on the field.`,
    refinements: [
      '16/20/24/28/32%',
      '3/3.5/4/4.5/5',
    ]
  },
  'Claymore',
  Rarity.Epic,
  510,
  'Energy Recharge',
  45.9,
  [
    WeaponAscensionMaterials.NarukamisX,
    Drops.RuinSentinelChaos,
    Drops.Handguard
  ],
  'Crafting',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;
    if (!playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const KeyOfKhajNisut = new Weapon(
  'Key of Khaj-Nisut',
  {
    value: `HP increased by $0. When an Elemental Skill hits opponents, you gain the Grand Hymn effect for 20s. This effect increases the equipping character's Elemental Mastery by $1 of their Max HP. This effect can trigger once every 0.3s. Max 3 stacks. When this effect gains 3 stacks, or when the third stack's duration is refreshed, the Elemental Mastery of all nearby party members will be increased by $2 of the equipping character's max HP for 20s.`,
    refinements: [
      '20/25/30/35/40%',
      '0.12/0.15/0.18/0.21/0.24%',
      '0.2/0.25/0.3/0.35/0.4%',
    ]
  },
  'Sword',
  Rarity.Legendary,
  542,
  'HP',
  66.2,
  [
    WeaponAscensionMaterials.TalismanOfTheForestDew,
    Drops.PrimalConstructPrism,
    Drops.EremiteDrop
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;
    if (playstyle.prioritizesTalents('Skill/Ability')) {
      score += MODIFIERS.TALENT;

      if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
    }

    return score;
  },
  cs => cs.Nilou
);

export const KingsSquire = new Weapon(
  `King's Squire`,
  {
    value: `Obtain the Teachings of the Forest effect when unleashing Elemental Skills and Bursts, increasing Elemental Mastery by $0 for 12s. This effect will be removed when switching characters. When the Teachings of the Forest effect ends or is removed, it will deal $1 of ATK as DMG to 1 nearby opponent. The Teachings of the Forest effect can be triggered once every 20s.`,
    refinements: [
      '60/80/100/120/140',
      '100/120/140/160/180%',
    ]
  },
  'Bow',
  Rarity.Epic,
  454,
  'ATK',
  55.1,
  [
    WeaponAscensionMaterials.ScorchingMight,
    Drops.FungalNucleus,
    Drops.Arrowhead,
  ],
  'Crafting',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability', 'Burst/Ult')) {
      score += MODIFIERS.TALENT;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    }
    if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;

    return score;
  },
);

export const KitainCrossSpear = new Weapon(
  'Kitain Cross Spear',
  {
    value: `Increases Elemental Skill DMG by $0. After Elemental Skill hits an opponent, the character loses 3 Energy but regenerates $1 Energy every 2s for the next 6s. This effect can occur once every 10s. Can be triggered even when the character is not on the field.`,
    refinements: [
      '6/7.5/9/10.5/12%',
      '3/3.5/4/4.5/5',
    ]
  },
  'Polearm',
  Rarity.Epic,
  565,
  'Elemental Mastery',
  110,
  [
    WeaponAscensionMaterials.MaskOfTheX,
    Drops.RuinSentinelChaos,
    Drops.Handguard,
  ],
  'Crafting',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    if (!playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);
// #endregion

// #region L
export const LightbearingMoonshard = new Weapon(
  `Lightbearing Moonshard`,
  {
    value: `Increases DEF by $0. DMG inflicted by Lunar-Crystallize reactions increases by $1 for 5s after the equipping character uses an Elemental Skill.`,
    refinements: [
      '20/25/30/35/40%',
      '64/80/96/112/128%',
    ]
  },
  'Sword',
  Rarity.Legendary,
  542,
  'Crit DMG',
  88.2,
  [
    WeaponAscensionMaterials.XOfAerosiderite,
    Drops.Mistshroud,
    Drops.DriveShaft
  ],
  "Wish",
  ({ playstyle, score, character }) => {
    if (playstyle.needsStat('DEF')) score += MODIFIERS.STAT;
    if (character.canTrigger('playstyle-based', 'Lunar-Crystallize')) score += MODIFIERS.CAN_TRIGGER_ELEMENT;

    return score;
  },
  cs => cs.Zibai
);
export const LightOfFoliarIncision = new Weapon(
  'Light of Foliar Incision',
  {
    value: `CRIT Rate is increased by $0. After Normal Attacks deal Elemental DMG, the Foliar Incision effect will be obtained, increasing DMG dealt by Normal Attacks and Elemental Skills by $1 of Elemental Mastery. This effect will disappear after 28 DMG instances or 12s. You can obtain Foliar Incision once every 12s.`,
    refinements: [
      '4/5/6/7/8%',
      '120/150/180/210/240%',
    ]
  },
  'Sword',
  Rarity.Legendary,
  542,
  'Crit DMG',
  88.2,
  [
    WeaponAscensionMaterials.TalismanOfTheForestDew,
    Drops.Shell,
    Drops.EremiteDrop,
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Skill/Ability')) {
      score += MODIFIERS.TALENT;

      if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
    }

    return score;
  },
  cs => cs.Alhaitham
);

export const LionsRoar = new Weapon(
  `Lion's Roar`,
  {
    value: `Increases DMG against enemies affected by Pyro or Electro by $0.`,
    refinements: [
      '20/24/28/32/36%',
    ]
  },
  'Sword',
  Rarity.Epic,
  510,
  'ATK',
  41.3,
  [
    WeaponAscensionMaterials.XFromGuyun,
    Drops.SacrificialKnife,
    Drops.TreasureHoarderInsignia
  ],
  'Wish',
  ({ score, character }) => {
    if (character.canTrigger('playstyle-based', 'Pyro Reaction', 'Electro Reaction')) score += MODIFIERS.CAN_TRIGGER_ELEMENT;

    return score;
  }
);

export const LithicBlade = new Weapon(
  'Lithic Blade',
  {
    value: `For every characters who hails from Liyue, the characters who equips this weapon gains $0 ATK increase and a $1 CRIT Rate increase. This effect stacks up to 4 times.`,
    refinements: [
      '7/8/9/10/11%',
      '3/4/5/6/7%',
    ]
  },
  'Claymore',
  Rarity.Epic,
  565,
  'ATK',
  27.6,
  [
    WeaponAscensionMaterials.XFromGuyun,
    Drops.SacrificialKnife,
    Drops.Arrowhead
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (character.region === 'Liyue') score += MODIFIERS.BONUS_ABILITY;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  }
);

export const LithicSpear = new Weapon(
  'Lithic Spear',
  {
    value: `For every character in the party who hails from Liyue, the character who equips this weapon gains a $0 ATK increase and a $1 CRIT Rate increase. This effect stacks up to 4 times.`,
    refinements: [
      '7/8/9/10/11%',
      '3/4/5/6/7%',
    ]
  },
  'Polearm',
  Rarity.Epic,
  565,
  'ATK',
  27.6,
  [
    WeaponAscensionMaterials.XOfAerosiderite,
    Drops.BoneShard,
    Drops.Arrowhead,
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (character.region === 'Liyue') score += MODIFIERS.BONUS_ABILITY;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  },
);

export const LostPrayerToTheSacredWinds = new Weapon(
  'Lost Prayer to the Sacred Winds',
  {
    value: `Increases Movement SPD by 10%. When in battle, earn a $0 Elemental DMG Bonus every 4s. Max 4 stacks. Lasts until the character falls or leaves combat.`,
    refinements: [
      '6/8/10/12/14%',
    ]
  },
  'Catalyst',
  Rarity.Legendary,
  608,
  'Crit Rate',
  33.1,
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.RuinGuardChaos,
    Drops.Slime
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const LumidouceElegy = new Weapon(
  'Lumidouce Elegy',
  {
    value: `ATK increased by $0. After the equipping character triggers Burning on an opponent or deals Dendro DMG to Burning opponents, the DMG dealt is increased by $1. This effect lasts for 8s, max 2 stacks. When 2 stacks are reached or when the duration is refreshed at 2 stacks, restore $2 Energy. Energy can be restored this way once every 12s. The 2 aforementioned effects can be triggered even when the character is off-field.`,
    refinements: [
      '15/19/23/27/31%',
      '18/23/28/33/38%',
      '12/13/14/15/16',
    ]
  },
  'Polearm',
  Rarity.Legendary,
  608,
  'Crit Rate',
  33.1,
  [
    WeaponAscensionMaterials.GobletOfThePristineSea,
    Drops.Hilt,
    Drops.Nectar,
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (character.canTrigger('playstyle-based', 'Burning') || character.element === 'Dendro') {
      score += MODIFIERS.CAN_TRIGGER_ELEMENT;

      if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;
      if (!playstyle.onField) score += MODIFIERS.FIELD;
    }

    return score;
  },
  cs => cs.Emilie,
);

export const LuxuriousSeaLord = new Weapon(
  'Luxurious Sea-Lord',
  {
    value: `Increases Elemental Burst DMG by $0. When Elemental Burst hits opponents, there is a 100% chance of summoning a titanic tuna that charges and deals $1 ATK as AoE DMG. This effect can occur once every 15s.`,
    refinements: [
      '12/15/18/21/24%',
      '100/125/150/175/200%',
    ]
  },
  'Claymore',
  Rarity.Epic,
  454,
  'ATK',
  55.1,
  [
    WeaponAscensionMaterials.XOfAerosiderite,
    Drops.BoneShard,
    Drops.Slime,
  ],
  'Event',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Burst/Ult')) {
      score += MODIFIERS.TALENT;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    }

    return score;
  }
);
// #endregion

// #region M
export const MagicGuide = new Weapon(
  'Magic Guide',
  {
    value: `Increases DMG against opponents affected by Hydro or Electro by $0.`,
    refinements: [
      '12/15/18/21/24%',
    ]
  },
  'Catalyst',
  Rarity.Rare,
  354,
  'Elemental Mastery',
  187,
  [
    WeaponAscensionMaterials.XOfDecarabiansX,
    Drops.Horn,
    Drops.Slime
  ],
  'Wish',
  ({ score, character }) => {
    if (character.canTrigger('playstyle-based', 'Hydro Reaction', 'Electro Reaction')) score += MODIFIERS.CAN_TRIGGER_ELEMENT;

    return score;
  },
);

export const MailedFlower = new Weapon(
  'Mailed Flower',
  {
    value: `Within 8s after the character's Elemental Skill hits an opponent or the character triggers an Elemental Reaction, their ATK and Elemental Mastery will be increased by $0 and $1 respectively.`,
    refinements: [
      '12/15/18/21/24%',
      '48/60/72/84/96',
    ]
  },
  'Claymore',
  Rarity.Epic,
  565,
  'Elemental Mastery',
  110,
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.Shell,
    Drops.Spectral
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) {
      score += MODIFIERS.TALENT;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
      if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
    }

    return score;
  },
);

export const MakhairaAquamarine = new Weapon(
  'Makhaira Aquamarine',
  {
    value: `The following effect will trigger every 10s: The equipping character will gain $0 of their Elemental Mastery as bonus ATK for 12s, with nearby party members gaining 30% of this buff for the same duration. Multiple instances of this weapon can allow this buff to stack. This effect will still trigger even if the character is not on the field.`,
    refinements: [
      '24/30/36/42/48%',
    ]
  },
  'Claymore',
  Rarity.Epic,
  510,
  'Elemental Mastery',
  165,
  [
    WeaponAscensionMaterials.ScorchingMight,
    Drops.RuinDrakeChaos,
    Drops.TreasureHoarderInsignia
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (!playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  }
);

export const MappaMare = new Weapon(
  'Mappa Mare',
  {
    value: `Triggering an Elemental reaction grants a $0 Elemental DMG Bonus for 10s. Max 2 stacks.`,
    refinements: [
      '8/10/12/14/16%',
    ]
  },
  'Catalyst',
  Rarity.Epic,
  565,
  'Elemental Mastery',
  110,
  [
    WeaponAscensionMaterials.XOfAerosiderite,
    Drops.BoneShard,
    Drops.Slime,
  ],
  'Crafting',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
    if (!playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const MasterKey = new Weapon(
  'Master Key',
  {
    value: `Upon causing an Elemental Reaction, increases Elemental Mastery by $0 for 12s. Moonsign: Ascendant Gleam: Elemental Mastery from this effect is further increased by $1. This effect can be triggered even if the equipping character is off-field.`,
    refinements: [
      '60/75/90/105/120',
      '60/75/90/105/120',
    ]
  },
  'Claymore',
  Rarity.Epic,
  454,
  'Energy Recharge',
  61.3,
  [
    WeaponAscensionMaterials.XOfTheFarNorthScions,
    Drops.RaidantBeastDrop,
    Drops.DriveShaft
  ],
  'Crafting',
  ({ playstyle, score, character }) => {
    if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
    if (character.can('Increases Moonsign')) {
      score += MODIFIERS.BONUS_ABILITY;

      if (!playstyle.onField) score += MODIFIERS.FIELD;
    }

    return score;
  },
);

export const MemoryOfDust = new Weapon(
  'Memory of Dust',
  {
    value: `Increase Shield Strength by $0. Scoring hits on opponents increases ATK by $1 for 8s. Max 5 stacks. Can only occur once every 0.3s. While protected by a shield, this ATK increase effect is increased by 100%.`,
    refinements: [
      '20/25/30/35/40%',
      '4/5/6/7/8%',
    ]
  },
  'Catalyst',
  Rarity.Legendary,
  608,
  'ATK',
  49.6,
  [
    WeaponAscensionMaterials.XOfAerosiderite,
    Drops.BoneShard,
    Drops.Mask
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (character.can('Shield')) score += MODIFIERS.BONUS_ABILITY;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  },
  cs => cs.Ningguang
);

export const Messenger = new Weapon(
  'Messenger',
  {
    value: `Charged Attack hits on weak points deal an additional $0 ATK DMG as CRIT DMG. Can only occur once every 10s.`,
    refinements: [
      '100/125/150/175/200%',
    ]
  },
  'Bow',
  Rarity.Rare,
  448,
  'Crit DMG',
  31.2,
  [
    WeaponAscensionMaterials.MistXElixir,
    Drops.MistGrass,
    Drops.TreasureHoarderInsignia
  ],
  'Chest',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Charged/Hold')) {
      score += MODIFIERS.TALENT;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    }

    return score;
  },
);

export const MissiveWindspear = new Weapon(
  'Missive Windspear',
  {
    value: `Within 10s after an Elemental Reaction is triggered, ATK is increased by $0 and Elemental Mastery is increased by $1.`,
    refinements: [
      '12/15/18/21/24%',
      '48/60/72/84/96'
    ]
  },
  'Polearm',
  Rarity.Epic,
  510,
  'ATK',
  41.3,
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.Statuette,
    Drops.Slime,
  ],
  'Event',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;

    return score;
  },
);

export const MistsplitterReforged = new Weapon(
  'Mistsplitter Reforged',
  {
    value: `Gain a $0 Elemental DMG Bonus for every element and receive the might of Mistsplitter's Emblem. At stack levels 1/2/3, Mistsplitter's Emblem provides a $1 Elemental DMG Bonus for the character's Elemental Type. The character will obtain 1 stack of Mistsplitter's Emblem in each of the following scenarios: Normal Attack deals Elemental DMG (stack lasts 5s), casting Elemental Burst (stack lasts 10s); Energy is less than 100% (stack disappears when Energy is full). Each stack's duration is calculated independently.`,
    refinements: [
      '12/15/18/21/24%',
      '(8/16/28%)/(10/20/35%)/(12/24/42%)/(14/28/49%)/(16/32/56%)',
    ]
  },
  'Sword',
  Rarity.Legendary,
  674,
  'Crit DMG',
  44.1,
  [
    WeaponAscensionMaterials.XBranchOfAXSea,
    Drops.RuinDrakeChaos,
    Drops.Handguard
  ],
  'Wish',
  ({ score }) => score,
  cs => cs.KamisatoAyaka
);

export const MitternachtsWaltz = new Weapon(
  'Mitternachts Waltz',
  {
    value: `Normal Attack hits on opponents increase Elemental Skill DMG by $0 for 5s. Elemental Skill hits on opponents increase Normal Attack DMG by $1 for 5s.`,
    refinements: [
      '20/25/30/35/40%',
      '20/25/30/35/40%',
    ]
  },
  'Bow',
  Rarity.Epic,
  510,
  'Physical DMG Bonus',
  51.7,
  [
    WeaponAscensionMaterials.XOfDecarabiansX,
    Drops.Horn,
    Drops.TreasureHoarderInsignia
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Skill/Ability')) {
      score += MODIFIERS.TALENT;
    }

    return score;
  },
);

export const Moonpiercer = new Weapon(
  'Moonpiercer',
  {
    value: `After triggering Burning, Quicken, Aggravate, Spread, Bloom, Hyperbloom, or Burgeon, a Leaf of Revival will be created around the character for a maximum of 10s. When picked up, the Leaf will grant the character $0 ATK for 12s. Only 1 Leaf can be generated this way every 20s. This effect can still be triggered if the character is not on the field.`,
    refinements: [
      '16/20/24/28/32%',
    ]
  },
  'Polearm',
  Rarity.Epic,
  565,
  'Elemental Mastery',
  110,
  [
    WeaponAscensionMaterials.OasisGardens,
    Drops.RuinDrakeChaos,
    Drops.FatuiInsignia,
  ],
  'Crafting',
  ({ playstyle, score, character }) => {
    if (character.canTrigger('playstyle-based', 
      'Burning',
      'Quicken',
      'Aggravate',
      'Spread',
      'Bloom',
      'Hyperbloom',
      'Burgeon'
    )) {
      score += MODIFIERS.CAN_TRIGGER_ELEMENT;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
      if (!playstyle.onField) score += MODIFIERS.FIELD;
    }

    return score;
  }
);

export const MoonweaversDawn = new Weapon(
  `Moonweaver's Dawn`,
  {
    value: `Increases Elemental Burst DMG by $0. When the equipping character's Energy Capacity does not exceed 60/40, their Elemental Burst DMG is increased by an additional $1.`,
    refinements: [
      '20/25/30/35/40%',
      '(16/28)/(20/35)/(24/42)/(28/49)/(32%/56%)',
    ],
  },
  'Sword',
  Rarity.Epic,
  565,
  'ATK',
  27.6,
  [
    WeaponAscensionMaterials.XOfTheFarNorthScions,
    Drops.RaidantBeastDrop,
    Drops.DriveShaft
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Burst/Ult')) score += MODIFIERS.TALENT;

    return score;
  }
);

export const MountainBracingBolt = new Weapon(
  'Mountain-Bracing Bolt',
  {
    value: `Decreases Climbing Stamina Consumption by 15% and increases Elemental Skill DMG by $0. Also, after other nearby party members use Elemental Skills, the equipping character's Elemental Skill DMG will also increase by $1 for 8s.`,
    refinements: [
      '12/15/18/21/24%',
      '12/15/18/21/24%',
    ]
  },
  'Polearm',
  Rarity.Epic,
  565,
  'Energy Recharge',
  30.6,
  [
    WeaponAscensionMaterials.DeliriousXOfTheSacredLord,
    Drops.Ignited,
    Drops.Nectar
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;

    return score;
  }
);

export const MouunsMoon = new Weapon(
  `Mouun's Moon`,
  {
    value: `For every point of the entire party's combined maximum Energy capacity, the Elemental Burst DMG of the character equipping this weapon is increased by $0. A maximum of $1 increased Elemental Burst DMG can be achieved this way.`,
    refinements: [
      '0.12/0.15/0.18/0.21/0.24%',
      '40/50/60/70/80%',
    ]
  },
  'Bow',
  Rarity.Epic,
  565,
  'ATK',
  27.6,
  [
    WeaponAscensionMaterials.NarukamisX,
    Drops.Prism,
    Drops.Spectral
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Burst/Ult')) score += MODIFIERS.TALENT;

    return score;
  },
);
// #endregion

// #region N
export const NocturnesCurtainCall = new Weapon(
  `Nocturne's Curtain Call`,
  {
    value: `Max HP increases by $0. When triggering Lunar reactions or inflicting Lunar Reaction DMG on opponents, the equipping character will recover $1 Energy, and receive the Bountiful Sea's Sacred Wine effect for 12s: Max HP increases by an additional $2, CRIT DMG from Lunar Reaction DMG increases by $3. The Energy recovery effect can be triggered at most once every 18s, and can be triggered even when the equipping character is off-field.`,
    refinements: [
      '10/12/14/16/18%',
      '14/15/16/17/18',
      '14/16/18/20/22%',
      '60/80/100/120/140%',
    ]
  },
  'Catalyst',
  Rarity.Legendary,
  542,
  'Crit DMG',
  88.2,
  [
    WeaponAscensionMaterials.XOfTheFarNorthScions,
    Drops.XOfTheDeepShadow,
    Drops.Warrant
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;
    if (character.canTrigger('playstyle-based', 'Lunar')) {
      score += MODIFIERS.CAN_TRIGGER_ELEMENT;

      if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;
      if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;
      if (!playstyle.onField) score += MODIFIERS.FIELD;
    }

    return score;
  },
  cs => cs.Columbina
);

export const NightweaversLookingGlass = new Weapon(
  `Nightweaver's Looking Glass`,
  {
    value: `When the equipping character's Elemental Skill deals Hydro or Dendro DMG, they will gain Prayer of the Far North: Elemental Mastery is increased by $0 for 4.5s. When nearby party members trigger Lunar-Bloom reactions, the equipping character gains New Moon Verse: Elemental Mastery is increased by $1 for 10s. When both Prayer of the Far North and New Moon Verse are in effect, all nearby party members' Bloom DMG is increased by $2, their Hyperbloom and Burgeon DMG is increased by $3, and their Lunar-Bloom DMG is increased by $4. This effect cannot stack. The aforementioned effects can be triggered even if the equipping character is off-field.`,
    refinements: [
      '60/75/90/105/120',
      '60/75/90/105/120',
      '120/150/180/210/240%',
      '80/100/120/140/160%',
      '40/50/60/70/80%',
    ]
  },
  'Catalyst',
  Rarity.Legendary,
  542,
  'Elemental Mastery',
  265,
  [
    WeaponAscensionMaterials.ArtfulDeviceX,
    Drops.FrostnightsX,
    Drops.DriveShaft
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (character.canTrigger('playstyle-based', 'Hydro Reaction', 'Dendro Reaction')) {
      score += MODIFIERS.CAN_TRIGGER_ELEMENT;

      if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
      if (character.canTrigger('playstyle-based', 'Lunar-Bloom')) {
        score += MODIFIERS.CAN_TRIGGER_ELEMENT;

        if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
      }

      if (!playstyle.onField) score += MODIFIERS.FIELD;
    }

    return score;
  },
  cs => cs.Lauma
);
// #endregion

// #region O
export const OathswornEye = new Weapon(
  'Oathsworn Eye',
  {
    value: `Increases Energy Recharge by $0 for 10s after using an Elemental Skill.`,
    refinements: [
      '12/15/18/21/24%',
    ]
  },
  'Catalyst',
  Rarity.Epic,
  565,
  'ATK',
  27.6,
  [
    WeaponAscensionMaterials.XBranchOfAXSea,
    Drops.ConcealedClaw,
    Drops.Spectral
  ],
  'Event',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('Energy Recharge')) {
      score += MODIFIERS.STAT;

      if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    }

    return score;
  },
);

export const OtherworldlyStory = new Weapon(
  'Otherworldly Story',
  {
    value: `Picking up an Elemental Energy Orb/Particle recovers $0 HP.`,
    refinements: [
      '1/1.25/1.5/1.75/2%',
    ]
  },
  'Catalyst',
  Rarity.Rare,
  401,
  'Energy Recharge',
  39,
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.RuinGuardChaos,
    Drops.Mask
  ],
  'Chest',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('HP')) {
      score += MODIFIERS.STAT;

      if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;
    }

    return score;
  },
);
// #endregion

// #region P
export const PeakPatrolSong = new Weapon(
  'Peak Patrol Song',
  {
    value: `Gain "Ode to Flowers" after Normal or Plunging Attacks hit an opponent: DEF increases by $0 and gain a $1 All Elemental DMG Bonus for 6s. Max 2 stacks. Can trigger once per 0.1s. When this effect reaches 2 stacks or the 2nd stack's duration is refreshed, increase all nearby party members' All Elemental DMG Bonus by $2 for every 1,000 DEF the equipping character has, up to a maximum of $3, for 15s.`,
    refinements: [
      '8/10/12/14/16%',
      '10/12.5/15/17.5/20%',
      '8/10/12/14/16%',
      '25.6/32/38.4/44.8/51.2%'
    ]
  },
  'Sword',
  Rarity.Legendary,
  542,
  'DEF',
  82.7,
  [
    WeaponAscensionMaterials.NightWindsMysticX,
    Drops.SecretSource,
    Drops.Fang,
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('DEF')) {
      score += MODIFIERS.STAT * 2; // Increases DEF and scales off DEF

      if (playstyle.prioritizesTalents('Normal/Press', 'Plunging/Press')) score += MODIFIERS.TALENT;
    }

    return score;
  },
  cs => cs.Xilonen
);

export const PolarStar = new Weapon(
  'Polar Star',
  {
    value: `Elemental Skill and Elemental Burst DMG increased by $0. After a Normal Attack, Charged Attack, Elemental Skill or Elemental Burst hits an opponent, 1 stack of Ashen Nightstar will be gained for 12s. When 1/2/3/4 stacks of Ashen Nightstar are present, ATK is increased by $1. The stack of Ashen Nightstar created by the Normal Attack, Charged Attack, Elemental Skill or Elemental Burst will be counted independently of the others.`,
    refinements: [
      '12/15/18/21/24%',
      '10/20/30/48%',
    ]
  },
  'Bow',
  Rarity.Legendary,
  608,
  'Crit Rate',
  33.1,
  [
    WeaponAscensionMaterials.MaskOfTheX,
    Drops.ConcealedClaw,
    Drops.Spectral
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability', 'Burst/Ult')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  },
  cs => cs.TartagliaChilde
);

export const PortablePowerSaw = new Weapon(
  'Portable Power Saw',
  {
    value: `When the wielder is healed or heals others, they will gain a Stoic's Symbol that lasts 30s, up to a maximum of 3 Symbols. When using their Elemental Skill or Burst, all Symbols will be consumed and the Roused effect will be granted for 10s. For each Symbol consumed, gain $0 Elemental Mastery, and 2s after the effect occurs, $1 Energy per Symbol consumed will be restored for said character. The Roused effect can be triggered once every 15s, and Symbols can be gained even when the character is not on the field.`,
    refinements: [
      '40/50/60/70/80',
      '2/2.5/3/3.5/4',
    ]
  },
  'Claymore',
  Rarity.Epic,
  454,
  'HP',
  55.1,
  [
    WeaponAscensionMaterials.GobletOfThePristineSea,
    Drops.BreacherCore,
    Drops.Gear
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (character.can('Heal', 'Self-heal')) {
      score += MODIFIERS.BONUS_ABILITY;

      if (playstyle.prioritizesTalents('Skill/Ability', 'Burst/Ult')) score += MODIFIERS.TALENT;
      if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
      if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;
      if (!playstyle.onField) score += MODIFIERS.FIELD;
    }

    return score;
  },
);

export const Predator = new Weapon(
  'Predator',
  {
    value: `Effective only on the following platform: "PlayStation™ Network"\nDealing Cryo DMG to opponents increases this character's Normal and Charged Attack DMG by 10% for 6s. This effect can have a maximum of 2 stacks. Additionally, when Aloy equips Predator, ATK is increased by 66.`,
    refinements: []
  },
  'Bow',
  Rarity.Epic,
  510,
  'ATK',
  41.3,
  [
    WeaponAscensionMaterials.NarukamisX,
    Drops.Prism,
    Drops.Arrowhead
  ],
  'Event',
  ({ playstyle, score, character }) => {
    if (character.canTrigger('playstyle-based', 'Cryo Reaction')) {
      score += MODIFIERS.CAN_TRIGGER_ELEMENT;

      if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;
    }
    if (character.name === 'Aloy') {
      score += MODIFIERS.BONUS_ABILITY;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    }

    return score;
  },
  cs => cs.Aloy,
);

export const PrimordialJadeCutter = new Weapon(

  'Primordial Jade Cutter',
  {
    value: `HP increased by $0. Additionally, provides an ATK bonus based on $1 of the weilder's Max HP.`,
    refinements: [
      '20/25/30/35/40%',
      '1.2/1.5/1.8/2.1/2.4%',
    ]
  },
  'Sword',
  Rarity.Legendary,
  542,
  'Crit Rate',
  44.1,
  [
    WeaponAscensionMaterials.MistXElixir,
    Drops.MistGrass,
    Drops.TreasureHoarderInsignia
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('HP')) score += MODIFIERS.STAT * 2; // Increases HP and scales off HP      

    return score;
  },
);

export const PrimordialJadeWingedSpear = new Weapon(
  'Primordial Jade Winged-Spear',
  {
    value: `On hit, increases ATK by $0 for 6s. Max 7 stacks. This effect can only occur once every 0.3s. While in possession of the maximum possible stacks, DMG dealt is increased by $1.`,
    refinements: [
      '3.2/3.9/4.6/5.3/6%',
      '12/15/18/21/24%',
    ]
  },
  'Polearm',
  Rarity.Legendary,
  674,
  'Crit Rate',
  22.1,
  [
    WeaponAscensionMaterials.XFromGuyun,
    Drops.SacrificialKnife,
    Drops.FatuiInsignia
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  },
  cs => cs.Xiao,
);

export const ProspectorsDrill = new Weapon(
  `Prospector's Drill`,
  {
    value: `When the wielder is healed or heals others, they will gain a Unity's Symbol that lasts 30s, up to a maximum of 3 Symbols. When using their Elemental Skill or Burst, all Symbols will be consumed and the Struggle effect will be granted for 10s. For each Symbol consumed, gain $0 ATK and $1 All Elemental DMG Bonus. The Struggle effect can be triggered once every 15s, and Symbols can be gained even when the character is not on the field.`,
    refinements: [
      '3/4/5/6/7%',
      '7/8.5/10/11.5/13%',
    ]
  },
  'Polearm',
  Rarity.Epic,
  565,
  'ATK',
  27.6,
  [
    WeaponAscensionMaterials.AncientChord,
    Drops.Operatives,
    Drops.Gear
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (character.can('Heal', 'Self-heal')) {
      score += MODIFIERS.BONUS_ABILITY;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
      if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
      if (!playstyle.onField) score += MODIFIERS.FIELD;
    }

    return score;
  },
);

export const ProspectorsShovel = new Weapon(
  `Prospector's Shovel`,
  {
    value: `Electro-Charged DMG is increased by $0, and Lunar-Charged DMG is increased by $1. Moonsign: Ascendant Gleam: Lunar-Charged DMG is increased by an additional $2.`,
    refinements: [
      '48/60/72/84/96%',
      '12/15/18/21/24%',
      '12/15/18/21/24%',
    ]
  },
  'Polearm',
  Rarity.Epic,
  510,
  'ATK',
  41.3,
  [
    WeaponAscensionMaterials.XOfLongNightFlint,
    Drops.Mistshroud,
    Drops.DriveShaft
  ],
  'Crafting',
  ({ score, character }) => {
    if (character.canTrigger('playstyle-based', 'Electro-Charged', 'Lunar-Charged')) score += MODIFIERS.CAN_TRIGGER_ELEMENT;
    if (character.can('Increases Moonsign')) score += MODIFIERS.BONUS_ABILITY;

    return score;
  },
);

export const PrototypeAmber = new Weapon(
  'Prototype Amber',
  {
    value: `Using an Elemental Burst regenerates $0 Energy every 2s for 6s. Additionally, all party members will regenerate $1 HP every 2s for this duration.`,
    refinements: [
      '4/4.5/5/5.5/6',
      '4/4.5/5/5.5/6%',
    ]
  },
  'Catalyst',
  Rarity.Epic,
  510,
  'HP',
  41.3,
  [
    WeaponAscensionMaterials.MistXElixir,
    Drops.MistGrass,
    Drops.Arrowhead
  ],
  'Crafting',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;
    if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;

    return score;
  },
);

export const PrototypeArchaic = new Weapon(
  'Prototype Archaic',
  {
    value: `On hit, Normal or Charged Attacks have a 50% chance to deal an additional $0 ATK DMG to enemies within a small radius. Can only occur once every 15s.`,
    refinements: [
      '240/300/360/420/480%',
    ]
  },
  'Claymore',
  Rarity.Epic,
  565,
  'ATK',
  27.6,
  [
    WeaponAscensionMaterials.XOfAerosiderite,
    Drops.BoneShard,
    Drops.Mask,
  ],
  'Crafting',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  },
);

export const PrototypeCrescent = new Weapon(
  'Prototype Crescent',
  {
    value: `Aimed Shot hits on weak points increase Movement SPD by 10% and ATK by $0 for 10s.`,
    refinements: [
      '36/45/54/63/72%'
    ]
  },
  'Bow',
  Rarity.Epic,
  510,
  'ATK',
  41.3,
  [
    WeaponAscensionMaterials.MistXElixir,
    Drops.MistGrass,
    Drops.TreasureHoarderInsignia
  ],
  'Crafting',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Charged/Hold')) {
      score += MODIFIERS.TALENT;

      if (playstyle.onField) score += MODIFIERS.FIELD; // SPD increase, you wanna be on field
    }
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  },
);

export const PrototypeRancour = new Weapon(
  'Prototype Rancour',
  {
    value: `On hit, Normal or Charged Attacks increase Base ATK and DEF by $0 for 6s. Max 4 stacks. Can only occur once every 0.3s.`,
    refinements: [
      '4/4.5/5/5.5/6%',
    ]
  },
  'Sword',
  Rarity.Epic,
  565,
  'Physical DMG Bonus',
  34.5,
  [
    WeaponAscensionMaterials.MistXElixir,
    Drops.MistGrass,
    Drops.FatuiInsignia
  ],
  'Crafting',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (playstyle.needsStat('DEF')) score += MODIFIERS.STAT;
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;

    return score;
  }
);

export const PrototypeStarglitter = new Weapon(
  'Prototype Starglitter',
  {
    value: `After using an Elemental Skill, increases Normal and Charged Attack DMG by $0 for 12s. Max 2 stacks.`,
    refinements: [
      '8/10/12/14/16%',
    ]
  },
  'Polearm',
  Rarity.Epic,
  510,
  'Energy Recharge',
  45.9,
  [
    WeaponAscensionMaterials.XOfAerosiderite,
    Drops.BoneShard,
    Drops.Mask
  ],
  'Crafting',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;

    return score;
  },
);
// #endregion

// #region Q
// #endregion

// #region R
export const RainbowSerpentsRainBow = new Weapon(
  `Rainbow Serpent's Rain Bow`,
  {
    value: `ATK is increased by $0 for 8s after the equipping character's attacks hit an opponent while the equipping character is off-field.`,
    refinements: [
      '28/35/42/49/56%',
    ]
  },
  'Bow',
  Rarity.Epic,
  510,
  'Energy Recharge',
  45.9,
  [
    WeaponAscensionMaterials.NightWindsMysticX,
    Drops.AbyssalLeaf,
    Drops.Warrant,
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (character.can('Off-field Damage') && playstyle.needsStat('ATK')) {
      score += MODIFIERS.BONUS_ABILITY + MODIFIERS.STAT;
    }

    return score;
  },
);

export const Rainslasher = new Weapon(
  'Rainslasher',
  {
    value: `Increases DMG against enemies affected by Hydro or Electro by $0.`,
    refinements: [
      '20/25/30/35/40%',
    ]
  },
  'Claymore',
  Rarity.Epic,
  510,
  'Elemental Mastery',
  165,
  [
    WeaponAscensionMaterials.MistXElixir,
    Drops.MistGrass,
    Drops.Scroll
  ],
  'Wish',
  ({ score, character }) => {
    if (character.canTrigger('playstyle-based', 'Hydro Reaction', 'Electro Reaction')) score += MODIFIERS.CAN_TRIGGER_ELEMENT;

    return score;
  }
);

export const RangeGauge = new Weapon(
  'Range Gauge',
  {
    value: `When the wielder is healed or heals others, they will gain a Unity's Symbol that lasts 30s, up to a maximum of 3 Symbols. When using their Elemental Skill or Burst, all Symbols will be consumed and the Struggle effect will be granted for 10s. For each Symbol consumed, gain $0 ATK and $1 All Elemental DMG Bonus. The Struggle effect can be triggered once every 15s, and Symbols can be gained even when the character is not on the field.`,
    refinements: [
      '3/4/5/6/7%',
      '7/8.5/10/11.5/13%'
    ]
  },
  'Bow',
  Rarity.Epic,
  565,
  'ATK',
  27.6,
  [
    WeaponAscensionMaterials.AncientChord,
    Drops.TaintedWater,
    Drops.FontemerAberrantPearl
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (character.can('Heal', 'Self-heal')) {
      score += MODIFIERS.BONUS_ABILITY;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
      if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
      if (!playstyle.onField) score += MODIFIERS.FIELD;
    }

    return score;
  },
);

export const RavenBow = new Weapon(
  'Raven Bow',
  {
    value: `Increases DMG against opponents affected by Hydro or Pyro by $0.`,
    refinements: [
      '12/15/18/21/24%',
    ]
  },
  'Bow',
  Rarity.Rare,
  448,
  'Elemental Mastery',
  94,
  [
    WeaponAscensionMaterials.XOfDecarabiansX,
    Drops.Horn,
    Drops.Arrowhead
  ],
  'Wish',
  ({ score, character }) => {
    if (character.canTrigger('playstyle-based', 'Hydro Reaction', 'Pyro Reaction')) score += MODIFIERS.CAN_TRIGGER_ELEMENT;

    return score;
  },
);

export const RecurveBow = new Weapon(
  'Recurve Bow',
  {
    value: `Defeating an opponent restores $0 HP.`,
    refinements: [
      '8/10/12/14/16%',
    ]
  },
  'Bow',
  Rarity.Rare,
  354,
  'HP',
  46.9,
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.RuinGuardChaos,
    Drops.Scroll
  ],
  'Chest',
  ({ playstyle, score }) => {
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const RedhornStonethresher = new Weapon(
  'Redhorn Stonethresher',
  {
    value: `DEF is increased by $0. Normal and Charged Attack DMG is increased by $1 of DEF.`,
    refinements: [
      '28/35/42/49/56%',
      '40/50/60/70/80%',
    ]
  },
  'Claymore',
  Rarity.Legendary,
  542,
  'Crit DMG',
  88.2,
  [
    WeaponAscensionMaterials.NarukamisX,
    Drops.ConcealedClaw,
    Drops.Handguard
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('DEF')) score += MODIFIERS.STAT * 2; // Increases DEF and scales off DEF
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;

    return score;
  },
  cs => cs.AratakiItto
);

export const ReliquaryOfTruth = new Weapon(
  'Reliquary of Truth',
  {
    value: `CRIT Rate is increased by $0. When the equipping character unleashes an Elemental Skill, they gain the Secret of Lies effect: Elemental Mastery is increased by $1 for 12s. When the equipping character deals Lunar-Bloom DMG to an opponent, they gain the Moon of Truth effect: CRIT DMG is increased by $2 for 4s. When both the Secret of Lies and Moon of Truth effects are active at the same time, the results of both effects will be increased by 50%.`,
    refinements: [
      '8/10/12/14/16%',
      '80/100/120/140/160',
      '24/30/36/42/48%',
    ]
  },
  'Catalyst',
  Rarity.Legendary,
  542,
  'Crit DMG',
  88.2,
  [
    WeaponAscensionMaterials.OasisGardens,
    Drops.RaidantBeastDrop,
    Drops.FungalSpores,
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) {
      score += MODIFIERS.TALENT;

      if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
      if (character.canTrigger('playstyle-based', 'Lunar-Bloom')) score += MODIFIERS.CAN_TRIGGER_ELEMENT;
    }

    return score;
  },
  cs => cs.Nefer
);

export const RightfulReward = new Weapon(
  'Rightful Reward',
  {
    value: `When the wielder is healed, restore $0 Energy. This effect can be triggered once every 10s, and can occur even when the character is not on the field..`,
    refinements: [
      '8/10/12/14/16',
    ]
  },
  'Polearm',
  Rarity.Epic,
  510,
  'HP',
  27.6,
  [
    WeaponAscensionMaterials.GobletOfThePristineSea,
    Drops.BreacherCore,
    Drops.Gear
  ],
  'Crafting',
  ({ playstyle, score, character }) => {
    if (character.can('Heal', 'Self-heal')) {
      score += MODIFIERS.BONUS_ABILITY;

      if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;
      if (!playstyle.onField) score += MODIFIERS.FIELD;
    }

    return score;
  },
);

export const RingOfYaxche = new Weapon(
  'Ring of Yaxche',
  {
    value: `Using an Elemental Skill grants the Jade-Forged Crown effect: Every 1,000 Max HP will increase the Normal Attack DMG dealt by the equipping character by $0 for 10s. Normal Attack DMG can be increased this way by a maximum of $1.`,
    refinements: [
      '0.6/0.7/0.8/0.9/1%',
      '16/20/24/28/32%',
    ]
  },
  'Catalyst',
  Rarity.Epic,
  510,
  'HP',
  41.3,
  [
    WeaponAscensionMaterials.DeliriousXOfTheSacredLord,
    Drops.WayobWill,
    Drops.Mask,
  ],
  'Crafting',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) {
      score += MODIFIERS.TALENT;

      if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;
      if (playstyle.prioritizesTalents('Normal/Press')) score += MODIFIERS.TALENT;
    }

    return score;
  },
);

export const RoyalBow = new Weapon(
  'Royal Bow',
  {
    value: `Upon damaging an enemy, increases CRIT Rate by $0. Max 5 stacks. A CRIT hit removes all stacks.`,
    refinements: [
      '8/10/12/14/16%',
    ]
  },
  'Bow',
  Rarity.Rare,
  510,
  'ATK',
  41.3,
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.RuinGuardChaos,
    Drops.Slime
  ],
  'Starglitter Exchange',
  ({ playstyle, score }) => {
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const RoyalGreatsword = new Weapon(
  'Royal Greatsword',
  {
    value: `Upon damaging an enemy, increases CRIT Rate by $0. Max 5 stacks. A CRIT hit removes all stacks.`,
    refinements: [
      '8/10/12/14/16%',
    ]
  },
  'Claymore',
  Rarity.Rare,
  565,
  'ATK',
  27.6,
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.RuinGuardChaos,
    Drops.Slime
  ],
  'Starglitter Exchange',
  ({ playstyle, score }) => {
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const RoyalGrimoire = new Weapon(
  'Royal Grimoire',
  {
    value: `Upon damaging an enemy, increases CRIT Rate by $0. Max 5 stacks. A CRIT hit removes all stacks.`,
    refinements: [
      '8/10/12/14/16%',
    ]
  },
  'Catalyst',
  Rarity.Rare,
  565,
  'ATK',
  27.6,
  [
    WeaponAscensionMaterials.XOfDecarabiansX,
    Drops.Horn,
    Drops.FatuiInsignia
  ],
  'Starglitter Exchange',
  ({ playstyle, score }) => {
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const RoyalLongsword = new Weapon(
  'Royal Longsword',
  {
    value: `Upon damaging an enemy, increases CRIT Rate by $0. Max 5 stacks. A CRIT hit removes all stacks.`,
    refinements: [
      '8/10/12/14/16%',
    ]
  },
  'Sword',
  Rarity.Rare,
  510,
  'ATK',
  41.3,
  [
    WeaponAscensionMaterials.XOfDecarabiansX,
    Drops.Horn,
    Drops.Arrowhead
  ],
  'Starglitter Exchange',
  ({ playstyle, score }) => {
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const RoyalSpear = new Weapon(
  'Royal Spear',
  {
    value: `Upon damaging an enemy, increases CRIT Rate by $0. Max 5 stacks. A CRIT hit removes all stacks.`,
    refinements: [
      '8/10/12/14/16%',
    ]
  },
  'Polearm',
  Rarity.Rare,
  565,
  'ATK',
  27.6,
  [
    WeaponAscensionMaterials.MistXElixir,
    Drops.MistGrass,
    Drops.FatuiInsignia
  ],
  'Starglitter Exchange',
  ({ playstyle, score }) => {
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const Rust = new Weapon(
  'Rust',
  {
    value: `Increases Normal Attack DMG by $0 but decreases Aimed Shot DMG by $1`,
    refinements: [
      '40/50/60/70/80%',
      '8/9/10/11/12%',
    ]
  },
  'Bow',
  Rarity.Epic,
  510,
  'ATK',
  41.3,
  [
    WeaponAscensionMaterials.XFromGuyun,
    Drops.SacrificialKnife,
    Drops.Mask
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press')) score += MODIFIERS.TALENT;
    if (playstyle.prioritizesTalents('Charged/Hold')) score -= MODIFIERS.TALENT;

    return score;
  },
);
// #endregion

// #region S
export const SacrificersStaff = new Weapon(
  `Sacrificer's Staff`,
  {
    value: `For 6s after an Elemental Skill hits an opponent, ATK is increased by $0 and Energy Recharge is increased by $1. Max 3 stacks. This effect can be triggered even when the equipping character is off-field.`,
    refinements: [
      '8/10/12/14/16%',
      '6/7.5/9/10.5/12%'
    ]
  },
  'Polearm',
  Rarity.Epic,
  620,
  'Crit Rate',
  9.2,
  [
    WeaponAscensionMaterials.XOfLongNightFlint,
    Drops.Mistshroud,
    Drops.DriveShaft
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) {
      score += MODIFIERS.TALENT;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
      if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;
      if (!playstyle.onField) score += MODIFIERS.FIELD;
    }

    return score;
  },
);

export const SacrificialBow = new Weapon(
  'Sacrificial Bow',
  {
    value: `After damaging an opponent with an Elemental Skill, the skill has a $0 chance to end its own CD. Can only occur once every $1.`,
    refinements: [
      '40/50/60/70/80%',
      '30/26/22/18/14s',
    ]
  },
  'Bow',
  Rarity.Epic,
  565,
  'Energy Recharge',
  30.6,
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.LeyLineBranch,
    Drops.Slime
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    if (!playstyle.onField) score += MODIFIERS.FIELD; // Biased because this weapon is goated for off-field skill usage

    return score;
  },
);

export const SacrificialFragments = new Weapon(
  'Sacrificial Fragments',
  {
    value: `After damaging an opponent with an Elemental Skill, the skill has a $0 chance to end its own CD. Can only occur once every $1.`,
    refinements: [
      '40/50/60/70/80%',
      '30/26/22/18/14s',
    ]
  },
  'Catalyst',
  Rarity.Epic,
  454,
  'Elemental Mastery',
  221,
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.RuinGuardChaos,
    Drops.TreasureHoarderInsignia
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    if (!playstyle.onField) score += MODIFIERS.FIELD; // Biased because this weapon is goated for off-field skill usage

    return score;
  },
);

export const SacrificialGreatsword = new Weapon(
  'Sacrificial Greatsword',
  {
    value: `After damaging an opponent with an Elemental Skill, the skill has a $0 chance to end its own CD. Can only occur once every $1.`,
    refinements: [
      '40/50/60/70/80%',
      '30/26/22/18/14s',
    ]
  },
  'Claymore',
  Rarity.Epic,
  565,
  'Energy Recharge',
  30.6,
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.LeyLineBranch,
    Drops.Arrowhead
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    if (!playstyle.onField) score += MODIFIERS.FIELD; // Biased because this weapon is goated for off-field skill usage 

    return score;
  },
);

export const SacrificialJade = new Weapon(
  'Sacrificial Jade',
  {
    value: `When not on the field for more than 5s, Max HP will be increased by $0 and Elemental Mastery will be increased by $1. These effects will be canceled after the wielder has been on the field for 10s.`,
    refinements: [
      '32/40/48/56/64%',
      '40/50/60/70/80',
    ]
  },
  'Catalyst',
  Rarity.Epic,
  454,
  'Crit Rate',
  36.8,
  [
    WeaponAscensionMaterials.XFromGuyun,
    Drops.MistGrass,
    Drops.Scroll
  ],
  'Battle Pass',
  ({ playstyle, score }) => {
    if (!playstyle.onField) score += MODIFIERS.FIELD;
    if (playstyle.needsStat('HP')) score += MODIFIERS.STAT * 2; // Extreme amount of HP increase
    if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;

    return score;
  },
);

export const SacrificialSword = new Weapon(
  'Sacrificial Sword',
  {
    value: `After damaging an opponent with an Elemental Skill, the skill has a $0 chance to end its own CD. Can only occur once every $1.`,
    refinements: [
      '40/50/60/70/80%',
      '30/26/22/18/14s',
    ]
  },
  'Sword',
  Rarity.Epic,
  454,
  'Energy Recharge',
  61.3,
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.RuinGuardChaos,
    Drops.Scroll
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    if (!playstyle.onField) score += MODIFIERS.FIELD; // Biased because this weapon is goated for off-field skill usage

    return score;
  },
);

export const SapwoodBlade = new Weapon(
  'Sapwood Blade',
  {
    value: `After triggering Burning, Quicken, Aggravate, Spread, Bloom, Hyperbloom, or Burgeon, a Leaf of Consciousness will be created around the character for a maximum of 10s. When picked up, the Leaf will grant the character $0 Elemental Mastery for 12s. Only 1 Leaf can be generated this way every 20s. This effect can still be triggered if the character is not on the field. The Leaf of Consciousness' effect cannot stack.`,
    refinements: [
      '60/75/90/105/120',
    ]
  },
  'Sword',
  Rarity.Epic,
  565,
  'Energy Recharge',
  30.6,
  [
    WeaponAscensionMaterials.TalismanOfTheForestDew,
    Drops.RuinDrakeChaos,
    Drops.EremiteDrop,
  ],
  'Crafting',
  ({ playstyle, score, character }) => {
    if (character.canTrigger('playstyle-based', 
      'Burning',
      'Quicken',
      'Aggravate',
      'Spread',
      'Bloom',
      'Hyperbloom',
      'Burgeon',
    )) {
      score += MODIFIERS.CAN_TRIGGER_ELEMENT;

      if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
      if (!playstyle.onField) score += MODIFIERS.FIELD;
    }

    return score;
  },
);

export const ScionOfTheBlazingSun = new Weapon(
  'Scion of the Blazing Sun',
  {
    value: `After a Charged Attack hits an opponent, a Sunfire Arrow will descend upon the opponent hit, dealing $0 ATK as DMG, and applying the Heartsearer effect to the opponent damaged by said Arrow for 10s. Opponents affected by Heartsearer take $1 more Charged Attack DMG from the wielder. A Sunfire Arrow can be triggered once every 10s.`,
    refinements: [
      '60/75/90/105/120%',
      '28/35/42/49/56%',
    ]
  },
  'Bow',
  Rarity.Epic,
  565,
  'Crit Rate',
  18.4,
  [
    WeaponAscensionMaterials.ScorchingMight,
    Drops.HilichurlFlower,
    Drops.FungalSpores
  ],
  'Battle Pass',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Charged/Hold')) {
      score += MODIFIERS.TALENT;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
      if (!playstyle.onField) score += MODIFIERS.FIELD; // Occurance rare, might as well be off-field
    }

    return score;
  },
);

export const SequenceOfSolitude = new Weapon(
  'Sequence of Solitude',
  {
    value: `When an attack hits an opponent, deal AoE DMG equal to $0 of Max HP at the target location. This effect can be triggered once every 15s.`,
    refinements: [
      '40/50/60/70/80%',
    ]
  },
  'Bow',
  Rarity.Epic,
  510,
  'HP',
  41.3,
  [
    WeaponAscensionMaterials.AncientChord,
    Drops.WeaselShell,
    Drops.Gear
  ],
  'Event',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;
    if (!playstyle.onField) score += MODIFIERS.FIELD; // Occurance rare, might as well be off-field

    return score;
  },
);

export const SerenitysCall = new Weapon(
  "Serenity's Call",
  {
    value: `Upon causing an Elemental Reaction, increases Max HP by $0 for 12s. Moonsign: Ascendant Gleam: Max HP from this effect is further increased by $1. This effect can be triggered even if the equipping character is off-field.`,
    refinements: [
      '16/20/24/28/32%',
      '16/20/24/28/32%',
    ]
  },
  "Sword",
  Rarity.Epic,
  454,
  'Energy Recharge',
  61.3,
  [
    WeaponAscensionMaterials.ArtfulDeviceX,
    Drops.FrostnightsX,
    Drops.Warrant
  ],
  'Crafting',
  ({ playstyle, score, character }) => {
    if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;
    if (character.can('Increases Moonsign')) {
      score += MODIFIERS.BONUS_ABILITY;

      if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;
    }

    if (!playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const SerpentSpine = new Weapon(
  'Serpent Spine',
  {
    value: `Every 4s a character is on the field, they will deal $0 more DMG and take $1 more DMG. This effect has a maximum of 5 stacks and will not be reset if the character leaves the field, but will be cleared when the character takes DMG.`,
    refinements: [
      '6/7/8/9/10%',
      '3/2.7/2.4/2.1/1.8%',
    ]
  },
  'Claymore',
  Rarity.Epic,
  510,
  'Crit Rate',
  27.6,
  [
    WeaponAscensionMaterials.XOfAerosiderite,
    Drops.BoneShard,
    Drops.Nectar
  ],
  'Battle Pass',
  ({ playstyle, score }) => {
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const SharpshootersOath = new Weapon(
  `Sharpshooter's Oath`,
  {
    value: `Increases DMG against weak spots by $0.`,
    refinements: [
      '24/30/36/42/48%',
    ]
  },
  'Bow',
  Rarity.Rare,
  401,
  'Crit DMG',
  46.9,
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.LeyLineBranch,
    Drops.Slime
  ],
  'Wish',
  ({ score }) => score,
);

export const SilvershowerHeartstrings = new Weapon(
  'Silvershower Heartstrings',
  {
    value: `The equipping character can gain the Remedy effect. When they possess 1/2/3 Remedy stacks, Max HP will increase by $0. 1 stack may be gained when the following conditions are met: 1 stack for 25s when using an Elemental Skill; 1 stack for 25s when the value of a Bond of Life value increases; 1 stack for 20s for performing healing. Stacks can still be triggered when the equipping character is not on the field. Each stack's duration is counted independently. In addition, when 3 stacks are active, Elemental Burst CRIT Rate will be increased by $1. This effect will be canceled 4s after falling under 3 stacks.`,
    refinements: [
      '(12/24/40%)/(15/30/50%)/(18/36/60%)/(21/42/70%)/(24/48/80%)',
      '28/35/42/49/56%',
    ]
  },
  'Bow',
  Rarity.Legendary,
  542,
  'HP',
  66.2,
  [
    WeaponAscensionMaterials.PureSacredDewdrop,
    Drops.Fin,
    Drops.FontemerAberrantPearl
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;
    const nonStackScoreValue = Number(`${score}`);
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    if (character.can('Bond of Life')) score += MODIFIERS.BONUS_ABILITY;
    if (character.can('Heal', 'Self-heal')) score += MODIFIERS.BONUS_ABILITY;

    if (score > nonStackScoreValue && !playstyle.onField) {
      score += MODIFIERS.FIELD;
    }

    return score;
  },
  cs => cs.Sigewinne
);

export const SkyriderGreatsword = new Weapon(
  'Skyrider Greatsword',
  {
    value: `On hit, Normal or Charged Attacks increase ATK by $0 for 6s. Max 4 stacks. Can occur once every 0.5s.`,
    refinements: [
      '6/7/8/9/10%',
    ]
  },
  'Claymore',
  Rarity.Rare,
  401,
  'Physical DMG Bonus',
  43.9,
  [
    WeaponAscensionMaterials.XOfAerosiderite,
    Drops.BoneShard,
    Drops.TreasureHoarderInsignia
  ],
  'Chest',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  },
);

export const SkyriderSword = new Weapon(
  'Skyrider Sword',
  {
    value: `Using an Elemental Burst grants a $0 increase in ATK and Movement SPD for 15s.`,
    refinements: [
      '12/15/18/21/24%',
    ]
  },
  'Sword',
  Rarity.Rare,
  354,
  'Energy Recharge',
  52.1,
  [
    WeaponAscensionMaterials.XOfAerosiderite,
    Drops.BoneShard,
    Drops.FatuiInsignia
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Burst/Ult')) {
      score += MODIFIERS.TALENT;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
      if (playstyle.onField) score += MODIFIERS.FIELD;
    }

    return score;
  },
);

export const SkywardAtlas = new Weapon(
  'Skyward Atlas',
  {
    value: `Increases Elemental DMG Bonus by $0. Normal or Charged Attacks have a 50% chance to trigger a lightning storm that deals $1 ATK as AoE DMG. This effect can occur once every 30s.`,
    refinements: [
      '12/15/18/21/24%',
      '160/200/240/280/320%',
    ]
  },
  'Catalyst',
  Rarity.Legendary,
  674,
  'ATK',
  33.1,
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.LeyLineBranch,
    Drops.Arrowhead
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const SkywardBlade = new Weapon(
  'Skyward Blade',
  {
    value: `CRIT Rate increased by $0. Gains Skypiercing Might upon using an Elemental Burst: Increases Movement SPD by 10%, increases ATK SPD by 10%, and increases the DMG of Normal and Charged Attack hits by $1 for 12s.`,
    refinements: [
      '4/5/6/7/8%',
      '20/25/30/35/40%',
    ]
  },
  'Sword',
  Rarity.Legendary,
  608,
  'Energy Recharge',
  55.1,
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.LeyLineBranch,
    Drops.Slime
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const SkywardHarp = new Weapon(
  'Skyward Harp',
  {
    value: `Increases CRIT DMG by $0. Hits have a $1 chance to inflict a small AoE attack, dealing 125% Physical ATK DMG. Can only occur once every $2.`,
    refinements: [
      '20/25/30/35/40%',
      '60/70/80/90/100%',
      '4/3.5/3/2.5/2s'
    ]
  },
  'Bow',
  Rarity.Legendary,
  674,
  'Crit Rate',
  22.1,
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.LeyLineBranch,
    Drops.Arrowhead
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;

    return score;
  },
);

export const SkywardPride = new Weapon(
  'Skyward Pride',
  {
    value: `Increases all DMG by $0. After using an Elemental Burst, Normal or Charged Attack, on hit, creates a vacuum blade that does $1 Physical DMG to enemies along its path. Lasts for 20s or 8 vacuum blades.`,
    refinements: [
      '8/10/12/14/16%',
      '80/100/120/140/160%',
    ]
  },
  'Claymore',
  Rarity.Legendary,
  674,
  'Energy Recharge',
  38.6,
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.LeyLineBranch,
    Drops.Slime
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const SkywardSpine = new Weapon(
  'Skyward Spine',
  {
    value: `Increases CRIT Rate by $0 and increases Normal ATK SPD by $1. Additionally, Normal and Charged Attacks hits on enemies have a $2 chance to trigger a vacuum blade that deals $3 of ATK as DMG in a small AoE. This effect can occur no more than once every 2s.`,
    refinements: [
      '8/10/12/14/16%',
      '12/12/12/12/12%',
      '50/50/50/50/50%',
      '40/55/70/85/100%',
    ]
  },
  'Polearm',
  Rarity.Legendary,
  674,
  'Energy Recharge',
  38.6,
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.RuinGuardChaos,
    Drops.Scroll
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const Slingshot = new Weapon(
  'Slingshot',
  {
    value: `If a Normal or Charged Attack hits a target within 0.3s of being fired, increases DMG by $0. Otherwise, decreases DMG by 10%.`,
    refinements: [
      '36/42/48/54/60%',
    ]
  },
  'Bow',
  Rarity.Rare,
  354,
  'Crit Rate',
  31.2,
  [
    WeaponAscensionMaterials.XFromGuyun,
    Drops.SacrificialKnife,
    Drops.Mask
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const SnareHook = new Weapon(
  'Snare Hook',
  {
    value: `Upon causing an Elemental Reaction, increases Elemental Mastery by $0 for 12s. Moonsign: Ascendant Gleam: Elemental Mastery from this effect is further increased by $1. This effect can be triggered even if the equipping character is off-field.`,
    refinements: [
      '60/75/90/105/120',
      '60/75/90/105/120',
    ]
  },
  'Bow',
  Rarity.Epic,
  454,
  'Energy Recharge',
  61.3,
  [
    WeaponAscensionMaterials.XOfLongNightFlint,
    Drops.Mistshroud,
    Drops.Arrowhead
  ],
  'Crafting',
  ({ playstyle, score, character }) => {
    if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
    if (character.can('Increases Moonsign')) {
      score += MODIFIERS.BONUS_ABILITY;

      if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
      if (!playstyle.onField) score += MODIFIERS.FIELD;
    }

    return score;
  },
);

export const SnowTombedStarsilver = new Weapon(
  'Snow-Tombed Starsilver',
  {
    value: `Hitting an opponent with Normal and Charged Attacks has a $0 chance of forming and dropping an Everfrost Icicle above them, dealing $1 AoE ATK DMG. Opponents affected by Cryo are dealt $2 ATK DMG. Can only occur once every 10s.`,
    refinements: [
      '60/70/80/90/100%',
      '80/95/110/125/140%',
      '200/240/280/320/360%',
    ]
  },
  'Claymore',
  Rarity.Epic,
  565,
  'Physical DMG Bonus',
  34.5,
  [
    WeaponAscensionMaterials.XOfDecarabiansX,
    Drops.Horn,
    Drops.Slime
  ],
  'Crafting',
  ({ playstyle, score, character }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (character.canTrigger('playstyle-based', 'Cryo Reaction')) score += MODIFIERS.CAN_TRIGGER_ELEMENT;
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const SolarPearl = new Weapon(
  'Solar Pearl',
  {
    value: `Normal Attack hits increase Elemental Skill and Elemental Burst DMG by $0 for 6s. Likewise, Elemental Skill or Elemental Burst hits increase Normal Attack DMG by $1 for 6s.`,
    refinements: [
      '20/25/30/35/40%',
      '20/25/30/35/40%',
    ]
  },
  'Catalyst',
  Rarity.Epic,
  510,
  'Crit Rate',
  27.6,
  [
    WeaponAscensionMaterials.XFromGuyun,
    Drops.SacrificialKnife,
    Drops.Nectar
  ],
  'Battle Pass',
  ({ playstyle, score, character }) => {
    if (playstyle.prioritizesTalents('Skill/Ability', 'Burst/Ult')) score += MODIFIERS.TALENT;
    if (playstyle.prioritizesTalents('Normal/Press')) score += MODIFIERS.TALENT;
    if (character.can('Off-field Damage')) score += MODIFIERS.BONUS_ABILITY;

    return score;
  },
);

export const SongOfBrokenPines = new Weapon(
  'Song of Broken Pines',
  {
    value: `A part of the "Millennial Movement" that wanders amidst the winds. Increases ATK by $0, and when Normal or Charged Attacks hit opponents, the character gains a Sigil of Whispers. This effect can be triggered once every 0.3s. When you possess four Sigils of Whispers, all of them will be consumed and all nearby party members will obtain the "Millennial Movement: Banner-Hymn" effect for 12s. "Millennial Movement: Banner-Hymn" increases Normal ATK SPD by $1 and increases ATK by $2. Once this effect is triggered, you will not gain Sigils of Whispers for 20s. Of the many effects of the "Millennial Movement, " buffs of the same type will not stack.`,
    refinements: [
      '16/20/24/28/32%',
      '12/15/18/21/24%',
      '20/25/30/35/40%',
    ]
  },
  'Claymore',
  Rarity.Legendary,
  741,
  'Physical DMG Bonus',
  20.7,
  [
    WeaponAscensionMaterials.XOfDecarabiansX,
    Drops.Horn,
    Drops.Mask
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) {
      score += MODIFIERS.TALENT;

      if (playstyle.onField) score += MODIFIERS.FIELD;
      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    }

    return score;
  },
  cs => cs.Eula,
);

export const SongOfStillness = new Weapon(
  'Song of Stillness',
  {
    value: `After the wielder is healed, they will deal $0 more DMG for 8s. This can be triggered even when the character is not on the field.`,
    refinements: [
      '16/20/24/28/32%',
    ]
  },
  'Bow',
  Rarity.Epic,
  510,
  'ATK',
  41.3,
  [
    WeaponAscensionMaterials.AncientChord,
    Drops.TaintedWater,
    Drops.Arrowhead,
  ],
  'Crafting',
  ({ playstyle, score }) => {
    if (!playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const SplendorOfTranquilWaters = new Weapon(
  'Splendor of Tranquil Waters',
  {
    value: `When the equipping character's current HP increases or decreases, Elemental Skill DMG dealt will be increased by $0 for 6s. Max 3 stacks. This effect can be triggered once every 0.2s. When other party members' current HP increases or decreases, the equipping character's Max HP will be increased by $1 for 6s. Max 2 stacks. This effect can be triggered once every 0.2s. The aforementioned effects can be triggered even if the wielder is off-field.`,
    refinements: [
      '8/10/12/14/16%',
      '14/17.5/21/24.5/28%',
    ]
  },
  'Sword',
  Rarity.Legendary,
  542,
  'Crit DMG',
  88.2,
  [
    WeaponAscensionMaterials.PureSacredDewdrop,
    Drops.TaintedWater,
    Drops.FontemerAberrantPearl
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    if (character.can('Off-field Damage')) score += MODIFIERS.BONUS_ABILITY;
    if (character.can('Heal') || character.can('Self-heal')) {
      score += MODIFIERS.BONUS_ABILITY;

      if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;
    }
    if (!playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
  cs => cs.Furina
);

export const StaffOfHoma = new Weapon(
  'Staff of Homa',
  {
    value: `HP increased by $0. Additionally, provides an ATK bonus based on $1 of the wielder's Max HP. When the wielder's HP is equal to or falls below 50%, this ATK bonus is increased by an additional $2 of Max HP.`,
    refinements: [
      '20/25/30/35/40%',
      '0.8/1/1.2/1.4/1.6%',
      '1/1.2/1.4/1.6/1.8%',
    ]
  },
  'Polearm',
  Rarity.Legendary,
  608,
  'Crit DMG',
  66.2,
  [
    WeaponAscensionMaterials.XOfAerosiderite,
    Drops.LeyLineBranch,
    Drops.Slime
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  },
  cs => cs.HuTao
);

export const StaffOfTheScarletSands = new Weapon(
  'Staff of the Scarlet Sands',
  {
    value: `The equipping character gains $0 of their Elemental Mastery as bonus ATK. When an Elemental Skill hits opponents, the Dream of the Scarlet Sands effect will be gained for 10s: The equipping character will gain $1 of their Elemental Mastery as bonus ATK. Max 3 stacks.`,
    refinements: [
      '52/65/78/91/104%',
      '28/35/42/49/56%',
    ]
  },
  'Polearm',
  Rarity.Legendary,
  542,
  'Crit Rate',
  44.1,
  [
    WeaponAscensionMaterials.OasisGardens,
    Drops.RuinGuardChaos,
    Drops.FungalSpores
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) {
      score += MODIFIERS.STAT;

      if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
    }

    return score;
  },
  cs => cs.Cyno
);

export const StarcallersWatch = new Weapon(
  `Starcaller's Watch`,
  {
    value: `Increases Elemental Mastery by $0. Gain the "Mirror of Night" effect within 15s after the equipping character creates a shield: The current active party member deals $1 increased DMG to nearby opponents. You can gain the "Mirror of Night" effect once every 14s.`,
    refinements: [
      '100/125/150/175/200',
      '28/35/42/49/56%',
    ]
  },
  'Catalyst',
  Rarity.Legendary,
  542,
  'Elemental Mastery',
  265,
  [
    WeaponAscensionMaterials.DeliriousXOfTheSacredLord,
    Drops.WayobWill,
    Drops.Whistle
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (playstyle.needsStat('Elemental Mastery')) {
      score += MODIFIERS.STAT;

      if (character.can('Shield')) {
        score += MODIFIERS.BONUS_ABILITY;

        if (!playstyle.onField) score += MODIFIERS.FIELD;
      }
    }

    return score;
  },
  cs => cs.Citlali
);

export const SturdyBone = new Weapon(
  'Sturdy Bone',
  {
    value: `Sprint or Alternate Sprint Stamina Consumption decreased by 15%. Additionally, after using Sprint or Alternate Sprint, Normal Attack DMG is increased by $0 of ATK. This effect expires after triggering 18 times or 7s.`,
    refinements: [
      '16/20/24/28/32%',
    ]
  },
  'Sword',
  Rarity.Epic,
  542,
  'ATK',
  27.6,
  [
    WeaponAscensionMaterials.BlazingSacrificialHearts,
    Drops.WayobWill,
    Drops.Whistle
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.onField) {
      score += MODIFIERS.FIELD;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
      if (playstyle.prioritizesTalents('Normal/Press')) score += MODIFIERS.TALENT;
    }

    return score;
  },
);

export const SummitShaper = new Weapon(
  'Summit Shaper',
  {
    value: `Increases Shield Strength by $0. Scoring hits on opponents increases ATK by $1 for 8s. Max 5 stacks. Can only occur once every 0.3s. While protected by a shield, this ATK increase effect is increased by 100%.`,
    refinements: [
      '20/25/30/35/40%',
      '4/5/6/7/8%',
    ]
  },
  'Sword',
  Rarity.Legendary,
  608,
  'ATK',
  49.6,
  [
    WeaponAscensionMaterials.XFromGuyun,
    Drops.SacrificialKnife,
    Drops.Mask
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (character.can('Shield')) {
      score += MODIFIERS.BONUS_ABILITY;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    }

    return score;
  },
  cs => cs.Qiqi
);

export const SunnyMorningSleepIn = new Weapon(
  'Sunny Morning Sleep-In',
  {
    value: `Elemental Mastery increases by $0 for 6s after triggering Swirl. Elemental Mastery increases by $1 for 9s after the wielder's Elemental Skill hits an opponent. Elemental Mastery increases by $2 for 30s after the wielder's Elemental Burst hits an opponent.`,
    refinements: [
      '120/150/180/210/240',
      '96/120/144/168/192',
      '32/40/48/56/64',
    ]
  },
  'Catalyst',
  Rarity.Legendary,
  542,
  'Elemental Mastery',
  265,
  [
    WeaponAscensionMaterials.NarukamisX,
    Drops.Ignited,
    Drops.Spectral
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (playstyle.needsStat('Elemental Mastery')) {
      score += MODIFIERS.STAT;

      if (character.canTrigger('playstyle-based', 'Swirl')) score += MODIFIERS.CAN_TRIGGER_ELEMENT;
      if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
      if (playstyle.prioritizesTalents('Burst/Ult')) score += MODIFIERS.TALENT;
    }


    return score;
  },
  cs => cs.YumemizukiMizuki
);

export const SurfsUp = new Weapon(
  `Surf's Up`,
  {
    value: `Max HP increased by $0. Once every 15s, for the 14s after using an Elemental Skill: Gain 4 Scorching Summer stacks. Each stack increases Normal Attack DMG by $1. For the duration of the effect, once every 1.5s, lose 1 stack after a Normal Attack hits an opponent; once every 1.5s, gain 1 stack after triggering a Vaporize reaction on an opponent. Max 4 Scorching Summer stacks.`,
    refinements: [
      '20/25/30/35/40%',
      '12/15/18/21/24%',
    ]
  },
  'Catalyst',
  Rarity.Legendary,
  542,
  'Crit DMG',
  88.2,
  [
    WeaponAscensionMaterials.BlazingSacrificialHearts,
    Drops.WayobWill,
    Drops.Fang
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;
    if (playstyle.prioritizesTalents('Normal/Press')) {
      score += MODIFIERS.TALENT;

      if (character.canTrigger('playstyle-based', 'Vaporize')) score += MODIFIERS.CAN_TRIGGER_ELEMENT;
    }

    return score;
  },
  cs => cs.Mualani
);

export const SwordOfDescension = new Weapon(
  'Sword of Descension',
  {
    value: `Effective only on the following platform: "PlayStation™ Network"\nHitting opponents with Normal and Charged Attacks grants a 50% chance to deal 200% ATK as DMG in a small AoE. This effect can only occur once every 10s. Additionally, if the Traveler equips the Sword of Descension, their ATK is increased by 66.`,
    refinements: []
  },
  'Sword',
  Rarity.Epic,
  440,
  'ATK',
  35.2,
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.LeyLineBranch,
    Drops.TreasureHoarderInsignia
  ],
  'Event',
  ({ playstyle, score, character }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (character.name.includes('Traveler')) score += MODIFIERS.BONUS_ABILITY;

    return score;
  },
);

export const SymphonistOfScents = new Weapon(
  'Symphonist of Scents',
  {
    value: `ATK is increased by $0. When the equipping character is off-field, ATK is increased by an additional $1. After initiating healing, the equipping character and the character(s) they have healed will obtain the "Sweet Echoes" effect, increasing their ATK by $2 for 3s. This effect can be triggered even if the equipping character is off-field.`,
    refinements: [
      '12/15/18/21/24%',
      '12/15/18/21/24%',
      '32/40/48/56/64%',
    ]
  },
  'Polearm',
  Rarity.Legendary,
  608,
  'Crit DMG',
  66.2,
  [
    WeaponAscensionMaterials.PureSacredDewdrop,
    Drops.TaintedWater,
    Drops.FontemerAberrantPearl
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (!playstyle.onField) {
      score += MODIFIERS.FIELD;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    }
    if (character.can('Heal')) {
      score += MODIFIERS.BONUS_ABILITY;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
      if (!playstyle.onField) score += MODIFIERS.FIELD;
    }

    return score;
  },
  cs => cs.Escoffier
);

export const SwordOfNarzissenkreuz = new Weapon(
  'Sword of Narzissenkreuz',
  {
    value: `When the equipping character does not have an Arkhe: When Normal Attacks, Charged Attacks, or Plunging Attacks strike, a Pneuma or Ousia energy blast will be unleashed, dealing $0 of ATK as DMG. This effect can be triggered once every 12s. The energy blast type is determined by the current type of the Sword of Narzissenkreuz.`,
    refinements: [
      '160/200/240/280/320%',
    ]
  },
  'Sword',
  Rarity.Epic,
  510,
  'ATK',
  41.3,
  [
    WeaponAscensionMaterials.AncientChord,
    Drops.Operatives,
    Drops.FontemerAberrantPearl
  ],
  'Quest',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (!playstyle.onField) score += MODIFIERS.FIELD; // Occurs rarely

    return score;
  },
);
// #endregion

// #region T  
export const TalkingStick = new Weapon(
  'Talking Stick',
  {
    value: `ATK will be increased by $0 for 15s after being affected by Pyro. This effect can be triggered once every 12s. All Elemental DMG Bonus will be increased by $1 for 15s after being affected by Hydro, Cryo, Electro, or Dendro. This effect can be triggered once every 12s.`,
    refinements: [
      '16/20/24/28/32%',
      '12/15/18/21/24%',
    ]
  },
  'Claymore',
  Rarity.Epic,
  565,
  'Crit Rate',
  18.4,
  [
    WeaponAscensionMaterials.OasisGardens,
    Drops.Shell,
    Drops.Slime,
  ],
  'Battle Pass',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (!playstyle.onField) score += MODIFIERS.FIELD; // Occurs rarely

    return score;
  },
);

export const TamayurateiNoOhanashi = new Weapon(
  'Tamayuratei no Ohanashi',
  {
    value: `Increase ATK by $0 and Movement SPD by 10% for 10s when using an Elemental Skill.`,
    refinements: [
      '20/25/30/35/40%'
    ]
  },
  'Polearm',
  Rarity.Epic,
  565,
  'Energy Recharge',
  30.6,
  [
    WeaponAscensionMaterials.MaskOfTheX,
    Drops.AbyssalLeaf,
    Drops.Handguard,
  ],
  'Event',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const TheAlleyFlash = new Weapon(
  'The Alley Flash',
  {
    value: `Increases DMG dealt by the character equipping this weapon by $0. Taking DMG disables this effect for 5s.`,
    refinements: [
      '12/15/18/21/24%',
    ]
  },
  'Sword',
  Rarity.Epic,
  620,
  'Elemental Mastery',
  55,
  [
    WeaponAscensionMaterials.XOfDecarabiansX,
    Drops.Horn,
    Drops.Scroll
  ],
  'Wish',
  ({ score }) => score,
);

export const TheBell = new Weapon(
  'The Bell',
  {
    value: `Taking DMG generates a shield which absorbs DMG up to $0 of Max HP. This shield lasts for 10s or until broken, and can only be triggered once every 45s. While protected by the shield, the character gains $1 increased DMG.`,
    refinements: [
      '20/23/26/29/32%',
      '12/15/18/21/24%',
    ]
  },
  'Claymore',
  Rarity.Epic,
  510,
  'HP',
  41.3,
  [
    WeaponAscensionMaterials.XOfDecarabiansX,
    Drops.Horn,
    Drops.Nectar
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const TheBlackSword = new Weapon(
  'The Black Sword',
  {
    value: `Increases DMG dealt by Normal and Charged Attacks by $0. Additionally, regenerates $1 of ATK as HP when Normal and Charged Attacks score a CRIT Hit. This effect can occur once every 5s.`,
    refinements: [
      '20/25/30/35/40%',
      '60/70/80/90/100%',
    ]
  },
  'Sword',
  Rarity.Epic,
  510,
  'Crit Rate',
  27.6,
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.LeyLineBranch,
    Drops.Slime
  ],
  'Battle Pass',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const TheDaybreakChronicles = new Weapon(
  'The Daybreak Chronicles',
  {
    value: `The equipping character gains Stirring Dawn Breeze: 3s after leaving combat, Normal Attack, Elemental Skill, and Elemental Burst DMG is increased by $0. While in combat, this DMG Bonus will decrease by $1 per second until it reaches 0%. When the equipping character's Normal Attacks, Elemental Skills, or Elemental Bursts hit an opponent, the DMG Bonus for the corresponding DMG type is increased by $2 until it reaches $3. This effect can be triggered once every 0.1s for each of the attack types mentioned above. This effect can be triggered even if the equipping character is off-field.\nAdditionally, when the party possesses Hexerei: Secret Rite effects, when the equipping character's Normal Attacks, Elemental Skills, or Elemental Bursts hit an opponent, the DMG Bonus for all these DMG types is increased by $4 instead.`,
    refinements: [
      '60/75/90/105/120%',
      '10/12.5/15/17.5/20%',
      '10/12.5/15/17.5/20%',
      '60/75/90/105/120%',
      '20/25/30/35/40%',
    ]
  },
  'Bow',
  Rarity.Legendary,
  674,
  'Crit DMG',
  44.1,
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.Horn,
    Drops.TreasureHoarderInsignia
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (!playstyle.onField) {
      score += MODIFIERS.FIELD;

      if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
      if (playstyle.prioritizesTalents('Burst/Ult')) score += MODIFIERS.TALENT;
      if (playstyle.prioritizesTalents('Normal/Press')) score += MODIFIERS.TALENT;
      if (character.can('Hexerei Able')) score += MODIFIERS.BONUS_ABILITY + (MODIFIERS.TALENT * 3);
    }

    return score;
  },
  cs => cs.Venti,
);

export const TheDockhandsAssistant = new Weapon(
  `The Dockhand's Assistant`,
  {
    value: `When the wielder is healed or heals others, they will gain a Stoic's Symbol that lasts 30s, up to a maximum of 3 Symbols. When using their Elemental Skill or Burst, all Symbols will be consumed and the Roused effect will be granted for 10s. For each Symbol consumed, gain $0 Elemental Mastery, and 2s after the effect occurs, $1 Energy per Symbol consumed will be restored for said character. The Roused effect can be triggered once every 15s, and Symbols can be gained even when the character is not on the field.`,
    refinements: [
      '40/50/60/70/80',
      '2/2.5/3/3.5/4',
    ]
  },
  'Sword',
  Rarity.Epic,
  510,
  'HP',
  41.3,
  [
    WeaponAscensionMaterials.PureSacredDewdrop,
    Drops.Operatives,
    Drops.FontemerAberrantPearl
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (character.can('Heal', 'Self-heal')) {
      if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
      if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;
      if (!playstyle.onField) score += MODIFIERS.FIELD;
    }

    return score;
  },
);

export const TheFirstGreatMagic = new Weapon(
  'The First Great Magic',
  {
    value: `DMG dealt by Charged Attacks increased by $0. For every party member with the same Elemental Type as the wielder (including the wielder themselves), gain 1 Gimmick stack. For every party member with a different Elemental Type from the wielder, gain 1 Theatrics stack. When the wielder has 1/2/3 or more Gimmick stacks, ATK will be increased by $1. When the wielder has 1/2/3 or more Theatrics stacks, Movement SPD will be increased by $2.`,
    refinements: [
      '16/20/24/28/32%',
      '(16/32/48%)/(20/40/60%)/(24/48/72%)/(28/56/84%)/(32/64/96%)',
      '(4/7/10%)/(6/9/12%)/(8/11/14%)/(10/13/16%)/(12/15/18%)',
    ]
  },
  'Bow',
  Rarity.Legendary,
  608,
  'Crit DMG',
  66.2,
  [
    WeaponAscensionMaterials.AncientChord,
    Drops.TaintedWater,
    Drops.FontemerAberrantPearl
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Charged/Hold')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
  cs => cs.Lyney
);

export const TheFlute = new Weapon(
  'The Flute',
  {
    value: `Normal or Charged Attacks grant a Harmonic on hits. Gaining 5 Harmonics triggers the power of music and deals $0 ATK DMG to surrounding opponents. Harmonics last up to 30s, and a maximum of 1 can be gained every 0.5s.`,
    refinements: [
      '100/125/150/175/200%',
    ]
  },
  'Sword',
  Rarity.Epic,
  510,
  'ATK',
  41.3,
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.LeyLineBranch,
    Drops.Slime
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) {
      score += MODIFIERS.TALENT;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    }

    return score;
  },
);

export const TheStringless = new Weapon(
  'The Stringless',
  {
    value: `Increases Elemental Skill and Elemental Burst DMG by $0.`,
    refinements: [
      '24/30/36/42/48%',
    ]
  },
  'Bow',
  Rarity.Epic,
  510,
  'Elemental Mastery',
  165,
  [
    WeaponAscensionMaterials.XOfDecarabiansX,
    Drops.Horn,
    Drops.Arrowhead
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability', 'Burst/Ult')) {
      score += MODIFIERS.TALENT * 2; // big buff
    }

    return score;
  },
);

export const TheUnforged = new Weapon(
  'The Unforged',
  {
    value: `Increases Shield Strength by $0. Scoring hits on opponents increases ATK by $1 for 8s. Max 5 stacks. Can only occur once every 0.3s. While protected by a shield, this ATK increase effect is increased by 100%.`,
    refinements: [
      '20/25/30/35/40%',
      '4/5/6/7/8%',
    ]
  },
  'Claymore',
  Rarity.Legendary,
  608,
  'ATK',
  49.6,
  [
    WeaponAscensionMaterials.MistXElixir,
    Drops.MistGrass,
    Drops.TreasureHoarderInsignia
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (character.can('Shield')) {
      score += MODIFIERS.BONUS_ABILITY;

      if (playstyle.onField) score += MODIFIERS.FIELD;
      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    }
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  },
  cs => cs.Xinyan
);

export const TheViridescentHunt = new Weapon(
  'The Viridescent Hunt',
  {
    value: `Upon hit, Normal and Charged Attacks have a 50% chance to generate a Cyclone, which will continuously attract surrounding opponents, dealing $0 of ATK as DMG to these opponents every 0.5s for 4s. This effect can only occur once every $1.`,
    refinements: [
      '40/50/60/70/80%',
      '14/13/12/11/10s',
    ]
  },
  'Bow',
  Rarity.Epic,
  510,
  'Crit Rate',
  27.6,
  [
    WeaponAscensionMaterials.XOfDecarabiansX,
    Drops.Horn,
    Drops.Arrowhead
  ],
  'Battle Pass',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press', 'Charged/Hold')) {
      score += MODIFIERS.TALENT;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    }

    return score;
  },
);

export const TheWidsith = new Weapon(
  'The Widsith',
  {
    value: `When a character takes the field, they will gain a random theme song for 10s. This can only occur once every 30s.\nRecitative: Increases Base ATK by $0\nAria: Increases all Elemental DMG by $1\nInterlude: Elemental Mastery is increased by $2`,
    refinements: [
      '60/75/90/105/120%',
      '48/60/72/84/96%',
      '240/300/360/420/480'
    ]
  },
  'Catalyst',
  Rarity.Epic,
  510,
  'Crit DMG',
  55.1,
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.LeyLineBranch,
    Drops.Mask
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.onField) {
      score += MODIFIERS.FIELD;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
      if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
    }

    return score;
  }
);

export const ThrillingTalesOfDragonSlayers = new Weapon(
  'Thrilling Tales of Dragon Slayers',
  {
    value: `When switching characters, the new character taking the field has their ATK increased by $0 for 10s. This effect can only occur once every 20s.`,
    refinements: [
      '24/30/36/42/48%',
    ]
  },
  'Catalyst',
  Rarity.Rare,
  401,
  'HP',
  35.2,
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.LeyLineBranch,
    Drops.Scroll
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (!playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  }
);

export const ThunderingPulse = new Weapon(
  'Thundering Pulse',
  {
    value: `Increases ATK by $0 and grants the might of the Thunder Emblem. At stack levels 1/2/3, the Thunder Emblem increases Normal Attack DMG by $1. The character will obtain 1 stack of Thunder Emblem in each of the following scenarios: Normal Attack deals DMG (stack lasts 5s), casting Elemental Skill (stack lasts 10s); Energy is less than 100% (stack disappears when Energy is full). Each stack's duration is calculated independently.`,
    refinements: [
      '20/25/30/35/40%',
      '(12/24/40%)/(15/30/50%)/(18/36/60%)/(21/42/70%)/(24/48/80%)',
    ]
  },
  'Bow',
  Rarity.Legendary,
  608,
  'Crit DMG',
  66.2,
  [
    WeaponAscensionMaterials.NarukamisX,
    Drops.Prism,
    Drops.Arrowhead
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (playstyle.prioritizesTalents('Normal/Press')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('Energy Recharge')) score -= MODIFIERS.STAT;

    return score;
  },
  cs => cs.Yoimiya
);

export const TidalShadow = new Weapon(
  'Tidal Shadow',
  {
    value: `After the wielder is healed, ATK will be increased by $0 for 8s. This can be triggered even when the character is not on the field.`,
    refinements: [
      '24/30/36/42/48%',
    ]
  },
  'Sword',
  Rarity.Epic,
  510,
  'ATK',
  41.3,
  [
    WeaponAscensionMaterials.GobletOfThePristineSea,
    Drops.BreacherCore,
    Drops.Gear
  ],
  'Crafting',
  ({ playstyle, score, character }) => {
    if (character.can('Self-heal')) score += MODIFIERS.BONUS_ABILITY;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  }
);

export const TomeOfTheEternalFlow = new Weapon(
  'Tome of the Eternal Flow',
  {
    value: `HP is increased by $0. When current HP increases or decreases, Charged Attack DMG will be increased by $1 for 4s. Max 3 stacks. This effect can be triggered once every 0.3s. When the character has 3 stacks or a third stack's duration refreshes, $2 Energy will be restored. This Energy restoration effect can be triggered once every 12s.`,
    refinements: [
      '16/20/24/28/32%',
      '14/18/22/26/30%',
      '8/9/10/11/12'
    ]
  },
  'Catalyst',
  Rarity.Legendary,
  542,
  'Crit DMG',
  88.2,
  [
    WeaponAscensionMaterials.PureSacredDewdrop,
    Drops.TaintedWater,
    Drops.Gear
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('HP')) score += MODIFIERS.STAT;
    if (playstyle.prioritizesTalents('Charged/Hold')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;

    return score;
  },
  cs => cs.Neuvillette
);

export const ToukabouShigure = new Weapon(
  'Toukabou Shigure',
  {
    value: `After an attack hits opponents, it will inflict an instance of Cursed Parasol upon one of them for 10s. This effect can be triggered once every 15s. If this opponent is defeated during Cursed Parasol's duration, Cursed Parasol's CD will be refreshed immediately. The character wielding this weapon will deal $0 more DMG to the opponent affected by Cursed Parasol.`,
    refinements: [
      '16/20/24/28/32%',
    ]
  },
  'Sword',
  Rarity.Epic,
  510,
  'Elemental Mastery',
  165,
  [
    WeaponAscensionMaterials.NarukamisX,
    Drops.PrimalConstructPrism,
    Drops.Handguard
  ],
  'Event',
  ({ playstyle, score }) => {
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const TravelersHandySword = new Weapon(
  `Traveler's Handy Sword`,
  {
    value: `Each Elemental Orb or Particle collected restores $0 HP.`,
    refinements: [
      '1/1.25/1.5/1.75/2%'
    ]
  },
  'Sword',
  Rarity.Rare,
  448,
  'DEF',
  29.3,
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.RuinGuardChaos,
    Drops.Scroll
  ],
  'Chest',
  ({ playstyle, score }) => {
    if (playstyle.onField) score += MODIFIERS.FIELD;
    if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;

    return score;
  },
);

export const TulaytullahsRemembrance = new Weapon(
  `Tulaytullah's Remembrance`,
  {
    value: `Normal Attack SPD is increased by $0. After the wielder unleashes an Elemental Skill, Normal Attack DMG will increase by $1 every second for 14s. After hitting an opponent with a Normal Attack during this duration, Normal Attack DMG will be increased by $2. This increase can be triggered once every 0.3s. The maximum Normal Attack DMG increase per single duration of the overall effect is $3. The effect will be removed when the wielder leaves the field, and using the Elemental Skill again will reset all DMG buffs.`,
    refinements: [
      '10/12.5/15/17.5/20%',
      '4.8/6/7.2/8.4/9.6%',
      '9.6/12/14.4/16.8/19.2%',
      '48/60/72/84/96%',
    ]
  },
  'Catalyst',
  Rarity.Legendary,
  674,
  'Crit DMG',
  44.1,
  [
    WeaponAscensionMaterials.ScorchingMight,
    Drops.FungalNucleus,
    Drops.FungalSpores
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.onField) score += MODIFIERS.FIELD; // SPD increase
    if (playstyle.prioritizesTalents('Normal/Press')) score += MODIFIERS.TALENT * 2; // double buff

    return score;
  },
  cs => cs.WandererScaramouche
);

export const TwinNephrite = new Weapon(
  'Twin Nephrite',
  {
    value: `Defeating an opponent increases Movement SPD and ATK by $0 for 15s.`,
    refinements: [
      '12/14/16/18/20%',
    ]
  },
  'Catalyst',
  Rarity.Rare,
  448,
  'Crit Rate',
  15.6,
  [
    WeaponAscensionMaterials.MistXElixir,
    Drops.MistGrass,
    Drops.FatuiInsignia
  ],
  'Chest',
  ({ playstyle, score }) => {
    if (playstyle.onField) score += MODIFIERS.FIELD; // SPD increase
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  },
);
// #endregion

// #region U
export const UrakuMisugiri = new Weapon(
  'Uraku Misugiri',
  {
    value: `Normal Attack DMG is increased by $0 and Elemental Skill DMG is increased by $1. After a nearby active character deals Geo DMG, the aforementioned effects increase by 100% for 15s. Additionally, the wielder's DEF is increased by $2.`,
    refinements: [
      '16/20/24/28/32%',
      '24/30/36/42/48%',
      '20/25/30/35/40%'
    ]
  },
  'Sword',
  Rarity.Legendary,
  542,
  'Crit DMG',
  88.2,
  [
    WeaponAscensionMaterials.XBranchOfAXSea,
    Drops.RuinDrakeChaos,
    Drops.Handguard
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press')) score += MODIFIERS.TALENT;
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('DEF')) score += MODIFIERS.STAT;

    return score;
  },
  cs => cs.Chiori
);
// #endregion

// #region V
export const Verdict = new Weapon(
  'Verdict',
  {
    value: `Increases ATK by $0. When party members obtain Elemental Shards from Crystallize reactions, the equipping character will gain 1 Seal, increasing Elemental Skill DMG by $1. The Seal lasts for 15s, and the equipper may have up to 2 Seals at once. All of the equipper's Seals will disappear 0.2s after their Elemental Skill deals DMG.`,
    refinements: [
      '20/25/30/35/40%',
      '18/22.5/27/31.5/36%',
    ]
  },
  'Claymore',
  Rarity.Legendary,
  674,
  'Crit Rate',
  22.1,
  [
    WeaponAscensionMaterials.AncientChord,
    Drops.BreacherCore,
    Drops.Gear
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (character.canTrigger('playstyle-based', 'Crystallize')) {
      score += MODIFIERS.BONUS_ABILITY;

      if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    }

    return score;
  },
  cs => cs.Navia
);

export const VividNotions = new Weapon(
  'Vivid Notions',
  {
    value: `ATK is increased by $0. When you use a Plunging Attack, you will gain the "Dawn's First Hue" effect: Plunging Attack CRIT DMG is increased by $1. When you use an Elemental Skill or Burst, you will gain the "Twilight's Splendor" effect: Plunging Attack CRIT DMG is increased by $2. The two effects above each last for 15s, and will be canceled 0.1s after the ground impact hits a target.`,
    refinements: [
      '28/35/42/49/56%',
      '28/35/42/49/56%',
      '40/50/60/70/80%',
    ]
  },
  'Catalyst',
  Rarity.Legendary,
  674,
  'Crit DMG',
  44.1,
  [
    WeaponAscensionMaterials.DeliriousXOfTheSacredLord,
    Drops.WeaselShell,
    Drops.Fang
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (playstyle.prioritizesTalents('Plunging/Press')) score += MODIFIERS.TALENT * 2; // double buff

    return score;
  },
  cs => cs.Varesa
);

export const VortexVanquisher = new Weapon(
  'Vortex Vanquisher',
  {
    value: `Increases Shield Strength by $0. Scoring hits on opponents increases ATK by $1 for 8s. Max 5 stacks. Can only occur once every 0.3s. While protected by a shield, this ATK increase effect is increased by 100%.`,
    refinements: [
      '20/25/30/35/40%',
      '4/5/6/7/8%',
    ]
  },
  'Polearm',
  Rarity.Legendary,
  608,
  'ATK',
  49.6,
  [
    WeaponAscensionMaterials.XOfAerosiderite,
    Drops.BoneShard,
    Drops.TreasureHoarderInsignia
  ],
  'Wish',
  ({ playstyle, score, character }) => {
    if (character.can('Shield')) {
      score += MODIFIERS.BONUS_ABILITY;

      if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    }
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  },
  cs => cs.Zhongli
);
// #endregion

// #region W
export const WanderingEvenstar = new Weapon(
  'Wandering Evenstar',
  {
    value: `The following effect will trigger every 10s: The equipping character will gain $0 of their Elemental Mastery as bonus ATK for 12s, with nearby party members gaining 30% of this buff for the same duration. Multiple instances of this weapon can allow this buff to stack. This effect will still trigger even if the character is not on the field.`,
    refinements: [
      '24/30/36/42/48%',
    ]
  },
  'Catalyst',
  Rarity.Epic,
  510,
  'Elemental Mastery',
  165,
  [
    WeaponAscensionMaterials.OasisGardens,
    Drops.FungalNucleus,
    Drops.FungalSpores
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('Elemental Mastery')) score += MODIFIERS.STAT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (!playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const WavebreakersFin = new Weapon(
  `Wavebreaker's Fin`,
  {
    value: `For every point of the entire party's combined maximum Energy capacity, the Elemental Burst DMG of the character equipping this weapon is increased by $0. A maximum of $1 increased Elemental Burst DMG can be achieved this way.`,
    refinements: [
      '0.12/0.15/0.18/0.21/0.24%',
      '40/50/60/70/80%'
    ]
  },
  'Polearm',
  Rarity.Epic,
  620,
  'ATK',
  13.8,
  [
    WeaponAscensionMaterials.MaskOfTheX,
    Drops.ConcealedClaw,
    Drops.Handguard
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Burst/Ult')) score += MODIFIERS.TALENT;

    return score;
  },
);

export const WaveridingWhirl = new Weapon(
  'Waveriding Whirl',
  {
    value: `Decreases Swimming Stamina consumption by 15%. In addition, for 10s after using an Elemental Skill, Max HP is increased by $0. For every Hydro Elemental Type character in the party, Max HP is increased by another $1, and the maximum increase that can be achieved in this way is $2. Can be triggered once every 15s.`,
    refinements: [
      '20/25/30/35/40%',
      '12/15/18/21/24%',
      '24/30/36/42/48%'
    ]
  },
  'Catalyst',
  Rarity.Epic,
  454,
  'Energy Recharge',
  61.3,
  [
    WeaponAscensionMaterials.BlazingSacrificialHearts,
    Drops.WayobWill,
    Drops.Fang
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('HP')) score += MODIFIERS.STAT * 2; // big buff

    return score;
  },
);

export const WhiteIronGreatsword = new Weapon(
  'White Iron Greatsword',
  {
    value: `Defeating an opponent restores $0 HP.`,
    refinements: [
      '8/10/12/14/16%',
    ]
  },
  'Claymore',
  Rarity.Rare,
  401,
  'DEF',
  43.9,
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.RuinGuardChaos,
    Drops.Slime
  ],
  'Chest',
  ({ playstyle, score }) => {
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const WhiteTassel = new Weapon(
  'White Tassel',
  {
    value: `Increases Normal Attack DMG by $0.`,
    refinements: [
      '24/30/36/42/48%'
    ]
  },
  'Polearm',
  Rarity.Rare,
  401,
  'Crit Rate',
  23.4,
  [
    WeaponAscensionMaterials.XFromGuyun,
    Drops.SacrificialKnife,
    Drops.FatuiInsignia
  ],
  'Chest',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press')) score += MODIFIERS.TALENT;

    return score;
  },
);

export const Whiteblind = new Weapon(
  'Whiteblind',
  {
    value: `On hit, Normal or Charged Attacks increase ATK and DEF by $0 for 6s. Max 4 stacks. This effect can only occur once every 0.5s.`,
    refinements: [
      '6/7.5/9/10.5/12%',
    ]
  },
  'Claymore',
  Rarity.Rare,
  510,
  'DEF',
  51.7,
  [
    WeaponAscensionMaterials.XFromGuyun,
    Drops.SacrificialKnife,
    Drops.TreasureHoarderInsignia
  ],
  'Crafting',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (playstyle.needsStat('DEF')) score += MODIFIERS.STAT;
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const WindblumeOde = new Weapon(
  'Windblume Ode',
  {
    value: `After using an Elemental Skill, receive a boon from the ancient wish of the Windblume, increasing ATK by $0 for 6s.`,
    refinements: [
      '16/20/24/28/32%',
    ]
  },
  'Bow',
  Rarity.Rare,
  510,
  'Elemental Mastery',
  165,
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.LeyLineBranch,
    Drops.Nectar
  ],
  'Event',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  },
);

export const WineAndSong = new Weapon(
  'Wine and Song',
  {
    value: `Hitting an opponent with a Normal Attack decreases the Stamina consumption of Sprint or Alternate Sprint by $0 for 5s. Additionally, using a Sprint or Alternate Sprint ability increases ATK by $1 for 5s.`,
    refinements: [
      '14/16/18/20/22%',
      '20/25/30/35/40%',
    ]
  },
  'Catalyst',
  Rarity.Rare,
  565,
  'Energy Recharge',
  30.6,
  [
    WeaponAscensionMaterials.BorealWolfsXTooth,
    Drops.LeyLineBranch,
    Drops.TreasureHoarderInsignia
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Normal/Press')) score += MODIFIERS.TALENT;
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;
    if (playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  },
);

export const WolfFang = new Weapon(
  'Wolf-Fang',
  {
    value: `DMG dealt by Elemental Skill and Elemental Burst is increased by $0. When an Elemental Skill hits an opponent, its CRIT Rate will be increased by $1. When an Elemental Burst hits an opponent, its CRIT Rate will be increased by $2. Both of these effects last 10s separately, have 4 max stacks, and can be triggered once every 0.1s.`,
    refinements: [
      '16/20/24/28/32%',
      '2/2.5/3/3.5/4%',
      '2/2.5/3/3.5/4%',
    ]
  },
  'Sword',
  Rarity.Epic,
  510,
  'Crit Rate',
  27.6,
  [
    WeaponAscensionMaterials.XOfDecarabiansX,
    Drops.RuinGuardChaos,
    Drops.Mask
  ],
  'Battle Pass',
  ({ playstyle, score }) => {
    if (playstyle.prioritizesTalents('Skill/Ability')) score += MODIFIERS.TALENT * 2; // CRIT increase
    if (playstyle.prioritizesTalents('Burst/Ult')) score += MODIFIERS.TALENT * 2; // CRIT increase

    return score;
  },
);

export const WolfsGravestone = new Weapon(
  `Wolf's Gravestone`,
  {
    value: `Increases ATK by $0. On hit, attacks against enemies with less than 30% HP increase all party members' Base ATK by $1 for 12s. Can only occur once every 30s.`,
    refinements: [
      '20/25/30/35/40%',
      '40/50/60/70/80%',
    ]
  },
  'Claymore',
  Rarity.Legendary,
  608,
  'ATK',
  49.6,
  [
    WeaponAscensionMaterials.XOfDandelionGladiator,
    Drops.RuinGuardChaos,
    Drops.Scroll
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('ATK')) score += MODIFIERS.STAT;

    return score;
  },
  cs => cs.Diluc
);
// #endregion

// #region X
export const XiphosMoonlight = new Weapon(
  `Xiphos' Moonlight`,
  {
    value: `The following effect will trigger every 10s: The equipping character will gain $0 Energy Recharge for each point of Elemental Mastery they possess for 12s, with nearby party members gaining 30% of this buff for the same duration. Multiple instances of this weapon can allow this buff to stack. This effect will still trigger even if the character is not on the field.`,
    refinements: [
      '0.036/0.045/0.054/0.063/0.072%',
    ]
  },
  'Sword',
  Rarity.Rare,
  510,
  'Elemental Mastery',
  165,
  [
    WeaponAscensionMaterials.TalismanOfTheForestDew,
    Drops.PrimalConstructPrism,
    Drops.EremiteDrop
  ],
  'Wish',
  ({ playstyle, score }) => {
    if (playstyle.needsStat('Energy Recharge')) score += MODIFIERS.STAT;
    if (!playstyle.onField) score += MODIFIERS.FIELD;

    return score;
  }
);
// #endregion

// #region Y
// #endregion

// #region Z
// #endregion

/**
 
https://paimon.moe/weapons
https://genshin.gg/weapons/
https://docs.google.com/document/d/1PZOlgDlOeczabhEdyqYJiQ4qSBwBjM3fx8YY_sL8u9U/edit?tab=t.0

 */