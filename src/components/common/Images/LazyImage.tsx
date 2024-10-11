import { useLazyImage } from "@/hooks/useLazyImage";
import Image from "./Image";

type FullProps = {
  path: string;
}
type SplitProps = {
  dir: string;
  name: string;
  ext?: string;
}

type Props = {
  alt: string;
} & (FullProps | SplitProps);

export default function LazyImage({ alt, ...props }: Props) {
  const src = useLazyImage(
    'dir' in props ? props.dir : props.path, 
    'name' in props ? props.name : undefined, 
    'ext' in props ? props.ext : undefined
  );

  return <Image src={src} alt={alt} />;
}