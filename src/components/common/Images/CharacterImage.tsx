import type * as Characters from '@/data/characters';
import ImageService from '@/services/ImageService';
import Image from './Image';

type Props = {
  character: keyof typeof Characters | string;
};

export default function CharacterImage({ character }: Props) {
  character = character.includes('(') ? character.split('(')[0].trim() : character;

  return <Image className='character-image' src={ImageService.getCharacterImage(character)} alt={character} />;
}