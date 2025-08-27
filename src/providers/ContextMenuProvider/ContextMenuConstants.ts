import { createContext } from "react";
import { MenuItemOption, ContextMenuContextType, MenuItem, MenuItemTypes, MenuItemDivider } from "./ContextMenuTypes";

export const ContextMenuContext = createContext<ContextMenuContextType>(null as any);

export function CreateMenuItem(
  type: 'option', 
  label: MenuItemOption['label'], 
  action: MenuItemOption['action'], 
  icon?: MenuItemOption['icon'], 
  respondsToKey?: MenuItemOption['respondsToKey']
): MenuItem;
export function CreateMenuItem(
  type: 'divider', 
  label?: MenuItemDivider['label']
): MenuItem;

export function CreateMenuItem(
  type: MenuItemTypes, 
  label: MenuItemOption['label'], 
  action?: MenuItemOption['action'], 
  icon?: MenuItemOption['icon'],
  respondsToKey?: MenuItemOption['respondsToKey']
): MenuItem {
  switch (type) {
    case 'option': return { type, label, action, icon, respondsToKey } as MenuItem;
    case 'divider': return { type, label } as MenuItem;
    default: throw new Error('Invalid MenuItem type');
  }
}