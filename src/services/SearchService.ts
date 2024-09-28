import { Artifact, ArtifactSet, Character } from '@/common/models';
import type { ArtifactPartName, MainStatName, SubStatName } from '@/common/types';
import type * as ArtifactSetData from '@/data/artifact-sets';
import { DataStore } from '@/stores';
import BaseService from './BaseService';
import { DebugLog } from '@/common/functions/dev';

const debugLog = DebugLog(DebugLog.DEBUGS.searchService);

type SearchResultItem = {
  character: Character;
  set: ArtifactSet;
  score: number;
  shouldSave: boolean;
};
type SearchResult = {
  byArtifact: SearchResultItem[];
  byCharacterRecommendation: SearchResultItem[];
};
type LastResult = {
  search: SearchResult;
  searchArtifactSets: SearchResultItem[];
  searchCharacterRecommendations: SearchResultItem[];
  piecesScore: number;
  mainStatRarity: number;
};

const SHOULD_SAVE_THRESHOLD = 40;
const ARTIFACT_PIECES_SCORES: Record<ArtifactPartName, number> = {
  Flower: 0,
  Feather: 0,
  Circlet: 3,
  Goblet: 2,
  Sands: 2,
};

const { ArtifactSetNames, ArtifactSets, Characters } = DataStore;

