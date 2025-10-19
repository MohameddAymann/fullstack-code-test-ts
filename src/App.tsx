import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import UserList from './components/UserList';
import ErrorBoundary from './components/ErrorBoundary';
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
