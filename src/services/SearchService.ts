import { Artifact, ArtifactSet, Character, CharacterArtifactSet, CharacterSet } from '@/common/models';
import type { ArtifactPartName, MainStatName, SubStatName } from '@/common/types';
import { SearchFormData } from '@/common/types/store-data';
import { DebugLog } from '@/common/functions/dev';

import { CacheStore } from '@/stores/CacheStore/CacheStoreTypes';
import { DataStore } from '@/stores/DataStore/DataStoreTypes';

import BaseService from './BaseService';
import { List } from '@/common/models/List';

const debugLog = DebugLog(DebugLog.DEBUGS.searchService);

export type SearchResult = {
  byArtifact: SearchResultItem[];
  byCharacterRecommendation: SearchResultItem[];
  combined: SearchResultItem[];

  set: ArtifactSet;
  form: FormData;
  id: string;
};
export type SearchResultItem = {
  character: Character;
  set: CharacterSet;
  score: number;
  shouldSave: boolean;
};
export type CharacterUsingArtifactResult = {
  character: Character;
  set: CharacterSet;
  pieces: number;
};

type LastResult = {
  search: SearchResult;
  searchArtifactSets: SearchResultItem[];
  searchCharacterRecommendations: SearchResultItem[];
  piecesScore: number;
  mainStatRarity: number;
};

const SHOULD_SAVE_THRESHOLD = 100;
const ARTIFACT_PIECES_SCORES: Record<ArtifactPartName, number> = {
  Flower: 0,
  Feather: 0,
  Circlet: 3,
  Goblet: 2,
  Sands: 2,
};

