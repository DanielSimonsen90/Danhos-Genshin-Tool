import Image from "./Image";
import { classNames, pascalCaseFromSnakeCase } from "@/common/functions/strings";
import { ImageService } from "@/services";

type Props = {
  mob: string;
  className?: string;
};

export default function MobImage({ mob, className }: Props) {
  return <Image
    className={classNames("mob-image", className)}
    src={ImageService.getMobImage(mob)}
    alt={mob}
  />;
}