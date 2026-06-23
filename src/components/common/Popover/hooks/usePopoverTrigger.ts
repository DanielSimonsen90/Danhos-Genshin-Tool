import { useState, useCallback, useRef, useEffect, RefObject } from 'react';
import type { PopoverTrigger } from '../PopoverTypes';

interface UsePopoverTriggerProps {
  trigger: PopoverTrigger;
  controlled: boolean;
  controlledOpen?: boolean;
  showDelay?: number;
  hideDelay?: number;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerRef: RefObject<HTMLElement>;
  popoverRef: RefObject<HTMLDivElement>;
}

export function usePopoverTrigger({
  trigger,
  controlled,
  controlledOpen,
  showDelay = 200,
  hideDelay = 100,
  closeOnClickOutside = true,
  closeOnEscape = true,
  onOpenChange,
  triggerRef,
  popoverRef
}: UsePopoverTriggerProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const open = controlled ? controlledOpen ?? false : internalOpen;

  const setOpen = useCallback((newOpen: boolean) => {
    if (controlled) {
      onOpenChange?.(newOpen);
    } else {
      setInternalOpen(newOpen);
      onOpenChange?.(newOpen);
    }
  }, [controlled, onOpenChange]);

  const clearTimeouts = useCallback(() => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (trigger !== 'hover') return;
    
    clearTimeouts();
    showTimeoutRef.current = setTimeout(() => {
      setOpen(true);
    }, showDelay);
  }, [trigger, showDelay, setOpen, clearTimeouts]);

  const handleMouseLeave = useCallback(() => {
    if (trigger !== 'hover') return;
    
    clearTimeouts();
    hideTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, hideDelay);
  }, [trigger, hideDelay, setOpen, clearTimeouts]);

  const handleClick = useCallback(() => {
    if (trigger !== 'click') return;
    setOpen(!open);
  }, [trigger, open, setOpen]);

  // Handle click outside
  useEffect(() => {
    if (!open || !closeOnClickOutside || trigger === 'manual') return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedTrigger = triggerRef.current?.contains(target);
      const clickedPopover = popoverRef.current?.contains(target);
      
      if (!clickedTrigger && !clickedPopover) {
        setOpen(false);
      }
    };

    // Use timeout to avoid closing immediately after opening
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, closeOnClickOutside, trigger, setOpen, triggerRef, popoverRef]);

  // Handle escape key
  useEffect(() => {
    if (!open || !closeOnEscape || trigger === 'manual') return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeOnEscape, trigger, setOpen]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return clearTimeouts;
  }, [clearTimeouts]);

  return {
    open,
    triggerProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: handleClick,
    },
    popoverProps: {
      onMouseEnter: trigger === 'hover' ? handleMouseEnter : undefined,
      onMouseLeave: trigger === 'hover' ? handleMouseLeave : undefined,
    }
  };
}
