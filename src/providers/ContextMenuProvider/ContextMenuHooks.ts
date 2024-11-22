import { MouseEventHandler, useContext } from "react";
import { ContextMenuContext } from "./ContextMenuConstants";
import { ContextMenuContextType } from "./ContextMenuTypes";

export const useContextMenu = (...args: Parameters<ReturnType<ContextMenuContextType>>) => {
  const registerRef = useContext(ContextMenuContext);
  const handler: MouseEventHandler<HTMLDivElement> = (e: React.MouseEvent) => {
    const open = registerRef(e);
    open(...args);
  }

  return handler
}