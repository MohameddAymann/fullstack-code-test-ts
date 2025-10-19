import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { User, fetchUsers } from '../services/api';
import { UI_CONFIG, ERROR_MESSAGES } from '../constants';
import UserCard from './UserCard';
import './UserList.css';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const isLoadingRef = useRef(false);

  const { ref, inView } = useInView({
    threshold: UI_CONFIG.INTERSECTION_OBSERVER_THRESHOLD,
    rootMargin: UI_CONFIG.INTERSECTION_OBSERVER_ROOT_MARGIN,
    skip: !initialLoadComplete, // Don't observe until initial load is complete
  });

  // Load initial users on component mount
  const loadInitialUsers = useCallback(async () => {
    if (isLoadingRef.current) return;

    isLoadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await fetchUsers(1);
      setUsers(response.data);
      setHasMore(response.page < response.total_pages);
      // Enable infinite scroll after initial load is complete
      setTimeout(() => {
        setInitialLoadComplete(true);
      }, UI_CONFIG.INFINITE_SCROLL_DELAY);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : ERROR_MESSAGES.GENERIC_ERROR
      );
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    loadInitialUsers();
  }, [loadInitialUsers]); // Only run once on mount

  // Handle infinite scroll
  useEffect(() => {
    if (
      inView &&
      hasMore &&
      !loading &&
      !isLoadingRef.current &&
      initialLoadComplete
    ) {
      setPage(prevPage => prevPage + 1);
    }
  }, [inView, hasMore, loading, initialLoadComplete, page]);

  // Load more users when page changes (for infinite scroll)
  const loadMoreUsers = useCallback(async () => {
    if (page === 1 || isLoadingRef.current) return;

    isLoadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await fetchUsers(page);
      setUsers(prevUsers => [...prevUsers, ...response.data]);
      setHasMore(response.page < response.total_pages);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : ERROR_MESSAGES.GENERIC_ERROR
      );
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
    }
  }, [page]);

  useEffect(() => {
    if (page > 1) {
      loadMoreUsers();
    }
  }, [page, loadMoreUsers]);

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button
          className="retry-button"
          onClick={async () => {
            setError(null);
            setUsers([]);
            setPage(1);
            setHasMore(true);
            setInitialLoadComplete(false);
            isLoadingRef.current = false;
            setLoading(true);

            try {
              const response = await fetchUsers(1);
              setUsers(response.data);
              setHasMore(response.page < response.total_pages);
              // Enable infinite scroll after retry
              setTimeout(() => {
                setInitialLoadComplete(true);
              }, UI_CONFIG.INFINITE_SCROLL_DELAY);
            } catch (err) {
              setError(
                err instanceof Error
                  ? err.message
                  : ERROR_MESSAGES.GENERIC_ERROR
              );
            } finally {
              setLoading(false);
            }
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <header className="user-list-header">
        <h1>Users</h1>
      </header>

      <main>
        <section
          className="user-list"
          role="list"
          aria-label="List of users"
          aria-live="polite"
        >
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </section>

        {loading && (
          <div className="loading-more" role="status" aria-live="polite">
            <div className="loading-spinner" aria-hidden="true"></div>
            <p>Loading more users...</p>
            <span className="sr-only">
              Please wait while we load more users
            </span>
          </div>
        )}

        {!hasMore && users.length > 0 && (
          <div className="no-more-users" role="status">
            <p>🎉 You've reached the end! No more users to load.</p>
          </div>
        )}

        <div ref={ref} className="intersection-observer" aria-hidden="true" />
      </main>
    </div>
  );
};

export default UserList;
