import React from 'react';
import './LoadingSkeleton.css';

interface LoadingSkeletonProps {
  /** Number of skeleton items to display */
  count?: number;
  /** Whether to show the loading spinner */
  showSpinner?: boolean;
  /** Loading message to display */
  message?: string;
}

/**
 * LoadingSkeleton component for displaying loading states
 * @param props - Component props
 * @returns JSX element
 */
const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  count = 3,
  showSpinner = false,
  message = 'Loading more users...',
}) => {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      {showSpinner && (
        <div className="loading-spinner" aria-hidden="true"></div>
      )}

      <div className="skeleton-list">
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton-avatar"></div>
            <div className="skeleton-content">
              <div className="skeleton-name"></div>
            </div>
          </div>
        ))}
      </div>

      <p className="loading-message">{message}</p>
      <span className="sr-only">Please wait while we load more users</span>
    </div>
  );
};

export default LoadingSkeleton;
