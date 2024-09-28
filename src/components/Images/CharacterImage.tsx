import type * as Characters from '@/data/characters';
import { getCharacterImage } from '@/services/ImageService';
import Image from './Image';

type Props = {
  character: keyof typeof Characters;
};

export default function CharacterImage({ character }: Props) {
  return <Image src={getCharacterImage(character)} alt={character} />;
}