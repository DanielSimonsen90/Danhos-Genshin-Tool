import { ReactNode } from "react";

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';
export type PopoverAlignment = 'start' | 'center' | 'end';
export type PopoverTrigger = 'hover' | 'click' | 'manual';

export interface PopoverProps {
  /** The trigger element that the popover is attached to */
  children: ReactNode;
  
  /** The content to display in the popover */
  content: ReactNode;
  
  /** 
   * How the popover should be triggered 
   * @default 'hover'
   */
  trigger?: PopoverTrigger;
  
  /** 
   * Preferred position relative to trigger element 
   * @default 'auto'
   */
  position?: PopoverPosition;
  
  /** 
   * Alignment of popover along the cross-axis 
   * @default 'center'
   */
  alignment?: PopoverAlignment;
  
  /** Controlled visibility (for manual trigger) */
  open?: boolean;
  
  /** Callback when visibility changes */
  onOpenChange?: (open: boolean) => void;
  
  /** 
   * Delay before showing (ms) - only for hover trigger 
   * @default 200
   */
  showDelay?: number;
  
  /** 
   * Delay before hiding (ms) - only for hover trigger 
   * @default 100
   */
  hideDelay?: number;
  
  /** Additional CSS class for the popover container */
  className?: string;
  
  /** 
   * Offset from the trigger element (px) 
   * @default 8
   */
  offset?: number;
  
  /** 
   * Whether clicking outside should close the popover 
   * @default true
   */
  closeOnClickOutside?: boolean;
  
  /** 
   * Whether pressing Escape should close the popover 
   * @default true
   */
  closeOnEscape?: boolean;
  
  /** 
   * Portal target element 
   * @default document.body
   */
  portalTarget?: HTMLElement;
}

export interface CalculatedPosition {
  top: number;
  left: number;
  actualPosition: PopoverPosition;
}
