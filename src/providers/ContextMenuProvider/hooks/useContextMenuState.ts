import { useState, useRef, useCallback } from 'react';
import { MenuItem, ContextMenuContextType, Position } from '../ContextMenuTypes';
import { CreateMenuItem } from '../ContextMenuConstants';

interface UseContextMenuStateProps {
  setExplicitPosition: (position: Position) => void;
}

export function useContextMenuState({ setExplicitPosition }: UseContextMenuStateProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [visible, setVisible] = useState(false);
  const targetRef = useRef<HTMLElement | null>(null);

  const closeMenu = useCallback(() => setVisible(false), []);

  const handleContextMenu = useCallback((
    e: React.MouseEvent,
    updatePosition: (clientX: number, clientY: number) => void
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!targetRef.current) return;
    if (!targetRef.current.contains(e.target as HTMLElement)) return closeMenu();

    setVisible(true);
    updatePosition(e.clientX, e.clientY);
  }, [closeMenu]);

  const createContextMenuHandler = useCallback((
    containerRef: React.RefObject<HTMLDivElement>
  ): ContextMenuContextType => {
    return (e) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      targetRef.current = target;

      return (items, position) => {
        const resolvedMenuItems = typeof items === 'function' ? items(CreateMenuItem) : items;
        const filteredMenuItems = resolvedMenuItems.filter(Boolean) as MenuItem[];
        setMenuItems(filteredMenuItems);
        
        // Handle explicit position override
        if (position) {
          setExplicitPosition(position);
        }

        if (containerRef.current && !containerRef.current.contains(target)) {
          containerRef.current?.addEventListener('click', closeMenu);
        }

        return { ref: containerRef, close: closeMenu };
      };
    };
  }, [closeMenu, setExplicitPosition]);

  return {
    menuItems,
    visible,
    targetRef,
    closeMenu,
    handleContextMenu,
    createContextMenuHandler,
  };
}