export const SearchService = new class SearchService extends BaseService<LastResult> {
  public static readonly SHOULD_SAVE_THRESHOLD = SHOULD_SAVE_THRESHOLD;
  public static readonly ARTIFACT_PIECES_SCORES = ARTIFACT_PIECES_SCORES;
  constructor() { super({} as LastResult); }

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
      const setScoreOnCharacter = character.sets.reduce((acc, cSet) => {
        const compatibility = cSet.artifactSets.find(equippingSet =>
          equippingSet.set.name === set.name
        )?.effectiveness ?? 0;
        debugLog('Compatibility', compatibility);
        const result = acc + compatibility;
        debugLog('Accumulated', result);
        return result;
      }, 0);
      debugLog('Result', setScoreOnCharacter);
      debugLog('groupEnd');

      const pieceScore = this._getPartScore(character, artifactPartName, mainStat, subStats);
      const score = Math.round(setScoreOnCharacter + pieceScore);
      debugLog('Score', score);

      const result = {
        character,
        set: character.sets
          .filter(cSet => cSet.artifactSets.some(equippingSet => equippingSet.set.name === set.name))
          .sort((a, b) =>
            b.artifactSets.find(equippingSet => equippingSet.set.name === set.name)?.effectiveness ?? 0
            - a.artifactSets.find(equippingSet => equippingSet.set.name === set.name)?.effectiveness ?? 0
          )[0],
        score,
        shouldSave: score > SHOULD_SAVE_THRESHOLD
      } as SearchResultItem;
      debugLog('Result', result);
      debugLog('groupEnd');
      return result;
    }).sort((a, b) => b.score - a.score);
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

    const getSetFromCharacter = (character: Character) => (
      character.sets.find(cSet => cSet.artifactSets
        .map(equppingSet => equppingSet.set.name)
        .includes(set.name))
    );
    const isEffectiveForCharacter = (max: number) => (character: Character) => {
      const cSet = getSetFromCharacter(character);
      return cSet.artifactSets.find(equippingSet => equippingSet.set.name === set.name)?.effectiveness ?? 0 >= max;
    };

    // Filter characters that use the artifact set
    const charactersUsesSet = Characters.filter(getSetFromCharacter);

    // Filter characters that want the artifact set (compatibility 5; first priority)
    const charactersWantSet = charactersUsesSet.filter(isEffectiveForCharacter(5));

    // Filter characters that could use the artifact set (compatibility 3; second/third priority)
    const charactersCouldUseSet = charactersUsesSet
      .filter(isEffectiveForCharacter(3))
      .filter(character => !charactersWantSet.includes(character));

    debugLog('Character data', { set, charactersUsesSet, charactersWantSet, charactersCouldUseSet });
    if (!charactersWantSet.length && !charactersCouldUseSet.length) {
      debugLog(`No characters found for ${set.name}. Returning empty array.`);
      debugLog('groupEnd');
      return this.lastResult.searchCharacterRecommendations = new List();
    }

    // Calculate scores
    const getScores = (characters: Character[]) => {
      debugLog('group', 'getScores');
      const result = characters.map(character => {
        const cSet = getSetFromCharacter(character);
        const setScore = cSet.artifactSets.reduce((acc, equippingSet) => acc + set.checkIsGood(character, equippingSet), 0);
        const partScore = this._getPartScore(character, artifactPartName, mainStat, subStats);
        const score = Math.round(setScore + partScore);
        debugLog(`Score data for ${character.name}`, { setScore, partScore, score, SHOULD_SAVE_THRESHOLD });

        return {
          character,
          set: character.sets
            .filter(cSet => cSet.artifactSets.some(equippingSet => equippingSet.set.name === set.name))
            .sort((a, b) =>
              b.artifactSets.find(equippingSet => equippingSet.set.name === set.name)?.effectiveness ?? 0
              - a.artifactSets.find(equippingSet => equippingSet.set.name === set.name)?.effectiveness ?? 0
            )[0],
          score,
          shouldSave: score > SHOULD_SAVE_THRESHOLD
        } as SearchResultItem;
      });
      debugLog('Result', result);
      debugLog('groupEnd');
      return result;
    };
    debugLog('groupEnd');

    const result = this.lastResult.searchCharacterRecommendations = new List(
      charactersWantSet, charactersCouldUseSet
    ).map(getScores).flatten().sort((a, b) => b.score - a.score);
    debugLog('Result', result);
    debugLog('groupEnd');
    return result;
  }
  public search(
    { artifactPartName, artifactSetName, mainStat, subStats, id, _form }: SearchFormData,
    CacheStore: CacheStore,
    DataStore: DataStore,
  ): SearchResult {
    const cachedResult = CacheStore.findObject('searchResults', data => data.id === id);
    if (cachedResult) {
      debugLog('Cached result found', cachedResult);
      return this.lastResult.search = cachedResult;
    }

    const { ArtifactSets, ArtifactSetNames } = DataStore;
    // Check artifact set exists in data
    if (!ArtifactSetNames.includes(artifactSetName)) throw new Error(`Artifact set "${artifactSetName}" not found in data.`);
    const set = ArtifactSets.find(set => set.name === artifactSetName);
    debugLog('Set found', set);

    const args = [set, artifactPartName, mainStat, subStats, DataStore] as const;
    const byCharacterRecommendation = this.searchByCharacterRecommendation(...args);
    const byArtifact = this.searchByArtifacts(...args).sort(this._sortResults(set, byCharacterRecommendation));
    // const byArtifact = this.searchByArtifacts(...args).orderBy(
    //   // effectiveness, characterRecommendation, score
    //   (a, b) => {
    //     const effectiveA = a.character.sets.reduce((acc, cSet) => {
    //       const compatibility = cSet.artifactSets.find(equippingSet =>
    //         equippingSet.set.name === set.name
    //       )?.effectiveness ?? 0;
    //       return acc + compatibility;
    //     }, 0)
    //     const effectiveB = b.character.sets.reduce((acc, cSet) => {
    //       const compatibility = cSet.artifactSets.find(equippingSet =>
    //         equippingSet.set.name === set.name
    //       )?.effectiveness ?? 0;
    //       return acc + compatibility;
    //     }, 0);
    //     return effectiveB - effectiveA;
    //   },
    //   (a, b) => {
    //     const recommendedA = byCharacterRecommendation.some(c => c.character.name === a.character.name)
    //     const recommendedB = byCharacterRecommendation.some(c => c.character.name === b.character.name)
    //     return recommendedA && !recommendedB ? -1 : recommendedB && !recommendedA ? 1 : 0;
    //   },
    //   (a, b) => b.score - a.score
    // )
    const combined = [...byArtifact, ...byCharacterRecommendation].reduce((acc, item) => {
      const existing = acc.find(e => e.character.name === item.character.name);
      if (existing) {
        existing.score = Math.round(existing.score + item.score);
        existing.shouldSave = existing.score > SHOULD_SAVE_THRESHOLD;
        return acc;
      }
      return [...acc, item];
    }, [] as SearchResultItem[]).sort(this._sortResults(set, byCharacterRecommendation));
    // const combined = new List(...byArtifact, ...byCharacterRecommendation).reduce((acc, item) => {
    //   const existing = acc.find(e => e.character.name === item.character.name);
    //   if (existing) {
    //     existing.score = Math.round(existing.score + item.score);
    //     existing.shouldSave = existing.score > SHOULD_SAVE_THRESHOLD;
    //     return acc;
    //   }
    //   return acc.concat(item);
    // }, new List<SearchResultItem>()).orderBy(
    //   // effectiveness, characterRecommendation, score
    //   (a, b) => {
    //     const effectiveA = a.character.sets.reduce((acc, cSet) => {
    //       const compatibility = cSet.artifactSets.find(equippingSet =>
    //         equippingSet.set.name === set.name
    //       )?.effectiveness ?? 0;
    //       return acc + compatibility;
    //     }, 0)
    //     const effectiveB = b.character.sets.reduce((acc, cSet) => {
    //       const compatibility = cSet.artifactSets.find(equippingSet =>
    //         equippingSet.set.name === set.name
    //       )?.effectiveness ?? 0;
    //       return acc + compatibility;
    //     }, 0);
    //     return effectiveB - effectiveA;
    //   },
    //   (a, b) => {
    //     const recommendedA = byCharacterRecommendation.some(c => c.character.name === a.character.name)
    //     const recommendedB = byCharacterRecommendation.some(c => c.character.name === b.character.name)
    //     return recommendedA && !recommendedB ? -1 : recommendedB && !recommendedA ? 1 : 0;
    //   },
    //   (a, b) => b.score - a.score
    // );

    const result = this.lastResult.search = {
      combined, byArtifact, byCharacterRecommendation: byCharacterRecommendation.sort(this._sortResults(set, byCharacterRecommendation)),
      form: _form, id, set,
    };
    CacheStore.update('searchResults', { [id]: result });
    debugLog('Result', result);
    return result;
  }

  public getCharactersUsing(artifactName: string, DataStore: DataStore): CharacterUsingArtifactResult[] {
    const relevantCharacters = DataStore.Characters.filter(character =>
      character.sets.some(cSet =>
        cSet.artifactSets.some(artifact => artifact.set.name === artifactName
          && artifact.effectiveness === CharacterArtifactSet.MOST_EFFECTIVE
        )));

    const getCharacterSet = (character: Character) => character.sets.find(cSet => 
      cSet.artifactSets.some(artifact => 
        artifact.set.name === artifactName 
        && artifact.effectiveness === CharacterArtifactSet.MOST_EFFECTIVE
    ));
    return relevantCharacters.map(character => ({
      character,
      set: getCharacterSet(character),
      pieces: getCharacterSet(character).artifactSets.find(artifact => artifact.set.name === artifactName).pieces
    }));
  }

  private _getPartScore(
    character: Character,
    artifactPartName: ArtifactPartName,
    mainStat: MainStatName,
    subStats: SubStatName[]
  ): number {
    debugLog('group', 'getPieceScore');
    debugLog('params', { character, artifactPartName, mainStat, subStats });

    const artifact = new Artifact(undefined, artifactPartName, mainStat, subStats);
    debugLog('Artifact', artifact);

    const partScore = ARTIFACT_PIECES_SCORES[artifactPartName];
    debugLog('Part score', partScore);

    const mainStatScore = this._getMainStatRarity(artifactPartName, mainStat) * -1 / 100 + (function checkMainStatScore() {
      if (artifact.isFlower() || artifact.isFeather()) return 0;
      if (mainStat === 'Physical DMG Bonus') return 0; // Garbage stat
      if (mainStat === 'Elemental Mastery') return character.needsEM() ? 10 : 5;
      if (mainStat === 'Energy Recharge') return character.needsER() ? 10 : 10; // I never get ER artifacts, please send some
      if (mainStat === 'Healing Bonus') return character.bonusAbility === 'Heal' || character.bonusAbility === 'Self-heal' ? 10 : 2; // Healing bonus is decent but rarely used
      if (mainStat.includes('DMG Bonus')) return 20; // Elemental DMG Bonuses are not to be messed with
      if (mainStat.includes('Crit')) return 20; // Crit stats are always good
      if (mainStat === 'HP%' && character.needsHP()) return 10;
      if (mainStat === 'ATK%' && character.needsATK()) return 10;
      if (mainStat === 'DEF%' && character.needsDEF()) return 10;
      console.error(`Unknown main stat "${mainStat}"`);
      return 10;
    })();
    debugLog('Main stat score', mainStatScore);

    debugLog('group', 'subStatsScore');
    const subStatsScore = artifact.subStats.reduce((acc, stat) => {
      const result = (() => {
        if (stat === 'HP' || stat === 'HP%') return acc + (character.needsHP() ? 20 : 1);
        if (stat === 'ATK' || stat === 'ATK%') return acc + (character.needsATK() ? 20 : 1);
        if (stat === 'DEF' || stat === 'DEF%') return acc + (character.needsDEF() ? 20 : 0);
        if (stat === 'Crit Rate' || stat === 'Crit DMG') return acc + 20;
        if (stat === 'Elemental Mastery') return acc + (character.needsEM() ? 20 : 5);
        if (stat === 'Energy Recharge') return acc + (character.needsER() ? 20 : 10);
        console.error(`Unknown substat "${stat}"`);
        return acc;
      })();
      debugLog('Substat', stat, result, acc);
      return result;
    }, 0);
    debugLog('Result', subStatsScore);
    debugLog('groupEnd');
    debugLog('Substats score', subStatsScore);
    debugLog('groupEnd');
    return this.lastResult.piecesScore = partScore + mainStatScore + subStatsScore;
  }
  private _getMainStatRarity(partName: ArtifactPartName, stat: MainStatName) {
    const result = this.lastResult.mainStatRarity = (() => {
      if (partName === 'Flower' || partName === 'Feather') return 100;
      if (stat === 'HP%' || stat === 'ATK%' || stat === 'DEF%') return partName !== 'Sands' ? 22 : 26;
      if (stat === 'Elemental Mastery') return partName === 'Sands' ? 10 : 4;
      return 10;
    })();
    debugLog(`Main stat rarity for ${stat} ${partName}`, result);
    return result;
  }
  private _sortResults(set: ArtifactSet, byCharacterRecommendation: SearchResultItem[] = []) {
    // effectiveness, characterRecommendation, score
    return (a: SearchResultItem, b: SearchResultItem) => {
      debugLog('group', `Sorting ${a.character.name} & ${b.character.name}`);
      // Check if either character has set with effectiveness 5
      const aMostEffective = a.character.sets.some(cSet => {
        debugLog('group', `${a.character.name}HasEffectiveness5 (${cSet.name})`);
        debugLog('Character set', cSet);

        const result = cSet.artifactSets.some(artifact => {
          const isMostEffective = artifact.effectiveness === CharacterArtifactSet.MOST_EFFECTIVE;
          const isSet = artifact.set.name === set.name;
          const result = isMostEffective && isSet;
          debugLog(`Result of ${artifact.set.name}`, result, { isMostEffective, isSet, artifact, cSet, set, a });
          return result;
        });
        debugLog('Result', result);
        debugLog('groupEnd');
        return result;
      });
      const bMostEffective = b.character.sets.some(cSet => {
        debugLog('group', `${b.character.name}HasEffectiveness5 (${cSet.name})`);
        debugLog('Character set', cSet);

        const result = cSet.artifactSets.some(artifact => {
          const isMostEffective = artifact.effectiveness === CharacterArtifactSet.MOST_EFFECTIVE;
          const isSet = artifact.set.name === set.name;
          const result = isMostEffective && isSet;
          debugLog(`Result of ${artifact.set.name}`, result, { isMostEffective, isSet, artifact, cSet, set, b });
          return result;
        });
        debugLog('Result', result);
        debugLog('groupEnd');
        return result;
      });
      const aIsRecommended = byCharacterRecommendation.some(c => c.character.name === a.character.name);
      const bIsRecommended = byCharacterRecommendation.some(c => c.character.name === b.character.name);

      // Sort by effectiveness first (items with effectiveness 5 come first)
      const aIsEffective = aMostEffective && !bMostEffective;
      const bIsEffective = bMostEffective && !aMostEffective;
      const aRecommended = aIsRecommended && !bIsRecommended;
      const bRecommended = bIsRecommended && !aIsRecommended;
      const byScore = b.score - a.score;
      const result = (() => {
        const props = { a, b, aIsEffective, bIsEffective, aRecommended, bRecommended, byScore };
        if (aIsEffective && !bIsEffective) {
          debugLog(`Result of ${a.character.name} & ${b.character.name} => -1: aIsEffective && !bIsEffective`, props);
          return -1;
        }
        if (bIsEffective && !aIsEffective) {
          debugLog(`Result of ${a.character.name} & ${b.character.name} => 1: bIsEffective && !aIsEffective`, props);
          return 1;
        }
        if (aRecommended && !bRecommended) {
          debugLog(`Result of ${a.character.name} & ${b.character.name} => -1: aRecommended && !bRecommended`, props);
          return -1;
        }
        if (bRecommended && !aRecommended) {
          debugLog(`Result of ${a.character.name} & ${b.character.name} => 1: bRecommended && !aRecommended`, props);
          return 1;
        }
        if (byScore) {
          debugLog(`Result of ${a.character.name} & ${b.character.name} => ${byScore}: byScore`, props);
          return byScore;
        }
        debugLog(`Result of ${a.character.name} & ${b.character.name} => 0: default`, props);
        return 0;
      })();

      debugLog('groupEnd');
      return result;
    };
  }
};

export default SearchService;