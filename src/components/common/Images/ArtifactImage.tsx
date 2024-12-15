import { ArtifactPartName } from '@/common/types';
import type * as ArtifactSets from '@/data/artifact-sets';
import ImageService from '@/services/ImageService';
import Image from './Image';
import { classNames, pascalCaseFromSnakeCase } from '@/common/functions/strings';

type Props = {
  set: keyof typeof ArtifactSets | string & {};
  piece: ArtifactPartName;
  className?: string;
}

export default function ArtifactImage({ set, piece: name, className }: Props) {
  return <Image className={classNames("artifact-image", className)} src={ImageService.getArtifactImage(set, name)} alt={`${pascalCaseFromSnakeCase(set)} ${name}`} />;
}