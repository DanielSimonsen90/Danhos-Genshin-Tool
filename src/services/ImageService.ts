import { snakeCaseFromCamelCase, snakeCaseFromPascalCase } from '@/common/functions/strings';
import { ArtifactPartName, Element, WeaponType } from '@/common/types';
import type * as ArtifactSetData from '@/data/artifact-sets';
import type * as CharacterData from '@/data/characters';
import type * as DomainsData from '@/data/domains/domain-of-blessing';
import BaseService from './BaseService';
import { IS_DEVELOPMENT_ENVIRONMENT } from '@/common/constants/dev';
import { PROJECT_GITHUB_URL } from '@/common/constants/domain';

const PAIMON_MOE_URL = 'https://paimon.moe/images';
// const REROLL_CDN_URL = 'https://rerollcdn.com/GENSHIN'; -- Archived replaced by LustonPull
// const LUSTON_PULL_CDN_URL = 'https://lustonpull.com/GENSHIN' -- Archived replaced by Sunderarmor
const SUNDERARMOR_CDN_URL = 'https://sunderarmor.com/GENSHIN';
const LOCAL_PATH = IS_DEVELOPMENT_ENVIRONMENT ? '../assets/images' : `${PROJECT_GITHUB_URL}/tree/main/src/assets/images`;

export const ImageService = new class ImageService extends BaseService<string> {
  public getArtifactImage(set: keyof typeof ArtifactSetData | string, part: ArtifactPartName): string {
    return this.lastResult = set.includes('Prayers')
      ? `${PAIMON_MOE_URL}/artifacts/${snakeCaseFromCamelCase(set).replace("'", '')}_${part === 'Feather' ? 'plume' : snakeCaseFromCamelCase(part)}.png`
      : `${SUNDERARMOR_CDN_URL}/Gear/${snakeCaseFromCamelCase(set)}.png`;
  }
  
  public getCharacterImage(name: keyof typeof CharacterData | string): string {
    return this.lastResult = `${PAIMON_MOE_URL}/characters/${snakeCaseFromCamelCase(name).replace(/[':"]/g, '')}.png`;
  }

  public getElementImage(name: Element): string {
    return this.lastResult = `${SUNDERARMOR_CDN_URL}/Elements/Element_${this.formatRerollCdnName(name)}.png`;
  }
  
  public getWeaponTypeImage(name: WeaponType): string {
    return this.lastResult = `${SUNDERARMOR_CDN_URL}/UI/weapon_${snakeCaseFromCamelCase(name)}.png`;
  }
  public getWeaponImage(name: string): string {
    return this.lastResult = `${PAIMON_MOE_URL}/weapons/${snakeCaseFromCamelCase(name).replace(/[':"]/g, '')}.png`;
  }

  public getDomainImage(name: keyof typeof DomainsData | string): string {
    return this.lastResult = `${LOCAL_PATH}/domains/${snakeCaseFromPascalCase(name)}.png`;
  }
  public getResinImage(name: 'original'): string {
    return this.lastResult = `${LOCAL_PATH}/resins/${name}_resin.png`;
  }

  public getMaterialImage(name: string): string {
    if (name.includes('Billet')) return this.lastResult = `${LOCAL_PATH}/materials/billets/${snakeCaseFromCamelCase(name)}.webp`;
    else if (name.includes('Artificed Spare Clockwork Component - ')) return this.lastResult = `${LOCAL_PATH}/materials/drops/${snakeCaseFromCamelCase(name)}.webp`;
    else if (name === 'Dream Solvent') return this.lastResult = `${LOCAL_PATH}/materials/drops/dream_solvent.webp`;

    return this.lastResult = `${PAIMON_MOE_URL}/items/${snakeCaseFromCamelCase(name)
      .replace(/[':"]/g, '')
      .replace(/-/g, '_')}.png`;
  }
  getMobImage(name: string): string {
    return `${LOCAL_PATH}/mobs/${snakeCaseFromCamelCase(name).replace(/[,:"]/g, '')}.webp`;
  }

  private formatRerollCdnName(name: string): string {
    return name.slice(0, 1).toUpperCase() + snakeCaseFromCamelCase(name).slice(1);
  }
}

export default ImageService;