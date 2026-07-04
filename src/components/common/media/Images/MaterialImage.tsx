import { forwardRef, ComponentPropsWithoutRef } from 'react';
import type * as DropMaterials from '@/data/materials/drops';
import type * as LocalSpecialtyMaterials from '@/data/materials/local-specialties';
import type * as TalentMaterials from '@/data/materials/talents';
type Materials = typeof DropMaterials & typeof LocalSpecialtyMaterials & typeof TalentMaterials;

import ImageService from '@/services/ImageService';
import Image from './Image';

type Props = Omit<ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt'> & {
  material: keyof Materials | string;
};

export default forwardRef<HTMLImageElement, Props>(function MaterialImage({ material, ...props }, ref) {
  return <Image ref={ref} {...props} className='material-image' src={ImageService.getMaterialImage(material)} alt={material} />;
});