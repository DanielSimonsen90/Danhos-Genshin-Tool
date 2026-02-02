import { classNames } from "@/common/functions/strings";
import { forwardRef, Fragment } from "react";
import { Link } from "react-router-dom";

export function GetCardContainer(
  wrapInLink: boolean | undefined,
  route: string,
) {
  return forwardRef<HTMLElement, any>((props, ref) => {
    return wrapInLink
      ? <Link to={route} {...props} className={classNames("clickable", props.className)} ref={ref} />
      : <div {...props} ref={ref} />;
  });
}

export function GetModelNameContainer(
  linkOnName: boolean | undefined,
  route: string,
) {
  return (props: any) => linkOnName
    ? <Link to={route} {...props} className={classNames("model-card__name-text", props.className)} />
    : <Fragment {...props} />;
}