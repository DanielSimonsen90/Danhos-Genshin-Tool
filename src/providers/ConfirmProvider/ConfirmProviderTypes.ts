import type { ReactNode } from "react";

export type ConfirmOptions = {
  title: ReactNode;
  message: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
};

export type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

export type PendingConfirm = ConfirmOptions & { resolve: (value: boolean) => void; };