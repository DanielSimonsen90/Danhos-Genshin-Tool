import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface UseTabResizeProps {
  resizable: boolean;
  direction: 'horizontal' | 'vertical';
  minSize: number;
  maxSize: number;
  initialSize: number;
  id?: string;
}

export function useTabResize({
  resizable,
  direction,
  minSize,
  maxSize,
  initialSize,
  id
}: UseTabResizeProps) {
  const storage = useLocalStorage<number>();
  const sizeStorage = id ? storage(`tabbar-size-${id}`) : null;

  const [tabsSize, setTabsSize] = useState(() => (
    resizable && direction === 'vertical'
      ? sizeStorage?.get(initialSize) ?? initialSize
      : initialSize
  ));

  const [isDragging, setIsDragging] = useState(false);
  const handleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newSize = e.clientX - rect.left;

    // Clamp the size within min/max bounds
    const clampedSize = Math.max(minSize, Math.min(maxSize, newSize));

    setTabsSize(clampedSize);
  }, [isDragging, minSize, maxSize]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (sizeStorage) sizeStorage.set(tabsSize);
  }, [sizeStorage, tabsSize]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const dynamicStyles = useMemo(() => (
    resizable && direction === 'vertical'
      ? { '--tabs-size': `${tabsSize}px` } as React.CSSProperties
      : {}
  ), [resizable, direction, tabsSize]);

  return {
    containerRef,
    handleRef,
    dynamicStyles,
    isDragging,
    handleMouseDown
  };
}
