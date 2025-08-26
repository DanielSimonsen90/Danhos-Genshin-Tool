import type { ArtifactPartName } from '@/common/types';

// Thresholds and multipliers
export const SHOULD_SAVE_THRESHOLD = 150;
export const SET_PRIORITY_MULTIPLIER = 2; // Reduced from 10 to prioritize stat synergy over set preference
export const PART_SCORE_BASE_MULTIPLIER = 15;

// Artifact piece base scores
export const ARTIFACT_PIECES_SCORES: Record<ArtifactPartName, number> = {
  Flower: 1,
  Feather: 1,
  Sands: 2,
  Goblet: 4,
  Circlet: 3,
};

// Main stat scoring constants
export const MAIN_STAT_SCORES = {
  // Premium stats (perfect match for element/role)
  ELEMENTAL_DMG_BONUS_MATCH: 80,
  ELEMENTAL_DMG_BONUS_MISMATCH: 25,
  
  // Scaling stats (HP/ATK/DEF for characters who scale with them)
  SCALING_STAT_MATCH: 50,
  SCALING_STAT_MISMATCH: 8,
  DEF_MISMATCH: 2, // DEF is less valuable when not needed
  
  // Universal and utility stats
  CRIT_STATS: 25, // Always valuable
  EM_MATCH: 15,
  EM_MISMATCH: 8,
  ER_MATCH: 15,
  ER_MISMATCH: 12,
  HEALING_BONUS_MATCH: 15,
  HEALING_BONUS_MISMATCH: 3,
  PHYSICAL_DMG_MATCH: 15,
  PHYSICAL_DMG_MISMATCH: 0, // Usually garbage for most characters
  UNKNOWN_STAT: 10
} as const;

// Substat scoring constants
export const SUBSTAT_SCORES = {
  // Scaling stats
  SCALING_STAT_MATCH: 40,
  HP_MISMATCH: 2,
  ATK_MISMATCH: 2,
  DEF_MISMATCH: 1,
  
  // Universal stats
  CRIT_STATS: 25,
  
  // Utility stats
  EM_MATCH: 40,
  EM_MISMATCH: 8,
  ER_MATCH: 40,
  ER_MISMATCH: 12
} as const;

// Priority scoring system
export const PRIORITY_SCORES = {
  FIRST_PRIORITY: 3,
  SECOND_PRIORITY: 2,
  THIRD_PRIORITY: 1,
  NO_PRIORITY: 0,
  MAX_PRIORITY_RANK: 3 // Only top 3 sets get points
} as const;
