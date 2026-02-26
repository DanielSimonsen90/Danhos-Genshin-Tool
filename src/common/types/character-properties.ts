import type { Reaction, TeyvatRegion, Element, LunarReaction } from "./genshin";

export type TalentType = 'Normal/Press' | 'Charged/Hold' | 'Plunging/Press' | 'Skill/Ability' | 'Burst/Ult';
export type BonusAbilityBase = (
  | 'Off-field Damage' 
  | 'Shield' | 'Heal' | 'Self-heal' | 'Bond of Life' 
  | 'Nightsouls Blessing' | `Serpent's Subtlety`  
  | `Enables ${LunarReaction} Reaction`
  | 'Increases Moonsign'
  | 'Grouping'
);
export type BonusAbilitySimple = (
  | BonusAbilityBase
  | 'Buff ATK' | 'Elemental Based' | 'CRIT Increase'
  | 'Buff ATK Speed' | 'Elemental Infusion' | 'Hexerei Able'
);
export type BonusAbility = (
  BonusAbilityBase
  | `Buff ATK: ${string}` | `Elemental Based: ${string}` | `CRIT Increase: ${string}` 
  | `Buff ATK Speed: ${string}` | `Elemental Infusion: ${string}` | `Hexerei Able: ${string}`
);


export type WeaponType = 'Sword' | 'Claymore' | 'Polearm' | 'Bow' | 'Catalyst';
export type CharacterSetName = `${'On-field' | 'Off-field' | 'Burst'}${` ${Reaction | Element}` | ''} ${'DPS' | 'Support'}`;

export type PlayerTransportationType = 'Sprinting' | 'Gliding' | 'Swimming' | 'Climbing' | 'Aquatic Stamina' | 'Underwater Sprint Speed'
export type CraftableType = 'Potions' | 'Character Talent Materials' | 'Weapon Ascension Materials';
export type FoodBuffType = 'Restorative' | 'Attack' | 'Defense' | 'Adventure'
export type MapIconType = 'Ore veins used in forging' | `Local Specialties in ${TeyvatRegion}` | 'Recovery Orbs (stamina & hp gained from collision increased by 25%)'


