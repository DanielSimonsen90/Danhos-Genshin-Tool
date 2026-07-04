import { forwardRef, ComponentPropsWithoutRef } from "react";
import { WeaponType } from "@/common/types";
import Image from "./Image";
import { ImageService } from "@/services";

type Props = ({
  weaponType: WeaponType;
} | {
  weapon: string;
}) & Omit<ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt' | 'className' | 'fallbackSrc'>;

export default forwardRef<HTMLImageElement, Props>(function WeaponImage(props, ref) {
  const src = 'weaponType' in props
    ? ImageService.getWeaponTypeImage(props.weaponType)
    : ImageService.getWeaponImage(props.weapon);

  const className = 'weaponType' in props ? `weapon-type-image` : 'weapon-image';
  const alt = 'weaponType' in props ? props.weaponType : props.weapon;

  const { weaponType, weapon, ...rest } = props as Props & { weaponType?: WeaponType; weapon?: string };

  return typeof src === 'string'
    ? <Image ref={ref} {...rest} className={className} src={src} alt={alt} />
    : <Image ref={ref} {...rest} className={className} src={src[0]} fallbackSrc={src[1]} alt={alt} />
});