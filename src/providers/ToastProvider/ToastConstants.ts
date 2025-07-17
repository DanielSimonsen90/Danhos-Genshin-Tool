import { createContext } from 'react';
import { ToastContextType, Toast, ToastOptions } from './ToastTypes';

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const DEFAULT_TOAST_DURATION = 4000;
export const TOAST_ANIMATION_DURATION = 300;
export const PROGRESS_UPDATE_INTERVAL = 50;

export const DEFAULT_TOAST: Omit<Toast, 'id' | 'message' | 'createdAt'> = {
  type: 'info',
  duration: DEFAULT_TOAST_DURATION,
  persistent: false
};

export const createToast = (message: string, options: ToastOptions = {}): Omit<Toast, 'id' | 'createdAt'> => {
  return {
    ...DEFAULT_TOAST,
    ...options,
    message
  };
};
