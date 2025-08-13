import { TalentType } from "@/common/types";
import Image from "./Image";
import { ImageService } from "@/services";
import { Character } from "@/common/models";

type Props = {
  character: Character;
  talent: TalentType;
};

export default function TalentImage({ character, talent }: Props) {
  return <Image
    className="talent-image"
    src={ImageService.getTalentImage(character, talent)}
    alt={talent}
  />;
}