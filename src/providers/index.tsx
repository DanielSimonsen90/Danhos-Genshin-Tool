import { PropsWithChildren } from "react";
import ContextMenuProvider from "./ContextMenuProvider";
import ToastProvider from "./ToastProvider";

const GlobalProvider = ({ children }: PropsWithChildren) => (
  <ContextMenuProvider>
    <ToastProvider>
      {children}
    </ToastProvider>
  </ContextMenuProvider>
);

export default GlobalProvider;