import { addTabNavigation } from "@/common/functions/accessibility";
import { classNames } from "@/common/functions/strings";
import { forwardRef, useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";

type Props = {
  value?: boolean | undefined;
  onChange?: (value: boolean | undefined) => void;
  disabled?: boolean;
  className?: string;
} & Omit<React.HTMLProps<HTMLDivElement>, 'onChange' | 'className' | 'value'>;

const options: Array<{
  value: boolean | undefined;
  icon: string;
}> = [
    { value: false, icon: '×' },
    { value: undefined, icon: '/' },
    { value: true, icon: '✓' },
  ];

export default forwardRef<HTMLDivElement, Props>(function FilterSwitch({
  onChange,
  disabled,
  className,
  ...props
}, ref) {
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<boolean | undefined>(props.value);
  const currentValue = props.value !== undefined ? props.value : value;

  const [isOpen, setIsOpen] = useState(false);

  const componentClassName = classNames(
    "filter-switch",
    disabled && "filter-switch--disabled",
    isOpen && "filter-switch--open",
    className
  );

  const handleStateClick = (newValue: boolean | undefined) => {
    if (disabled) return;

    setValue(newValue);
    onChange?.(newValue);
    setIsOpen(false); 

    if (hiddenInputRef.current) hiddenInputRef.current.value = newValue === undefined ? '' : newValue.toString();
  };

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const getStateIcon = (value: boolean | undefined): string => options.find(option => option.value === value)!.icon;

  // Close dropdown when clicking outside
  const dropdownRef = useClickOutside('div', () => setIsOpen(false));

  return (
    <div  {...props}
      ref={ref}
      className={componentClassName}
      role="button"
      aria-expanded={isOpen}
      aria-haspopup="menu"
      data-filter-switch-value={currentValue !== undefined ? currentValue.toString() : 'default'}
    >
      <button type="button"
        className="filter-switch__current"
        onClick={toggleDropdown}
        disabled={disabled}
        {...addTabNavigation(toggleDropdown)}
      >
        <span className="filter-switch__icon">{getStateIcon(currentValue)}</span>
        <span className="filter-switch__chevron">▼</span>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="filter-switch__dropdown"
          role="menu"
        >
          {options.map(({ value, icon }) => (
            <button
              key={icon}
              type="button"
              className={classNames(
                "filter-switch__option",
                currentValue === value && "filter-switch__option--active"
              )}
              onClick={() => handleStateClick(value)}
              disabled={disabled}
              role="menuitem"
              {...addTabNavigation(() => handleStateClick(value))}
              data-filter-switch-value={value !== undefined ? value.toString() : 'default'}
            >
              <span className="filter-switch__option-icon">{icon}</span>
            </button>
          ))}
        </div>
      )}

      <input
        ref={hiddenInputRef}
        type="hidden"
        value={currentValue === undefined ? '' : currentValue.toString()}
        name={props.name}
      />
    </div>
  );
});
