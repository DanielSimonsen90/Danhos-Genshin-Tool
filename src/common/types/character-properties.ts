import type { Reaction } from "./genshin";

export type AbilityType = 'Normal/Press' | 'Charged/Hold' | 'Plunging/Hold' | 'Skill/Ability' | 'Burst/Ult';
export type BonusAbility = 'Off-field Damage' | 'Shield' | 'Heal' | 'Buff ATK' | 'Self-heal' | 'Bond of Life' | 'Nightsouls Blessing' | 'Grouping';
export type Weapon = 'Sword' | 'Claymore' | 'Polearm' | 'Bow' | 'Catalyst';
export type CharacterSetName = `${'On-field' | 'Off-field' | Reaction | 'Burst' | 'Freeze' | 'Reverse-Melt' | 'Physical'} ${'DPS' | 'Support'}`;