import { forwardRef, ComponentPropsWithoutRef } from "react";
import Image from "./Image";
import { classNames, pascalCaseFromSnakeCase } from "@/common/functions/strings";
import { ImageService } from "@/services";

type Props = Omit<ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt'> & {
  mob: string;
};

export default forwardRef<HTMLImageElement, Props>(function MobImage({ mob, className, ...props }, ref) {
  return <Image
    ref={ref}
    {...props}
    className={classNames("mob-image", className)}
    src={ImageService.getMobImage(mob)}
    alt={mob}
  />;
});