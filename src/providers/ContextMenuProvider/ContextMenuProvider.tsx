import { PropsWithChildren, useRef } from 'react';
import { ContextMenuContext } from './ContextMenuConstants';
import { useContextMenuPosition, useContextMenuKeyboard, useContextMenuState } from './hooks';

export default function ContextMenuProvider({ children }: PropsWithChildren) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const position = useContextMenuPosition({ containerRef });
  const state = useContextMenuState({ setExplicitPosition: position.setExplicitPosition });
  const activePosition = useContextMenuPosition({ visible: state.visible, containerRef });
  
  useContextMenuKeyboard({ 
    menuItems: state.menuItems, 
    closeMenu: state.closeMenu,
    visible: state.visible
  });

  const value = state.createContextMenuHandler(containerRef);
  const onContextMenu = (e: React.MouseEvent) => state.handleContextMenu(e, activePosition.updatePosition);

  return (
    <ContextMenuContext.Provider value={value}>
      <div className="context-menu-container" onContextMenu={onContextMenu} ref={containerRef} onClick={state.closeMenu}>
        {children}
        {state.visible && (
          <div className="context-menu" style={{
            top: activePosition.coordinates.top, 
            left: activePosition.coordinates.left,
            transform: `translate(${activePosition.position.x === 'right' ? '-100%' : 0}, ${activePosition.position.y === 'bottom' ? '-100%' : 0})`,
          }}>
            {state.menuItems.map((item, index) => (
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