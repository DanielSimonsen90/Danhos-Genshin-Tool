import { useState, PropsWithChildren, useRef, useEffect } from 'react';
import { ContextMenuContext, CreateMenuItem } from './ContextMenuConstants';
import { ContextMenuContextType, MenuItem, Position } from './ContextMenuTypes';

export default function ContextMenuProvider({ children }: PropsWithChildren) {
  const [position, setPosition] = useState<Position>('top-left');
  const [y, x] = position.split('-');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [visible, setVisible] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!targetRef.current) return;
    if (!targetRef.current.contains(e.target as HTMLElement)) return closeMenu();

    setVisible(true);
    setLeft(e.clientX - ref.current?.getBoundingClientRect().left);
    setTop(e.clientY - ref.current?.getBoundingClientRect().top);
  };

  const closeMenu = () => {
    setVisible(false);
    document.removeEventListener('click', closeMenu);
    document.removeEventListener('contextmenu', closeMenu);
  };

  const value: ContextMenuContextType = (e) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    targetRef.current = target;

    return (items, position) => {
      const menuItems = typeof items === 'function' ? items(CreateMenuItem) : items;
      setMenuItems(menuItems);
      if (position) setPosition(position);

      if (ref.current && !ref.current.contains(target)) ref.current?.addEventListener('click', closeMenu);

      return { ref, close: closeMenu };
    };
  };

  useEffect(() => {
    const hideEvents = ['click', 'contextmenu', 'keydown'];
    hideEvents.forEach(event => document.addEventListener(event, closeMenu));
    return () => {
      hideEvents.forEach(event => document.removeEventListener(event, closeMenu));
    };
  }, []);

  return (
    <ContextMenuContext.Provider value={value}>
      <div className="context-menu-container" onContextMenu={handleContextMenu} ref={ref} onClick={closeMenu}>
        {children}
        {visible && (
          <div className="context-menu" style={{
            top, left,
            transform: `translate(${x === 'right' ? '-100%' : 0}, ${y === 'bottom' ? '-100%' : 0})`,
          }}>
            {menuItems.map((item, index) => (
              item.type === 'divider' ? (
                <div key={index} className="context-menu-divider" data-label={item.label}>
                  {item.label}
                </div>
              )
              : item.type === 'option' ? (
                <div key={index} className="context-menu-item" onClick={item.action}>
                  {item.icon && <div className="context-menu-icon">{item.icon}</div>}
                  <span>{item.label}</span>
                </div>
              )
              : undefined
            ))}
          </div>
        )}
      </div>
    </ContextMenuContext.Provider>
  );
}