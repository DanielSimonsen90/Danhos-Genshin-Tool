import React, { useState, useCallback } from 'react';
import { Toast } from '../../ToastTypes';
import { TOAST_ANIMATION_DURATION, PROGRESS_UPDATE_INTERVAL } from '../../ToastConstants';
import './ToastItem.scss';

interface ToastItemProps {
  toast: Toast;
  onClose: (id: string) => void;
}

export const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  React.useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!toast.persistent && toast.duration > 0) {
      // Update progress bar
      const interval = setInterval(() => {
        setProgress(prev => {
          const elapsed = Date.now() - toast.createdAt;
          const remaining = Math.max(0, toast.duration - elapsed);
          return (remaining / toast.duration) * 100;
        });
      }, PROGRESS_UPDATE_INTERVAL);

      const timer = setTimeout(() => {
        handleClose();
      }, toast.duration);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [toast.duration, toast.persistent, toast.createdAt]);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(toast.id);
    }, TOAST_ANIMATION_DURATION);
  }, [toast.id, onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return 'ℹ️';
    }
  };

  const getAriaLabel = () => {
    switch (toast.type) {
      case 'success':
        return 'Success notification';
      case 'error':
        return 'Error notification';
      case 'warning':
        return 'Warning notification';
      case 'info':
        return 'Information notification';
      default:
        return 'Notification';
    }
  };

  return (
    <div 
      className={`toast toast--${toast.type} ${isVisible ? 'toast--visible' : ''} ${isExiting ? 'toast--exiting' : ''}`}
      role="alert"
      aria-live="polite"
      aria-label={getAriaLabel()}
    >
      <div className="toast__icon">
        {getIcon()}
      </div>
      <div className="toast__content">
        <span className="toast__message">{toast.message}</span>
      </div>
      <button 
        className="toast__close"
        onClick={handleClose}
        aria-label="Close notification"
        type="button"
      >
        ×
      </button>
      {!toast.persistent && toast.duration > 0 && (
        <div 
          className="toast__progress"
          style={{ 
            width: `${progress}%`
          }}
        />
      )}
    </div>
  );
};
