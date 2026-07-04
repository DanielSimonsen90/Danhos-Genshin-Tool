import { SVGProps } from "react";
import { classNames } from "@/common/functions/strings";

export default function FilterIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={classNames('icon', 'filter-icon', className)} {...props}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M22 3H2l8 9.46V19l4 2V12.46L22 3z" />
    </svg>
  );
}
