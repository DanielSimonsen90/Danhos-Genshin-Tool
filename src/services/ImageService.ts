import { ArtifactPartName } from '@/common/types';
import type * as ArtifactSetData from '@/data/artifact-sets';
import type * as CharacterData from '@/data/characters';

const PAIMON_MOE_URL = 'https://paimon.moe/images';

function snakeCase(value: string): string {
  return value.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`);
}

export function getArtifactImage(set: keyof typeof ArtifactSetData, part: ArtifactPartName): string {
  return `${PAIMON_MOE_URL}/artifacts/${snakeCase(set)}/${snakeCase(part)}.png`;
}

export function getCharacterImage(name: keyof typeof CharacterData): string {
  return `${PAIMON_MOE_URL}/characters/${snakeCase(name)}.png`;
}