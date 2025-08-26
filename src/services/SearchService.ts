import { Artifact, ArtifactSet, Character } from '@/common/models';
import type { ArtifactPartName, MainStatName, SubStatName } from '@/common/types';
import { SearchFormData } from '@/common/types/store-data';
import { DebugLog } from '@/common/functions/dev';

import { CacheStore } from '@/stores/CacheStore/CacheStoreTypes';
import { DataStore } from '@/stores/DataStore/DataStoreTypes';

import BaseService from './BaseService';
import { List, OrderByComparator } from '@/common/models/List';

const debugLog = DebugLog(DebugLog.DEBUGS.searchService);

export type SearchResult = {
  byArtifact: SearchResultItem[];
  byCharacterRecommendation: SearchResultItem[];
  combined: SearchResultItem[];

  setName: ArtifactSet['name'];
  form: FormData;
  id: string;
};

export class SearchResultItem {
  constructor(
    character: Character,
    public score: number,
    public shouldSave: boolean
  ) {
    this.characterName = character.name;
  }

  public characterName: Character['name'];
}

type LastResult = {
  search: SearchResult;
  searchArtifactSets: SearchResultItem[];
  searchCharacterRecommendations: SearchResultItem[];
  piecesScore: number;
  mainStatRarity: number;
};

const SHOULD_SAVE_THRESHOLD = 150;
const ARTIFACT_PIECES_SCORES: Record<ArtifactPartName, number> = {
  Flower: 1,
  Feather: 1,
  Sands: 2,
  Goblet: 4,
  Circlet: 3,
};

// Constants for better score balancing
const SET_PRIORITY_MULTIPLIER = 2; // Reduced from 10 to prioritize stat synergy over set preference
const PART_SCORE_BASE_MULTIPLIER = 15;

