import { addTabNavigation } from "@/common/functions/accessibility";
import { classNames } from "@/common/functions/strings";
import { forwardRef, useRef, useState } from "react";

type Props = {
  enabled?: boolean;
  onChange?: (enabled: boolean) => void;
} & Omit<React.HTMLProps<HTMLInputElement>, 'onChange'>;

export default forwardRef<HTMLInputElement, Props>(function Switch({ enabled, checked, disabled, ...props }, ref) {
  const [internalChecked, setInternalChecked] = useState(enabled ?? props.defaultChecked ?? false);
  const internalRef = useRef<HTMLInputElement>(null);
  const className = classNames(
    "switch", 
    disabled && "switch--disabled", 
    internalChecked && "switch--enabled"
  );

  const onChange = (checked: boolean) => {
    setInternalChecked(checked);
    props.onChange?.(checked);
    if (internalRef.current) internalRef.current.checked = checked;
  };

  return (
    <div className={className} role="checkbox" tabIndex={0} 
      {...addTabNavigation(() => onChange?.(!checked))}
    >
      <div className="switch__thumb"></div>
      <input {...props} ref={
        ref ? (element: HTMLInputElement) => {
          if (typeof ref === 'function') ref(element);
          else if (ref) ref.current = element;
          internalRef.current = element;
        } : undefined
      } disabled={disabled} type="checkbox" onChange={e => onChange?.(e.target.checked)} 
        value={checked !== undefined ? checked ? 'on' : 'off' : undefined} 
        checked={checked !== undefined ? checked : undefined}
        tabIndex={-1}   
      />
    </div>
  );
});