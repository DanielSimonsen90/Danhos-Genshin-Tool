import { useRef, cloneElement, isValidElement, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { classNames } from '@/common/functions/strings';
import { usePopoverPosition, usePopoverTrigger } from './hooks';
import type { PopoverProps } from './PopoverTypes';

export default function Popover({
  children,
  content,
  trigger = 'hover',
  position = 'auto',
  alignment = 'center',
  open: controlledOpen,
  onOpenChange,
  showDelay = 200,
  hideDelay = 100,
  className,
  offset = 8,
  closeOnClickOutside = true,
  closeOnEscape = true,
  portalTarget
}: PopoverProps) {
  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  
  const resolvedContent = useMemo(() => typeof content === 'function' ? content() : content, [content]);
  const { open, triggerProps, popoverProps } = usePopoverTrigger({
    trigger,
    controlled: controlledOpen !== undefined,
    controlledOpen,
    showDelay,
    hideDelay,
    closeOnClickOutside,
    closeOnEscape,
    onOpenChange,
    triggerRef,
    popoverRef
  });

  const calculatedPosition = usePopoverPosition({
    triggerRef,
    popoverRef,
    open,
    preferredPosition: position,
    alignment,
    offset
  });

  // Clone the trigger element and attach ref + event handlers
  const triggerElement = isValidElement(children)
    ? cloneElement(children as React.ReactElement<any>, {
        ref: triggerRef,
        ...triggerProps
      })
    : children;

  const popoverElement = open && (
    <div
      ref={popoverRef}
      className={classNames('popover', className)}
      data-position={calculatedPosition.actualPosition}
      style={{
        position: 'fixed',
        top: `${calculatedPosition.top}px`,
        left: `${calculatedPosition.left}px`,
      }}
      {...popoverProps}
    >
      <div className="popover__content">
        {resolvedContent}
      </div>
    </div>
  );

  return (
    <>
      {triggerElement}
      {popoverElement && createPortal(
        popoverElement,
        portalTarget ?? document.body
      )}
    </>
  );
}
