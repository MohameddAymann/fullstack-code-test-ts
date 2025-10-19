import React from 'react';
import './styles/ErrorState.css';

interface ErrorStateProps {
  /** Error message to display */
  error: string;
  /** Function to retry the failed operation */
  onRetry: () => void;
  /** Whether the retry operation is in progress */
  isRetrying?: boolean;
}

/**
 * ErrorState component for displaying error messages and retry functionality
 * @param props - Component props
 * @returns JSX element
 */
const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  isRetrying = false,
}) => {
  return (
    <div className="error-container" role="alert" aria-live="assertive">
      <div className="error-icon" aria-hidden="true">
        ⚠️
      </div>
      <h2 className="error-title">Oops! Something went wrong</h2>
      <p className="error-message">{error}</p>
      <button
        className="retry-button"
        onClick={onRetry}
        disabled={isRetrying}
        aria-describedby="retry-description"
      >
        {isRetrying ? (
          <>
            <span className="retry-spinner" aria-hidden="true"></span>
            Retrying...
          </>
        ) : (
          'Try Again'
        )}
      </button>
      <p id="retry-description" className="sr-only">
        Click to retry loading users
      </p>
    </div>
  );
};

export default ErrorState;
