import { WeaponType } from "@/common/types";
import Image from "./Image";
import { ImageService } from "@/services";

type Props = {
  weapon: WeaponType;
};

export default function WeaponImage({ weapon }: Props) {
  const src = ImageService.getWeaponTypeImage(weapon);

  return <Image className="weapon-image" src={src} alt={weapon} />;
}