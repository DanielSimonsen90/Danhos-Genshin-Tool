import { kebabCaseFromPascalCase, snakeCaseFromCamelCase } from '@/common/functions/strings';
import { ArtifactPartName, Element, TalentType, WeaponType } from '@/common/types';
import type * as ArtifactSetData from '@/data/artifact-sets';
import type * as CharacterData from '@/data/characters';
import type * as DomainsData from '@/data/domains/domain-of-blessing';
import BaseService from './BaseService';
import { IS_DEVELOPMENT_ENVIRONMENT } from '@/common/constants/dev';
import { IMAGE_PROVIDERS } from '@/common/constants/image-providers';
import { Character } from '@/common/models';
import { getTalentImageRequest } from '@/common/functions/talent-images';

const { paimonMoe, sunderarmor, genshinTrack } = IMAGE_PROVIDERS;
const LOCAL_PATH = '../assets/images';

type ImageEntry = {
  relativePath: string;
  sources: Array<string>;
};

const withoutQuotes = (value: string) => value.replace(/[':"]/g, '');

export const ImageService = new class ImageService extends BaseService<string> {
  private readonly entries = new Map<string, ImageEntry>();
  private readonly recoveries = new Map<string, Promise<string | null>>();

  /**
   * Gets the app-local URL of an artifact piece image.
   * Missing files are fetched from the trusted providers in development - see {@link recover}.
   */
  public getArtifactImage(set: keyof typeof ArtifactSetData | string, part: ArtifactPartName): string {
    const genshinTrackSlug = kebabCaseFromPascalCase(set).replace(/'/g, '').toLowerCase();
    const setName = snakeCaseFromCamelCase(set).replace(/'/g, '').toLowerCase();
    const pieceName = snakeCaseFromCamelCase(part).toLowerCase();

    return this.locate(`artifacts/${setName}_${pieceName}.webp`, [
      `${genshinTrack}/artifacts/${genshinTrackSlug}.png`,
      `${sunderarmor}/Gear/${snakeCaseFromCamelCase(set).toLowerCase()}.png`,
      `${paimonMoe}/artifacts/${setName}_${part === 'Feather' ? 'plume' : pieceName}.png`,
    ]);
  }

  public getCharacterImage(name: keyof typeof CharacterData | string): string {
    const fileName = withoutQuotes(snakeCaseFromCamelCase(name)).toLowerCase();
    return this.locate(`characters/${fileName}.webp`, [`${paimonMoe}/characters/${fileName}.png`]);
  }

  public getTalentImage(character: Character, talentType: TalentType): string {
    const { relativePath, sources } = getTalentImageRequest(character, talentType);
    return this.locate(relativePath, sources);
  }

  public getElementImage(name: Element): string {
    return this.locate(`elements/${name.toLowerCase()}.webp`, [
      `${sunderarmor}/Elements/Element_${this.formatRerollCdnName(name)}.png`,
    ]);
  }

  public getWeaponTypeImage(name: WeaponType): string {
    const fileName = withoutQuotes(snakeCaseFromCamelCase(name)).toLowerCase();
    return this.locate(`weapon-types/${fileName}.webp`, [`${paimonMoe}/weapons/${fileName}.png`]);
  }
  public getWeaponImage(name: string): string {
    const fileName = withoutQuotes(snakeCaseFromCamelCase(name)).toLowerCase();

    return this.locate(`weapons/${fileName}.webp`, [
      `${paimonMoe}/weapons/${fileName}.png`,
      `${sunderarmor}/Weapons/${this.formatRerollCdnName(name).replace(/[:"]/g, '')}.png`,
    ]);
  }

  public getDomainImage(name: keyof typeof DomainsData | string): string {
    return this.locate(`domains/${snakeCaseFromCamelCase(name).toLowerCase()}.webp`);
  }
  public getResinImage(name: 'original'): string {
    return this.locate(`resins/${name}_resin.webp`);
  }

  public getMaterialImage(name: string): string {
    const fileName = snakeCaseFromCamelCase(name);

    if (name.includes('Billet')) return this.locate(`materials/billets/${fileName}.webp`);
    else if (name.includes('Artificed Spare Clockwork Component - ')) return this.locate(`materials/drops/${fileName}.webp`);
    else if (name === 'Dream Solvent') return this.locate('materials/drops/dream_solvent.webp');

    const itemName = withoutQuotes(fileName).toLowerCase().replace(/-/g, '_');
    return this.locate(`materials/${itemName}.webp`, [`${paimonMoe}/items/${itemName}.png`]);
  }
  public getMobImage(name: string): string {
    return this.locate(`mobs/${snakeCaseFromCamelCase(name).replace(/[,:"]/g, '').toLowerCase()}.webp`);
  }

  /**
   * Resolves an image that failed to load from its local URL. Development only - installed applications ship every image locally.
   * Asks the main process to read it from disk or fetch it from the trusted providers, storing it for future sessions.
   *
   * @param localUrl A URL previously returned by one of the `get*Image` methods
   * @returns A URL the current session can display, or `null` when the image is unavailable
   * @example
   * <img src={src} onError={async () => setSrc(await ImageService.recover(src) ?? src)} />
   */
  public recover(localUrl: string): Promise<string | null> {
    const entry = this.entries.get(localUrl);
    if (!IS_DEVELOPMENT_ENVIRONMENT || !entry) return Promise.resolve(null);

    const pending = this.recoveries.get(localUrl);
    if (pending) return pending;

    if (!window.electronAPI) return Promise.resolve(null);

    const recovery = window.electronAPI.fetchImage(entry)
      .then(result => result ? URL.createObjectURL(new Blob([result.data], { type: result.mimeType })) : null)
      .catch(() => null);
    this.recoveries.set(localUrl, recovery);
    return recovery;
  }

  private locate(relativePath: string, sources: Array<string> = []): string {
    const localUrl = `${LOCAL_PATH}/${relativePath}`;
    if (IS_DEVELOPMENT_ENVIRONMENT) this.entries.set(localUrl, { relativePath, sources });
    return this.lastResult = localUrl;
  }

  private formatRerollCdnName(name: string): string {
    return name.slice(0, 1).toUpperCase() + snakeCaseFromCamelCase(name).slice(1);
  }
};

export default ImageService;
