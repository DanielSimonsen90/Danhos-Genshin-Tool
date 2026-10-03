import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { ArtifactPartName } from '@/common/types';
import type * as ArtifactSets from '@/data/artifact-sets';
import ImageService from '@/services/ImageService';
import Image from './Image';
import { classNames, pascalCaseFromSnakeCase } from '@/common/functions/strings';

type Props = Omit<ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt'> & {
  set: keyof typeof ArtifactSets | (string & NonNullable<unknown>);
  piece?: ArtifactPartName;
}

export default forwardRef<HTMLImageElement, Props>(function ArtifactImage({ set, piece, className, ...props }, ref) {
  const isPrayersPiece = set.includes('Prayers');
  const name = isPrayersPiece ? 'Circlet' : piece ?? 'Flower';

  return <Image
    ref={ref}
    {...props}
    className={classNames("artifact-image", className)}
    src={ImageService.getArtifactImage(set, name)}
    alt={`${pascalCaseFromSnakeCase(set)} ${name}`}
  />;
});