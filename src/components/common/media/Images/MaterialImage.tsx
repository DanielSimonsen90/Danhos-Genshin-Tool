import type * as DropMaterials from '@/data/materials/drops';
import type * as LocalSpecialtyMaterials from '@/data/materials/local-specialties';
import type * as TalentMaterials from '@/data/materials/talents';
type Materials = typeof DropMaterials & typeof LocalSpecialtyMaterials & typeof TalentMaterials;

import ImageService from '@/services/ImageService';
import Image from './Image';

type Props = {
  material: keyof Materials | string;
};

export default function MaterialImage({ material }: Props) {
  return <Image className='material-image' src={ImageService.getMaterialImage(material)} alt={material} />;
}