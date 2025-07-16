import { useEffect, useMemo } from 'react';
import { MenuItem, MenuItemOption } from '../ContextMenuTypes';

interface UseContextMenuKeyboardProps {
  menuItems: MenuItem[];
  closeMenu: () => void;
}

export function useContextMenuKeyboard({ menuItems, closeMenu }: UseContextMenuKeyboardProps) {
  const respondsToKeys = useMemo<Array<MenuItemOption>>(() => (
    menuItems.filter(item => item.type === 'option' && item.respondsToKey) as Array<MenuItemOption>
  ), [menuItems]);

  useEffect(() => {
    const hideEvents = ['click', 'contextmenu', 'keydown'];
    const onHideEvent = (e: Event) => {
      if (e.type === 'keydown') {
        const keyboardEvent = e as KeyboardEvent;
        const matchingItem = respondsToKeys.find(
          item => item.respondsToKey.toLowerCase() === keyboardEvent.key.toLowerCase()
        );
        
        if (matchingItem) {
          matchingItem.action();
        }
      }

      closeMenu();
    };

    hideEvents.forEach(event => document.addEventListener(event, onHideEvent));

    return () => {
      hideEvents.forEach(event => document.removeEventListener(event, onHideEvent));
    };
  }, [respondsToKeys, closeMenu]);

  return {
    respondsToKeys,
  };
}
