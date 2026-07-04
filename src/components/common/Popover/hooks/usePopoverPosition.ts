import { useState, useEffect, useCallback, RefObject } from 'react';
import type { PopoverPosition, PopoverAlignment, CalculatedPosition } from '../PopoverTypes';

interface UsePopoverPositionProps {
  triggerRef: RefObject<HTMLElement>;
  popoverRef: RefObject<HTMLDivElement>;
  open: boolean;
  preferredPosition?: PopoverPosition;
  alignment?: PopoverAlignment;
  offset?: number;
}

export function usePopoverPosition({
  triggerRef,
  popoverRef,
  open,
  preferredPosition = 'auto',
  alignment = 'center',
  offset = 8
}: UsePopoverPositionProps) {
  const [position, setPosition] = useState<CalculatedPosition>({
    top: 0,
    left: 0,
    actualPosition: 'bottom'
  });

  const calculatePosition = useCallback((): CalculatedPosition => {
    if (!triggerRef.current || !popoverRef.current) {
      return { top: 0, left: 0, actualPosition: 'bottom' };
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Calculate available space in each direction
    const space = {
      top: triggerRect.top,
      bottom: viewport.height - triggerRect.bottom,
      left: triggerRect.left,
      right: viewport.width - triggerRect.right
    };

    // Determine best position
    let finalPosition: PopoverPosition = preferredPosition;
    
    if (preferredPosition === 'auto') {
      // Choose position with most space
      if (space.bottom >= popoverRect.height || space.bottom >= space.top) finalPosition = 'bottom';
      else if (space.top >= popoverRect.height) finalPosition = 'top';
      else if (space.right >= popoverRect.width) finalPosition = 'right';
      else if (space.left >= popoverRect.width) finalPosition = 'left';
      else finalPosition = 'bottom'; // Default fallback
    }

    // Calculate position based on final direction
    let top = 0;
    let left = 0;

    switch (finalPosition) {
      case 'top': {
        top = triggerRect.top - popoverRect.height - offset;
        left = calculateAlignedLeft(triggerRect, popoverRect, alignment);
        break;
      }
      case 'bottom': {
        top = triggerRect.bottom + offset;
        left = calculateAlignedLeft(triggerRect, popoverRect, alignment);
        break;
      }
      case 'left': {
        top = calculateAlignedTop(triggerRect, popoverRect, alignment);
        left = triggerRect.left - popoverRect.width - offset;
        break;
      }
      case 'right': {
        top = calculateAlignedTop(triggerRect, popoverRect, alignment);
        left = triggerRect.right + offset;
        break;
      }
    }

    // Ensure popover stays within viewport bounds
    const padding = 8;
    top = Math.max(padding, Math.min(top, viewport.height - popoverRect.height - padding));
    left = Math.max(padding, Math.min(left, viewport.width - popoverRect.width - padding));

    return {
      top,
      left,
      actualPosition: finalPosition
    };
  }, [triggerRef, popoverRef, preferredPosition, alignment, offset]);

  // Recalculate position when popover opens or window resizes/scrolls
  useEffect(() => {
    if (!open) return;

    const updatePosition = () => setPosition(calculatePosition());

    // Initial calculation
    updatePosition();

    // Update on scroll/resize
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    // Recalculate when popover size changes (e.g. images load after mount)
    const el = popoverRef.current;
    const resizeObserver = el ? new ResizeObserver(updatePosition) : null;
    resizeObserver?.observe(el!);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
      resizeObserver?.disconnect();
    };
  }, [open, calculatePosition, popoverRef]);

  return position;
}

function calculateAlignedLeft(
  triggerRect: DOMRect,
  popoverRect: DOMRect,
  alignment: PopoverAlignment
): number {
  switch (alignment) {
    case 'start': return triggerRect.left;
    case 'end': return triggerRect.right - popoverRect.width;
    case 'center': // fall to default 
    default: return triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
  }
}

function calculateAlignedTop(
  triggerRect: DOMRect,
  popoverRect: DOMRect,
  alignment: PopoverAlignment
): number {
  switch (alignment) {
    case 'start': return triggerRect.top;
    case 'end': return triggerRect.bottom - popoverRect.height;
    case 'center': // fall to default
    default: return triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
  }
}
