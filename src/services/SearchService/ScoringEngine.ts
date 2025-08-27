import { Artifact, ArtifactSet, Character } from '@/common/models';
import type { ArtifactPartName, MainStatName, SubStatName } from '@/common/types';
import { DebugLog } from '@/common/functions/dev';
import { List } from '@/common/models/List';

import {
  ARTIFACT_PIECES_SCORES,
  PART_SCORE_BASE_MULTIPLIER,
  MAIN_STAT_SCORES,
  SUBSTAT_SCORES,
  PRIORITY_SCORES
} from './constants';

const debugLog = DebugLog(DebugLog.DEBUGS.searchService);

/**
 * Scoring System Explanation:
 * 
 * Set Priority Score:
 * - 1st priority set for character: PRIORITY_SCORES.FIRST_PRIORITY × SET_PRIORITY_MULTIPLIER points
 * - 2nd priority set for character: PRIORITY_SCORES.SECOND_PRIORITY × SET_PRIORITY_MULTIPLIER points  
 * - 3rd priority set for character: PRIORITY_SCORES.THIRD_PRIORITY × SET_PRIORITY_MULTIPLIER points
 * - 4th+ priority sets: PRIORITY_SCORES.NO_PRIORITY points
 * 
 * Part Score: 
 * - Base part value (Flower=1, Feather=1, Sands=2, Goblet=4, Circlet=3) × PART_SCORE_BASE_MULTIPLIER
 * - Main stat compatibility bonus (using MAIN_STAT_SCORES)
 * - Sub stat compatibility bonuses (using SUBSTAT_SCORES)
 * 
 * This ensures stat synergy significantly outweighs set priority for characters who benefit from the stats.
 */
