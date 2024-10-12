import type * as Domains from '@/data/domains';
import ImageService from '@/services/ImageService';
import Image from './Image';

type Props = {
  domain: keyof typeof Domains | string;
};

export default function DomainImage({ domain }: Props) {
  return <Image className='domain-image' src={ImageService.getDomainImage(domain)} alt={domain} />;
}