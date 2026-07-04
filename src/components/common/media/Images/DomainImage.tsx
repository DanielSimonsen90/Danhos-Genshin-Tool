import { forwardRef, ComponentPropsWithoutRef } from 'react';
import type * as Domains from '@/data/domains/domain-of-blessing';
import ImageService from '@/services/ImageService';
import Image from './Image';

type Props = Omit<ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt'> & {
  domain: keyof typeof Domains | string;
};

export default forwardRef<HTMLImageElement, Props>(function DomainImage({ domain, ...props }, ref) {
  return <Image ref={ref} {...props} className='domain-image' src={ImageService.getDomainImage(domain)} alt={domain} />;
});