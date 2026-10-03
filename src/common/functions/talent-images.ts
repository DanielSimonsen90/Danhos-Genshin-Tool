import type { Character } from '../models';
import type { TalentType } from '../types';
import type { FetchImageRequest } from '../types/images';
import { IMAGE_PROVIDERS } from '../constants/image-providers';
import { snakeCaseFromCamelCase } from './strings';

const { paimonMoe, sunderarmor } = IMAGE_PROVIDERS;

const getProviderCharacterName = (character: Pick<Character, 'name' | 'element'>) => {
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
};

/**
 * Resolves where a character's talent image is stored locally and which providers can supply it.
 * Normal, charged and plunging attacks share one image per weapon type.
 *
 * @example
 * getTalentImageRequest(Keqing, 'Burst/Ult'); // { relativePath: 'talents/keqing_burst.webp', sources: [...] }
 */
export const getTalentImageRequest = (
  character: Pick<Character, 'name' | 'element' | 'weapon'>,
  talentType: TalentType,
): FetchImageRequest => {
  const characterName = getProviderCharacterName(character);
  const fileName = snakeCaseFromCamelCase(characterName).toLowerCase();

  switch (talentType) {
    case 'Normal/Press':
    case 'Charged/Hold':
    case 'Plunging/Press': return {
      relativePath: `talents/attack_${character.weapon.toLowerCase()}.webp`,
      sources: [`${sunderarmor}/Skill/UI_GachaTypeIcon_${character.weapon}.png`],
    };
    case 'Skill/Ability': return {
      relativePath: `talents/${fileName}_skill.webp`,
      sources: [
        `${sunderarmor}/Skill/1/${characterName}/talent_2.png`,
        `${paimonMoe}/skills/${fileName}/talent_2.png`,
      ],
    };
    case 'Burst/Ult': return {
      relativePath: `talents/${fileName}_burst.webp`,
      sources: [
        `${sunderarmor}/Skill/1/${characterName}/talent_3.png`,
        `${paimonMoe}/skills/${fileName}/talent_3.png`,
      ],
    };
  }
};
