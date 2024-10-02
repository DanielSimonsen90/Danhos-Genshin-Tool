import type * as Characters from '@/data/characters';
import ImageService from '@/services/ImageService';
import Image from './Image';

type Props = {
  character: keyof typeof Characters | string;
};

export default function CharacterImage({ character }: Props) {
  return <Image src={ImageService.getCharacterImage(character)} alt={character} />;
}