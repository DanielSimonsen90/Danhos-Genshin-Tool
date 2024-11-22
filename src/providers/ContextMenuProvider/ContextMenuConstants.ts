import { createContext } from "react";
import { ContextMenuContextType, MenuItem } from "./ContextMenuTypes";

export const ContextMenuContext = createContext<ContextMenuContextType>(null);

export function CreateMenuItem(label: string, action: MenuItem['action'], icon?: MenuItem['icon']) {
  return { label, action, icon };
}