import { useState, useRef, useEffect, useCallback, CSSProperties, EventHandler } from "react";

export function useFloatingDropdown() {
  const [showOptions, setShowOptions] = useState(false);
  const headerRef = useRef<HTMLButtonElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<CSSProperties>({});

  const onToggle = useCallback<EventHandler<any>>(e => {
    e.preventDefault();
    e.stopPropagation();
    setShowOptions(v => !v);
  }, []);

  useEffect(() => {
    if (!showOptions || !headerRef.current) return;

    const updatePosition = () => {
      if (!headerRef.current) return;

      const rect = headerRef.current.getBoundingClientRect();

      setDropdownStyle({
        position: 'fixed',
        top: rect.bottom,
        left: rect.left,
        minWidth: rect.width,
        width: 'auto',
        zIndex: 2001,
      });
    };
    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [showOptions]);

  return { 
    showOptions, setShowOptions,
    headerRef,
    dropdownStyle,
    onToggle
  };
}
