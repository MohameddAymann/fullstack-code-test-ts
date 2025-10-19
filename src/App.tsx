import React, { useState } from 'react';
import { LoadingScreen, UserList, ErrorBoundary } from './components';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="App">
      <ErrorBoundary>
        {isLoading ? (
          <LoadingScreen onComplete={handleLoadingComplete} />
        ) : (
          <UserList />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
