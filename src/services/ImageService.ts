import { snakeCaseFromCamelCase, snakeCaseFromPascalCase } from '@/common/functions/strings';
import { ArtifactPartName, Element, Weapon } from '@/common/types';
import type * as ArtifactSetData from '@/data/artifact-sets';
import type * as CharacterData from '@/data/characters';
import type * as DomainsData from '@/data/domains';
import BaseService from './BaseService';

const PAIMON_MOE_URL = 'https://paimon.moe/images';
// const REROLL_CDN_URL = 'https://rerollcdn.com/GENSHIN'; -- Archived replaced by LustonPull
const LUSTON_PULL_CDN_URL = 'https://lustonpull.com/GENSHIN'
const LOCAL_PATH = '../assets/images';

export const ImageService = new class ImageService extends BaseService<string> {
  public getArtifactImage(set: keyof typeof ArtifactSetData | string, part: ArtifactPartName): string {
    return this.lastResult = set.includes('Prayers')
      ? `${PAIMON_MOE_URL}/artifacts/${snakeCaseFromCamelCase(set).replace("'", '')}_${part === 'Feather' ? 'plume' : snakeCaseFromCamelCase(part)}.png`
      : `${LUSTON_PULL_CDN_URL}/Gear/${snakeCaseFromCamelCase(set)}.png`;
  }
  
  public getCharacterImage(name: keyof typeof CharacterData | string): string {
    name = (() => {
      switch (name as keyof typeof CharacterData | string) {
        case 'Arataki Itto': return 'Itto';
        case 'Kaedehara Kazuha': return 'Kazuha';
        case 'Kamisato Ayaka': return 'Ayaka';
        case 'Kamisato Ayato': return 'Ayato';
        case 'Kujou Sara': return 'Sara';
        case 'Raiden Shogun': return 'Raiden';
        case 'Sangonomiya Kokomi': return 'Kokomi';
        case 'Shikanoin Heizou': return 'Heizou';
        case 'Tartaglia': return 'Childe';
        default: return name;
      }
    })();

    return this.lastResult = name.toLowerCase().includes('traveler') 
      ? `${PAIMON_MOE_URL}/characters/${snakeCaseFromCamelCase(name)}.png`
      : `${LUSTON_PULL_CDN_URL}/Characters/1/${name}.png`;
  }

  public getElementImage(name: Element): string {
    return this.lastResult = `${LUSTON_PULL_CDN_URL}/Elements/Element_${this.formatRerollCdnName(name)}.png`;
  }
  
  public getWeaponTypeImage(name: Weapon): string {
    return this.lastResult = `${LUSTON_PULL_CDN_URL}/UI/weapon_${snakeCaseFromCamelCase(name)}.png`;
  }
  public getWeaponImage(name: string): string {
    return this.lastResult = `${LUSTON_PULL_CDN_URL}/Weapons/${this.formatRerollCdnName(name)}.png`;
  }

  public getDomainImage(name: keyof typeof DomainsData | string): string {
    return this.lastResult = `${LOCAL_PATH}/domains/${snakeCaseFromPascalCase(name)}.png`;
  }
  public getResinImage(name: 'original'): string {
    return this.lastResult = `${LOCAL_PATH}/resins/${name}_resin.png`;
  }

  private formatRerollCdnName(name: string): string {
    return name.slice(0, 1).toUpperCase() + snakeCaseFromCamelCase(name).slice(1);
  }
}

export default ImageService;