import { SVGProps } from "react";
import { classNames } from "@/common/functions/strings";

export default function SortIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={classNames('icon', 'sort-icon', className)} {...props}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <line x1="8" y1="4" x2="8" y2="20" />
      <polyline points="4 8 8 4 12 8" />
      <line x1="16" y1="20" x2="16" y2="4" />
      <polyline points="12 16 16 20 20 16" />
    </svg>
  );
}
