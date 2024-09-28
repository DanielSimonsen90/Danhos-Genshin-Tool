import { snakeCaseFromCamelCase } from '@/common/functions/strings';
import { ArtifactPartName } from '@/common/types';
import type * as ArtifactSetData from '@/data/artifact-sets';
import type * as CharacterData from '@/data/characters';

const PAIMON_MOE_URL = 'https://paimon.moe/images';

export function getArtifactImage(set: keyof typeof ArtifactSetData, part: ArtifactPartName): string {
  return `${PAIMON_MOE_URL}/artifacts/${snakeCaseFromCamelCase(set)}_${snakeCaseFromCamelCase(part)}.png`;
}

export function getCharacterImage(name: keyof typeof CharacterData): string {
  return `${PAIMON_MOE_URL}/characters/${snakeCaseFromCamelCase(name)}.png`;
}