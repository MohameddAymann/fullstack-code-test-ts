import { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { User, fetchUsers } from '../services/api';
import { UI_CONFIG, ERROR_MESSAGES } from '../constants';

/**
 * Custom hook for managing user list state and infinite scroll functionality
 * @returns Object containing user list state and methods
 */
export const useUserList = () => {
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

  // Retry function to reload users from the beginning
  const retry = useCallback(async () => {
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
        err instanceof Error ? err.message : ERROR_MESSAGES.GENERIC_ERROR
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Load initial users on mount
  useEffect(() => {
    loadInitialUsers();
  }, [loadInitialUsers]);

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
  useEffect(() => {
    if (page > 1) {
      loadMoreUsers();
    }
  }, [page, loadMoreUsers]);

  return {
    // State
    users,
    loading,
    error,
    hasMore,
    initialLoadComplete,

    // Methods
    retry,

    // Refs for intersection observer
    intersectionRef: ref,
  };
};
