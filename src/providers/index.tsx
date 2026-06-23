import { PropsWithChildren } from "react";
import ContextMenuProvider from "./ContextMenuProvider";
import ToastProvider from "./ToastProvider";
import ConfirmProvider from "./ConfirmProvider";

const GlobalProvider = ({ children }: PropsWithChildren) => (
  <ContextMenuProvider>
    <ToastProvider>
      <ConfirmProvider>
        {children}
      </ConfirmProvider>
    </ToastProvider>
  </ContextMenuProvider>
);

export default GlobalProvider;