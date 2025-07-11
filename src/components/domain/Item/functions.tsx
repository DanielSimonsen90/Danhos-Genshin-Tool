import { Link } from "react-router-dom";
import { forwardRef } from "react";
import { classNames } from "@/common/functions/strings";

export function GetContainer<TNameable extends { name: string }>(wrapInLink: boolean, item: TNameable, dir: string) {
  return forwardRef<HTMLElement, any>((props, ref) => {
    return wrapInLink
      ? <Link to={`/${dir}/${item.name}`} {...props} className={classNames("clickable", props.className)} ref={ref} />
      : <div {...props} ref={ref} />;
  });
}