import { snakeCaseFromCamelCase } from '@/common/functions/strings';
import { ArtifactPartName } from '@/common/types';
import type * as ArtifactSetData from '@/data/artifact-sets';
import type * as CharacterData from '@/data/characters';
import BaseService from './BaseService';

const PAIMON_MOE_URL = 'https://paimon.moe/images';

export const ImageService = new class ImageService extends BaseService<string> {
  public static readonly PAIMON_MOE_URL = PAIMON_MOE_URL;

  public getArtifactImage(set: keyof typeof ArtifactSetData, part: ArtifactPartName): string {
    return this.lastResult = `${PAIMON_MOE_URL}/artifacts/${snakeCaseFromCamelCase(set)}_${snakeCaseFromCamelCase(part)}.png`;
  }
  
  public getCharacterImage(name: keyof typeof CharacterData): string {
    return this.lastResult = `${PAIMON_MOE_URL}/characters/${snakeCaseFromCamelCase(name)}.png`;
  }
}

export default ImageService;