export type PassiveTalent = (

  // Movement
  | `${'15' | '20' | '35'}% ${PlayerTransportationType} consumption reduction.`
  | `${'15'}% ${PlayerTransportationType} speed increase.`
  | `During ${'Night (18:00 - 06:00)' | 'Day (06:00 - 18:00)'}, party members gain ${'10'}% increased movement speed.`
  | `${'30'}% Xenochromatic Fontemer Aberrant ability cooldown reduction.`
  | `${'10%'} movement speed increase when not wearing default skin or wings for any party member.`
  | `While under water and your active character's HP fall below 50%, the active character will be healed over 2.5s and gain Elemental and Physical resistance decrease by 10% for 10s. This can be triggered once every 20s.`
  
  // Nightsoul
  | `Triggering Nightsoul Transmission restores 15 Phlogiston.`
  | `25 Phlogiston is restored when own party members defeat an opponent. This effect can be triggered once every 12s.`
  | `Triggering Nightsoul Burst within an area with Phlogiston Mechanics in Natlan restores 20 Phlogiston.`
  | `20% Nightsoul Transmission cooldown reduction.`
  | `Gain 10 Phlogiston when Phlogison levels drop below 50%. This effect can be triggered once every 10s.`
  | `Sprint speed increased but sprint consumption is also increased outside of combat. Additionally, party members will restore 20 Phlogiston when consuming food. This effect can be triggered once every 10s.`
  | `When current character or indwelt saurian has less than 40% HP, they are healed by 40% of their HP with that consumes 10 Phlogiston. This effect can be triggered once every 10s.`

  // Materials
  | `${'10' | '20' | '25'}% chance of ${`refund materials used` | `double product`} when crafting ${CraftableType}${` and ${CraftableType}` |''}.`
  | `${'25'}% chance to get 1 regional ${CraftableType} when crafting ${CraftableType}.`
  
  // Refund
  | `${'50'}% mora cost reduction when ascending ${WeaponType} and ${WeaponType} weapons.`
  | `${'15'}% chance of refunding ore when crafting ${WeaponType} weapons.`
  | `${'100'}% chance of refunding a portion of materials used when crafting decoration, ornament and landscape-type furnishings.`
  | `${'100'}% chance of refunding a portion of materials used when crafting building, courtyard and landscape-type furnishings.`
  
  // Food
  | `${'12'}% chance of double product when cooking ${FoodBuffType} foods.`
  | `${'18'}% chance of receiving additional "Suspicious" dish of same food type when cooking.`
  | `When in party, party members that consumed non reviving foods have a 30% chance of recovering additional HP. Trigger chance is increased depending on friendship level of the food consuming character.`
  | `When using food, there is a ${'30'}% chance of gaining seasoning ingredient.`
  
  // Expedition
  | `Shows ${MapIconType} on minimap.`
  | `${'25'}% ${'time consumption reduction' | 'more rewards'} when on expeditions in ${TeyvatRegion}.`
  | 'Party members will not startle Crystalflies and certain other animals.'
  | `Party members will not startle animals who produce: Fowl, Raw or Chilled meat.`

  // Traveler
  | `CRIT Rate +10%. When Pyro/Hydro/CryoElectro attacks from nearby party member hit opponents, gain 1 stack of Blade of the Dawn Breeze. Each Elemental type grants 1 stack. After obtaining 2+, performing CA consumes all stacks to transform into CA: Whirlwind: Each CA deals Anemo DMG. +60% of Traveler's ATK. Every consumption, Blade Wind summoned dealing 50% of Traveler's ATK - considered CA damage. 15s CD.`
  | `DEF +20%. When members protected by shield and shield is replaced or Geo Constructs are created, Traveler receives 1 stack of Blade of Archaic Petra of 3 stacks. 1 stack/s. After 3, performing CA consumes all stacks to transform into CA: Rockfell. Each CA deals Geo DMG +120% of Traveler's ATK. After hit of opponent, +20% shield strength for party members for 15s. 15s CD.`
  | `Energy Recharge +20%. When members burst/ult, Traveler receives 1 stack of Blade of Resounding Thunder of 3 stacks. After 3, performing CA consumes all stacks to transform into CA: Detonate. Each CA deals Electro DMG +100% of Traveler's ATK. 3s after hitting opponent, 1 additional lightning strike triggered, dealing Electro DMG of 200% Traveler's ATK. 1 Abundance Amulet created. DMG is considered CA DMG. 15s CD.`
  | `Elemental Master +60. When Dendro/Bountiful Cores or Seeds of Deceit appears on field or party obtains Verdant Dew, Traveler gains 1 stack of Blade of Verdant Virids. These 2 methods each grant +1 stack/4s of 3. After 3, performing CA consumes all stacks to transform into CA: Verdessence. Each CA deals Dendro DMG +80% of Traveler's ATK. Two Vinecores created, which explode after 4/8s respectively, dealing Dendro DMG of 120% of Traveler's ATK - considered CA DMG. 15s CD.`
  | `HP +20%. When party members' HP change by 5%, Traveler receives 1 stack of Blade of Many Waters every 4s of 3 stacks. After 3, performing CA consumes all stacks to transform into CA: Tidebound. Each CA deals Hydro DMG +150% of Traveler's ATK. When Traveler's HP > 50%, 10% of max HP consumed to increase DMG inflicted by CA by 100% of Traveler's ATK. When HP < 50%, one instance of healing = 25% of max HP restored upon hitting an enemy. 15s CD.`
  | `ATK +20%. When party members trigger Nightsoul burst, Traveler receives 1 stack of Blade of Sacred Flame of 2 stacks. After 3, performing CA consumes all stacks to transform into CA: Inferno. Each CA deals Nightsoul-aligned Pyro DMG +200% of Traveler's ATK. 15s CD.`

  // Special
  | `Increase your own party members' Normal Attack level by 1.`
  | `${'20'}% of double catch when fishing in ${TeyvatRegion}.`
  | `${'25'}% chance of receiving additional log when party members attack trees.`
  | `Can use Skill to interact with some harvestable items within a fixed AoE.`
  | `When in team, certain harvestable items will trigger a healing effect on the active character consisting of 2.5% of this character's Max HP.`
  | `Can take photos using Skill after "Special Analysis Zoom Lens" item is activated.`
  | `Gains 40% Pyro DMG Bonus and can only be healed using Burst/Ult.`
  | `When Lumidouce Case (lamp) is on field, all party members gain 85% Pyro RES against Burning DMG.`
  | `Once a week (reset Monday 4am EST), Low-Temperature Cooking (Skill) can produce foods after hitting a certain limit of elemental energy absorption.`
  | `Elemental Skill is increased by 1 level for all party members, if the team consists of Hydro/Cryo characters and at least 1 of each element.`
  | `While in Nod-Krai, if a member on your team dies, Columbina will revive them and restore health based on Columbina's friendship level. Cooldown 100s. Does not work in domains.`
  | `Collects elemental energy at night`
  | `For every party member from Mondstadt, the Hold version of Varka's Elemental Skill "Windbound Execution"'s cooldown is decreased by 5%.`
);

export type TriggerableReactionFilter = 'all' | 'playstyle-based';