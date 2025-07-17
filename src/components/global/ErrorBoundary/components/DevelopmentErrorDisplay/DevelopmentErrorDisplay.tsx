import React from 'react';
import './DevelopmentErrorDisplay.scss';

interface DevelopmentErrorDisplayProps {
  error?: Error;
  errorInfo?: React.ErrorInfo;
  onReset?: () => void;
}

export const DevelopmentErrorDisplay: React.FC<DevelopmentErrorDisplayProps> = ({ 
  error, 
  errorInfo, 
  onReset 
}) => {
  const copyErrorToClipboard = async () => {
    const errorText = `Error: ${error?.message || 'Unknown error'}\n\nStack Trace:\n${error?.stack || 'No stack trace available'}\n\nComponent Stack:\n${errorInfo?.componentStack || 'No component stack available'}`;
    
    try {
      await navigator.clipboard.writeText(errorText);
      console.log('Error details copied to clipboard');
    } catch (err) {
      console.error('Failed to copy error details:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = errorText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="error-boundary error-boundary--development">
      <div className="error-boundary__header">
        <h1 className="error-boundary__title">🚨 Development Error</h1>
        <div className="error-boundary__actions">
          <button 
            className="error-boundary__button error-boundary__button--secondary" 
            onClick={copyErrorToClipboard}
          >
            Copy Error Details
          </button>
          {onReset && (
            <button 
              className="error-boundary__button error-boundary__button--primary" 
              onClick={onReset}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
      
      <div className="error-boundary__section">
        <h2 className="error-boundary__section-title">Error Message</h2>
        <div className="error-boundary__code-block">
          {error?.message || 'Unknown error'}
        </div>
      </div>

      <div className="error-boundary__section">
        <h2 className="error-boundary__section-title">Stack Trace</h2>
        <div className="error-boundary__code-block">
          {error?.stack || 'No stack trace available'}
        </div>
      </div>

      {errorInfo && (
        <div className="error-boundary__section">
          <h2 className="error-boundary__section-title">Component Stack</h2>
          <div className="error-boundary__code-block">
            {errorInfo.componentStack}
          </div>
        </div>
      )}

      <div className="error-boundary__info">
        <p>💡 This detailed error view is only shown in development mode.</p>
      </div>
    </div>
  );
};
