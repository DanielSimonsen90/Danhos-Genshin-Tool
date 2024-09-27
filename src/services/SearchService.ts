import * as CharacterData from '@/data/characters';
import * as ArtifactSetData from '@/data/artifact-sets';
import { Artifact, ArtifactSet, Character, Stat } from '@/common/models';
import type { ArtifactPartName, MainStatName, SubStatName } from '@/common/types';

type SearchResultItem = {
  character: Character;
  set: ArtifactSet
  score: number;
  shouldSave: boolean;
};

const SHOULD_SAVE_THRESHOLD = 0;
const ARTIFACT_PIECES_SCORES: Record<ArtifactPartName, number> = {
  Flower: 0,
  Feather: 0,
  Circlet: 3,
  Goblet: 2,
  Sands: 2,
};

const ArtifactSets = Object.values(ArtifactSetData);
const ArtifactSetNames = Object.keys(ArtifactSetData) as (keyof typeof ArtifactSetData)[];
const Characters = Object.values(CharacterData);

export function SearchArtifactSets(
  artifactSetName: keyof typeof ArtifactSetData,
  artifactPartName: ArtifactPartName,
  mainStat: MainStatName,
  subStats: SubStatName[],
): SearchResultItem[] {
  // Check artifact set exists in data
  if (!ArtifactSetNames.includes(artifactSetName)) throw new Error(`Artifact set "${artifactSetName}" not found in data.`);
  const set = ArtifactSets.find(set => set.name === artifactSetName);

  return Characters.map(character => {
    const setScoreOnCharacter = character.sets.reduce((acc, cSet) => {
      const compatibility = cSet.artifactSets.find(equippingSet => 
        equippingSet.set.name === artifactSetName
      ).effectiveness
      return acc + compatibility;
    }, 0);
    const pieceScore = getPieceScore(character, artifactPartName, mainStat, subStats);
    const score = setScoreOnCharacter + pieceScore;

    return {
      character,
      set,
      score,
      shouldSave: score > SHOULD_SAVE_THRESHOLD // TODO: Play around with threshold
    }
  })
}

export function SearchCharacterRecommendations(
  artifactSetName: keyof typeof ArtifactSetData,
  artifactPartName: ArtifactPartName,
  mainStat: Stat,
  subStats: Stat[],
): SearchResultItem[] {
  if (!ArtifactSetNames.includes(artifactSetName)) throw new Error(`Artifact set "${artifactSetName}" not found in data.`);

  // Filter characters that use the artifact set
  const charactersUsesSet = Characters.filter(character =>
    character.sets.some(cSet => cSet.artifactSets
      .map(equppingSet => equppingSet.set.name)
      .includes(artifactSetName)));
  if (!charactersUsesSet.length) return [];
}

function getPieceScore(
  character: Character, 
  artifactPartName: ArtifactPartName, 
  mainStat: MainStatName, 
  subStats: SubStatName[]
): number {
  const artifact = new Artifact(undefined, artifactPartName, mainStat, subStats);

  const partScore = ARTIFACT_PIECES_SCORES[artifactPartName];
  const mainStatScore = getMainStatRarity(artifactPartName, mainStat) * -100 + (function checkMainStatScore() {
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
  const subStatsScore = artifact.subStats.reduce((acc, stat) => {
    if (stat === 'HP' || stat === 'HP%') return acc + (character.needsHP() ? 20 : 1);
    if (stat === 'ATK' || stat === 'ATK%') return acc + (character.needsATK() ? 20 : 1);
    if (stat === 'DEF' || stat === 'DEF%') return acc + (character.needsDEF() ? 20 : 0);
    if (stat === 'Crit Rate' || stat === 'Crit DMG') return acc + 20;
    if (stat === 'Elemental Mastery') return acc + (character.needsEM() ? 20 : 5);
    if (stat === 'Energy Recharge') return acc + (character.needsER() ? 20 : 10);
    console.error(`Unknown substat "${stat}"`);
    return acc;
  }, 0);

  return partScore + mainStatScore + subStatsScore;
}

function getMainStatRarity(partName: ArtifactPartName, stat: MainStatName) {
  if (partName === 'Flower' || partName === 'Feather') return 100;
  if (stat === 'HP%' || stat === 'ATK%' || stat === 'DEF%') return partName !== 'Sands' ? 22 : 26;
  if (stat === 'Elemental Mastery') return partName === 'Sands' ? 10 : 4;
  return 10;
}