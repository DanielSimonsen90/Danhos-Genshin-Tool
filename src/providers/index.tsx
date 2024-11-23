import { PropsWithChildren } from "react";
import ContextMenuProvider from "./ContextMenuProvider";

const GlobalProvider = ({ children }: PropsWithChildren) => (
  <ContextMenuProvider>
    {children}
  </ContextMenuProvider>
);

export default GlobalProvider;