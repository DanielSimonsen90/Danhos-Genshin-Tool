import { forwardRef, ComponentPropsWithoutRef } from "react";
import { Element } from "@/common/types";
import Image from "./Image";
import { ImageService } from "@/services";

type Props = Omit<ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt'> & {
  element: Element
}

export default forwardRef<HTMLImageElement, Props>(function ElementImage({ element, ...props }, ref) {
  const src = ImageService.getElementImage(element);

  return <Image ref={ref} {...props} className="element-image" src={src} alt={element} />;
});