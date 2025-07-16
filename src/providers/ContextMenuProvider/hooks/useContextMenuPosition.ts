import { useState, useEffect, useRef } from 'react';
import { Position } from '../ContextMenuTypes';

interface UseContextMenuPositionProps {
  containerRef: React.RefObject<HTMLDivElement>;
  visible?: boolean;
}

export function useContextMenuPosition({ visible = false, containerRef }: UseContextMenuPositionProps) {
  const [position, setPosition] = useState<Position>('top-left');
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const [y, x] = position.split('-') as [string, string];

  const updatePosition = (clientX: number, clientY: number) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const newLeft = clientX - containerRect.left;
    const newTop = clientY - containerRect.top;

    setLeft(newLeft);
    setTop(newTop);
  };

  const setExplicitPosition = (newPosition: Position) => setPosition(newPosition);

  // Adjust menu position to prevent it from going off screen
  useEffect(() => {
    if (!visible || !containerRef.current) return;

    const menu = containerRef.current.querySelector('.context-menu') as HTMLElement;
    if (!menu) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();

    // Check horizontal overflow and flip if needed
    const wouldOverflowRight = containerRect.left + left + menuRect.width > window.innerWidth;
    const wouldOverflowLeft = containerRect.left + left < menuRect.width;

    const horizontalSide = wouldOverflowRight && !wouldOverflowLeft ? 'right' : 'left';

    // Check vertical overflow and flip if needed
    const wouldOverflowBottom = containerRect.top + top + menuRect.height > window.innerHeight;
    const wouldOverflowTop = containerRect.top + top < menuRect.height;

    const verticalSide = wouldOverflowBottom && !wouldOverflowTop ? 'bottom' : 'top';
    const newPosition = `${verticalSide}-${horizontalSide}` as Position;

    if (newPosition !== position) setPosition(newPosition);
  }, [visible, left, top, position]);

  const resetPosition = () => setPosition('top-left');

  return {
    position: { x, y },
    coordinates: { top, left },
    updatePosition,
    setExplicitPosition,
    resetPosition,
  };
}
