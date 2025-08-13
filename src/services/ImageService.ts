import { snakeCaseFromCamelCase, snakeCaseFromPascalCase } from '@/common/functions/strings';
import { ArtifactPartName, Element, TalentType, WeaponType } from '@/common/types';
import type * as ArtifactSetData from '@/data/artifact-sets';
import type * as CharacterData from '@/data/characters';
import type * as DomainsData from '@/data/domains/domain-of-blessing';
import BaseService from './BaseService';
import { IS_DEVELOPMENT_ENVIRONMENT } from '@/common/constants/dev';
import { DEVELOPER_GITHUB_URL, PROJECT_GITHUB_URL } from '@/common/constants/domain';
import { Character } from '@/common/models';

const PAIMON_MOE_URL = 'https://paimon.moe/images';
// const REROLL_CDN_URL = 'https://rerollcdn.com/GENSHIN'; -- Archived replaced by LustonPull
// const LUSTON_PULL_CDN_URL = 'https://lustonpull.com/GENSHIN' -- Archived replaced by Sunderarmor
const GITHUB_CONTENT_URL = `https://raw.githubusercontent.com/${DEVELOPER_GITHUB_URL.split('/').at(-1)}/${PROJECT_GITHUB_URL.split('/').at(-1)}/refs/heads/main/src`;
const SUNDERARMOR_CDN_URL = 'https://sunderarmor.com/GENSHIN';
const LOCAL_PATH = !IS_DEVELOPMENT_ENVIRONMENT ? '../assets/images' : `${GITHUB_CONTENT_URL}/assets/images`;

export const ImageService = new class ImageService extends BaseService<string> {
  public getArtifactImage(set: keyof typeof ArtifactSetData | string, part: ArtifactPartName): string {
    return this.lastResult = set.includes('Prayers')
      ? `${PAIMON_MOE_URL}/artifacts/${snakeCaseFromCamelCase(set).replace("'", '').toLowerCase()}_${part === 'Feather' ? 'plume' : snakeCaseFromCamelCase(part).toLowerCase()}.png`
      : `${SUNDERARMOR_CDN_URL}/Gear/${snakeCaseFromCamelCase(set).toLowerCase()}.png`;
  }

  public getCharacterImage(name: keyof typeof CharacterData | string): string {
    return this.lastResult = `${PAIMON_MOE_URL}/characters/${snakeCaseFromCamelCase(name)
      .toLowerCase()
      .replace(/[':"]/g, '')
    }.png`;
  }
  public getTalentImage(character: Character, talentType: TalentType) {
    let imageName = (() => {
      switch (talentType) {
        case 'Normal/Press':
        case 'Charged/Hold':
        case 'Plunging/Press':
          return `UI_GachaTypeIcon_${character.weapon}`;
        case 'Skill/Ability':
          return `1/<character-name>/talent_2`;
        case 'Burst/Ult':
          return `1/<character-name>/talent_3`;
      }
    })();

    imageName = imageName.replace('<character-name>', (() => {
      if (character.name.includes('Traveler')) return `Traveler ${character.element}`;

      switch (character.name) {
        case 'Arataki Itto': return 'Itto';
        case 'Kaedehara Kazuha': return 'Kazuha';
        case 'Kamisato Ayaka': return 'Ayaka';
        case 'Kamisato Ayato': return 'Ayato';
        case 'Kujou Sara': return 'Sara';
        case 'Raiden Shogun': return 'Raiden';
        case 'Sangonomiya Kokomi': return 'Kokomi';
        case 'Shikanoin Heizou': return 'Heizou';
        default: return character.name.split('(')[0].trim();
      }
    })());

    return this.lastResult = `${SUNDERARMOR_CDN_URL}/Skill/${imageName}.png`;
  }

  public getElementImage(name: Element): string {
    return this.lastResult = `${SUNDERARMOR_CDN_URL}/Elements/Element_${this.formatRerollCdnName(name)}.png`;
  }

  public getWeaponTypeImage(name: WeaponType): string {
    // return this.lastResult = `${SUNDERARMOR_CDN_URL}/UI/weapon_${snakeCaseFromCamelCase(name)}.png`;
    return this.lastResult = `${PAIMON_MOE_URL}/weapons/${snakeCaseFromCamelCase(name)
      .replace(/[':"]/g, '')
      .toLowerCase()
    }.png`;
  }
  public getWeaponImage(name: string): string {
    return this.lastResult = `${PAIMON_MOE_URL}/weapons/${snakeCaseFromCamelCase(name)
      .replace(/[':"]/g, '')
      .toLowerCase()
    }.png`;
  }

  public getDomainImage(name: keyof typeof DomainsData | string): string {
    return this.lastResult = `${LOCAL_PATH}/domains/${snakeCaseFromCamelCase(name).toLowerCase()}.png`;
  }
  public getResinImage(name: 'original'): string {
    return this.lastResult = `${LOCAL_PATH}/resins/${name}_resin.png`;
  }

  public getMaterialImage(name: string): string {
    if (name.includes('Billet')) return this.lastResult = `${LOCAL_PATH}/materials/billets/${snakeCaseFromCamelCase(name)}.webp`;
    else if (name.includes('Artificed Spare Clockwork Component - ')) return this.lastResult = `${LOCAL_PATH}/materials/drops/${snakeCaseFromCamelCase(name)}.webp`;
    else if (name === 'Dream Solvent') return this.lastResult = `${LOCAL_PATH}/materials/drops/dream_solvent.webp`;

    return this.lastResult = `${PAIMON_MOE_URL}/items/${snakeCaseFromCamelCase(name)
      .toLowerCase()
      .replace(/[':"]/g, '')
      .replace(/-/g, '_')}.png`;
  }
  public getMobImage(name: string): string {
    return `${LOCAL_PATH}/mobs/${snakeCaseFromCamelCase(name).replace(/[,:"]/g, '').toLowerCase()}.webp`;
  }

  private formatRerollCdnName(name: string): string {
    return name.slice(0, 1).toUpperCase() + snakeCaseFromCamelCase(name).slice(1);
  }
};

export default ImageService;