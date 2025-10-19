import React, { memo } from 'react';
import { useUserList } from '../hooks/useUserList';
import UserCard from './UserCard';
import ErrorState from './ErrorState';
import LoadingSkeleton from './LoadingSkeleton';
import EndOfList from './EndOfList';
import './UserList.css';

/**
 * UserList component that displays a list of users with infinite scroll
 * Uses the useUserList hook for state management and data fetching
 * @returns JSX element
 */
const UserList: React.FC = memo(() => {
  const {
    users,
    loading,
    error,
    hasMore,
    initialLoadComplete,
    retry,
    intersectionRef,
  } = useUserList();

  // Show error state if there's an error
  if (error) {
    return <ErrorState error={error} onRetry={retry} isRetrying={loading} />;
  }

  // Show loading skeleton for initial load
  if (!initialLoadComplete && loading) {
    return (
      <div className="user-list-container">
        <header className="user-list-header">
          <h1>Users</h1>
        </header>
        <main>
          <LoadingSkeleton
            count={6}
            showSpinner={true}
            message="Loading users..."
          />
        </main>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <header className="user-list-header">
        <h1>Users</h1>
        <p>Discover amazing people from around the world</p>
      </header>

      <main>
        <section
          className="user-list"
          role="list"
          aria-label="List of users"
          aria-live="polite"
          aria-busy={loading}
        >
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </section>

        {/* Loading state for infinite scroll */}
        {loading && initialLoadComplete && (
          <LoadingSkeleton
            count={3}
            showSpinner={true}
            message="Loading more users..."
          />
        )}

        {/* End of list state */}
        {!hasMore && users.length > 0 && (
          <EndOfList totalUsers={users.length} />
        )}

        {/* Intersection observer trigger */}
        <div
          ref={intersectionRef}
          className="intersection-observer"
          aria-hidden="true"
        />
      </main>
    </div>
  );
});

export default UserList;
