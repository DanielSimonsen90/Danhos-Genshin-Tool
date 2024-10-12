import { Link } from "react-router-dom";
import { classNames } from "@/common/functions/strings";

export function GetContainer<TNameable extends { name: string }>(wrapInLink: boolean, item: TNameable, dir: string) {
  return function (props: any) {
    return wrapInLink
      ? <Link to={ `/${dir}/${item.name}`} {...props} className={classNames("clickable", props.className)} />
      : <div { ...props } />;
  };
}