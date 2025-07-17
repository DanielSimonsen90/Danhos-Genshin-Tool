import { PropsWithChildren, useRef } from 'react';
import { ContextMenuContext } from './ContextMenuConstants';
import { useContextMenuPosition, useContextMenuKeyboard, useContextMenuState } from './hooks';

export default function ContextMenuProvider({ children }: PropsWithChildren) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const positionHook = useContextMenuPosition({ containerRef });
  const stateHook = useContextMenuState({ setExplicitPosition: positionHook.setExplicitPosition });
  const activePositionHook = useContextMenuPosition({ visible: stateHook.visible, containerRef });
  
  useContextMenuKeyboard({ 
    menuItems: stateHook.menuItems, 
    closeMenu: stateHook.closeMenu 
  });

  const value = stateHook.createContextMenuHandler(containerRef);
  const onContextMenu = (e: React.MouseEvent) => stateHook.handleContextMenu(e, activePositionHook.updatePosition);

  return (
    <ContextMenuContext.Provider value={value}>
      <div className="context-menu-container" onContextMenu={onContextMenu} ref={containerRef} onClick={stateHook.closeMenu}>
        {children}
        {stateHook.visible && (
          <div className="context-menu" style={{
            top: activePositionHook.coordinates.top, 
            left: activePositionHook.coordinates.left,
            transform: `translate(${activePositionHook.position.x === 'right' ? '-100%' : 0}, ${activePositionHook.position.y === 'bottom' ? '-100%' : 0})`,
          }}>
            {stateHook.menuItems.map((item, index) => (
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