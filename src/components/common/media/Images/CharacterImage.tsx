import { forwardRef, ComponentPropsWithoutRef } from 'react';
import type * as Characters from '@/data/characters';
import ImageService from '@/services/ImageService';
import Image from './Image';
import { useAccountData } from '@/stores/AccountStore';

type Props = Omit<ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt'> & {
  character: keyof typeof Characters | string;
};

export default forwardRef<HTMLImageElement, Props>(function CharacterImage({ character, ...props }, ref) {
  const account = useAccountData();
  let characterImage = character;

  if (character.toLowerCase().includes('traveler')) characterImage = account.traveler === 'lumine' ? 'traveler' : 'traveler_dendro';
  else if (character.toLowerCase() === 'lumine') characterImage = 'traveler';
  else if (character.toLowerCase() === 'aether') characterImage = 'traveler_dendro';

  return <Image ref={ref} key={character} {...props} className='character-image' src={ImageService.getCharacterImage(
    characterImage.includes('(') ? characterImage.split('(')[0].trim() : characterImage
  )} alt={character} />;
});