export const SearchService = new class SearchService extends BaseService<LastResult> {
  public static readonly SHOULD_SAVE_THRESHOLD = SHOULD_SAVE_THRESHOLD;
  public static readonly ARTIFACT_PIECES_SCORES = ARTIFACT_PIECES_SCORES;
  constructor() { super({} as LastResult); }

  public searchArtifactSets(
    artifactSetName: keyof typeof ArtifactSetData,
    artifactPartName: ArtifactPartName,
    mainStat: MainStatName,
    subStats: SubStatName[],
  ): SearchResultItem[] {
    debugLog('group', 'searchArtifactSets');
    debugLog('params', { artifactSetName, artifactPartName, mainStat, subStats });

    // Check artifact set exists in data
    if (!ArtifactSetNames.includes(artifactSetName)) throw new Error(`Artifact set "${artifactSetName}" not found in data.`);
    const set = ArtifactSets.find(set => set.name === artifactSetName);
    debugLog('Set found', set);

    const result = this.lastResult.searchArtifactSets = Characters.map(character => {
      debugLog('group', character.name);
      debugLog('group', 'setScoreOnCharacter');
      const setScoreOnCharacter = character.sets.reduce((acc, cSet) => {
        const compatibility = cSet.artifactSets.find(equippingSet =>
          equippingSet.set.name === artifactSetName
        )?.effectiveness ?? 0;
        debugLog('Compatibility', compatibility);
        const result = acc + compatibility;
        debugLog('Accumulated', result);
        return result;
      }, 0);
      debugLog('Result', setScoreOnCharacter);
      debugLog('groupEnd');

      const pieceScore = this._getPartScore(character, artifactPartName, mainStat, subStats);
      const score = setScoreOnCharacter + pieceScore;
      debugLog('Score', score);

      const result = {
        character,
        set,
        score,
        shouldSave: score > SHOULD_SAVE_THRESHOLD // TODO: Play around with threshold
      } as SearchResultItem;
      debugLog('Result', result);
      debugLog('groupEnd');
      return result;
    }).sort((a, b) => b.score - a.score);
    debugLog('Result', result);
    debugLog('groupEnd');
    return result;
  }
  public searchCharacterRecommendations(
    artifactSetName: keyof typeof ArtifactSetData,
    artifactPartName: ArtifactPartName,
    mainStat: MainStatName,
    subStats: SubStatName[],
  ): SearchResultItem[] {
    debugLog('group', 'searchCharacterRecommendations');
    if (!ArtifactSetNames.includes(artifactSetName)) throw new Error(`Artifact set "${artifactSetName}" not found in data.`);
    const set = ArtifactSets.find(set => set.name === artifactSetName);
    debugLog('Set found', set);

    const getSetFromCharacter = (character: Character) => (
      character.sets.find(cSet => cSet.artifactSets
        .map(equppingSet => equppingSet.set.name)
        .includes(artifactSetName))
    );
    const isEffectiveForCharacter = (max: number) => (character: Character) => {
      const set = getSetFromCharacter(character);
      return set.artifactSets.find(equippingSet => equippingSet.set.name === artifactSetName)?.effectiveness ?? 0 >= max;
    };

    // Filter characters that use the artifact set
    const charactersUsesSet = Characters.filter(getSetFromCharacter);

    // Filter characters that want the artifact set (compatibility 5; first priority)
    const charactersWantSet = charactersUsesSet.filter(isEffectiveForCharacter(5));

    // Filter characters that could use the artifact set (compatibility 3; second/third priority)
    const charactersCouldUseSet = charactersUsesSet
      .filter(isEffectiveForCharacter(3))
      .filter(character => !charactersWantSet.includes(character));

    debugLog('Character data', { charactersUsesSet, charactersWantSet, charactersCouldUseSet });
    if (!charactersWantSet.length && !charactersCouldUseSet.length) {
      debugLog(`No characters found for ${artifactSetName}. Returning empty array.`);
      debugLog('groupEnd');
      return this.lastResult.searchCharacterRecommendations = [];
    }

    // Calculate scores
    const getScores = (characters: Character[]) => {
      debugLog('group', 'getScores');
      const result = characters.map(character => {
        const cSet = getSetFromCharacter(character);
        const setScore = cSet.artifactSets.reduce((acc, equippingSet) => acc + set.checkIsGood(character, equippingSet), 0);
        const partScore = this._getPartScore(character, artifactPartName, mainStat, subStats);
        const score = setScore + partScore;
        debugLog(`Score data for ${character.name}`, { setScore, partScore, score, SHOULD_SAVE_THRESHOLD });

        return {
          character,
          set,
          score,
          shouldSave: score > SHOULD_SAVE_THRESHOLD // TODO: Play around with threshold
        } as SearchResultItem;
      });
      debugLog('Result', result);
      debugLog('groupEnd');
      return result;
    };
    debugLog('groupEnd');

    const result = this.lastResult.searchCharacterRecommendations = [
      charactersWantSet, charactersCouldUseSet
    ].map(getScores).flat().sort((a, b) => b.score - a.score);
    debugLog('Result', result);
    debugLog('groupEnd');
    return result;
  }
  public search(
    artifactSetName: keyof typeof ArtifactSetData,
    artifactPartName: ArtifactPartName,
    mainStat: MainStatName,
    subStats: SubStatName[],
  ): SearchResult {
    // TODO: Cache results
    return this.lastResult.search = {
      byArtifact: this.searchArtifactSets(artifactSetName, artifactPartName, mainStat, subStats),
      byCharacterRecommendation: this.searchCharacterRecommendations(artifactSetName, artifactPartName, mainStat, subStats)
    };
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
      if (mainStat === 'HP%' && character.needsHP()) return 10;
      if (mainStat === 'ATK%' && character.needsATK()) return 10;
      if (mainStat === 'DEF%' && character.needsDEF()) return 10;
      if (mainStat === 'Elemental Mastery') return character.needsEM() ? 10 : 5;
      if (mainStat === 'Energy Recharge') return character.needsER() ? 10 : 10; // I never get ER artifacts, please send some
      if (mainStat === 'Healing Bonus') return character.bonusAbility === 'Heal' || character.bonusAbility === 'Self-heal' ? 10 : 2; // Healing bonus is decent but rarely used
      if (mainStat === 'Physical DMG Bonus') return 0; // Garbage stat
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
      debugLog('Substat', stat, result, acc)
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
};

export default SearchService;