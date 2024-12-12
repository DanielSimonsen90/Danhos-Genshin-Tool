import type { Reaction } from "./genshin";

export type AbilityType = 'Normal/Press' | 'Charged/Hold' | 'Plunging/Hold' | 'Skill/Ability' | 'Burst/Ult';
export type BonusAbility = (
| 'Off-field Damage' 
| 'Shield' | 'Heal' | 'Self-heal' | 'Bond of Life' 
| 'Nightsouls Blessing' | 'Grouping'
| `Buff ATK: ${string}` | `Elemental based: ${string}` | `CRIT Increase: ${string}`
);
export type Weapon = 'Sword' | 'Claymore' | 'Polearm' | 'Bow' | 'Catalyst';
export type CharacterSetName = `${'On-field' | 'Off-field' | Reaction | 'Burst' | 'Freeze' | 'Reverse-Melt' | 'Physical'} ${'DPS' | 'Support'}`;