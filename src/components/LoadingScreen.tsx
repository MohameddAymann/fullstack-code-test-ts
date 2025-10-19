import React, { useEffect } from 'react';
import { UI_CONFIG } from '../constants';
import './LoadingScreen.css';

interface LoadingScreenProps {
  /** Callback function called when loading is complete */
  onComplete: () => void;
}

/**
 * LoadingScreen component that displays a pulse animation for 3 seconds
 * @param props - Component props
 * @returns JSX element
 */
const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, UI_CONFIG.LOADING_SCREEN_DURATION);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="loading-container">
        <div className="pulse-circle" aria-hidden="true">
          <div className="pulse-inner"></div>
        </div>
        <h2 className="loading-text">Loading Users...</h2>
        <span className="sr-only">Please wait while we load the user list</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
