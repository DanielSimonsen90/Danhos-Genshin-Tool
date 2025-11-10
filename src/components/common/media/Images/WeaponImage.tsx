import { WeaponType } from "@/common/types";
import Image from "./Image";
import { ImageService } from "@/services";

type Props = {
  weaponType: WeaponType;
} | {
  weapon: string;
}

export default function WeaponImage(props: Props) {
  const src = 'weaponType' in props 
    ? ImageService.getWeaponTypeImage(props.weaponType)
    : ImageService.getWeaponImage(props.weapon);

  const className = 'weaponType' in props ? `weapon-type-image` : 'weapon-image';
  const alt = 'weaponType' in props ? props.weaponType : props.weapon;

  return typeof src === 'string' 
    ? <Image className={className} src={src} alt={alt} />
    : <Image className={className} src={src[0]} fallbackSrc={src[1]} alt={alt} />
}