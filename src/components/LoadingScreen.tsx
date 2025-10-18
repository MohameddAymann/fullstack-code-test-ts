import React, { useEffect } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="pulse-circle">
          <div className="pulse-inner"></div>
        </div>
        <h2 className="loading-text">Loading Users...</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;
