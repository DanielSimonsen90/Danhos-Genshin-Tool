import { forwardRef, ComponentPropsWithoutRef } from 'react';
import type * as Characters from '@/data/characters';
import ImageService from '@/services/ImageService';
import Image from './Image';
import { useAccountData } from '@/stores/AccountStore';

type Props = Omit<ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt'> & {
  character: keyof typeof Characters | string;
};

export default forwardRef<HTMLImageElement, Props>(function CharacterImage({ character, ...props }, ref) {
  const region = useAccountData()
  if (character.toLowerCase().includes('traveler') && region.traveler !== 'lumine') character = character.replace('Traveler', 'traveler_dendro');
  else if (character.toLowerCase() === 'lumine') character = 'traveler';
  else if (character.toLowerCase() === 'aether') character = 'traveler_dendro';

  return <Image ref={ref} key={character} {...props} className='character-image' src={ImageService.getCharacterImage(
    character.includes('(') ? character.split('(')[0].trim() : character
  )} alt={character} />;
});