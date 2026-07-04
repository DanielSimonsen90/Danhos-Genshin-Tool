import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { ArtifactPartName } from '@/common/types';
import type * as ArtifactSets from '@/data/artifact-sets';
import ImageService from '@/services/ImageService';
import Image from './Image';
import { classNames, pascalCaseFromSnakeCase } from '@/common/functions/strings';

type Props = Omit<ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt' | 'fallbackSrc'> & {
  set: keyof typeof ArtifactSets | string & {};
  piece?: ArtifactPartName;
}

export default forwardRef<HTMLImageElement, Props>(function ArtifactImage({ set, piece, className, ...props }, ref) {
  const isPrayersPiece = set.includes('Prayers');
  const name = isPrayersPiece ? 'Circlet' : piece ?? 'Flower';
  const [src, fallbackSrc] = ImageService.getArtifactImage(set, name);

  return <Image
    ref={ref}
    {...props}
    className={classNames("artifact-image", className)}
    src={src}
    fallbackSrc={fallbackSrc}
    alt={`${pascalCaseFromSnakeCase(set)} ${name}`}
  />;
});