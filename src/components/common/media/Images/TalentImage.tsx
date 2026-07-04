import { forwardRef, ComponentPropsWithoutRef } from "react";
import { TalentType } from "@/common/types";
import Image from "./Image";
import { ImageService } from "@/services";
import { Character } from "@/common/models";

type Props = Omit<ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt'> & {
  character: Character;
  talent: TalentType;
};

export default forwardRef<HTMLImageElement, Props>(function TalentImage({ character, talent, ...props }, ref) {
  return <Image
    ref={ref}
    {...props}
    className="talent-image"
    src={ImageService.getTalentImage(character, talent)}
    alt={talent}
  />;
});