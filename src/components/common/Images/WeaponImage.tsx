import { Weapon } from "@/common/types";
import Image from "./Image";
import { ImageService } from "@/services";

type Props = {
  weapon: Weapon;
};

export default function WeaponImage({ weapon }: Props) {
  const src = ImageService.getWeaponTypeImage(weapon);

  return <Image className="weapon-image" src={src} alt={weapon} />;
}