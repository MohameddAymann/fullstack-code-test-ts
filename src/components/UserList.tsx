import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { User, fetchUsers } from '../services/api';
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
    threshold: 0,
    rootMargin: '50px', // Trigger when 50px away from the bottom
    skip: !initialLoadComplete, // Don't observe until initial load is complete
  });

  // Load initial users on component mount
  useEffect(() => {
    const loadInitialUsers = async () => {
      if (isLoadingRef.current) return;

      console.log('Loading initial users...');
      isLoadingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        const response = await fetchUsers(1);
        console.log('Initial users loaded:', response);
        setUsers(response.data);
        setHasMore(response.page < response.total_pages);
        // Enable infinite scroll after initial load is complete
        setTimeout(() => {
          setInitialLoadComplete(true);
        }, 500); // 500ms delay to ensure smooth UX
      } catch (err) {
        console.error('Error loading initial users:', err);
        setError(err instanceof Error ? err.message : 'Failed to load users');
      } finally {
        setLoading(false);
        isLoadingRef.current = false;
      }
    };

    loadInitialUsers();
  }, []); // Only run once on mount

  // Handle infinite scroll
  useEffect(() => {
    if (
      inView &&
      hasMore &&
      !loading &&
      !isLoadingRef.current &&
      initialLoadComplete
    ) {
      console.log('Triggering infinite scroll - loading page:', page + 1);
      setPage(prevPage => prevPage + 1);
    }
  }, [inView, hasMore, loading, initialLoadComplete, page]);

  // Load more users when page changes (for infinite scroll)
  useEffect(() => {
    if (page > 1) {
      const loadMoreUsers = async () => {
        if (isLoadingRef.current) return;

        isLoadingRef.current = true;
        setLoading(true);
        setError(null);

        try {
          const response = await fetchUsers(page);
          setUsers(prevUsers => [...prevUsers, ...response.data]);
          setHasMore(response.page < response.total_pages);
        } catch (err) {
          console.error('Error loading more users:', err);
          setError(err instanceof Error ? err.message : 'Failed to load users');
        } finally {
          setLoading(false);
          isLoadingRef.current = false;
        }
      };

      loadMoreUsers();
    }
  }, [page]);

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
              }, 500);
            } catch (err) {
              console.error('Error retrying:', err);
              setError(
                err instanceof Error ? err.message : 'Failed to load users'
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
      <div className="user-list-header">
        <h1>Users Directory</h1>
        <p>Scroll down to load more users</p>
      </div>

      <div className="user-list">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {loading && (
        <div className="loading-more">
          <div className="loading-spinner"></div>
          <p>Loading more users...</p>
        </div>
      )}

      {!hasMore && users.length > 0 && (
        <div className="no-more-users">
          <p>🎉 You've reached the end! No more users to load.</p>
        </div>
      )}

      <div ref={ref} className="intersection-observer" />
    </div>
  );
};

export default UserList;
