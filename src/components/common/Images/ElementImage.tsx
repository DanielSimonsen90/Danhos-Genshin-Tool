import { Element } from "@/common/types";
import Image from "./Image";
import { ImageService } from "@/services";

type Props = {
  element: Element
}

export default function ElementImage({ element }: Props) {
  const src = ImageService.getElementImage(element);
  
  return <Image className="element-image" src={src} alt={element} />;
}