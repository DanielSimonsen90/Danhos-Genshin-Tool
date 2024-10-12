import { snakeCaseFromCamelCase, snakeCaseFromPascalCase } from '@/common/functions/strings';
import { ArtifactPartName } from '@/common/types';
import type * as ArtifactSetData from '@/data/artifact-sets';
import type * as CharacterData from '@/data/characters';
import type * as DomainsData from '@/data/domains';
import BaseService from './BaseService';

const PAIMON_MOE_URL = 'https://paimon.moe/images';
const LOCAL_PATH = '/assets/images';

export const ImageService = new class ImageService extends BaseService<string> {
  public static readonly PAIMON_MOE_URL = PAIMON_MOE_URL;

  public getArtifactImage(set: keyof typeof ArtifactSetData | string, part: ArtifactPartName): string {
    return this.lastResult = `${PAIMON_MOE_URL}/artifacts/${snakeCaseFromCamelCase(set).replace("'", '')}_${
      part === 'Feather' ? 'plume' : snakeCaseFromCamelCase(part)
    }.png`;
  }
  
  public getCharacterImage(name: keyof typeof CharacterData | string): string {
    return this.lastResult = `${PAIMON_MOE_URL}/characters/${snakeCaseFromCamelCase(name)}.png`;
  }

  public getDomainImage(name: keyof typeof DomainsData | string): string {
    return this.lastResult = `${LOCAL_PATH}/domains/${snakeCaseFromPascalCase(name)}.png`;
  }
  public getResinImage(name: 'original'): string {
    return this.lastResult = `${LOCAL_PATH}/resins/${name}_resin.png`;
  }
}

export default ImageService;