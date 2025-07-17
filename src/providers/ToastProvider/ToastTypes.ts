export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  duration?: number;
  type?: ToastType;
  persistent?: boolean;
}

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
  persistent: boolean;
  createdAt: number;
}

export interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, options?: ToastOptions) => void;
  hideToast: (id: string) => void;
  success: (message: string, options?: Omit<ToastOptions, 'type'>) => void;
  error: (message: string, options?: Omit<ToastOptions, 'type'>) => void;
  warning: (message: string, options?: Omit<ToastOptions, 'type'>) => void;
  info: (message: string, options?: Omit<ToastOptions, 'type'>) => void;
}

export interface ToastItemProps {
  toast: Toast;
  onClose: (id: string) => void;
}
