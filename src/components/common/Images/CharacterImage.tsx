import type * as Characters from '@/data/characters';
import ImageService from '@/services/ImageService';
import Image from './Image';
import { useSettings } from '@/stores/SettingsStore';

type Props = {
  character: keyof typeof Characters | string;
};

export default function CharacterImage({ character }: Props) {
  const settings = useSettings('traveler');
  if (character.includes('Traveler') && settings.traveler !== 'lumine') character = character.replace('Traveler', 'traveler_dendro');

  return <Image className='character-image' src={ImageService.getCharacterImage(
    character.includes('(') ? character.split('(')[0].trim() : character
  )} alt={character} />;
}