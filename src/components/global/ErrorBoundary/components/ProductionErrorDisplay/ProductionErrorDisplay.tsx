import React from 'react';
import './ProductionErrorDisplay.scss';

interface ProductionErrorDisplayProps {
  onReset?: () => void;
}

export const ProductionErrorDisplay: React.FC<ProductionErrorDisplayProps> = ({ onReset }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="error-boundary error-boundary--production">
      <div className="error-boundary__icon">😵</div>
      <h1 className="error-boundary__title">Something went wrong</h1>
      <p className="error-boundary__message">
        We're sorry, but something unexpected happened. Please try refreshing the page.
      </p>
      <div className="error-boundary__actions">
        {onReset && (
          <button 
            className="error-boundary__button error-boundary__button--secondary" 
            onClick={onReset}
          >
            Try Again
          </button>
        )}
        <button 
          className="error-boundary__button error-boundary__button--primary" 
          onClick={handleRefresh}
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};
