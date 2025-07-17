import { useCallback } from 'react';
import { useToast } from '@/providers/ToastProvider';

export const useErrorBoundaryToast = () => {
  const { error } = useToast();

  const handleProductionError = useCallback((errorObj: Error, errorInfo: React.ErrorInfo) => {
    // Log the detailed error for debugging
    console.error('App Error:', {
      message: errorObj.message,
      error: errorObj,
      errorInfo,
      timestamp: new Date().toISOString()
    });
    
    // Show user-friendly toast
    error('Something went wrong. Please try refreshing the page.', { 
      persistent: true,
      duration: 0 // Make it persistent until manually closed
    });
  }, [error]);

  return { handleProductionError };
};
