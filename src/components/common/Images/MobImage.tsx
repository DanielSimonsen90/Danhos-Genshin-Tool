import { Mob } from "@/common/models";
import Image from "./Image";
import { classNames, pascalCaseFromSnakeCase } from "@/common/functions/strings";
import { ImageService } from "@/services";

type Props = {
  mob: Mob;
  className?: string;
};

export default function MobImage({ mob, className }: Props) {
  const { name } = mob;
  
  return <Image
    className={classNames("artifact-image", className)}
    src={ImageService.getMobImage(name)}
    alt={name}
  />;
}