// Main stat scoring constants
const MAIN_STAT_SCORES = {
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
const SUBSTAT_SCORES = {
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
const PRIORITY_SCORES = {
  FIRST_PRIORITY: 3,
  SECOND_PRIORITY: 2,
  THIRD_PRIORITY: 1,
  NO_PRIORITY: 0,
  MAX_PRIORITY_RANK: 3 // Only top 3 sets get points
} as const;

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

export const SearchService = new class SearchService extends BaseService<LastResult> {
  public static readonly SHOULD_SAVE_THRESHOLD = SHOULD_SAVE_THRESHOLD;
  public static readonly ARTIFACT_PIECES_SCORES = ARTIFACT_PIECES_SCORES;
  constructor() { super({} as LastResult); }

  public get lastResult(): LastResult {
    return super.lastResult as LastResult;
  }
  public searchByArtifacts(
    set: ArtifactSet,
    artifactPartName: ArtifactPartName,
    mainStat: MainStatName,
    subStats: SubStatName[],
    { Characters }: DataStore,
  ): List<SearchResultItem> {
    debugLog('group', 'searchArtifactSets');
    debugLog('params', { set, artifactPartName, mainStat, subStats });

    const result = this.lastResult.searchArtifactSets = Characters.map(character => {
      debugLog('group', character.name);
      debugLog('group', 'setScoreOnCharacter');

      const setScoreOnCharacter = character.playstyle?.recommendedArtifactSets.reduce((acc, cSet, i, arr) => {
        const compatibility = this._getCharacterEffectiveness(character, cSet.set);
        debugLog('Compatibility', compatibility);

        const priorityScore = cSet.set.name === set.name ? compatibility * SET_PRIORITY_MULTIPLIER : 0;
        const result = acc + priorityScore;
        debugLog('Accumulated', result);
        return result;
      }, 0) ?? 0;

      debugLog('Result', setScoreOnCharacter);
      debugLog('groupEnd');

      const pieceScore = this._getPartScore(character, artifactPartName, mainStat, subStats);
      const score = Math.round(setScoreOnCharacter + pieceScore);
      debugLog('Score', score);

      const result = new SearchResultItem(character, score, score > SHOULD_SAVE_THRESHOLD);
      debugLog('Result', result);
      debugLog('groupEnd');
      return result;
    });

    debugLog('Result', result);
    debugLog('groupEnd');
    return result;
  }
  public searchByCharacterRecommendation(
    set: ArtifactSet,
    artifactPartName: ArtifactPartName,
    mainStat: MainStatName,
    subStats: SubStatName[],
    { Characters }: DataStore,
  ): List<SearchResultItem> {
    debugLog('group', 'searchCharacterRecommendations');

    // Filter characters that use the artifact set
    const charactersUsesSet = Characters.filter(c => c.playstyle?.recommendedArtifactSets.some(cSet => cSet.set.name === set.name));
    const charactersWantSet = charactersUsesSet.filter(c => this._getCharacterEffectiveness(c, set) === PRIORITY_SCORES.FIRST_PRIORITY);

    // Filter characters that could use the artifact set (compatibility 3; second/third priority)
    const charactersCouldUseSet = charactersUsesSet
      .filter(c => this._getCharacterEffectiveness(c, set))
      .filter(character => !charactersWantSet.includes(character));

    debugLog('Character data', { set, charactersUsesSet, charactersWantSet, charactersCouldUseSet });
    if (!charactersWantSet.length && !charactersCouldUseSet.length) {
      debugLog(`No characters found for ${set.name}. Returning empty array.`);
      debugLog('groupEnd');
      return this.lastResult.searchCharacterRecommendations = new List();
    }
    
    const getScores = (characters: List<Character>) => {
      debugLog('group', 'getScores');
      const result = characters.map(character => {
        const setScore = this._getCharacterEffectiveness(character, set) * SET_PRIORITY_MULTIPLIER
        debugLog(`Set score for ${character.name}`, setScore);        
        
        const partScore = this._getPartScore(character, artifactPartName, mainStat, subStats);
        const score = Math.round(setScore + partScore);
        debugLog(`Score data for ${character.name}`, { setScore, partScore, score, SHOULD_SAVE_THRESHOLD });

        return new SearchResultItem(character, score, score > SHOULD_SAVE_THRESHOLD);
      });

      debugLog('Result', result);
      debugLog('groupEnd');
      return result;
    };
    debugLog('groupEnd');

    const result = this.lastResult.searchCharacterRecommendations = new List(charactersWantSet, charactersCouldUseSet)
      .map(getScores)
      .flatten()
      .sort((a, b) => b.score - a.score);

    debugLog('Result', result);
    debugLog('groupEnd');
    return result;
  }
  public search(
    { artifactPartName, artifactSetName, mainStat, subStats, id, _form }: SearchFormData,
    CacheStore: CacheStore,
    DataStore: DataStore,
  ): SearchResult {
    if (!_form) throw new Error('_form not defined on SearchFormData');

    const cachedResult = CacheStore.findObject('searchResults',
      data => data.id === id
        || ([...data.form.entries()].every(([key, value]) => 'get' in _form && _form.get(key) === value)));

    if (cachedResult) {
      debugLog('Cached result found', cachedResult);
      // return this.lastResult.search = cachedResult;
    }

    const { Artifacts: ArtifactSets, ArtifactNames: ArtifactSetNames } = DataStore;

    // Check artifact set exists in data
    if (!ArtifactSetNames.includes(artifactSetName)) throw new Error(`Artifact set "${artifactSetName}" not found in data.`);

    const set = ArtifactSets.find(set => set.name === artifactSetName);
    debugLog('Set found', set);
    if (!set) throw new Error(`Artifact set "${artifactSetName}" not found in data.`);

    debugLog('Starting search', { set, artifactPartName, mainStat, subStats, id, _form });
    const args = [set, artifactPartName, mainStat, subStats, DataStore] as const;
    const byCharacterRecommendation = this.searchByCharacterRecommendation(...args).sort((a, b) => b.score - a.score);
    const byArtifact = this.searchByArtifacts(...args).orderBy(...this._getOrderByFunctions(set, byCharacterRecommendation, DataStore));
    const combined = new List(...byArtifact, ...byCharacterRecommendation).reduce((acc, item) => {
      const existing = acc.find(e => e.characterName === item.characterName);
      if (existing) {
        existing.score = Math.round(existing.score + item.score);
        existing.shouldSave = existing.score > SHOULD_SAVE_THRESHOLD;
        return acc;
      }
      return acc.concat(item);
    }, new List<SearchResultItem>()).orderBy(...this._getOrderByFunctions(set, byCharacterRecommendation, DataStore));

    const result = this.lastResult.search = {
      combined, byArtifact, byCharacterRecommendation: byCharacterRecommendation.orderBy(...this._getOrderByFunctions(set, byCharacterRecommendation, DataStore)),
      form: _form, id, setName: set.name,
    };
    CacheStore.update('searchResults', { [id]: result });
    debugLog('Result', result);
    return result;
  }
   private _getCharacterEffectiveness(character: Character, set: ArtifactSet): number {
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
  private _getPartScore(
    character: Character,
    artifactPartName: ArtifactPartName,
    mainStat: MainStatName,
    subStats: SubStatName[]
  ): number {
    debugLog('group', 'getPieceScore');
    debugLog('params', { character, artifactPartName, mainStat, subStats });

    // The 'Adventurer' artifact name is irrelevant, although the class definition requires a setName value.
    const artifact = new Artifact('Adventurer', artifactPartName, mainStat, subStats);
    debugLog('Artifact', artifact);    const partScore = ARTIFACT_PIECES_SCORES[artifactPartName] * PART_SCORE_BASE_MULTIPLIER;
    debugLog('Part score', partScore);    const mainStatScore = (function checkMainStatScore() {
      if (artifact.isFlower() || artifact.isFeather()) return 0;
      if (mainStat === 'Physical DMG Bonus') return character.needsPhysicalDMG() ? MAIN_STAT_SCORES.PHYSICAL_DMG_MATCH : MAIN_STAT_SCORES.PHYSICAL_DMG_MISMATCH;
      if (mainStat.includes('Crit')) return MAIN_STAT_SCORES.CRIT_STATS;
      if (mainStat.includes('DMG Bonus')) return mainStat.includes(character.element) ? MAIN_STAT_SCORES.ELEMENTAL_DMG_BONUS_MATCH : MAIN_STAT_SCORES.ELEMENTAL_DMG_BONUS_MISMATCH;
      if (mainStat === 'Elemental Mastery') return character.needsEM() ? MAIN_STAT_SCORES.EM_MATCH : MAIN_STAT_SCORES.EM_MISMATCH;
      if (mainStat === 'Energy Recharge') return character.needsER() ? MAIN_STAT_SCORES.ER_MATCH : MAIN_STAT_SCORES.ER_MISMATCH;
      if (mainStat === 'Healing Bonus') return character.canHeal() ? MAIN_STAT_SCORES.HEALING_BONUS_MATCH : MAIN_STAT_SCORES.HEALING_BONUS_MISMATCH;
      if (mainStat === 'HP%') return character.needsHP() ? MAIN_STAT_SCORES.SCALING_STAT_MATCH : MAIN_STAT_SCORES.SCALING_STAT_MISMATCH;
      if (mainStat === 'ATK%') return character.needsATK() ? MAIN_STAT_SCORES.SCALING_STAT_MATCH : MAIN_STAT_SCORES.SCALING_STAT_MISMATCH;
      if (mainStat === 'DEF%') return character.needsDEF() ? MAIN_STAT_SCORES.SCALING_STAT_MATCH : MAIN_STAT_SCORES.DEF_MISMATCH;
      console.error(`Unknown main stat "${mainStat}"`);
      return MAIN_STAT_SCORES.UNKNOWN_STAT;
    })();
    debugLog('Main stat score', mainStatScore);
    debugLog('group', 'subStatsScore');

    let matchingSubStats = 0;
    const subStatsScore = artifact.subStats.reduce((acc, stat) => {
      const result = (() => {
        if (!stat) return acc; // Skip if stat is undefined or null
        
        let statValue = 0;
        let isMatching = false;        
        if (stat === 'HP' || stat === 'HP%') {
          statValue = character.needsHP() ? SUBSTAT_SCORES.SCALING_STAT_MATCH : SUBSTAT_SCORES.HP_MISMATCH;
          isMatching = character.needsHP();
        } else if (stat === 'ATK' || stat === 'ATK%') {
          statValue = character.needsATK() ? SUBSTAT_SCORES.SCALING_STAT_MATCH : SUBSTAT_SCORES.ATK_MISMATCH;
          isMatching = character.needsATK();
        } else if (stat === 'DEF' || stat === 'DEF%') {
          statValue = character.needsDEF() ? SUBSTAT_SCORES.SCALING_STAT_MATCH : SUBSTAT_SCORES.DEF_MISMATCH;
          isMatching = character.needsDEF();
        } else if (stat === 'Crit Rate' || stat === 'Crit DMG') {
          statValue = SUBSTAT_SCORES.CRIT_STATS;
          isMatching = true; // Crit is always considered matching
        } else if (stat === 'Elemental Mastery') {
          statValue = character.needsEM() ? SUBSTAT_SCORES.EM_MATCH : SUBSTAT_SCORES.EM_MISMATCH;
          isMatching = character.needsEM();
        } else if (stat === 'Energy Recharge') {
          statValue = character.needsER() ? SUBSTAT_SCORES.ER_MATCH : SUBSTAT_SCORES.ER_MISMATCH;
          isMatching = character.needsER();
        } else {
          console.error(`Unknown sub stat "${stat}"`);
          return acc;
        }
        
        if (isMatching) matchingSubStats++;
        return acc + statValue;
      })();
      debugLog('Substat', stat, result, acc);
      return result;
    }, 0);
    
    debugLog('Result', subStatsScore);
    debugLog('groupEnd');
    debugLog('Sub stats score', subStatsScore);
    
    const finalPartScore = partScore + mainStatScore + subStatsScore;
    
    debugLog('Final part score', finalPartScore);
    debugLog('groupEnd');
    return this.lastResult.piecesScore = finalPartScore;
  }
  private _getOrderByFunctions(
    set: ArtifactSet,
    byCharacterRecommendation: List<SearchResultItem>,
    DataStore: DataStore,
  ): Array<OrderByComparator<SearchResultItem>> {
    return [
      (a, b) => b.score - a.score,
      (a, b) => {
        const characterA = DataStore.Characters.find(c => c.name === a.characterName);
        const characterB = DataStore.Characters.find(c => c.name === b.characterName);
        if (!characterA || !characterB) {
          if (!characterA) console.warn(`Character "${a.characterName}" not found in data.`);
          if (!characterB) console.warn(`Character "${b.characterName}" not found in data.`);
          return 0;
        }

        const effectiveA = this._getCharacterEffectiveness(characterA, set);
        const effectiveB = this._getCharacterEffectiveness(characterB, set);
        
        // Higher effectiveness should come first
        return effectiveB - effectiveA;
      },
      (a, b) => {
        const recommendedA = byCharacterRecommendation.some(c => c.characterName === a.characterName);
        const recommendedB = byCharacterRecommendation.some(c => c.characterName === b.characterName);
        return recommendedA && !recommendedB ? -1 : recommendedB && !recommendedA ? 1 : 0;
      },
    ];
  }
};

export default SearchService;