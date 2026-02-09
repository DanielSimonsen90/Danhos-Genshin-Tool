import { classNames } from "@/common/functions/strings";
import { useMemo } from "react";

type Props = {
  variant: 'beta';
  tooltip?: string;
  children?: React.ReactNode;
}

export default function Badge({ variant, children, tooltip }: Props) {
  const resolvedChildren = useMemo(() => {
    if (children) return children;

    switch (variant) {
      case 'beta': return 'Beta';
    }
  }, [variant, children]);
  const resolvedTooltip = useMemo(() => {
    if (tooltip) return tooltip;

    switch (variant) {
      case 'beta': return 'This feature is currently in early stages and may be subject to change or contain errors.';
    }
  }, [variant, tooltip]);
  
  return (
    <div 
      className={classNames('badge', `badge--${variant}`)}
      title={resolvedTooltip}
    >
      {resolvedChildren}
    </div>
  );
}