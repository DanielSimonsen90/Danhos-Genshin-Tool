import type { Reaction } from "./genshin";

export type AbilityType = 'Normal/Press' | 'Charged/Hold' | 'Plunging/Hold' | 'Skill/Ability' | 'Burst/Ult';
export type BonusAbility = (
| 'Off-field Damage' 
| 'Shield' | 'Heal' | 'Self-heal' | 'Bond of Life' 
| 'Nightsouls Blessing' | `Serpent's Subtlety` 
| 'Grouping'
| `Buff ATK: ${string}` | `Elemental based: ${string}` | `CRIT Increase: ${string}` | `Buff ATK Speed: ${string}` | `Elemental Infusion: ${string}`
);
export type WeaponType = 'Sword' | 'Claymore' | 'Polearm' | 'Bow' | 'Catalyst';
export type CharacterSetName = `${'On-field' | 'Off-field' | Reaction | 'Burst' | 'Freeze' | 'Reverse-Melt' | 'Physical'} ${'DPS' | 'Support'}`;