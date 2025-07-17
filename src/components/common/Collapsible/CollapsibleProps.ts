import { ReactNode } from "react";

export type CollapsibleProps = {
  title: string;
  titleOpen?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  onOpen?: (open: boolean) => void;
  className?: string;
};
