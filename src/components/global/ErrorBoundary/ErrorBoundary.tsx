import React, { Component, ReactNode } from 'react';
import { IS_DEVELOPMENT_ENVIRONMENT } from '@/common/constants/dev';
import { DevelopmentErrorDisplay, ProductionErrorDisplay } from './components';
import './ErrorBoundary.scss';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  fallback?: ReactNode;
  onProductionError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, call the production error handler
    if (!IS_DEVELOPMENT_ENVIRONMENT && this.props.onProductionError) {
      this.props.onProductionError(error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };
  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      if (IS_DEVELOPMENT_ENVIRONMENT) {
        return (
          <DevelopmentErrorDisplay 
            error={this.state.error} 
            errorInfo={this.state.errorInfo}
            onReset={this.handleReset}
          />
        );
      } else {
        return <ProductionErrorDisplay onReset={this.handleReset} />;
      }
    }

    return this.props.children;
  }
}