export const ScoringEngine = new class ScoringEngine {
  /**
   * Calculate the effectiveness/priority score for a character with a specific artifact set
   */
  public getCharacterEffectiveness(character: Character, set: ArtifactSet): number {
    // Get unique effectiveness values in descending order (highest to lowest priority)
    // This creates a ranking system where the most popular sets get priority 1, 2, 3, etc.
    const effectiveness = new List(...(character.playstyle?.recommendedArtifactSets ?? []))
      .mapUnique(cSet => cSet.effectiveness)
      .sort((a, b) => b - a); // Sort descending to get highest effectiveness first

    // Find the MAXIMUM effectiveness for this set (in case it appears multiple times)
    const setEffectiveness = Math.max(
      ...(character.playstyle?.recommendedArtifactSets
        .filter(cSet => cSet.set.name === set.name)
        .map(cSet => cSet.effectiveness) ?? [0])
    );

    if (setEffectiveness === 0) {
      debugLog(`No effectiveness found for ${character.name} with ${set.name}`);
      return 0;
    }

    const priorityIndex = effectiveness.indexOf(setEffectiveness);

    // Convert to priority score: Top 3 sets get points, others get 0
    // 1st priority (most popular) = PRIORITY_SCORES.FIRST_PRIORITY points
    // 2nd priority = PRIORITY_SCORES.SECOND_PRIORITY points  
    // 3rd priority = PRIORITY_SCORES.THIRD_PRIORITY point
    // 4th+ priority = PRIORITY_SCORES.NO_PRIORITY points
    const priorityScore = priorityIndex < PRIORITY_SCORES.MAX_PRIORITY_RANK ?
      (PRIORITY_SCORES.FIRST_PRIORITY - priorityIndex) : PRIORITY_SCORES.NO_PRIORITY;

    debugLog(`Effectiveness of ${character.name} with ${set.name}`, {
      effectiveness,
      setEffectiveness,
      priorityIndex: priorityIndex + 1, // Show 1-based index for clarity
      priorityScore
    });

    return priorityScore;
  }

  /**
   * Calculate the part score for a character with specific artifact stats
   */
  public getPartScore(
    character: Character,
    artifactPartName: ArtifactPartName,
    mainStat: MainStatName,
    subStats: SubStatName[]
  ): number {
    debugLog('group', 'getPieceScore');
    debugLog('params', { character, artifactPartName, mainStat, subStats });

    // The 'Adventurer' artifact name is irrelevant, although the class definition requires a setName value.
    const artifact = new Artifact('Adventurer', artifactPartName, mainStat, subStats);
    debugLog('Artifact', artifact);

    const partScore = ARTIFACT_PIECES_SCORES[artifactPartName] * PART_SCORE_BASE_MULTIPLIER;
    debugLog('Part score', partScore);

    const mainStatScore = this._calculateMainStatScore(character, artifact, mainStat);
    debugLog('Main stat score', mainStatScore);

    debugLog('group', 'subStatsScore');
    const subStatsScore = this._calculateSubStatsScore(character, artifact);
    debugLog('Result', subStatsScore);
    debugLog('groupEnd');
    debugLog('Sub stats score', subStatsScore);

    const finalPartScore = partScore + mainStatScore + subStatsScore;
    debugLog('Final part score', finalPartScore);
    debugLog('groupEnd');
    return finalPartScore;
  }  
  private _calculateMainStatScore(character: Character, artifact: Artifact<ArtifactPartName>, mainStat: MainStatName): number {
    if (artifact.isFlower() || artifact.isFeather()) return 0;

    if (mainStat === 'Physical DMG Bonus') return character.needsPhysicalDMG() ? MAIN_STAT_SCORES.PHYSICAL_DMG_MATCH : MAIN_STAT_SCORES.PHYSICAL_DMG_MISMATCH;
    if (mainStat.includes('Crit')) return MAIN_STAT_SCORES.CRIT_STATS;
    if (mainStat.includes('DMG Bonus')) return mainStat.includes(character.element) ? MAIN_STAT_SCORES.ELEMENTAL_DMG_BONUS_MATCH : MAIN_STAT_SCORES.ELEMENTAL_DMG_BONUS_MISMATCH;

    switch (mainStat) {
      case 'Elemental Mastery': return character.needsEM() ? MAIN_STAT_SCORES.EM_MATCH : MAIN_STAT_SCORES.EM_MISMATCH;
      case 'Energy Recharge': return character.needsER() ? MAIN_STAT_SCORES.ER_MATCH : MAIN_STAT_SCORES.ER_MISMATCH;
      case 'Healing Bonus': return character.canHeal() ? MAIN_STAT_SCORES.HEALING_BONUS_MATCH : MAIN_STAT_SCORES.HEALING_BONUS_MISMATCH;

      case 'HP%': return character.needsHP() ? MAIN_STAT_SCORES.SCALING_STAT_MATCH : MAIN_STAT_SCORES.SCALING_STAT_MISMATCH;
      case 'ATK%': return character.needsATK() ? MAIN_STAT_SCORES.SCALING_STAT_MATCH : MAIN_STAT_SCORES.SCALING_STAT_MISMATCH;
      case 'DEF%': return character.needsDEF() ? MAIN_STAT_SCORES.SCALING_STAT_MATCH : MAIN_STAT_SCORES.DEF_MISMATCH;

      default:
        console.error(`Unknown main stat "${mainStat}"`);
        return MAIN_STAT_SCORES.UNKNOWN_STAT;
    }
  }
  private _calculateSubStatsScore(character: Character, artifact: Artifact<ArtifactPartName>): number {
    let matchingSubStats = 0;

    return artifact.subStats.reduce((acc: number, stat: SubStatName | undefined) => {
      if (!stat) return acc; // Skip if stat is undefined or null

      const scoreData = this._getSubStatScore(character, stat);
      if (scoreData === null) {
        console.error(`Unknown sub stat "${stat}"`);
        return acc;
      }

      if (scoreData.isMatching) matchingSubStats++;
      const result = acc + scoreData.value;
      debugLog('Substat', stat, result, acc);
      return result;
    }, 0);
  }    /**
   * Data-driven approach to sub-stat scoring using callback utility functions.
   * Eliminates repetitive if/else blocks while keeping the logic clean and readable.
   */
  private _getSubStatScore(character: Character, stat: SubStatName): { value: number; isMatching: boolean; } | null {    // Utility function to create scoring logic based on boolean value
    const createStatScore = (
      isMatch: boolean,
      matchScore: number,
      mismatchScore: number,
      alwaysMatching = false
    ) => {
      const isMatching = alwaysMatching || isMatch;

      return {
        value: isMatching ? matchScore : mismatchScore, 
        isMatching
      };
    };      
    
    // Handle each stat type using the utility function
    switch (stat) {
      case 'HP':
      case 'HP%': return createStatScore(
        character.needsHP(),
        SUBSTAT_SCORES.SCALING_STAT_MATCH,
        SUBSTAT_SCORES.HP_MISMATCH
      );

      case 'ATK':
      case 'ATK%': return createStatScore(
        character.needsATK(),
        SUBSTAT_SCORES.SCALING_STAT_MATCH,
        SUBSTAT_SCORES.ATK_MISMATCH
      );

      case 'DEF':
      case 'DEF%': return createStatScore(
        character.needsDEF(),
        SUBSTAT_SCORES.SCALING_STAT_MATCH,
        SUBSTAT_SCORES.DEF_MISMATCH
      );

      case 'Crit Rate':
      case 'Crit DMG': return createStatScore(
        character.needsATK(),
        SUBSTAT_SCORES.CRIT_STATS,
        SUBSTAT_SCORES.CRIT_STATS,
        true
      );

      case 'Elemental Mastery': return createStatScore(
        character.needsEM(),
        SUBSTAT_SCORES.EM_MATCH,
        SUBSTAT_SCORES.EM_MISMATCH
      );

      case 'Energy Recharge': return createStatScore(
        character.needsER(),
        SUBSTAT_SCORES.ER_MATCH,
        SUBSTAT_SCORES.ER_MISMATCH
      );      default:
        return null;
    }
  }
}

export default ScoringEngine;