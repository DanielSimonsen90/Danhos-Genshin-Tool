import React, { useState, useCallback, PropsWithChildren } from 'react';
import { generateId } from '@/common/functions/random';
import { ToastContext, createToast } from './ToastConstants';
import { Toast, ToastOptions, ToastContextType } from './ToastTypes';
import { ToastContainer } from './components';

export default function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, options: ToastOptions = {}) => {
    const toast: Toast = {
      ...createToast(message, options),
      id: generateId(),
      createdAt: Date.now()
    };

    setToasts(prev => [...prev, toast]);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((message: string, options: Omit<ToastOptions, 'type'> = {}) => {
    showToast(message, { ...options, type: 'success' });
  }, [showToast]);

  const error = useCallback((message: string, options: Omit<ToastOptions, 'type'> = {}) => {
    showToast(message, { ...options, type: 'error' });
  }, [showToast]);

  const warning = useCallback((message: string, options: Omit<ToastOptions, 'type'> = {}) => {
    showToast(message, { ...options, type: 'warning' });
  }, [showToast]);

  const info = useCallback((message: string, options: Omit<ToastOptions, 'type'> = {}) => {
    showToast(message, { ...options, type: 'info' });
  }, [showToast]);
  return (
    <ToastContext.Provider value={{
      toasts,
      showToast, hideToast,
      success, error, warning, info
    }}>
      {children}
      <ToastContainer toasts={toasts} onClose={hideToast} />
    </ToastContext.Provider>
  );
}
