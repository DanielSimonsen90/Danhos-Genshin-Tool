import { ArtifactSet, Character } from '@/common/models';
import type { ArtifactPartName, MainStatName, SubStatName } from '@/common/types';
import { SearchFormData } from '@/common/types/store-data';
import { DebugLog } from '@/common/functions/dev';

import { List, OrderByComparator } from '@/common/models/List';

import {
  SHOULD_SAVE_THRESHOLD,
  SET_PRIORITY_MULTIPLIER,
  PRIORITY_SCORES,
} from './constants';
import { SearchResult, SearchResultItem, LastResult } from './types';
import { ScoringEngine } from './ScoringEngine';
import BaseSearchService from '../base/BaseSearchService';
import DataStore from '@/stores/DataStore/DataStore';

const debugLog = DebugLog(DebugLog.DEBUGS.searchService);

export const ArtifactSearchService = new class ArtifactSearchService extends BaseSearchService<LastResult> {
  constructor() {
    super({} as LastResult);
  }

  public get lastResult(): LastResult {
    return super.lastResult as LastResult;
  }

  private searchByStats(
    set: ArtifactSet,
    artifactPartName: ArtifactPartName,
    mainStat: MainStatName,
    subStats: SubStatName[],
  ): List<SearchResultItem> {
    const { Characters } = DataStore.getState();

    debugLog('group', 'searchByStats');
    debugLog('params', { set, artifactPartName, mainStat, subStats });

    const result = this.lastResult.searchByStats = Characters.map(character => {
      debugLog('group', character.name);
      debugLog('group', 'setScoreOnCharacter');
      const setScore = character.playstyle?.recommendedArtifactSets.reduce((acc, cSet) => {
        const compatibility = ScoringEngine.getCharacterEffectiveness(character, cSet.set);
        debugLog('Compatibility', compatibility);

        const priorityScore = cSet.set.name === set.name ? compatibility * SET_PRIORITY_MULTIPLIER : 0;
        const result = acc + priorityScore;
        debugLog('Accumulated', result);
        return result;
      }, 0) ?? 0;

      debugLog('Result', setScore);
      debugLog('groupEnd');

      const statScore = ScoringEngine.getPartScore(character, artifactPartName, mainStat, subStats);
      const score = Math.round(setScore + statScore);
      debugLog('Score', score);

      const result = new SearchResultItem(character, score, score > SHOULD_SAVE_THRESHOLD, setScore, statScore);
      debugLog('Result', result);
      debugLog('groupEnd');
      return result;
    });

    debugLog('Result', result);
    debugLog('groupEnd');
    return result;
  }

  private searchBySet(
    set: ArtifactSet,
    artifactPartName: ArtifactPartName,
    mainStat: MainStatName,
    subStats: SubStatName[],
  ): List<SearchResultItem> {
    debugLog('group', 'searchBySet');
    const { Characters } = DataStore.getState();

    // Filter characters that use the artifact set
    const charactersUsesSet = Characters.filter(c => c.playstyle?.recommendedArtifactSets.some(cSet => cSet.set.name === set.name));
    const charactersWantSet = charactersUsesSet.filter(c => ScoringEngine.getCharacterEffectiveness(c, set) === PRIORITY_SCORES.FIRST_PRIORITY);

    // Filter characters that could use the artifact set (compatibility 3; second/third priority)
    const charactersCouldUseSet = charactersUsesSet
      .filter(c => ScoringEngine.getCharacterEffectiveness(c, set))
      .filter(character => !charactersWantSet.includes(character));

    debugLog('Character data', { set, charactersUsesSet, charactersWantSet, charactersCouldUseSet });
    if (!charactersWantSet.length && !charactersCouldUseSet.length) {
      debugLog(`No characters found for ${set.name}. Returning empty array.`);
      debugLog('groupEnd');
      return this.lastResult.searchBySet = new List();
    }

    const getScores = (characters: List<Character>) => {
      debugLog('group', 'getScores');
      const result = characters.map(character => {
        const setScore = ScoringEngine.getCharacterEffectiveness(character, set) * SET_PRIORITY_MULTIPLIER;
        debugLog(`Set score for ${character.name}`, setScore);

        const statScore = ScoringEngine.getPartScore(character, artifactPartName, mainStat, subStats);
        const score = Math.round(setScore + statScore);
        debugLog(`Score data for ${character.name}`, { setScore, statScore, score, SHOULD_SAVE_THRESHOLD });

        return new SearchResultItem(character, score, score > SHOULD_SAVE_THRESHOLD, setScore, statScore);
      });

      debugLog('Result', result);
      debugLog('groupEnd');
      return result;
    };
    debugLog('groupEnd');

    const result = this.lastResult.searchBySet = new List(charactersWantSet, charactersCouldUseSet)
      .map(getScores)
      .flatten()
      .orderBy((a, b) => b.score - a.score);

    debugLog('Result', result);
    debugLog('groupEnd');
    return result;
  }

  public search(
    { artifactPartName, artifactSetName, mainStat, subStats }: Pick<SearchFormData, 'artifactPartName' | 'artifactSetName' | 'mainStat' | 'subStats'>,
  ): SearchResult {
    const { Artifacts: ArtifactSets, ArtifactNames: ArtifactSetNames } = DataStore.getState();

    if (!ArtifactSetNames.includes(artifactSetName)) throw new Error(`Artifact set "${artifactSetName}" not found in data.`);

    const set = ArtifactSets.find(set => set.name === artifactSetName);
    debugLog('Set found', set);
    if (!set) throw new Error(`Artifact set "${artifactSetName}" not found in data.`);

    debugLog('Starting search', { set, artifactPartName, mainStat, subStats });
    const args = [set, artifactPartName, mainStat, subStats] as const;
    const bySet = this.searchBySet(...args).orderBy((a, b) => b.score - a.score);
    const byStats = this.searchByStats(...args).orderBy(...this._getOrderByFunctions(set, bySet));
    const cloneItem = (item: SearchResultItem) => new SearchResultItem(
      { name: item.characterName } as Character,
      item.score, item.shouldSave, item.setScore, item.statScore
    );
    const combined = new List(...byStats, ...bySet).reduce((acc, item) => {
      const existing = acc.find(e => e.characterName === item.characterName);
      if (existing) {
        existing.setScore += item.setScore;
        existing.statScore += item.statScore;
        existing.score = Math.round(existing.score + item.score);
        existing.shouldSave = existing.score > SHOULD_SAVE_THRESHOLD;
        return acc;
      }
      return acc.concat(cloneItem(item));
    }, new List<SearchResultItem>()).orderBy(...this._getOrderByFunctions(set, bySet));

    const result = this.lastResult.search = {
      combined, byStats,
      bySet: bySet.orderBy(...this._getOrderByFunctions(set, bySet)),
      setName: set.name,
    };
    debugLog('Result', result);
    return result;
  }

  private _getOrderByFunctions(
    set: ArtifactSet,
    bySet: List<SearchResultItem>,
  ): Array<OrderByComparator<SearchResultItem>> {
    const { Characters } = DataStore.getState();
    
    return [
      (a, b) => b.score - a.score,
      (a, b) => {
        const characterA = Characters.find(c => c.name === a.characterName);
        const characterB = Characters.find(c => c.name === b.characterName);
        if (!characterA || !characterB) {
          if (!characterA) console.warn(`Character "${a.characterName}" not found in data.`);
          if (!characterB) console.warn(`Character "${b.characterName}" not found in data.`);
          return 0;
        }
        const effectiveA = ScoringEngine.getCharacterEffectiveness(characterA, set);
        const effectiveB = ScoringEngine.getCharacterEffectiveness(characterB, set);
        
        // Higher effectiveness should come first
        return effectiveB - effectiveA;
      },
      (a, b) => {
        const recommendedA = bySet.some(c => c.characterName === a.characterName);
        const recommendedB = bySet.some(c => c.characterName === b.characterName);
        return recommendedA && !recommendedB ? -1 : recommendedB && !recommendedA ? 1 : 0;
      },
    ];
  }
}

export default ArtifactSearchService;